import { useCart } from '../../context/CartContext';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { campaignService } from '../../api/services/campaigns';
import ShippingForm from '../../components/ShippingForm';
import OrderSummary from '../../components/OrderSummary';
import PaymentHandler from '../../components/PaymentHandler';
import OrderConfirmation from '../../components/OrderConfirmation';
import { Coupon, Order, ProductItem, ShippingInfo } from '../../api/types';
import { orderService } from '../../api/services/orders';
import { CartItem, Product } from '../../types/types';
import { productService } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { LoadingSpinner } from '../../components/Loading/LoadingSpinner';

const TAX_RATE = 0.08; // 8% tax rate

interface CheckoutPipeline {
  pipelineId?: string;
  action?: string;
  productId?: string;
  pipelineType?: string;
  isBuyNow?: boolean;
  referrer?: string;
}

interface ShippingFormData {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  state: string;
  pin: string;
  phone: string;
  email: string;
}

interface PaymentResult {
  success: boolean;
  orderId?: string;
  error?: string;
}

interface OrderDetails {
  shippingInfo: ShippingFormData;
  paymentResult: PaymentResult;
}

export default function CheckoutPage() {
  const { state: cart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pipelineId, action, productId } = useParams();
  const [searchParams] = useSearchParams();
  const isBuyNow = action === 'buy-now';

  const [shippingFormData, setShippingFormData] = useState<ShippingFormData>({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    pin: '',
    state: '',
    country: 'India',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState<Partial<ShippingFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [discount, setDiscount] = useState(0);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [validCoupon, setValidCoupon] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [applyAttemptCount, setApplyAttemptCount] = useState(0);
  const [disableCouponApply, setDisableCouponApply] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState('');

  useEffect(() => {
    if (isBuyNow && productId) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const fetchedProduct = await productService.getById(productId);
          if (fetchedProduct) {
            setProduct(fetchedProduct as unknown as Product);
          } else {
            navigate('/cart');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
          navigate('/cart');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else if (!cart.items.length) {
      navigate('/cart');
    }
  }, [isBuyNow, productId, cart.items.length, navigate]);

  const handlePaymentSuccess = async (paymentId: string) => {
    if (isProcessingOrder) return;
    setIsProcessingOrder(true);
    setPaymentError(null);

    try {
      // Order is already created during payment verification
      // Just clear the cart and navigate to confirmation with token
      clearCart();
      navigate(`/order-confirmation?token=${paymentId}`);
    } catch (error: any) {
      console.error('Error handling payment success:', error);
      setPaymentError(error?.response?.data?.message || error.message || 'Failed to process payment');
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const discountedSubtotal = cart.items.reduce((total: number, item: CartItem) => 
    total + item.price * item.quantity, 0);
  const tax = discountedSubtotal * TAX_RATE;
  const discountAmount = discountedSubtotal * discount;
  const total = discountedSubtotal + tax - discountAmount;

  const validateForm = () => {
    console.log('Validating shippingForm in CheckoutPage:', shippingFormData);
    let isValid = true;
    const newErrors = { 
      firstName: '', 
      lastName: '', 
      address: '', 
      city: '', 
      pin: '', 
      state: '', 
      country: '',
      phone: '',
      email: ''
    };
    if (!shippingFormData.firstName.trim()) { newErrors.firstName = 'First name is required'; isValid = false; }
    if (!shippingFormData.lastName.trim()) { newErrors.lastName = 'Last name is required'; isValid = false; }
    if (!shippingFormData.address.trim()) { newErrors.address = 'Address is required'; isValid = false; }
    if (!shippingFormData.city.trim()) { newErrors.city = 'City is required'; isValid = false; }
    if (!shippingFormData.pin.trim()) { newErrors.pin = 'Pin code is required'; isValid = false; }
    else if (!/^\d{6}$/.test(shippingFormData.pin)) { newErrors.pin = 'Invalid pin (6 digits required)'; isValid = false; }
    if (!shippingFormData.state.trim()) { newErrors.state = 'State is required'; isValid = false; }
    if (!shippingFormData.country.trim()) { newErrors.country = 'Country is required'; isValid = false; }
    if (!shippingFormData.phone.trim()) { newErrors.phone = 'Phone number is required'; isValid = false; }
    else if (!/^\d{10}$/.test(shippingFormData.phone)) { newErrors.phone = 'Invalid phone number (10 digits required)'; isValid = false; }
    if (!shippingFormData.email.trim()) { newErrors.email = 'Email is required'; isValid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingFormData.email)) { newErrors.email = 'Invalid email format'; isValid = false; }

    console.log('Validation result:', { isValid, newErrors });
    setErrors(newErrors);
    return isValid;
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    try {
      const response = await campaignService.search(couponCode);
      if (response && response.discount) {
        setDiscount(response.discount);
        setValidCoupon(response.id);
        setCouponError('');
      } else {
        setCouponError('Invalid or expired coupon code');
        setDiscount(0);
        setValidCoupon('');
      }
    } catch (error) {
      setCouponError('Failed to validate coupon. Please try again.');
      setDiscount(0);
      setValidCoupon('');
    }
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    const savedCoupon = localStorage.getItem('validCoupon');
    if (savedCoupon && e.target.value.trim().toUpperCase() === savedCoupon) {
      setCouponError('');
      setDiscount(validCoupon ? discount : 0);
    } else if (validCoupon) {
      setCouponError('Invalid coupon code, reapplying the last valid coupon');
      setCouponCode(validCoupon);
    }
  };

  const handlePaymentError = (errorMsg: string) => {
    setPaymentError(errorMsg);
    setIsSubmitted(true);
    setIsConfirmed(false);
  };

  const handleShippingFormChange = (updatedShippingForm: ShippingFormData) => {
    setShippingFormData(prev => ({
      ...prev,
      ...updatedShippingForm
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white py-4 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Checkout</h1>
          </div>
          <Link to="/cart" className="flex items-center text-gray-600 hover:text-black">
            <ChevronLeft size={18} /> Back to Cart
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex justify-between text-sm font-medium text-gray-500">
          <span className={isSubmitted ? 'text-indigo-600' : 'text-gray-800'}>Shipping</span>
          <span className={isSubmitted ? (isConfirmed ? 'text-indigo-600' : 'text-gray-800') : 'text-gray-400'}>Payment</span>
          <span className={isConfirmed ? 'text-indigo-600' : 'text-gray-400'}>Confirmation</span>
        </div>
        <div className="h-1 bg-gray-200 mt-2 rounded-full">
          <div
            className={`h-full bg-indigo-600 rounded-full transition-all duration-300 ${
              isConfirmed ? 'w-full' : isSubmitted ? 'w-2/3' : 'w-1/3'
            }`}
          ></div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {!isSubmitted ? (
            <ShippingForm
              initialValues={shippingFormData}
              onSubmit={handleShippingFormChange}
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          ) : (
            <PaymentHandler
              shippingForm={shippingFormData}
              state={cart}
              discount={discount}
              tax={tax}
              total={total}
              validCouponId={validCoupon}
              validateForm={() => {
                const newErrors = {
                  firstName: !shippingFormData.firstName ? 'First name is required' : '',
                  lastName: !shippingFormData.lastName ? 'Last name is required' : '',
                  address: !shippingFormData.address ? 'Address is required' : '',
                  city: !shippingFormData.city ? 'City is required' : '',
                  country: !shippingFormData.country ? 'Country is required' : '',
                  state: !shippingFormData.state ? 'State is required' : '',
                  pin: !shippingFormData.pin ? 'PIN code is required' : '',
                  phone: !shippingFormData.phone ? 'Phone number is required' : '',
                  email: !shippingFormData.email ? 'Email is required' : '',
                };
                setErrors(newErrors);
                return !Object.values(newErrors).some(error => error);
              }}
              setErrors={setErrors}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          )}
        </div>
        <div className="lg:w-1/3 lg:sticky lg:top-4">
          <OrderSummary
            items={cart.items}
            subtotal={discountedSubtotal}
            discount={discount}
            taxRate={tax}
            couponCode={couponCode}
            couponError={couponError}
            validCoupon={validCoupon}
            isSubmitted={isSubmitted}
            onApplyCoupon={handleApplyCoupon}
            onCouponChange={handleCouponChange}
            setCouponCode={setCouponCode}
            setDiscount={setDiscount}
            setCouponError={setCouponError}
            setValidCoupon={setValidCoupon}
            applyAttemptCount={applyAttemptCount}
            setApplyAttemptCount={setApplyAttemptCount}
            disableCouponApply={disableCouponApply}
            setDisableCouponApply={setDisableCouponApply}
            rateLimitMessage={rateLimitMessage}
            setRateLimitMessage={setRateLimitMessage}
            onOrderSubmit={() => handleShippingFormChange(shippingFormData)}
          />
        </div>
      </main>
    </div>
  );
}