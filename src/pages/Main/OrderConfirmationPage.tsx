// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { orderService } from '../../api/services/orders';
// import { Order } from '../../api/types';
// import { CheckCircle, ArrowLeft, Package, Truck, CreditCard, MapPin, Calendar } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { LoadingSpinner } from '../../components/Loading/LoadingSpinner';

// export default function OrderConfirmationPage() {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState<Order | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       if (!orderId) {
//         setError('Order ID is missing');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const orderData = await orderService.getById(orderId);
//         setOrder(orderData);
//       } catch (err) {
//         setError('Failed to load order details');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (error || !order) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
//         <div className="max-w-4xl w-full mx-auto px-4">
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
//             <h2 className="text-lg font-semibold text-red-600 mb-4">Error</h2>
//             <p className="text-gray-600 mb-4">{error || 'Order not found'}</p>
//             <Link
//               to="/"
//               className="text-indigo-600 hover:text-indigo-700"
//             >
//               Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-4xl w-full mx-auto px-4">
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
//           <div className="flex items-center gap-2 mb-4">
//             <CheckCircle size={24} className="text-green-600" />
//             <h2 className="text-lg font-semibold text-gray-900">Order Confirmed!</h2>
//           </div>
//           <p className="text-sm text-gray-600 mb-6">Thank you for your purchase. Your order has been successfully placed.</p>

//           {/* Order Status Timeline */}
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <Package size={20} className="text-indigo-600" />
//                 <span className="text-sm font-medium">Order Placed</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Truck size={20} className="text-gray-400" />
//                 <span className="text-sm font-medium text-gray-500">Processing</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle size={20} className="text-gray-400" />
//                 <span className="text-sm font-medium text-gray-500">Delivered</span>
//               </div>
//             </div>
//             <div className="h-1 bg-gray-200 rounded-full">
//               <div className="h-full bg-indigo-600 rounded-full w-1/3"></div>
//             </div>
//           </div>

//           {/* Order Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <div className="flex items-center gap-2 mb-2">
//                 <CreditCard size={16} className="text-gray-500" />
//                 <h3 className="text-sm font-medium text-gray-700">Payment Details</h3>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-sm text-gray-600">Order ID: {order._id}</p>
//                 <p className="text-sm text-gray-600">Payment Method: {order.paymentMethod}</p>
//                 <p className="text-sm text-gray-600">Status: {order.paymentStatus}</p>
//                 <p className="text-sm text-gray-600">Amount: ₹{order.total.toFixed(2)}</p>
//               </div>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-lg">
//               <div className="flex items-center gap-2 mb-2">
//                 <MapPin size={16} className="text-gray-500" />
//                 <h3 className="text-sm font-medium text-gray-700">Shipping Details</h3>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-sm text-gray-600">{order.shippingInfo.name}</p>
//                 <p className="text-sm text-gray-600">{order.shippingInfo.address}</p>
//                 <p className="text-sm text-gray-600">
//                   {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
//                 </p>
//                 <p className="text-sm text-gray-600">Phone: {order.shippingInfo.phone}</p>
//                 <p className="text-sm text-gray-600">Email: {order.shippingInfo.email}</p>
//               </div>
//             </div>
//           </div>

//           {/* Order Items */}
//           <div className="mb-8">
//             <h3 className="text-md font-semibold text-gray-900 mb-4">Order Items</h3>
//             <div className="space-y-4">
//               {order.items.map((item) => (
//                 <div key={item._id} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0">
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-800">{item.name}</p>
//                     <p className="text-xs text-gray-500">
//                       {item.brand && `Brand: ${item.brand}`}
//                       {item.model && ` | Model: ${item.model}`}
//                     </p>
//                     <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
//                   </div>
//                   <p className="text-sm font-semibold text-gray-900">
//                     ₹{(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="bg-gray-50 p-4 rounded-lg mb-8">
//             <h3 className="text-md font-semibold text-gray-900 mb-4">Order Summary</h3>
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Subtotal</span>
//                 <span className="text-gray-900">₹{order.total.toFixed(2)}</span>
//               </div>
//               {order.coupon && (
//                 <div className="flex justify-between text-sm text-green-600">
//                   <span>Discount ({order.coupon.code})</span>
//                   <span>-₹{(order.total * (order.coupon.discount / 100)).toFixed(2)}</span>
//                 </div>
//               )}
//               <div className="border-t border-gray-200 my-2"></div>
//               <div className="flex justify-between font-medium">
//                 <span className="text-gray-900">Total</span>
//                 <span className="text-gray-900">₹{order.total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between items-center">
//             <Link
//               to="/"
//               className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
//             >
//               <ArrowLeft size={18} />
//               Back to Home
//             </Link>
//             <Link
//               to="/orders"
//               className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
//             >
//               View All Orders
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 