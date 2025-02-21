import { useEffect, useState } from 'react';
import { razorpayService } from '../api/services/razorpayService';
import { motion } from 'framer-motion';
import { CreditCard, Lock, AlertCircle } from 'lucide-react';

interface PaymentHandlerProps {
  shippingForm: any;
  state: any;
  discount: number;
  tax: number;
  total: number;
  validCouponId: string;
  validateForm: () => boolean;
  setErrors: (errors: any) => void;
  onPaymentSuccess: (orderId: string) => void;
  onPaymentError: (errorMsg: string) => void;
}

const PaymentHandler: React.FC<PaymentHandlerProps> = ({
  shippingForm,
  state,
  discount,
  tax,
  total,
  validCouponId,
  validateForm,
  setErrors,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => {
      setPaymentError('Failed to load payment gateway. Please check your connection and try again.');
      setIsScriptLoaded(false);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleOrderSubmission = async () => {
    setPaymentError(null);
    setIsProcessing(true);

    if (!validateForm()) {
      setIsProcessing(false);
      setPaymentError('Please fix shipping details before proceeding.');
      return;
    }

    if (!isScriptLoaded) {
      setPaymentError('Payment gateway not loaded. Please refresh and try again.');
      setIsProcessing(false);
      onPaymentError('Payment gateway not loaded.');
      return;
    }

    try {
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
        discount: discount * 100,
        tax: tax,
        total: total,
        paymentMethod: 'Online',
        paymentStatus: 'Pending',
      };

      const razorpayOrder = await razorpayService.createOrder(Math.round(total), 'INR');
      if (!razorpayOrder || !razorpayOrder.razorpayOrderId) {
        setPaymentError('Failed to create order. Please try again.');
        setIsProcessing(false);
        onPaymentError('Order creation failed.');
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Your Store Name',
        description: 'Order Payment',
        order_id: razorpayOrder.razorpayOrderId,
        handler: async (response: any) => {
          const paymentData = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          try {
            const verifyResponse = await razorpayService.verifyPayment(paymentData, orderData);
            if (verifyResponse.success) {
              onPaymentSuccess(razorpayOrder.razorpayOrderId);
            } else {
              setPaymentError('Payment verification failed. Contact support if charged.');
              onPaymentError('Payment verification failed.');
            }
          } catch (error) {
            setPaymentError('Payment verification error. Contact support if charged.');
            onPaymentError('Payment verification error.');
          }
          setIsProcessing(false);
        },
        prefill: {
          name: `${shippingForm.firstName} ${shippingForm.lastName}`,
          email: shippingForm.email,
          contact: shippingForm.phone,
        },
        theme: {
          color: '#4F46E5',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      // Track modal state explicitly
      let modalClosed = false;

      rzp.on('payment.failed', (response: any) => {
        setPaymentError('Payment failed. Please try again or use a different method.');
        onPaymentError('Payment failed.');
        setIsProcessing(false);
      });

      rzp.on('modal.closed', () => {
        modalClosed = true;
        if (!rzp.isPaymentCompleted) { // Custom flag to check if payment was completed
          setPaymentError('Payment cancelled. Please try again to complete your order.');
          onPaymentError('Payment cancelled.');
          setIsProcessing(false);
        }
      });

      // Open the modal and add a fallback timeout
      rzp.open();

      // Fallback: Reset isProcessing if modal doesn't trigger events within a reasonable time
      setTimeout(() => {
        if (modalClosed && !rzp.isPaymentCompleted && isProcessing) {
          setPaymentError('Payment cancelled or timed out. Please try again.');
          onPaymentError('Payment cancelled or timed out.');
          setIsProcessing(false);
        }
      }, 60000); // 60-second timeout

      // Custom flag to track payment completion (since Razorpay doesn't provide this directly)
      rzp.isPaymentCompleted = false;
      rzp.on('payment.success', () => {
        rzp.isPaymentCompleted = true;
      });
    } catch (error) {
      setPaymentError('An error occurred during checkout. Please try again.');
      onPaymentError('Checkout error.');
      setIsProcessing(false);
    }
  };

  return (
    <motion.div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Lock size={16} className="text-gray-500" />
        <h2 className="text-lg font-semibold">Payment (Online Only)</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">We accept secure online payments via Razorpay.</p>
      {paymentError && (
        <div className="flex items-center gap-2 text-red-500 text-sm mb-4">
          <AlertCircle size={16} />
          <span>{paymentError}</span>
        </div>
      )}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{state.subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Savings</span>
            <span>-₹{(state.subtotal * discount).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold mt-2">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      <motion.button
        onClick={handleOrderSubmission}
        className={`w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center ${
          isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
        }`}
        disabled={isProcessing}
        whileHover={{ scale: isProcessing ? 1 : 1.02 }}
        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
      >
        {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)} Now`}
      </motion.button>
      <p className="text-xs text-gray-500 mt-2 text-center">Secured by Razorpay</p>
    </motion.div>
  );
};

export default PaymentHandler;

// import { useEffect, useState } from 'react';
// import { razorpayService } from '../api/services/razorpayService';
// import { motion } from 'framer-motion';
// import { CreditCard, Lock, AlertCircle } from 'lucide-react';

// interface PaymentHandlerProps {
//   shippingForm: any;
//   state: any;
//   discount: number;
//   tax: number;
//   total: number;
//   validCouponId: string;
//   validateForm: () => boolean;
//   setErrors: (errors: any) => void;
//   onPaymentSuccess: (orderId: string) => void;
//   onPaymentError: (errorMsg: string) => void;
// }

// const PaymentHandler: React.FC<PaymentHandlerProps> = ({
//   shippingForm,
//   state,
//   discount,
//   tax,
//   total,
//   validCouponId,
//   validateForm,
//   setErrors,
//   onPaymentSuccess,
//   onPaymentError,
// }) => {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentError, setPaymentError] = useState<string | null>(null);
//   const [isScriptLoaded, setIsScriptLoaded] = useState(false);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     script.onload = () => setIsScriptLoaded(true);
//     script.onerror = () => {
//       setPaymentError('Failed to load payment gateway. Please check your connection and try again.');
//       setIsScriptLoaded(false);
//     };
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleOrderSubmission = async () => {
//     setPaymentError(null);
//     setIsProcessing(true);

//     if (!validateForm()) {
//       setIsProcessing(false);
//       setPaymentError('Please fix shipping details before proceeding.');
//       return;
//     }

//     if (!isScriptLoaded) {
//       setPaymentError('Payment gateway not loaded. Please refresh and try again.');
//       setIsProcessing(false);
//       onPaymentError('Payment gateway not loaded.');
//       return;
//     }

//     try {
//       const orderData = {
//         user: {
//           firstName: shippingForm.firstName,
//           lastName: shippingForm.lastName,
//           email: shippingForm.email,
//           phone: shippingForm.phone,
//         },
//         products: state.items.map(item => ({
//           product: item._id,
//           quantity: item.quantity,
//           price: item.price,
//           extraInfo: {
//             model: item.selectedModel,
//             brand: item.selectedBrand,
//           },
//         })),
//         shippingInfo: shippingForm,
//         coupon: validCouponId || undefined,
//         subtotal: state.subtotal,
//         discount: discount * 100,
//         tax: tax,
//         total: total,
//         paymentMethod: 'Online',
//         paymentStatus: 'Pending',
//       };

//       const razorpayOrder = await razorpayService.createOrder(Math.round(total), 'INR');
//       if (!razorpayOrder || !razorpayOrder.razorpayOrderId) {
//         setPaymentError('Failed to create order. Please try again.');
//         setIsProcessing(false);
//         onPaymentError('Order creation failed.');
//         return;
//       }

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: razorpayOrder.amount,
//         currency: razorpayOrder.currency,
//         name: 'Your Store Name',
//         description: 'Order Payment',
//         order_id: razorpayOrder.razorpayOrderId,
//         handler: async (response: any) => {
//           const paymentData = {
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//             razorpaySignature: response.razorpay_signature,
//           };
//           try {
//             const verifyResponse = await razorpayService.verifyPayment(paymentData, orderData);
//             if (verifyResponse.success) {
//               onPaymentSuccess(razorpayOrder.razorpayOrderId);
//             } else {
//               setPaymentError('Payment verification failed. Contact support if charged.');
//               onPaymentError('Payment verification failed.');
//             }
//           } catch (error) {
//             setPaymentError('Payment verification error. Contact support if charged.');
//             onPaymentError('Payment verification error.');
//           }
//           setIsProcessing(false); // Reset on success or verification error
//         },
//         prefill: {
//           name: `${shippingForm.firstName} ${shippingForm.lastName}`,
//           email: shippingForm.email,
//           contact: shippingForm.phone,
//         },
//         theme: {
//           color: '#4F46E5',
//         },
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.on('payment.failed', (response: any) => {
//         setPaymentError('Payment failed. Please try again or use a different method.');
//         onPaymentError('Payment failed.');
//         setIsProcessing(false); // Reset on payment failure
//       });
//       rzp.on('modal.closed', () => {
//         setPaymentError('Payment cancelled. Please try again to complete your order.');
//         onPaymentError('Payment cancelled.');
//         setIsProcessing(false); // Reset when modal is closed without payment
//       });
//       rzp.open();
//     } catch (error) {
//       setPaymentError('An error occurred during checkout. Please try again.');
//       onPaymentError('Checkout error.');
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <motion.div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//       <div className="flex items-center gap-2 mb-4">
//         <Lock size={16} className="text-gray-500" />
//         <h2 className="text-lg font-semibold">Payment (Online Only)</h2>
//       </div>
//       <p className="text-sm text-gray-600 mb-4">We accept secure online payments via Razorpay.</p>
//       {paymentError && (
//         <div className="flex items-center gap-2 text-red-500 text-sm mb-4">
//           <AlertCircle size={16} />
//           <span>{paymentError}</span>
//         </div>
//       )}
//       <div className="space-y-2">
//         <div className="flex justify-between text-sm">
//           <span>Subtotal</span>
//           <span>₹{state.subtotal.toFixed(2)}</span>
//         </div>
//         {discount > 0 && (
//           <div className="flex justify-between text-sm text-green-600">
//             <span>Savings</span>
//             <span>-₹{(state.subtotal * discount).toFixed(2)}</span>
//           </div>
//         )}
//         <div className="flex justify-between text-sm">
//           <span>Tax</span>
//           <span>₹{tax.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-lg font-semibold mt-2">
//           <span>Total</span>
//           <span>₹{total.toFixed(2)}</span>
//         </div>
//       </div>
//       <motion.button
//         onClick={handleOrderSubmission}
//         className={`w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center ${
//           isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
//         }`}
//         disabled={isProcessing}
//         whileHover={{ scale: isProcessing ? 1 : 1.02 }}
//         whileTap={{ scale: isProcessing ? 1 : 0.98 }}
//       >
//         {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)} Now`}
//       </motion.button>
//       <p className="text-xs text-gray-500 mt-2 text-center">Secured by Razorpay</p>
//     </motion.div>
//   );
// };

// export default PaymentHandler;
// // import { useEffect, useState } from 'react';
// // import { razorpayService } from '../api/services/razorpayService';
// // import { motion } from 'framer-motion';
// // import { CreditCard, Lock, AlertCircle } from 'lucide-react';

// // interface PaymentHandlerProps {
// //   shippingForm: any;
// //   state: any;
// //   discount: number;
// //   tax: number;
// //   total: number;
// //   validCouponId: string;
// //   validateForm: () => boolean;
// //   setErrors: (errors: any) => void;
// //   onPaymentSuccess: (orderId: string) => void;
// //   onPaymentError: (errorMsg: string) => void;
// // }

// // const PaymentHandler: React.FC<PaymentHandlerProps> = ({
// //   shippingForm,
// //   state,
// //   discount,
// //   tax,
// //   total,
// //   validCouponId,
// //   validateForm,
// //   setErrors,
// //   onPaymentSuccess,
// //   onPaymentError,
// // }) => {
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [paymentError, setPaymentError] = useState<string | null>(null);
// //   const [isScriptLoaded, setIsScriptLoaded] = useState(false);

// //   useEffect(() => {
// //     const script = document.createElement('script');
// //     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// //     script.async = true;
// //     script.onload = () => setIsScriptLoaded(true);
// //     script.onerror = () => {
// //       setPaymentError('Failed to load payment gateway. Please check your connection and try again.');
// //       setIsScriptLoaded(false);
// //     };
// //     document.body.appendChild(script);
// //     return () => {
// //       document.body.removeChild(script);
// //     };
// //   }, []);

// //   const handleOrderSubmission = async () => {
// //     setPaymentError(null);
// //     setIsProcessing(true);

// //     if (!validateForm()) {
// //       setIsProcessing(false);
// //       setPaymentError('Please fix shipping details before proceeding.');
// //       return;
// //     }

// //     if (!isScriptLoaded) {
// //       setPaymentError('Payment gateway not loaded. Please refresh and try again.');
// //       setIsProcessing(false);
// //       onPaymentError('Payment gateway not loaded.');
// //       return;
// //     }

// //     try {
// //       const orderData = {
// //         user: {
// //           firstName: shippingForm.firstName,
// //           lastName: shippingForm.lastName,
// //           email: shippingForm.email,
// //           phone: shippingForm.phone,
// //         },
// //         products: state.items.map(item => ({
// //           product: item._id,
// //           quantity: item.quantity,
// //           price: item.price,
// //           extraInfo: {
// //             model: item.selectedModel,
// //             brand: item.selectedBrand,
// //           },
// //         })),
// //         shippingInfo: shippingForm,
// //         coupon: validCouponId || undefined,
// //         subtotal: state.subtotal,
// //         discount: discount * 100,
// //         tax: tax,
// //         total: total,
// //         paymentMethod: 'Online',
// //         paymentStatus: 'Pending',
// //       };

// //       const razorpayOrder = await razorpayService.createOrder(Math.round(total), 'INR');
// //       if (!razorpayOrder || !razorpayOrder.razorpayOrderId) {
// //         setPaymentError('Failed to create order. Please try again.');
// //         setIsProcessing(false);
// //         onPaymentError('Order creation failed.');
// //         return;
// //       }

// //       const options = {
// //         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// //         amount: razorpayOrder.amount,
// //         currency: razorpayOrder.currency,
// //         name: 'Your Store Name',
// //         description: 'Order Payment',
// //         order_id: razorpayOrder.razorpayOrderId,
// //         handler: async (response: any) => {
// //           const paymentData = {
// //             razorpayPaymentId: response.razorpay_payment_id,
// //             razorpayOrderId: response.razorpay_order_id,
// //             razorpaySignature: response.razorpay_signature,
// //           };
// //           try {
// //             const verifyResponse = await razorpayService.verifyPayment(paymentData, orderData);
// //             if (verifyResponse.success) {
// //               onPaymentSuccess(razorpayOrder.razorpayOrderId);
// //             } else {
// //               setPaymentError('Payment verification failed. Contact support if charged.');
// //               onPaymentError('Payment verification failed.');
// //             }
// //           } catch (error) {
// //             setPaymentError('Payment verification error. Contact support if charged.');
// //             onPaymentError('Payment verification error.');
// //           }
// //           setIsProcessing(false);
// //         },
// //         prefill: {
// //           name: `${shippingForm.firstName} ${shippingForm.lastName}`,
// //           email: shippingForm.email,
// //           contact: shippingForm.phone,
// //         },
// //         theme: {
// //           color: '#4F46E5',
// //         },
// //       };

// //       const rzp = new (window as any).Razorpay(options);
// //       rzp.on('payment.failed', (response: any) => {
// //         setPaymentError('Payment failed. Please try again or use a different method.');
// //         onPaymentError('Payment failed.');
// //         setIsProcessing(false);
// //       });
// //       rzp.on('modal.closed', () => {
// //         setPaymentError('Payment cancelled. Please try again to complete your order.');
// //         onPaymentError('Payment cancelled.');
// //         setIsProcessing(false);
// //       });
// //       rzp.open();
// //     } catch (error) {
// //       setPaymentError('An error occurred during checkout. Please try again.');
// //       onPaymentError('Checkout error.');
// //       setIsProcessing(false);
// //     }
// //   };

// //   return (
// //     <motion.div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// //       <div className="flex items-center gap-2 mb-4">
// //         <Lock size={16} className="text-gray-500" />
// //         <h2 className="text-lg font-semibold">Payment (Online Only)</h2>
// //       </div>
// //       <p className="text-sm text-gray-600 mb-4">We accept secure online payments via Razorpay.</p>
// //       {paymentError && (
// //         <div className="flex items-center gap-2 text-red-500 text-sm mb-4">
// //           <AlertCircle size={16} />
// //           <span>{paymentError}</span>
// //         </div>
// //       )}
// //       <div className="space-y-2">
// //         <div className="flex justify-between text-sm">
// //           <span>Subtotal</span>
// //           <span>₹{state.subtotal.toFixed(2)}</span>
// //         </div>
// //         {discount > 0 && (
// //           <div className="flex justify-between text-sm text-green-600">
// //             <span>Savings</span>
// //             <span>-₹{(state.subtotal * discount).toFixed(2)}</span>
// //           </div>
// //         )}
// //         <div className="flex justify-between text-sm">
// //           <span>Tax</span>
// //           <span>₹{tax.toFixed(2)}</span>
// //         </div>
// //         <div className="flex justify-between text-lg font-semibold mt-2">
// //           <span>Total</span>
// //           <span>₹{total.toFixed(2)}</span>
// //         </div>
// //       </div>
// //       <motion.button
// //         onClick={handleOrderSubmission}
// //         className={`w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center ${
// //           isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
// //         }`}
// //         disabled={isProcessing}
// //         whileHover={{ scale: isProcessing ? 1 : 1.02 }}
// //         whileTap={{ scale: isProcessing ? 1 : 0.98 }}
// //       >
// //         {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)} Now`}
// //       </motion.button>
// //       <p className="text-xs text-gray-500 mt-2 text-center">Secured by Razorpay</p>
// //     </motion.div>
// //   );
// // };

// // export default PaymentHandler;
// // // import { useEffect, useState } from 'react';
// // // import { razorpayService } from '../api/services/razorpayService';
// // // import { motion } from 'framer-motion';
// // // import { CreditCard, Lock } from 'lucide-react';

// // // interface PaymentHandlerProps {
// // //   shippingForm: any;
// // //   state: any;
// // //   discount: number;
// // //   tax: number;
// // //   total: number;
// // //   validCouponId: string;
// // //   validateForm: () => boolean;
// // //   setErrors: (errors: any) => void;
// // //   onPaymentSuccess: (orderId: string) => void; // New callback
// // // }

// // // const PaymentHandler: React.FC<PaymentHandlerProps> = ({
// // //   shippingForm,
// // //   state,
// // //   discount,
// // //   tax,
// // //   total,
// // //   validCouponId,
// // //   validateForm,
// // //   setErrors,
// // //   onPaymentSuccess,
// // // }) => {
// // //   const [isProcessing, setIsProcessing] = useState(false);

// // //   useEffect(() => {
// // //     const script = document.createElement('script');
// // //     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// // //     script.async = true;
// // //     document.body.appendChild(script);
// // //     return () => {
// // //       document.body.removeChild(script);
// // //     };
// // //   }, []);

// // //   const handleOrderSubmission = async () => {
// // //     try {
// // //       setIsProcessing(true);
// // //       if (!validateForm()) {
// // //         setIsProcessing(false);
// // //         return;
// // //       }

// // //       const orderData = {
// // //         user: {
// // //           firstName: shippingForm.firstName,
// // //           lastName: shippingForm.lastName,
// // //           email: shippingForm.email,
// // //           phone: shippingForm.phone,
// // //         },
// // //         products: state.items.map(item => ({
// // //           product: item._id,
// // //           quantity: item.quantity,
// // //           price: item.price,
// // //           extraInfo: {
// // //             model: item.selectedModel,
// // //             brand: item.selectedBrand,
// // //           },
// // //         })),
// // //         shippingInfo: shippingForm,
// // //         coupon: validCouponId || undefined,
// // //         subtotal: state.subtotal,
// // //         discount: discount * 100,
// // //         tax: tax,
// // //         total: total,
// // //         paymentMethod: 'Online',
// // //         paymentStatus: 'Pending',
// // //       };

// // //       const razorpayOrder = await razorpayService.createOrder(Math.round(total), 'INR');
// // //       if (!razorpayOrder || !razorpayOrder.razorpayOrderId) {
// // //         alert('Failed to initiate payment.');
// // //         setIsProcessing(false);
// // //         return;
// // //       }

// // //       const options = {
// // //         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// // //         amount: razorpayOrder.amount,
// // //         currency: razorpayOrder.currency,
// // //         name: 'Your Store Name',
// // //         description: 'Order Payment',
// // //         order_id: razorpayOrder.razorpayOrderId,
// // //         handler: async (response: any) => {
// // //           const paymentData = {
// // //             razorpayPaymentId: response.razorpay_payment_id,
// // //             razorpayOrderId: response.razorpay_order_id,
// // //             razorpaySignature: response.razorpay_signature,
// // //           };

// // //           try {
// // //             const verifyResponse = await razorpayService.verifyPayment(paymentData, orderData);
// // //             if (verifyResponse.success) {
// // //               alert('Payment successful! Order placed.');
// // //               onPaymentSuccess(razorpayOrder.razorpayOrderId); // Pass order ID to parent
// // //             } else {
// // //               alert('Payment verification failed.');
// // //             }
// // //           } catch (error) {
// // //             console.error('Payment verification error:', error);
// // //             alert('Payment verification failed. Please contact support.');
// // //           }
// // //           setIsProcessing(false);
// // //         },
// // //         prefill: {
// // //           name: `${shippingForm.firstName} ${shippingForm.lastName}`,
// // //           email: shippingForm.email,
// // //           contact: shippingForm.phone,
// // //         },
// // //         theme: {
// // //           color: '#4F46E5',
// // //         },
// // //       };

// // //       const rzp = new (window as any).Razorpay(options);
// // //       rzp.on('payment.failed', (response: any) => {
// // //         alert('Payment failed. Please try again.');
// // //         setIsProcessing(false);
// // //       });
// // //       rzp.open();
// // //     } catch (error) {
// // //       console.error('Error processing order:', error);
// // //       alert('An error occurred during checkout.');
// // //       setIsProcessing(false);
// // //     }
// // //   };

// // //   return (
// // //     <motion.div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // //       <div className="flex items-center gap-2 mb-4">
// // //         <Lock size={16} className="text-gray-500" />
// // //         <h2 className="text-lg font-semibold">Payment (Online Only)</h2>
// // //       </div>
// // //       <p className="text-sm text-gray-600 mb-4">We accept secure online payments via Razorpay.</p>
// // //       <div className="space-y-2">
// // //         <div className="flex justify-between text-sm">
// // //           <span>Subtotal</span>
// // //           <span>₹{state.subtotal.toFixed(2)}</span>
// // //         </div>
// // //         {discount > 0 && (
// // //           <div className="flex justify-between text-sm text-green-600">
// // //             <span>Savings</span>
// // //             <span>-₹{(state.subtotal * discount).toFixed(2)}</span>
// // //           </div>
// // //         )}
// // //         <div className="flex justify-between text-sm">
// // //           <span>Tax</span>
// // //           <span>₹{tax.toFixed(2)}</span>
// // //         </div>
// // //         <div className="flex justify-between text-lg font-semibold mt-2">
// // //           <span>Total</span>
// // //           <span>₹{total.toFixed(2)}</span>
// // //         </div>
// // //       </div>
// // //       <motion.button
// // //         onClick={handleOrderSubmission}
// // //         className={`w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center ${
// // //           isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
// // //         }`}
// // //         disabled={isProcessing}
// // //         whileHover={{ scale: isProcessing ? 1 : 1.02 }}
// // //         whileTap={{ scale: isProcessing ? 1 : 0.98 }}
// // //       >
// // //         {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)} Now`}
// // //       </motion.button>
// // //       <p className="text-xs text-gray-500 mt-2 text-center">Secured by Razorpay</p>
// // //     </motion.div>
// // //   );
// // // };

// // // export default PaymentHandler;
// // // // import { useEffect, useState } from 'react';
// // // // import { razorpayService } from '../api/services/razorpayService';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { CreditCard, Lock, ArrowRight } from 'lucide-react';

// // // // interface PaymentHandlerProps {
// // // //   shippingForm: any;
// // // //   state: any;
// // // //   discount: number;
// // // //   tax: number;
// // // //   total: number;
// // // //   validCouponId: string;
// // // //   validateForm: () => boolean;
// // // //   setErrors: (errors: any) => void;
// // // // }

// // // // const PaymentHandler: React.FC<PaymentHandlerProps> = ({
// // // //   shippingForm,
// // // //   state,
// // // //   discount,
// // // //   tax,
// // // //   total,
// // // //   validCouponId,
// // // //   validateForm,
// // // //   setErrors,
// // // // }) => {
// // // //   const [isExpanded, setIsExpanded] = useState(false);
// // // //   const [isProcessing, setIsProcessing] = useState(false);

// // // //   useEffect(() => {
// // // //     const script = document.createElement('script');
// // // //     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// // // //     script.async = true;
// // // //     document.body.appendChild(script);
// // // //     return () => {
// // // //       document.body.removeChild(script);
// // // //     };
// // // //   }, []);

// // // //   const handleOrderSubmission = async () => {
// // // //     try {
// // // //       setIsProcessing(true);
// // // //       if (!validateForm()) {
// // // //         setIsProcessing(false);
// // // //         return;
// // // //       }

// // // //       // Prepare order details
// // // //       const orderData = {
// // // //         user: {
// // // //           firstName: shippingForm.firstName,
// // // //           lastName: shippingForm.lastName,
// // // //           email: shippingForm.email,
// // // //           phone: shippingForm.phone,
// // // //         },
// // // //         products: state.items.map(item => ({
// // // //           product: item._id,
// // // //           quantity: item.quantity,
// // // //           price: item.price,
// // // //           extraInfo: {
// // // //             model: item.selectedModel,
// // // //             brand: item.selectedBrand,
// // // //           },
// // // //         })),
// // // //         shippingInfo: shippingForm,
// // // //         coupon: validCouponId || undefined,
// // // //         subtotal: state.subtotal,
// // // //         discount: discount * 100,
// // // //         tax: tax,
// // // //         total: total,
// // // //         paymentMethod: 'Online',
// // // //         paymentStatus: 'Pending',
// // // //       };

// // // //       const razorpayOrder = await razorpayService.createOrder(Math.round(total), 'INR');
// // // //       if (!razorpayOrder || !razorpayOrder.razorpayOrderId) {
// // // //         alert('Failed to initiate payment.');
// // // //         setIsProcessing(false);
// // // //         return;
// // // //       }

// // // //       const options = {
// // // //         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// // // //         amount: razorpayOrder.amount,
// // // //         currency: razorpayOrder.currency,
// // // //         name: 'Your Store Name',
// // // //         description: 'Order Payment',
// // // //         order_id: razorpayOrder.razorpayOrderId,
// // // //         handler: async (response: any) => {
// // // //           const paymentData = {
// // // //             razorpayPaymentId: response.razorpay_payment_id,
// // // //             razorpayOrderId: response.razorpay_order_id,
// // // //             razorpaySignature: response.razorpay_signature,
// // // //           };

// // // //           try {
// // // //             const verifyResponse = await razorpayService.verifyPayment(paymentData, orderData);
// // // //             if (verifyResponse.success) {
// // // //               alert('Payment successful! Order placed.');
// // // //             } else {
// // // //               alert('Payment verification failed.');
// // // //             }
// // // //           } catch (error) {
// // // //             console.error('Payment verification error:', error);
// // // //             alert('Payment verification failed. Please contact support.');
// // // //           }
// // // //           setIsProcessing(false);
// // // //         },
// // // //         prefill: {
// // // //           name: `${shippingForm.firstName} ${shippingForm.lastName}`,
// // // //           email: shippingForm.email,
// // // //           contact: shippingForm.phone,
// // // //         },
// // // //         theme: {
// // // //           color: '#4F46E5',
// // // //         },
// // // //       };

// // // //       const rzp = new (window as any).Razorpay(options);
// // // //       rzp.on('payment.failed', (response: any) => {
// // // //         alert('Payment failed. Please try again.');
// // // //         setIsProcessing(false);
// // // //       });
// // // //       rzp.open();
// // // //     } catch (error) {
// // // //       console.error('Error processing order:', error);
// // // //       alert('An error occurred during checkout.');
// // // //       setIsProcessing(false);
// // // //     }
// // // //   };

// // // // //   return (
// // // // //     <div className="mt-4">
// // // // //       <div className="bg-indigo-50 rounded-lg p-4 mb-4">
// // // // //         <div className="flex items-center text-indigo-700">
// // // // //           <Lock className="w-5 h-5 mr-2" />
// // // // //           <span className="text-sm font-medium">Secure Online Payment Only</span>
// // // // //         </div>
// // // // //       </div>

// // // // //       <motion.div
// // // // //         className="relative"
// // // // //         initial={false}
// // // // //         animate={isExpanded ? "expanded" : "collapsed"}
// // // // //       >
// // // // //         <motion.button
// // // // //           onClick={() => !isProcessing && setIsExpanded(!isExpanded)}
// // // // //           className={`w-full bg-indigo-600 text-white py-4 px-6 rounded-xl flex items-center justify-between ${isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
// // // // //           whileHover={!isProcessing ? { scale: 1.02 } : {}}
// // // // //           whileTap={!isProcessing ? { scale: 0.98 } : {}}
// // // // //           disabled={isProcessing}
// // // // //         >
// // // // //           <div className="flex items-center">
// // // // //             <CreditCard className="w-6 h-6 mr-3" />
// // // // //             <span className="font-medium">Pay ₹{total.toFixed(2)}</span>
// // // // //           </div>
// // // // //           <motion.div
// // // // //             animate={isExpanded ? { rotate: 90 } : { rotate: 0 }}
// // // // //             transition={{ duration: 0.3 }}
// // // // //           >
// // // // //             <ArrowRight className="w-6 h-6" />
// // // // //           </motion.div>
// // // // //         </motion.button>

// // // // //         <AnimatePresence>
// // // // //           {isExpanded && (
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, height: 0 }}
// // // // //               animate={{ opacity: 1, height: 'auto' }}
// // // // //               exit={{ opacity: 0, height: 0 }}
// // // // //               transition={{ duration: 0.3 }}
// // // // //               className="mt-4"
// // // // //             >
// // // // //               <div className="bg-white border border-indigo-100 rounded-xl p-4">
// // // // //                 <div className="space-y-4">
// // // // //                   <div className="flex justify-between text-sm">
// // // // //                     <span className="text-gray-600">Subtotal</span>
// // // // //                     <span className="font-medium">₹{state.subtotal.toFixed(2)}</span>
// // // // //                   </div>
// // // // //                   {discount > 0 && (
// // // // //                     <div className="flex justify-between text-sm">
// // // // //                       <span className="text-gray-600">Discount</span>
// // // // //                       <span className="font-medium text-green-600">-₹{(discount * 100).toFixed(2)}</span>
// // // // //                     </div>
// // // // //                   )}
// // // // //                   <div className="flex justify-between text-sm">
// // // // //                     <span className="text-gray-600">Tax</span>
// // // // //                     <span className="font-medium">₹{tax.toFixed(2)}</span>
// // // // //                   </div>
// // // // //                   <div className="pt-4 border-t">
// // // // //                     <div className="flex justify-between">
// // // // //                       <span className="font-medium">Total</span>
// // // // //                       <span className="font-bold">₹{total.toFixed(2)}</span>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <motion.button
// // // // //                     onClick={handleOrderSubmission}
// // // // //                     className={`w-full bg-indigo-600 text-white py-3 rounded-lg mt-4 flex items-center justify-center ${isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
// // // // //                     whileHover={!isProcessing ? { scale: 1.02 } : {}}
// // // // //                     whileTap={!isProcessing ? { scale: 0.98 } : {}}
// // // // //                     disabled={isProcessing}
// // // // //                   >
// // // // //                     {isProcessing ? (
// // // // //                       <div className="flex items-center">
// // // // //                         <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
// // // // //                         Processing...
// // // // //                       </div>
// // // // //                     ) : (
// // // // //                       'Proceed to Pay Securely'
// // // // //                     )}
// // // // //                   </motion.button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           )}
// // // // //         </AnimatePresence>
// // // // //       </motion.div>
// // // // //     </div>
// // // // //   );

// // // // return (
// // // //     <motion.div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // // //       <div className="flex items-center gap-2 mb-4">
// // // //         <Lock size={16} className="text-gray-500" />
// // // //         <h2 className="text-lg font-semibold">Payment (Online Only)</h2>
// // // //       </div>
// // // //       <p className="text-sm text-gray-600 mb-4">We accept secure online payments via Razorpay.</p>
// // // //       <div className="space-y-2">
// // // //         <div className="flex justify-between text-sm">
// // // //           <span>Subtotal</span>
// // // //           <span>₹{state.subtotal.toFixed(2)}</span>
// // // //         </div>
// // // //         {discount > 0 && (
// // // //           <div className="flex justify-between text-sm text-green-600">
// // // //             <span>Discount</span>
// // // //             <span>-₹{(state.subtotal * discount).toFixed(2)}</span>
// // // //           </div>
// // // //         )}
// // // //         <div className="flex justify-between text-sm">
// // // //           <span>Tax</span>
// // // //           <span>₹{tax.toFixed(2)}</span>
// // // //         </div>
// // // //         <div className="flex justify-between text-lg font-semibold mt-2">
// // // //           <span>Total</span>
// // // //           <span>₹{total.toFixed(2)}</span>
// // // //         </div>
// // // //       </div>
// // // //       <motion.button
// // // //         onClick={handleOrderSubmission}
// // // //         className={`w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
// // // //         disabled={isProcessing}
// // // //         whileHover={{ scale: isProcessing ? 1 : 1.02 }}
// // // //         whileTap={{ scale: isProcessing ? 1 : 0.98 }}
// // // //       >
// // // //         {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)} Now`}
// // // //       </motion.button>
// // // //       <p className="text-xs text-gray-500 mt-2 text-center">Secured by Razorpay</p>
// // // //     </motion.div>
// // // //   );
// // // // };

// // // // export default PaymentHandler;

// // // // // import { useEffect } from 'react';
// // // // // import { razorpayService } from '../api/services/razorpayService';
// // // // // import { orderService } from '../api/services/orders';
// // // // // import { motion } from 'framer-motion';

// // // // // interface PaymentHandlerProps {
// // // // //   shippingForm: any;
// // // // //   state: any;
// // // // //   discount: number;
// // // // //   tax: number;
// // // // //   total: number;
// // // // //   validCouponId: string;
// // // // //   validateForm: () => boolean;
// // // // //   setErrors: (errors: any) => void;
// // // // // }

// // // // // const PaymentHandler: React.FC<PaymentHandlerProps> = ({
// // // // //   shippingForm,
// // // // //   state,
// // // // //   discount,
// // // // //   tax,
// // // // //   total,
// // // // //   validCouponId,
// // // // //   validateForm,
// // // // //   setErrors,
// // // // // }) => {
// // // // //   useEffect(() => {
// // // // //     const script = document.createElement('script');
// // // // //     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// // // // //     script.async = true;
// // // // //     document.body.appendChild(script);
// // // // //     return () => {
// // // // //       document.body.removeChild(script);
// // // // //     };
// // // // //   }, []);

// // // // //   const handleOrderSubmission = async (paymentMethod: 'Online' | 'COD') => {
// // // // //     try {
// // // // //       if (!validateForm()) {
// // // // //         return;
// // // // //       }

// // // // //       // Prepare order details
// // // // //       const orderData = {
// // // // //         user: {
// // // // //           firstName: shippingForm.firstName,
// // // // //           lastName: shippingForm.lastName,
// // // // //           email: shippingForm.email,
// // // // //           phone: shippingForm.phone,
// // // // //         },
// // // // //         products: state.items.map(item => ({
// // // // //           product: item._id,
// // // // //           quantity: item.quantity,
// // // // //           price: item.price,
// // // // //           extraInfo: {
// // // // //             model: item.selectedModel,
// // // // //             brand: item.selectedBrand,
// // // // //           },
// // // // //         })),
// // // // //         shippingInfo: shippingForm,
// // // // //         coupon: validCouponId || undefined,
// // // // //         subtotal: state.subtotal,
// // // // //         discount: discount * 100,
// // // // //         tax: tax,
// // // // //         total: total,
// // // // //         paymentMethod: paymentMethod,
// // // // //         paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
// // // // //       };

// // // // //       if (paymentMethod === 'COD') {
// // // // //         const orderResponse = await orderService.create(orderData);
// // // // //         if (orderResponse.success) {
// // // // //           alert('Order placed successfully! Payment will be collected on delivery.');
// // // // //         } else {
// // // // //           alert('Failed to place order.');
// // // // //         }
// // // // //         return;
// // // // //       }

// // // // //       const razorpayOrder = await razorpayService.createOrder(Math.round(total), 'INR');
// // // // //       if (!razorpayOrder || !razorpayOrder.razorpayOrderId) {
// // // // //         alert('Failed to initiate payment.');
// // // // //         return;
// // // // //       }

// // // // //       const options = {
// // // // //         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// // // // //         amount: razorpayOrder.amount,
// // // // //         currency: razorpayOrder.currency,
// // // // //         name: 'Your Store Name',
// // // // //         description: 'Order Payment',
// // // // //         order_id: razorpayOrder.razorpayOrderId,
// // // // //         handler: async (response: any) => {
// // // // //           const paymentData = {
// // // // //             razorpayPaymentId: response.razorpay_payment_id,
// // // // //             razorpayOrderId: response.razorpay_order_id,
// // // // //             razorpaySignature: response.razorpay_signature,
// // // // //           };

// // // // //           try {
// // // // //             const verifyResponse = await razorpayService.verifyPayment(paymentData, orderData);
// // // // //             if (verifyResponse.success) {
// // // // //               alert('Payment successful! Order placed.');
// // // // //             } else {
// // // // //               alert('Payment verification failed.');
// // // // //             }
// // // // //           } catch (error) {
// // // // //             console.error('Payment verification error:', error);
// // // // //             alert('Payment verification failed. Please contact support.');
// // // // //           }
// // // // //         },
// // // // //         prefill: {
// // // // //           name: `${shippingForm.firstName} ${shippingForm.lastName}`,
// // // // //           email: shippingForm.email,
// // // // //           contact: shippingForm.phone,
// // // // //         },
// // // // //         theme: {
// // // // //           color: '#3399cc',
// // // // //         },
// // // // //       };

// // // // //       const rzp = new (window as any).Razorpay(options);
// // // // //       rzp.on('payment.failed', (response: any) => {
// // // // //         alert('Payment failed. Please try again.');
// // // // //       });
// // // // //       rzp.open();
// // // // //     } catch (error) {
// // // // //       console.error('Error processing order:', error);
// // // // //       alert('An error occurred during checkout.');
// // // // //     }
// // // // //   };

  
// // // // // //   return (
// // // // // //     <div className="mt-4">
// // // // // //       <motion.button
// // // // // //         onClick={() => handleOrderSubmission('Online')}
// // // // // //         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-black-700 mt-2"
// // // // // //         whileTap={{ scale: 0.95 }}
// // // // // //         whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
// // // // // //       >
// // // // // //        Proceed to Payment
// // // // // //       </motion.button>
// // // // // //       {/* <motion.button
// // // // // //         onClick={() => handleOrderSubmission('COD')}
// // // // // //         className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 mt-2"
// // // // // //         whileTap={{ scale: 0.95 }}
// // // // // //       >
// // // // // //         Pay on Delivery
// // // // // //       </motion.button> */}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default PaymentHandler;
