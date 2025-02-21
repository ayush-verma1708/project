import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { campaignService } from '../api/services/campaigns';
import ShippingForm from '../components/ShippingForm';
import OrderSummary from '../components/OrderSummary';
import { orderService } from '../api/services/orders';
import { razorpayService } from '../api/services/razorpayService';

// Tax rate constant (adjust as needed)
const TAX_RATE = 0.18;

export default function CheckoutPage() {
  const { state } = useCart();
  const [shippingForm, setShippingForm] = useState({
    address: '123 Main St',
    city: 'Springfield',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    apartment: 'Apt 1',
    pin: '123456',
    country: 'USA', // Added country property
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [validCoupon, setValidCoupon] = useState('');
  const [applyAttemptCount, setApplyAttemptCount] = useState(0);
  const [disableCouponApply, setDisableCouponApply] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState('');
  const [validCouponId, setValidCouponId] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Calculate prices
  const discountedSubtotal = state.subtotal * (1 - discount);
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + tax;

  const validateForm = () => {
    let isValid = true;
    const newErrors = { firstName: '', lastName: '', address: '', city: '', pin: '', country: '' };

    // First name validation
    if (!shippingForm.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    // Last name validation
    if (!shippingForm.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    // Address validation
    if (!shippingForm.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    // City validation
    if (!shippingForm.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    // ZIP validation
    if (!shippingForm.pin.trim()) {
      newErrors.pin = 'pin code is required';
      isValid = false;
    } else if (!/^\d{6}$/.test(shippingForm.pin)) {
      newErrors.pin = 'Invalid pin (6 digits required)';
      isValid = false;
    }

    // Country validation
    if (!shippingForm.country.trim()) {
      newErrors.country = 'Country is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOrderSubmission = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      // Step 1: Prepare order details (without saving to DB yet)
      const orderData = {
        user: {
          firstName: shippingForm.firstName,
          lastName: shippingForm.lastName,
          email: shippingForm.email,
          phone: shippingForm.phone,
        },
        products: state.items.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
          extraInfo: {
            model: item.selectedModel,
            brand: item.selectedBrand,
          },
        })),
        shippingInfo: shippingForm,
        coupon: validCouponId || undefined,
        subtotal: state.subtotal,
        discount: discount * 100, // Convert to percentage
        tax: tax,
        total: total,
      };

      console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

      // Step 2: Create Razorpay Order
      const razorpayOrder = await razorpayService.createOrder(Math.round(total), 'INR'); // Convert to smallest currency unit and round

      console.log("Razorpay Order:", razorpayOrder);
      if (!razorpayOrder || !razorpayOrder.razorpayOrderId) {
        alert('Failed to initiate payment.');
        return;
      }

      // Step 3: Open Razorpay Payment Modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Public Key
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Your Store Name',
        description: 'Order Payment',
        order_id: razorpayOrder.razorpayOrderId,
        handler: async (response: any) => {
          // Step 4: Verify Payment on Backend
          const paymentData = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          try {
            const verifyResponse = await razorpayService.verifyPayment(paymentData, orderData);
            
            if (verifyResponse.success) {
              alert('Payment successful! Order placed.');
            } else {
              alert('Payment verification failed.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: `${shippingForm.firstName} ${shippingForm.lastName}`,
          email: shippingForm.email,
          contact: shippingForm.phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error processing order:', error);
      alert('An error occurred during checkout.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setIsEditing(false);
      handleOrderSubmission();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleApplyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    setCouponError(''); // Reset error message before applying

    try {
      // Fetch coupon data from the API
      const response = await campaignService.search(code); // Assuming search returns an array
      const coupon = response[0];  // Get the first matching coupon (if any)
      if (!coupon) {
        setCouponError('Invalid coupon code');
        setDiscount(0);
        return;
      }

      // Validate coupon based on active status and dates
      const currentDate = new Date();
      const startDate = new Date(coupon.startDate);
      const endDate = new Date(coupon.endDate);

      if (!coupon.active) {
        setCouponError('This coupon is no longer active');
        setDiscount(0);
        return;
      }

      if (currentDate < startDate || currentDate > endDate) {
        setCouponError('Coupon code has expired');
        setDiscount(0);
        return;
      }

      // Apply the discount if validation is successful
      setDiscount(coupon.discount / 100);
      setCouponError(''); // Clear any previous error
      
      setValidCoupon(code); // Save the valid coupon code in state
      setValidCouponId(coupon._id);
      localStorage.setItem('validCoupon', code); // Save the valid coupon code
      alert(`Coupon applied! Discount: ${coupon.discount}%`);
    } catch (error) {
      setCouponError('Failed to validate coupon');
      setDiscount(0);
    }
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    const savedCoupon = localStorage.getItem('validCoupon');
    if (savedCoupon && e.target.value.trim().toUpperCase() === savedCoupon) {
      setCouponError(''); // Clear any error if the saved coupon is re-entered
      setDiscount(validCoupon ? discount : 0); // Reapply the discount if the valid coupon is re-entered
    } else if (validCoupon) {
      setCouponError('Invalid coupon code, reapplying the last valid coupon');
      setCouponCode(validCoupon);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <Link
            to="/cart"
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ChevronLeft size={20} /> Back to Cart
          </Link>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <section>
            <ShippingForm
              onSubmit={handleSubmit}
              initialValues={shippingForm}
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              // onChange={handleChange}
            />
          </section>

          <section>
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
              onOrderSubmit={handleOrderSubmission} // Pass the handleOrderSubmission function
            />
          </section>
        </div>
      </main>
    </div>
  );
}
