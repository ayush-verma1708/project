// // src/components/OrderConfirmation.tsx
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { CheckCircle, Package, Truck, CreditCard, MapPin, Calendar } from 'lucide-react';
// import { Link, useSearchParams } from 'react-router-dom';
// import { FeedbackForm } from './Feedback/FeedbackForm';
// import { orderService } from '../api/services/orders';
// import { Order } from '../api/types';
// import { LoadingSpinner } from './Loading/LoadingSpinner';

// const OrderConfirmation: React.FC = () => {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get('token');
//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       if (!token) {
//         setError('Invalid order token');
//         setLoading(false);
//         return;
//       }

//       try {
//         const orderData = await orderService.getByToken(token);
//         setOrder(orderData);
//       } catch (err: any) {
//         setError(err?.response?.data?.message || 'Failed to fetch order details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [token]);

//   if (loading) {
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
//         <motion.div
//           className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
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
//                 <p className="text-sm text-gray-600">
//                   {order.shippingInfo.firstName} {order.shippingInfo.lastName}
//                 </p>
//                 <p className="text-sm text-gray-600">{order.shippingInfo.address}</p>
//                 <p className="text-sm text-gray-600">
//                   {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.pin}
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
//               {order.products.map((item) => (
//                 <div key={item._id} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0">
//                   <img
//                     src={item.product.images?.[0] || 'https://via.placeholder.com/64'}
//                     alt={item.product.name}
//                     className="w-16 h-16 object-cover rounded-md"
//                     onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/64')}
//                   />
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-800">{item.product.name}</p>
//                     <p className="text-xs text-gray-500">
//                       {item.extraInfo?.model && `Model: ${item.extraInfo.model}`}
//                       {item.extraInfo?.brand && ` | Brand: ${item.extraInfo.brand}`}
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
//                 <span className="text-gray-900">₹{order.subtotal.toFixed(2)}</span>
//               </div>
//               {order.discount > 0 && (
//                 <div className="flex justify-between text-sm text-green-600">
//                   <span>Discount</span>
//                   <span>-₹{order.discount.toFixed(2)}</span>
//                 </div>
//               )}
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Tax</span>
//                 <span className="text-gray-900">₹{order.tax.toFixed(2)}</span>
//               </div>
//               <div className="border-t border-gray-200 my-2"></div>
//               <div className="flex justify-between font-medium">
//                 <span className="text-gray-900">Total</span>
//                 <span className="text-gray-900">₹{order.total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           <Link
//             to="/"
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors mb-6"
//           >
//             Back to Home
//           </Link>
//         </motion.div>

//         {/* Feedback Form */}
//         <FeedbackForm />
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;



