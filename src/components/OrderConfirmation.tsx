// src/components/OrderConfirmation.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FeedbackForm } from '../pages/FeedbackForm';

interface OrderConfirmationProps {
  orderId: string;
  items: any[];
  total: number;
  shippingForm: any;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId, items, total, shippingForm }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={24} className="text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Order Confirmed!</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Thank you for your purchase. Your order has been successfully placed.</p>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700">Order Tracking ID:</p>
            <p className="text-lg font-semibold text-gray-900">{orderId || 'N/A'}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-900 mb-2">Items Ordered</h3>
            <div className="space-y-4">
              {(items && items.length > 0) ? (
                items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0">
                    <img
                      src={item?.images?.[0] || 'https://via.placeholder.com/64'}
                      alt={item.name || 'Item'}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/64')}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.name || 'Unknown Item'}</p>
                      <p className="text-xs text-gray-500">
                        {item?.selectedModel && `Model: ${item.selectedModel}`}
                        {item?.selectedBrand && ` | Brand: ${item.selectedBrand}`}
                      </p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ₹{(item.price && item.quantity ? item.price * item.quantity : 0).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No items found.</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-900 mb-2">Amount Paid</h3>
            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{(total || 0).toFixed(2)}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-900 mb-2">Shipping To</h3>
            <p className="text-sm text-gray-600">
              {shippingForm?.firstName && shippingForm?.lastName
                ? `${shippingForm.firstName} ${shippingForm.lastName}`
                : 'N/A'}<br />
              {shippingForm?.address
                ? `${shippingForm.address}, ${shippingForm.apartment && `${shippingForm.apartment}, `}${shippingForm.city}, ${shippingForm.pin}`
                : 'Address not available'}<br />
              {shippingForm?.phone || 'Phone not available'}<br />
              {shippingForm?.email || 'Email not available'}
            </p>
          </div>

          <Link
            to="/"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors mb-6"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Feedback Form */}
        <FeedbackForm />
      </div>
    </div>
  );
};

export default OrderConfirmation;
// import React from 'react';
// import { motion } from 'framer-motion';
// import { CheckCircle } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { FeedbackForm } from '../pages/FeedbackForm';

// interface OrderConfirmationProps {
//   orderId: string;
//   items: any[];
//   total: number;
//   shippingForm: any;
// }

// const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId, items, total, shippingForm }) => {
//   return (
//     <motion.div
//       className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="flex items-center gap-2 mb-4">
//         <CheckCircle size={24} className="text-green-600" />
//         <h2 className="text-lg font-semibold text-gray-900">Order Confirmed!</h2>
//       </div>
//       <p className="text-sm text-gray-600 mb-4">Thank you for your purchase. Your order has been successfully placed.</p>

//       <div className="mb-6">
//         <p className="text-sm font-medium text-gray-700">Order Tracking ID:</p>
//         <p className="text-lg font-semibold text-gray-900">{orderId || 'N/A'}</p>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-md font-semibold text-gray-900 mb-2">Items Ordered</h3>
//         <div className="space-y-4">
//           {(items && items.length > 0) ? (
//             items.map((item) => (
//               <div key={item._id} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0">
//                 <img
//                   src={item?.images?.[0] || 'https://via.placeholder.com/64'}
//                   alt={item.name || 'Item'}
//                   className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
//                   onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/64')}
//                 />
//                 <div className="flex-1">
//                   <p className="text-sm font-medium text-gray-800">{item.name || 'Unknown Item'}</p>
//                   <p className="text-xs text-gray-500">
//                     {item?.selectedModel && `Model: ${item.selectedModel}`}
//                     {item?.selectedBrand && ` | Brand: ${item.selectedBrand}`}
//                   </p>
//                   <p className="text-xs text-gray-600">Qty: {item.quantity || 1}</p>
//                 </div>
//                 <p className="text-sm font-semibold text-gray-900">
//                   ₹{(item.price && item.quantity ? item.price * item.quantity : 0).toFixed(2)}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-600">No items found.</p>
//           )}
//         </div>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-md font-semibold text-gray-900 mb-2">Amount Paid</h3>
//         <div className="flex justify-between text-lg font-semibold text-gray-900">
//           <span>Total</span>
//           <span>₹{(total || 0).toFixed(2)}</span>
//         </div>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-md font-semibold text-gray-900 mb-2">Shipping To</h3>
//         <p className="text-sm text-gray-600">
//           {shippingForm?.firstName && shippingForm?.lastName
//             ? `${shippingForm.firstName} ${shippingForm.lastName}`
//             : 'N/A'}<br />
//           {shippingForm?.address
//             ? `${shippingForm.address}, ${shippingForm.apartment && `${shippingForm.apartment}, `}${shippingForm.city}, ${shippingForm.pin}`
//             : 'Address not available'}<br />
//           {shippingForm?.phone || 'Phone not available'}<br />
//           {shippingForm?.email || 'Email not available'}
//         </p>
//       </div>

//       <Link
//         to="/"
//         className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
//       >
//         Back to Home
//       </Link>
//     </motion.div>

    
//   );
// };

// export default OrderConfirmation;



// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { CheckCircle } from 'lucide-react';
// // import { Link } from 'react-router-dom';

// // interface OrderConfirmationProps {
// //   orderId: string;
// //   items: any[];
// //   total: number;
// //   shippingForm: any;
// // }

// // const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId, items, total, shippingForm }) => {
// //   return (
// //     <motion.div
// //       className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.3 }}
// //     >
// //       <div className="flex items-center gap-2 mb-4">
// //         <CheckCircle size={24} className="text-green-600" />
// //         <h2 className="text-lg font-semibold text-gray-900">Order Confirmed!</h2>
// //       </div>
// //       <p className="text-sm text-gray-600 mb-4">Thank you for your purchase. Your order has been successfully placed.</p>

// //       {/* Order Tracking ID */}
// //       <div className="mb-6">
// //         <p className="text-sm font-medium text-gray-700">Order Tracking ID:</p>
// //         <p className="text-lg font-semibold text-gray-900">{orderId}</p>
// //       </div>

// //       {/* Items Ordered */}
// //       <div className="mb-6">
// //         <h3 className="text-md font-semibold text-gray-900 mb-2">Items Ordered</h3>
// //         <div className="space-y-4">
// //           {items.map((item) => (
// //             <div key={item._id} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0">
// //               <img
// //                 src={item.images[0]}
// //                 alt={item.name}
// //                 className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
// //               />
// //               <div className="flex-1">
// //                 <p className="text-sm font-medium text-gray-800">{item.name}</p>
// //                 <p className="text-xs text-gray-500">
// //                   {item?.selectedModel && `Model: ${item.selectedModel}`}
// //                   {item?.selectedBrand && ` | Brand: ${item.selectedBrand}`}
// //                 </p>
// //                 <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
// //               </div>
// //               <p className="text-sm font-semibold text-gray-900">
// //                 ₹{(item.price * item.quantity).toFixed(2)}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Price Paid */}
// //       <div className="mb-6">
// //         <h3 className="text-md font-semibold text-gray-900 mb-2">Amount Paid</h3>
// //         <div className="flex justify-between text-lg font-semibold text-gray-900">
// //           <span>Total</span>
// //           <span>₹{total.toFixed(2)}</span>
// //         </div>
// //       </div>

// //       {/* Shipping Details */}
// //       <div className="mb-6">
// //         <h3 className="text-md font-semibold text-gray-900 mb-2">Shipping To</h3>
// //         <p className="text-sm text-gray-600">
// //           {shippingForm.firstName} {shippingForm.lastName}<br />
// //           {shippingForm.address}, {shippingForm.apartment && `${shippingForm.apartment}, `}{shippingForm.city}, {shippingForm.pin}<br />
// //           {shippingForm.phone}<br />
// //           {shippingForm.email}
// //         </p>
// //       </div>

// //       {/* Back to Home */}
// //       <Link
// //         to="/"
// //         className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
// //       >
// //         Back to Home
// //       </Link>
// //     </motion.div>
// //   );
// // };

// // export default OrderConfirmation;