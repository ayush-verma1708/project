import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OrderConfirmation from '../../components/OrderConfirmation';

interface OrderDetails {
  items: any[];
  total: number;
  shippingForm: any;
  orderId: string;
  checkoutId: string;
}

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Find the order details in localStorage
    const storedOrders = Object.keys(localStorage)
      .filter(key => key.startsWith('orderDetails_'))
      .map(key => {
        const details = localStorage.getItem(key);
        return details ? JSON.parse(details) : null;
      })
      .filter(details => details && details.orderId === orderId);

    if (storedOrders.length > 0) {
      setOrderDetails(storedOrders[0]);
    } else {
      setError('Order not found. Please check your order ID or contact support.');
    }
  }, [orderId]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-md text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-md text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <OrderConfirmation
        orderId={orderDetails.orderId}
        items={orderDetails.items}
        total={orderDetails.total}
        shippingForm={orderDetails.shippingForm}
      />
    </div>
  );
} 