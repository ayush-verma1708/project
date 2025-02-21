import apiClient from '../client';

export const razorpayService = {
  // Step 1: Create Razorpay order by calling the backend
  createOrder: async (amount: number, currency = 'INR') => {
    try {
      const { data } = await apiClient.post('/payments/create-order', { amount, currency });
      return data;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new Error('Failed to create Razorpay order. Please try again.');
    }
  },

  // Step 2: Verify payment after Razorpay callback
  verifyPayment: async (paymentData: any, orderDetails: any) => {
    try {
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

      const { data } = await apiClient.post('/payments/verify-payment', {
        ...paymentData,
        orderDetails: sanitizedOrderDetails,
      });

      return data;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw new Error('Payment verification failed. Please contact support.');
    }
  },
};
