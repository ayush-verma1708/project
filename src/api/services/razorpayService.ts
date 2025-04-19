import apiClient from '../client';

export const razorpayService = {
  // Step 1: Create Razorpay order by calling the backend
  createOrder: async (amount: number, currency = 'INR') => {
    try {
      console.log('Creating Razorpay order with:', { amount, currency });
      const { data } = await apiClient.post('/payments/create-order', { amount, currency });
      console.log('Razorpay order created:', data);
      return data;
    } catch (error: any) {
      console.error('Error creating Razorpay order:', error?.response?.data || error);
      throw new Error(error?.response?.data?.message || 'Failed to create Razorpay order. Please try again.');
    }
  },

  // Step 2: Verify payment after Razorpay callback
  verifyPayment: async (paymentData: any, orderDetails: any) => {
    try {
      console.log('Verifying payment with data:', { paymentData });
      // Create a new object to avoid circular references
      const sanitizedOrderDetails = {
        user: orderDetails.user,
        products: orderDetails.products,
        shippingInfo: orderDetails.shippingInfo,
        coupon: orderDetails.coupon,
        subtotal: orderDetails.subtotal,
        discount: orderDetails.discount,
        tax: orderDetails.tax,
        total: orderDetails.total,
        paymentMethod: orderDetails.paymentMethod,
        paymentStatus: orderDetails.paymentStatus,
      };
      console.log('Sanitized order details:', sanitizedOrderDetails);

      const { data } = await apiClient.post('/payments/verify-payment', {
        razorpayPaymentId: paymentData.razorpayPaymentId,
        razorpayOrderId: paymentData.razorpayOrderId,
        razorpaySignature: paymentData.razorpaySignature,
        orderDetails: sanitizedOrderDetails,
      });
      console.log('Payment verification response:', data);
      return data;
    } catch (error: any) {
      console.error('Payment verification error:', error?.response?.data || error);
      throw new Error(error?.response?.data?.message || 'Payment verification failed. Please contact support.');
    }
  },
};
