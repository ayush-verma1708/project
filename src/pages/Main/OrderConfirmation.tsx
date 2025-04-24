import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { orderService } from '../../api/services/orders';
import { Order } from '../../api/types';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = orderId || searchParams.get('token');
      if (!token) {
        setError('Order ID is missing');
        setIsLoading(false);
        return;
      }

      try {
        const orderData = await orderService.getById(token);
        setOrder(orderData);
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-md text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-sm text-gray-600 mb-4">{error || 'Order not found'}</p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 text-green-600 mb-6">
            <CheckCircle size={24} />
            <h1 className="text-2xl font-semibold">Order Confirmed</h1>
          </div>

          <div className="mb-8">
            <p className="text-gray-600 mb-2">Order ID: {order._id}</p>
            <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="space-y-6">
            {/* Order Items */}
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.products.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0">
                    <img
                      src={item.product.images?.[0] || 'https://via.placeholder.com/64'}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/64')}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.product.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.extraInfo?.model && `Model: ${item.extraInfo.model}`}
                        {item.extraInfo?.brand && ` | Brand: ${item.extraInfo.brand}`}
                      </p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{order.subtotal.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">₹{order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium">{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{order.shippingInfo.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-medium">{order.shippingInfo.phone}</p>
                </div>
                <div>
                  <p className="text-gray-600">Address</p>
                  <p className="font-medium">
                    {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pin}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
            {/* <Link
              to="/orders"
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View All Orders
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
} 