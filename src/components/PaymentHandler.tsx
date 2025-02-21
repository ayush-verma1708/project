import { useEffect } from 'react';
import { razorpayService } from '../api/services/razorpayService';
import { orderService } from '../api/services/orders';
import { motion } from 'framer-motion';

interface PaymentHandlerProps {
  shippingForm: any;
  state: any;
  discount: number;
  tax: number;
  total: number;
  validCouponId: string;
  validateForm: () => boolean;
  setErrors: (errors: any) => void;
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
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleOrderSubmission = async (paymentMethod: 'Online' | 'COD') => {
    try {
      if (!validateForm()) {
        return;
      }

      // Prepare order details
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
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      };

      if (paymentMethod === 'COD') {
        const orderResponse = await orderService.create(orderData);
        if (orderResponse.success) {
          alert('Order placed successfully! Payment will be collected on delivery.');
        } else {
          alert('Failed to place order.');
        }
        return;
      }

      const razorpayOrder = await razorpayService.createOrder(Math.round(total), 'INR');
      if (!razorpayOrder || !razorpayOrder.razorpayOrderId) {
        alert('Failed to initiate payment.');
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
      rzp.on('payment.failed', (response: any) => {
        alert('Payment failed. Please try again.');
      });
      rzp.open();
    } catch (error) {
      console.error('Error processing order:', error);
      alert('An error occurred during checkout.');
    }
  };

  return (
    <div className="mt-4">
      <motion.button
        onClick={() => handleOrderSubmission('Online')}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-2"
        whileTap={{ scale: 0.95 }}
      >
        Pay Online
      </motion.button>
      <motion.button
        onClick={() => handleOrderSubmission('COD')}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 mt-2"
        whileTap={{ scale: 0.95 }}
      >
        Pay on Delivery
      </motion.button>
    </div>
  );
};

export default PaymentHandler;
