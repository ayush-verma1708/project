import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { campaignService } from '../api/services/campaigns';
import ShippingForm from '../components/ShippingForm';
import OrderSummary from '../components/OrderSummary';
import PaymentHandler from '../components/PaymentHandler';
import OrderConfirmation from '../components/OrderConfirmation';

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
    country: 'USA',
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
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [validCoupon, setValidCoupon] = useState('');
  const [applyAttemptCount, setApplyAttemptCount] = useState(0);
  const [disableCouponApply, setDisableCouponApply] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState('');
  const [validCouponId, setValidCouponId] = useState('');
  const [checkoutError, setCheckoutError] = useState<string | null>(null); // New error state

  useEffect(() => {
    const savedCoupon = localStorage.getItem('validCoupon');
    if (savedCoupon) {
      setCouponCode(savedCoupon);
      handleApplyCoupon();
    }
  }, []);

  useEffect(() => {
    if (!state.items.length) {
      setCheckoutError('Your cart is empty. Please add items to proceed.');
    } else {
      setCheckoutError(null);
    }
  }, [state.items]);

  const discountedSubtotal = state.subtotal * (1 - discount);
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + tax;

  const validateForm = () => {
    let isValid = true;
    const newErrors = { firstName: '', lastName: '', address: '', city: '', pin: '', country: '' };
    if (!shippingForm.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!shippingForm.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!shippingForm.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    if (!shippingForm.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    if (!shippingForm.pin.trim()) {
      newErrors.pin = 'Pin code is required';
      isValid = false;
    } else if (!/^\d{6}$/.test(shippingForm.pin)) {
      newErrors.pin = 'Invalid pin (6 digits required)';
      isValid = false;
    }
    if (!shippingForm.country.trim()) {
      newErrors.country = 'Country is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleApplyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    setCouponError('');
    try {
      const response = await campaignService.search(code);
      const coupon = response[0];
      if (!coupon) {
        setCouponError('Invalid coupon code');
        setDiscount(0);
        return;
      }
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
    setIsConfirmed(true);
    setOrderId(orderId);
    setCheckoutError(null);
  };

  const handlePaymentError = (errorMsg: string) => {
    setCheckoutError(errorMsg);
    setIsSubmitted(true); // Keep in payment step to allow retry
    setIsConfirmed(false);
  };

  if (checkoutError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-md text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Checkout Error</h2>
          <p className="text-sm text-gray-600 mb-4">{checkoutError}</p>
          <Link
            to="/cart"
            className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Cart
          </Link>
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
                onSubmit={() => setIsSubmitted(true)}
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
              items={state.items}
              total={total}
              shippingForm={shippingForm}
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
// import { useCart } from '../context/CartContext';
// import { Link } from 'react-router-dom';
// import { ChevronLeft } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { campaignService } from '../api/services/campaigns';
// import ShippingForm from '../components/ShippingForm';
// import OrderSummary from '../components/OrderSummary';
// import PaymentHandler from '../components/PaymentHandler';
// import OrderConfirmation from '../components/OrderConfirmation';

// const TAX_RATE = 0.18;

// export default function CheckoutPage() {
//   const { state } = useCart();
//   const [shippingForm, setShippingForm] = useState({
//     address: '123 Main St',
//     city: 'Springfield',
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     phone: '1234567890',
//     apartment: 'Apt 1',
//     pin: '123456',
//     country: 'USA',
//   });
//   const [errors, setErrors] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     city: '',
//     country: '',
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false); // New state for confirmation
//   const [orderId, setOrderId] = useState<string | null>(null); // New state for order ID
//   const [couponCode, setCouponCode] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const [couponError, setCouponError] = useState('');
//   const [validCoupon, setValidCoupon] = useState('');
//   const [applyAttemptCount, setApplyAttemptCount] = useState(0);
//   const [disableCouponApply, setDisableCouponApply] = useState(false);
//   const [rateLimitMessage, setRateLimitMessage] = useState('');
//   const [validCouponId, setValidCouponId] = useState('');

//   useEffect(() => {
//     const savedCoupon = localStorage.getItem('validCoupon');
//     if (savedCoupon) {
//       setCouponCode(savedCoupon);
//       handleApplyCoupon();
//     }
//   }, []);

//   const discountedSubtotal = state.subtotal * (1 - discount);
//   const tax = discountedSubtotal * TAX_RATE;
//   const total = discountedSubtotal + tax;

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { firstName: '', lastName: '', address: '', city: '', pin: '', country: '' };

//     if (!shippingForm.firstName.trim()) {
//       newErrors.firstName = 'First name is required';
//       isValid = false;
//     }
//     if (!shippingForm.lastName.trim()) {
//       newErrors.lastName = 'Last name is required';
//       isValid = false;
//     }
//     if (!shippingForm.address.trim()) {
//       newErrors.address = 'Address is required';
//       isValid = false;
//     }
//     if (!shippingForm.city.trim()) {
//       newErrors.city = 'City is required';
//       isValid = false;
//     }
//     if (!shippingForm.pin.trim()) {
//       newErrors.pin = 'pin code is required';
//       isValid = false;
//     } else if (!/^\d{6}$/.test(shippingForm.pin)) {
//       newErrors.pin = 'Invalid pin (6 digits required)';
//       isValid = false;
//     }
//     if (!shippingForm.country.trim()) {
//       newErrors.country = 'Country is required';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleApplyCoupon = async () => {
//     const code = couponCode.trim().toUpperCase();
//     setCouponError('');
//     try {
//       const response = await campaignService.search(code);
//       const coupon = response[0];
//       if (!coupon) {
//         setCouponError('Invalid coupon code');
//         setDiscount(0);
//         return;
//       }
//       const currentDate = new Date();
//       const startDate = new Date(coupon.startDate);
//       const endDate = new Date(coupon.endDate);
//       if (!coupon.active) {
//         setCouponError('This coupon is no longer active');
//         setDiscount(0);
//         return;
//       }
//       if (currentDate < startDate || currentDate > endDate) {
//         setCouponError('Coupon code has expired');
//         setDiscount(0);
//         return;
//       }
//       setDiscount(coupon.discount / 100);
//       setCouponError('');
//       setValidCoupon(code);
//       setValidCouponId(coupon._id);
//       localStorage.setItem('validCoupon', code);
//       alert(`Coupon applied! Discount: ${coupon.discount}%`);
//     } catch (error) {
//       setCouponError('Failed to validate coupon');
//       setDiscount(0);
//     }
//   };

//   const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCouponCode(e.target.value);
//     const savedCoupon = localStorage.getItem('validCoupon');
//     if (savedCoupon && e.target.value.trim().toUpperCase() === savedCoupon) {
//       setCouponError('');
//       setDiscount(validCoupon ? discount : 0);
//     } else if (validCoupon) {
//       setCouponError('Invalid coupon code, reapplying the last valid coupon');
//       setCouponCode(validCoupon);
//     }
//   };

//   const handlePaymentSuccess = (orderId: string) => {
//     setIsConfirmed(true);
//     setOrderId(orderId);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white py-4 shadow-sm">
//         <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             {/* <img src="/logo.png" alt="Store Logo" className="h-8" /> */}
//             <h1 className="text-xl font-semibold">Checkout</h1>
//           </div>
//           <Link to="/cart" className="flex items-center text-gray-600 hover:text-black">
//             <ChevronLeft size={18} /> Back to Cart
//           </Link>
//         </div>
//       </header>

//       <div className="max-w-5xl mx-auto px-4 py-4">
//         <div className="flex justify-between text-sm font-medium text-gray-500">
//           <span className={isSubmitted ? 'text-indigo-600' : 'text-gray-800'}>Shipping</span>
//           <span className={isSubmitted ? (isConfirmed ? 'text-indigo-600' : 'text-gray-800') : 'text-gray-400'}>Payment</span>
//           <span className={isConfirmed ? 'text-indigo-600' : 'text-gray-400'}>Confirmation</span>
//         </div>
//         <div className="h-1 bg-gray-200 mt-2 rounded-full">
//           <div
//             className={`h-full bg-indigo-600 rounded-full transition-all duration-300 ${
//               isConfirmed ? 'w-full' : isSubmitted ? 'w-2/3' : 'w-1/3'
//             }`}
//           ></div>
//         </div>
//       </div>

//       <main className="max-w-5xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-2/3">
//           {!isConfirmed ? (
//             <>
//               <ShippingForm
//                 onSubmit={() => setIsSubmitted(true)}
//                 initialValues={shippingForm}
//                 isSubmitted={isSubmitted}
//                 setIsSubmitted={setIsSubmitted}
//                 isEditing={isEditing}
//                 setIsEditing={setIsEditing}
//               />
//               {isSubmitted && !isConfirmed && (
//                 <PaymentHandler
//                   shippingForm={shippingForm}
//                   state={state}
//                   discount={discount}
//                   tax={tax}
//                   total={total}
//                   validCouponId={validCouponId}
//                   validateForm={validateForm}
//                   setErrors={setErrors}
//                   onPaymentSuccess={handlePaymentSuccess}
//                 />
//               )}
//             </>
//           ) : (
//             <OrderConfirmation
//               orderId={orderId!}
//               items={state.items}
//               total={total}
//               shippingForm={shippingForm}
//             />
//           )}
//         </div>
//         {!isConfirmed && (
//           <div className="lg:w-1/3 lg:sticky lg:top-4">
//             <OrderSummary
//               items={state.items}
//               subtotal={state.subtotal}
//               discount={discount}
//               taxRate={TAX_RATE}
//               couponCode={couponCode}
//               couponError={couponError}
//               validCoupon={validCoupon}
//               isSubmitted={isSubmitted}
//               onApplyCoupon={handleApplyCoupon}
//               onCouponChange={handleCouponChange}
//               setCouponCode={setCouponCode}
//               setDiscount={setDiscount}
//               setCouponError={setCouponError}
//               setValidCoupon={setValidCoupon}
//               applyAttemptCount={applyAttemptCount}
//               setApplyAttemptCount={setApplyAttemptCount}
//               disableCouponApply={disableCouponApply}
//               setDisableCouponApply={setDisableCouponApply}
//               rateLimitMessage={rateLimitMessage}
//               setRateLimitMessage={setRateLimitMessage}
//               onOrderSubmit={() => setIsSubmitted(true)}
//             />
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
// // import { useCart } from '../context/CartContext';
// // import { Link } from 'react-router-dom';
// // import { ChevronLeft } from 'lucide-react';
// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { campaignService } from '../api/services/campaigns';
// // import ShippingForm from '../components/ShippingForm';
// // import OrderSummary from '../components/OrderSummary';
// // import PaymentHandler from '../components/PaymentHandler';

// // // Tax rate constant (adjust as needed)
// // const TAX_RATE = 0.18;

// // export default function CheckoutPage() {
// //   const { state } = useCart();
// //   const [shippingForm, setShippingForm] = useState({
// //     address: '123 Main St',
// //     city: 'Springfield',
// //     firstName: 'John',
// //     lastName: 'Doe',
// //     email: 'john.doe@example.com',
// //     phone: '1234567890',
// //     apartment: 'Apt 1',
// //     pin: '123456',
// //     country: 'USA', // Added country property
// //   });
// //   const [errors, setErrors] = useState({
// //     firstName: '',
// //     lastName: '',
// //     address: '',
// //     city: '',
// //     country: '',
// //   });
// //   const [isSubmitted, setIsSubmitted] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [couponCode, setCouponCode] = useState('');
// //   const [discount, setDiscount] = useState(0);
// //   const [couponError, setCouponError] = useState('');
// //   const [validCoupon, setValidCoupon] = useState('');
// //   const [applyAttemptCount, setApplyAttemptCount] = useState(0);
// //   const [disableCouponApply, setDisableCouponApply] = useState(false);
// //   const [rateLimitMessage, setRateLimitMessage] = useState('');
// //   const [validCouponId, setValidCouponId] = useState('');

// //   useEffect(() => {
// //     const savedCoupon = localStorage.getItem('validCoupon');
// //     if (savedCoupon) {
// //       setCouponCode(savedCoupon);
// //       handleApplyCoupon();
// //     }
// //   }, []);

// //   // Calculate prices
// //   const discountedSubtotal = state.subtotal * (1 - discount);
// //   const tax = discountedSubtotal * TAX_RATE;
// //   const total = discountedSubtotal + tax;

// //   const validateForm = () => {
// //     let isValid = true;
// //     const newErrors = { firstName: '', lastName: '', address: '', city: '', pin: '', country: '' };

// //     // First name validation
// //     if (!shippingForm.firstName.trim()) {
// //       newErrors.firstName = 'First name is required';
// //       isValid = false;
// //     }

// //     // Last name validation
// //     if (!shippingForm.lastName.trim()) {
// //       newErrors.lastName = 'Last name is required';
// //       isValid = false;
// //     }

// //     // Address validation
// //     if (!shippingForm.address.trim()) {
// //       newErrors.address = 'Address is required';
// //       isValid = false;
// //     }

// //     // City validation
// //     if (!shippingForm.city.trim()) {
// //       newErrors.city = 'City is required';
// //       isValid = false;
// //     }

// //     // ZIP validation
// //     if (!shippingForm.pin.trim()) {
// //       newErrors.pin = 'pin code is required';
// //       isValid = false;
// //     } else if (!/^\d{6}$/.test(shippingForm.pin)) {
// //       newErrors.pin = 'Invalid pin (6 digits required)';
// //       isValid = false;
// //     }

// //     // Country validation
// //     if (!shippingForm.country.trim()) {
// //       newErrors.country = 'Country is required';
// //       isValid = false;
// //     }

// //     setErrors(newErrors);
// //     return isValid;
// //   };

// //   const handleApplyCoupon = async () => {
// //     const code = couponCode.trim().toUpperCase();
// //     setCouponError(''); // Reset error message before applying

// //     try {
// //       // Fetch coupon data from the API
// //       const response = await campaignService.search(code); // Assuming search returns an array
// //       const coupon = response[0];  // Get the first matching coupon (if any)
// //       if (!coupon) {
// //         setCouponError('Invalid coupon code');
// //         setDiscount(0);
// //         return;
// //       }

// //       // Validate coupon based on active status and dates
// //       const currentDate = new Date();
// //       const startDate = new Date(coupon.startDate);
// //       const endDate = new Date(coupon.endDate);

// //       if (!coupon.active) {
// //         setCouponError('This coupon is no longer active');
// //         setDiscount(0);
// //         return;
// //       }

// //       if (currentDate < startDate || currentDate > endDate) {
// //         setCouponError('Coupon code has expired');
// //         setDiscount(0);
// //         return;
// //       }

// //       // Apply the discount if validation is successful
// //       setDiscount(coupon.discount / 100);
// //       setCouponError(''); // Clear any previous error
      
// //       setValidCoupon(code); // Save the valid coupon code in state
// //       setValidCouponId(coupon._id);
// //       localStorage.setItem('validCoupon', code); // Save the valid coupon code
// //       alert(`Coupon applied! Discount: ${coupon.discount}%`);
// //     } catch (error) {
// //       setCouponError('Failed to validate coupon');
// //       setDiscount(0);
// //     }
// //   };

// //   const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setCouponCode(e.target.value);
// //     const savedCoupon = localStorage.getItem('validCoupon');
// //     if (savedCoupon && e.target.value.trim().toUpperCase() === savedCoupon) {
// //       setCouponError(''); // Clear any error if the saved coupon is re-entered
// //       setDiscount(validCoupon ? discount : 0); // Reapply the discount if the valid coupon is re-entered
// //     } else if (validCoupon) {
// //       setCouponError('Invalid coupon code, reapplying the last valid coupon');
// //       setCouponCode(validCoupon);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       {/* Header */}
// //       <header className="bg-white py-4 shadow-sm">
// //         <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
// //           <div className="flex items-center gap-2">
// //             {/* <img src="/logo.png" alt="Store Logo" className="h-8" /> Add your logo */}
// //             <h1 className="text-xl font-semibold">Checkout</h1>
// //           </div>
// //           <Link to="/cart" className="flex items-center text-gray-600 hover:text-black">
// //             <ChevronLeft size={18} /> Back to Cart
// //           </Link>
// //         </div>
// //       </header>

// //       {/* Progress Bar */}
// //       <div className="max-w-5xl mx-auto px-4 py-4">
// //         <div className="flex justify-between text-sm font-medium text-gray-500">
// //           <span className={isSubmitted ? "text-indigo-600" : "text-gray-800"}>Shipping</span>
// //           <span className={isSubmitted ? "text-gray-800" : "text-gray-400"}>Payment</span>
// //           <span className="text-gray-400">Confirmation</span>
// //         </div>
// //         <div className="h-1 bg-gray-200 mt-2 rounded-full">
// //           <div className={`h-full bg-indigo-600 rounded-full ${isSubmitted ? "w-1/2" : "w-1/4"}`}></div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <main className="max-w-5xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
// //         <div className="lg:w-2/3">
// //           <ShippingForm
// //             onSubmit={(e) => {/* unchanged */}}
// //             initialValues={shippingForm}
// //             isSubmitted={isSubmitted}
// //             setIsSubmitted={setIsSubmitted}
// //             isEditing={isEditing}
// //             setIsEditing={setIsEditing}
// //           />
// //           {isSubmitted && (
// //             <PaymentHandler
// //               shippingForm={shippingForm}
// //               state={state}
// //               discount={discount}
// //               tax={tax}
// //               total={total}
// //               validCouponId={validCouponId}
// //               validateForm={validateForm}
// //               setErrors={setErrors}
// //             />
// //           )}
// //         </div>
// //         <div className="lg:w-1/3 lg:sticky lg:top-4">
// //           <OrderSummary
// //             items={state.items}
// //             subtotal={state.subtotal}
// //             discount={discount}
// //             taxRate={TAX_RATE}
// //             couponCode={couponCode}
// //             couponError={couponError}
// //             validCoupon={validCoupon}
// //             isSubmitted={isSubmitted}
// //             onApplyCoupon={handleApplyCoupon}
// //             onCouponChange={handleCouponChange}
// //             setCouponCode={setCouponCode}
          
// //                         setDiscount={setDiscount}
// //                         setCouponError={setCouponError}
// //                         setValidCoupon={setValidCoupon}
// //                         applyAttemptCount={applyAttemptCount}
// //                         setApplyAttemptCount={setApplyAttemptCount}
// //                         disableCouponApply={disableCouponApply}
// //                         setDisableCouponApply={setDisableCouponApply}
// //                         rateLimitMessage={rateLimitMessage}
// //                         setRateLimitMessage={setRateLimitMessage}
// //                         onOrderSubmit={() => setIsSubmitted(true)} // Set isSubmitted to true when order is submitted
// //                       />
// //         </div>
// //       </main>
// //     </div>
// //   );

// // }
