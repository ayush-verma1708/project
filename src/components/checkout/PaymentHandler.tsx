import { useEffect, useState } from 'react';
import { razorpayService } from '../../api/services/razorpayService';
import { motion } from 'framer-motion';
import { Lock, AlertCircle } from 'lucide-react';

interface PaymentHandlerProps {
  shippingForm: any;
  state: any;
  discount: number;
  tax: number;
  total: number;
  validCouponId: string;
  validateForm: () => boolean;
  setErrors: (errors: any) => void;
  onPaymentSuccess: (paymentId: string) => void;
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
      const razorpayOrder = await razorpayService.createOrder(Math.round(total), 'INR');
      console.log('Razorpay Order Response:', razorpayOrder);
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
        name: 'Mobiiwrap',
        description: 'Order Payment',
        order_id: razorpayOrder.razorpayOrderId,
        handler: async (response: any) => {
          console.log('Razorpay payment response:', response);
          const paymentData = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          
          const orderDetails = {
            user: {
              firstName: shippingForm.firstName,
              lastName: shippingForm.lastName,
              email: shippingForm.email,
              phone: shippingForm.phone,
            },
            products: state.items.map((item: any) => ({
              product: item._id,
              quantity: item.quantity,
              price: item.price,
              extraInfo: {
                model: item.selectedModel,
                brand: item.selectedBrand,
              },
            })),
            shippingInfo: {
              ...shippingForm,
              customerNote: shippingForm.customerNote
            },
            coupon: validCouponId ? {
              _id: validCouponId,
              code: validCouponId,
              discount: discount * 100
            } : undefined,
            subtotal: state.subtotal,
            discount: discount * 100,
            tax: tax,
            total: total,
            paymentMethod: 'Online',
            paymentStatus: 'Completed',
          };
          
          try {
            const verifyResponse = await razorpayService.verifyPayment(paymentData, orderDetails);
            console.log('Verification response:', verifyResponse);
            if (verifyResponse.success) {
              console.log('Payment verification successful');
              onPaymentSuccess(verifyResponse.orderId);
            } else {
              console.error('Payment verification failed:', verifyResponse);
              setPaymentError('Payment verification failed. Contact support if charged.');
              onPaymentError('Payment verification failed.');
            }
          } catch (error: any) {
            console.error('Payment verification error details:', error?.response?.data || error);
            setPaymentError(error?.response?.data?.message || error.message || 'Payment verification error. Contact support if charged.');
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

      rzp.on('payment.failed', (response: any) => {
        setPaymentError('Payment failed. Please try again or use a different method.');
        onPaymentError('Payment failed.');
        setIsProcessing(false);
      });

      rzp.on('payment.error', (response: any) => {
        setPaymentError('An error occurred during payment. Please try again.');
        onPaymentError('Payment error.');
        setIsProcessing(false);
      });

      rzp.on('modal.closed', () => {
        console.log("modal closed");
        setPaymentError('Payment cancelled. Please try again to complete your order.');
        onPaymentError('Payment cancelled.');
        setIsProcessing(false);
      });

      rzp.open();

      // Fallback timeout to ensure isProcessing resets if no events fire
      setTimeout(() => {
        if (isProcessing && !rzp.isPaymentCompleted) {
          setPaymentError('Payment cancelled or timed out. Please try again.');
          onPaymentError('Payment cancelled or timed out.');
          setIsProcessing(false);
        }
      }, 60000); // 60-second timeout

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
            <span>Discount</span>
            <span>-₹{(state.subtotal * discount).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 my-2"></div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={handleOrderSubmission}
        disabled={isProcessing}
        className={`mt-6 w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
          isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </motion.div>
  );
};

export default PaymentHandler;
