import { useCart } from '../../context/CartContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { campaignService } from '../../api/services/campaigns';
import ShippingForm from '../../components/ShippingForm';
import OrderSummary from '../../components/OrderSummary';
import PaymentHandler from '../../components/PaymentHandler';
import OrderConfirmation from '../../components/OrderConfirmation';

const TAX_RATE = 0;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { checkoutId } = useParams();
  const { state, clearCart } = useCart();
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    address: '',
    city: '',
    lastName: '',
    email: '',
    phone: '',
    apartment: '',
    pin: '',
    state:'',
    country: 'India',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    state:'',
    pin: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<{
    items: any[];
    total: number;
    shippingForm: any;
    orderId: string;
    checkoutId: string;
  } | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [validCoupon, setValidCoupon] = useState('');
  const [applyAttemptCount, setApplyAttemptCount] = useState(0);
  const [disableCouponApply, setDisableCouponApply] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState('');
  const [validCouponId, setValidCouponId] = useState('');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    if (!checkoutId) {
      const newCheckoutId = `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      navigate(`/checkout/${newCheckoutId}`, { replace: true });
    }
  }, [checkoutId, navigate]);

  useEffect(() => {
    const storedOrderDetails = localStorage.getItem(`orderDetails_${checkoutId}`);
    if (storedOrderDetails) {
      const parsedDetails = JSON.parse(storedOrderDetails);
      setOrderDetails(parsedDetails);
      setIsConfirmed(true);
      setOrderId(parsedDetails.orderId);
      navigate(`/order-confirmation/${parsedDetails.orderId}`, { replace: true });
    }
  }, [checkoutId, navigate]);

  useEffect(() => {
    const savedCoupon = localStorage.getItem('validCoupon');
    if (savedCoupon) {
      setCouponCode(savedCoupon);
      handleApplyCoupon();
    }
  }, []);

  useEffect(() => {
    if (!isConfirmed && !state.items.length) {
      setCheckoutError('Your cart is empty. Please add items to proceed.');
    } else {
      setCheckoutError(null);
    }
  }, [state.items, isConfirmed]);

  const discountedSubtotal = state.subtotal * (1 - discount);
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + tax;

  const validateForm = () => {
    console.log('Validating shippingForm in CheckoutPage:', shippingForm);
    let isValid = true;
    const newErrors = { firstName: '', lastName: '', address: '', city: '', pin: '', state: '' };
    if (!shippingForm.firstName.trim()) { newErrors.firstName = 'First name is required'; isValid = false; }
    if (!shippingForm.lastName.trim()) { newErrors.lastName = 'Last name is required'; isValid = false; }
    if (!shippingForm.address.trim()) { newErrors.address = 'Address is required'; isValid = false; }
    if (!shippingForm.city.trim()) { newErrors.city = 'City is required'; isValid = false; }
    if (!shippingForm.pin.trim()) { newErrors.pin = 'Pin code is required'; isValid = false; }
    else if (!/^\d{6}$/.test(shippingForm.pin)) { newErrors.pin = 'Invalid pin (6 digits required)'; isValid = false; }
    if (!shippingForm.state.trim()) { newErrors.state = 'State is required'; isValid = false; }

    console.log('Validation result:', { isValid, newErrors });
    setErrors(newErrors);
    return isValid;
  };

  const handleApplyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    setCouponError('');
    try {
      const response = await campaignService.search(code);
      const coupon = response[0];
      if (!coupon) { setCouponError('Invalid coupon code'); setDiscount(0); return; }
      const currentDate = new Date();
      const startDate = new Date(coupon.startDate);
      const endDate = new Date(coupon.endDate);
      if (!coupon.active) { setCouponError('This coupon is no longer active'); setDiscount(0); return; }
      if (currentDate < startDate || currentDate > endDate) { setCouponError('Coupon code has expired'); setDiscount(0); return; }
      setDiscount(coupon.discount / 100);
      setCouponError('');
      setValidCoupon(code);
      setValidCouponId(coupon._id);
      localStorage.setItem('validCoupon', code);
      alert(`Coupon applied! Discount: ${coupon.discount}%`);
    } catch (error) {
      setCouponError('Failed to validate coupon. Please try again.');
      setDiscount(0);
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

  const handlePaymentSuccess = (orderId: string) => {
    const details = {
      items: [...state.items],
      total: total,
      shippingForm: { ...shippingForm },
      orderId: orderId,
      checkoutId: checkoutId || ''
    };
    setOrderDetails(details);
    localStorage.setItem(`orderDetails_${checkoutId}`, JSON.stringify(details));
    
    setIsConfirmed(true);
    setOrderId(orderId);
    setCheckoutError(null);
    clearCart();
    localStorage.removeItem('validCoupon');
    
    navigate(`/order-confirmation/${orderId}`, { replace: true });
  };

  const handlePaymentError = (errorMsg: string) => {
    setCheckoutError(errorMsg);
    setIsSubmitted(true);
    setIsConfirmed(false);
  };

  const resetPayment = () => {
    setIsConfirmed(false);
    setOrderId(null);
    setCheckoutError(null);
    setOrderDetails(null);
    localStorage.removeItem(`orderDetails_${checkoutId}`);
    const newCheckoutId = `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    navigate(`/checkout/${newCheckoutId}`, { replace: true });
  };

  const handleShippingSubmit = (updatedShippingForm: any) => {
    setShippingForm(updatedShippingForm);
    setIsSubmitted(true);
    setErrors({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      pin: '',
      state: '',
      country: '',
    });
  };

  if (checkoutError && !isConfirmed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-md text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Checkout Error</h2>
          <p className="text-sm text-gray-600 mb-4">{checkoutError}</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/cart"
              className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Cart
            </Link>
            {isSubmitted && !isConfirmed && (
              <button
                onClick={resetPayment}
                className="inline-block bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try Payment Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

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
          {!isConfirmed ? (
            <>
              <ShippingForm
                onSubmit={handleShippingSubmit}
                initialValues={shippingForm}
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              {isSubmitted && !isConfirmed && (
                <PaymentHandler
                  shippingForm={shippingForm}
                  state={state}
                  discount={discount}
                  tax={tax}
                  total={total}
                  validCouponId={validCouponId}
                  validateForm={validateForm}
                  setErrors={setErrors}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />
              )}
            </>
          ) : (
            <OrderConfirmation
              orderId={orderId!}
              items={orderDetails?.items || []}
              total={orderDetails?.total || 0}
              shippingForm={orderDetails?.shippingForm || {}}
            />
          )}
        </div>
        {!isConfirmed && (
          <div className="lg:w-1/3 lg:sticky lg:top-4">
            <OrderSummary
              items={state.items}
              subtotal={state.subtotal}
              discount={discount}
              taxRate={TAX_RATE}
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
              onOrderSubmit={() => setIsSubmitted(true)}
            />
          </div>
        )}
      </main>
    </div>
  );
}