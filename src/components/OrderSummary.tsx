import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderSummaryProps {
  items: any[];
  subtotal: number;
  discount: number;
  taxRate: number;
  couponCode: string;
  couponError: string;
  validCoupon: string;
  isSubmitted: boolean;
  onApplyCoupon: () => void;
  onCouponChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCouponCode: (value: string) => void;
  setDiscount: (value: number) => void;
  setCouponError: (value: string) => void;
  setValidCoupon: (value: string) => void;
  applyAttemptCount: number;
  setApplyAttemptCount: (value: number) => void;
  disableCouponApply: boolean;
  setDisableCouponApply: (value: boolean) => void;
  rateLimitMessage: string;
  setRateLimitMessage: (value: string) => void;
  onOrderSubmit: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  discount,
  taxRate,
  couponCode,
  couponError,
  validCoupon,
  isSubmitted,
  onApplyCoupon,
  onCouponChange,
  setCouponCode,
  setDiscount,
  setCouponError,
  setValidCoupon,
  applyAttemptCount,
  setApplyAttemptCount,
  disableCouponApply,
  setDisableCouponApply,
  rateLimitMessage,
  setRateLimitMessage,
  onOrderSubmit,
}) => {
  const discountedSubtotal = subtotal * (1 - discount);
  const tax = discountedSubtotal * taxRate;
  const total = discountedSubtotal + tax;
  const savings = subtotal * discount;

  const [isCouponExpanded, setIsCouponExpanded] = useState(false);
  const [couponHistory, setCouponHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('couponHistory');
    if (storedHistory) {
      setCouponHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (applyAttemptCount > 3) {
      setRateLimitMessage('Too many attempts! Please wait 10 minutes.');
      setDisableCouponApply(true);
      setTimeout(() => {
        setDisableCouponApply(false);
        setRateLimitMessage('');
        setApplyAttemptCount(0);
      }, 600000);
    }
  }, [applyAttemptCount, setApplyAttemptCount, setDisableCouponApply, setRateLimitMessage]);

  useEffect(() => {
    if (validCoupon) {
      setCouponHistory(prevHistory => {
        const newHistory = [...new Set([validCoupon, ...prevHistory])].slice(0, 5);
        localStorage.setItem('couponHistory', JSON.stringify(newHistory));
        return newHistory;
      });
    }
  }, [validCoupon]);

  const handleCouponInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCouponCode = e.target.value;
    setCouponCode(newCouponCode);
    setValidCoupon('');
    localStorage.removeItem('validCoupon');
    setDiscount(0);
    setCouponError('');
    onCouponChange(e);
  };

  const handleApplyCouponClick = () => {
    if (!disableCouponApply) {
      setApplyAttemptCount(prevCount => prevCount + 1);
      onApplyCoupon();
    }
  };

  const handleCouponHistoryClick = (code: string) => {
    setCouponCode(code);
    setCouponError('');
    setIsCouponExpanded(true);
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0"
          >
            <img
              src={item.images[0] || 'https://via.placeholder.com/64'}
              alt={item.name}
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
        ))}
      </div>
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => setIsCouponExpanded(!isCouponExpanded)}
          className="w-full text-left text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center justify-between"
        >
          <span>Have a promo code?</span>
          <span>{isCouponExpanded ? '−' : '+'}</span>
        </button>
        <AnimatePresence>
          {isCouponExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 space-y-2"
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={handleCouponInputChange}
                  placeholder="Enter promo code"
                  className="w-full sm:flex-1 p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={handleApplyCouponClick}
                  disabled={disableCouponApply}
                  className={`w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                    disableCouponApply ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-red-500 text-xs">{couponError}</p>}
              {rateLimitMessage && <p className="text-yellow-600 text-xs">{rateLimitMessage}</p>}
              {couponHistory.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-700">Recent Codes:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {couponHistory.map((code) => (
                      <button
                        key={code}
                        onClick={() => handleCouponHistoryClick(code)}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <AnimatePresence>
            {discount > 0 && (
              <motion.div
                className="flex justify-between text-green-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span>Savings</span>
                <span>-₹{savings.toFixed(2)}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-between">
            <span>Tax ({taxRate * 100}%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between mt-4 text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface OrderSummaryProps {
//   items: any[];
//   subtotal: number;
//   discount: number;
//   taxRate: number;
//   couponCode: string;
//   couponError: string;
//   validCoupon: string;
//   isSubmitted: boolean;
//   onApplyCoupon: () => void;
//   onCouponChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   setCouponCode: (value: string) => void;
//   setDiscount: (value: number) => void;
//   setCouponError: (value: string) => void;
//   setValidCoupon: (value: string) => void;
//   applyAttemptCount: number;
//   setApplyAttemptCount: (value: number) => void;
//   disableCouponApply: boolean;
//   setDisableCouponApply: (value: boolean) => void;
//   rateLimitMessage: string;
//   setRateLimitMessage: (value: string) => void;
//   onOrderSubmit: () => void;
// }

// const OrderSummary: React.FC<OrderSummaryProps> = ({
//   items,
//   subtotal,
//   discount,
//   taxRate,
//   couponCode,
//   couponError,
//   validCoupon,
//   isSubmitted,
//   onApplyCoupon,
//   onCouponChange,
//   setCouponCode,
//   setDiscount,
//   setCouponError,
//   setValidCoupon,
//   applyAttemptCount,
//   setApplyAttemptCount,
//   disableCouponApply,
//   setDisableCouponApply,
//   rateLimitMessage,
//   setRateLimitMessage,
//   onOrderSubmit,
// }) => {
//   const discountedSubtotal = subtotal * (1 - discount);
//   const tax = discountedSubtotal * taxRate;
//   const total = discountedSubtotal + tax;
//   const savings = subtotal * discount;

//   const [isCouponExpanded, setIsCouponExpanded] = useState(false);
//   const [couponHistory, setCouponHistory] = useState<string[]>([]);

//   useEffect(() => {
//     const storedHistory = localStorage.getItem('couponHistory');
//     if (storedHistory) {
//       setCouponHistory(JSON.parse(storedHistory));
//     }
//   }, []);

//   useEffect(() => {
//     if (applyAttemptCount > 3) {
//       setRateLimitMessage('Whoa there, coupon ninja! Too many tries... chill for 10 minutes!');
//       setDisableCouponApply(true);
//       setTimeout(() => {
//         setDisableCouponApply(false);
//         setRateLimitMessage('');
//         setApplyAttemptCount(0);
//       }, 600000);
//     }
//   }, [applyAttemptCount, setApplyAttemptCount, setDisableCouponApply, setRateLimitMessage]);

//   useEffect(() => {
//     if (validCoupon) {
//       setCouponHistory(prevHistory => {
//         const newHistory = [...new Set([validCoupon, ...prevHistory])].slice(0, 5);
//         localStorage.setItem('couponHistory', JSON.stringify(newHistory));
//         return newHistory;
//       });
//     }
//   }, [validCoupon]);

//   const handleCouponInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newCouponCode = e.target.value;
//     setCouponCode(newCouponCode);
//     setValidCoupon('');
//     localStorage.removeItem('validCoupon');
//     setDiscount(0);
//     setCouponError('');
//     onCouponChange(e);
//   };

//   const handleApplyCouponClick = () => {
//     if (!disableCouponApply) {
//       setApplyAttemptCount(prevCount => prevCount + 1);
//       onApplyCoupon();
//     }
//   };

//   const handleCouponHistoryClick = (code: string) => {
//     setCouponCode(code);
//     setCouponError('');
//     setIsCouponExpanded(true);
//   };

//   return (
//     <motion.div
//       className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
//       <div className="space-y-4 mb-6">
//         {items.map((item) => (
//           <div
//             key={item._id}
//             className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0"
//           >
//             <img
//               src={item.images[0]}
//               alt={item.name}
//               className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
//             />
//             <div className="flex-1">
//               <p className="text-sm font-medium text-gray-800">{item.name}</p>
//               <p className="text-xs text-gray-500">
//                 {item?.selectedModel && `Model: ${item.selectedModel}`}
//                 {item?.selectedBrand && ` | Brand: ${item.selectedBrand}`}
//               </p>
//               <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
//             </div>
//             <p className="text-sm font-semibold text-gray-900">
//               ₹{(item.price * item.quantity).toFixed(2)}
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="border-t border-gray-200 pt-4">
//         <button
//           onClick={() => setIsCouponExpanded(!isCouponExpanded)}
//           className="w-full text-left text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center justify-between"
//         >
//           <span>Have a promo code?</span>
//           <span>{isCouponExpanded ? '−' : '+'}</span>
//         </button>
//         <AnimatePresence>
//           {isCouponExpanded && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.2 }}
//               className="mt-2 space-y-2"
//             >
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <input
//                   type="text"
//                   value={couponCode}
//                   onChange={handleCouponInputChange}
//                   placeholder="Enter promo code"
//                   className="w-full sm:flex-1 p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//                 <button
//                   onClick={handleApplyCouponClick}
//                   disabled={disableCouponApply}
//                   className={`w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
//                     disableCouponApply ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   Apply
//                 </button>
//               </div>
//               {couponError && <p className="text-red-500 text-xs">{couponError}</p>}
//               {rateLimitMessage && <p className="text-yellow-600 text-xs">{rateLimitMessage}</p>}
//               {couponHistory.length > 0 && (
//                 <div>
//                   <p className="text-xs font-medium text-gray-700">Recent Codes:</p>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {couponHistory.map((code) => (
//                       <button
//                         key={code}
//                         onClick={() => handleCouponHistoryClick(code)}
//                         className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
//                       >
//                         {code}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//       <div className="mt-6 pt-4 border-t border-gray-200">
//         <div className="space-y-2 text-sm text-gray-600">
//           <div className="flex justify-between">
//             <span>Subtotal</span>
//             <span>₹{subtotal.toFixed(2)}</span>
//           </div>
//           <AnimatePresence>
//             {discount > 0 && (
//               <motion.div
//                 className="flex justify-between text-green-600"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <span>Savings</span>
//                 <span>-₹{savings.toFixed(2)}</span>
//               </motion.div>
//             )}
//           </AnimatePresence>
//           <div className="flex justify-between">
//             <span>Tax ({taxRate * 100}%)</span>
//             <span>₹{tax.toFixed(2)}</span>
//           </div>
//         </div>
//         <div className="flex justify-between mt-4 text-lg font-semibold text-gray-900">
//           <span>Total</span>
//           <span>₹{total.toFixed(2)}</span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default OrderSummary;
// // import React, { useState, useEffect } from 'react';
// // import { ChevronRight } from 'lucide-react';
// // import { motion, AnimatePresence } from 'framer-motion';

// // interface OrderSummaryProps {
// //   items: any[];
// //   subtotal: number;
// //   discount: number;
// //   taxRate: number;
// //   couponCode: string;
// //   couponError: string;
// //   validCoupon: string;
// //   isSubmitted: boolean;
// //   onApplyCoupon: () => void;
// //   onCouponChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// //   setCouponCode: (value: string) => void;
// //   setDiscount: (value: number) => void;
// //   setCouponError: (value: string) => void;
// //   setValidCoupon: (value: string) => void;
// //   applyAttemptCount: number;
// //   setApplyAttemptCount: (value: number) => void;
// //   disableCouponApply: boolean;
// //   setDisableCouponApply: (value: boolean) => void;
// //   rateLimitMessage: string;
// //   setRateLimitMessage: (value: string) => void;
// //   onOrderSubmit: () => void;
// // }

// // const OrderSummary: React.FC<OrderSummaryProps> = ({
// //   items,
// //   subtotal,
// //   discount,
// //   taxRate,
// //   couponCode,
// //   couponError,
// //   validCoupon,
// //   isSubmitted,
// //   onApplyCoupon,
// //   onCouponChange,
// //   setCouponCode,
// //   setDiscount,
// //   setCouponError,
// //   setValidCoupon,
// //   applyAttemptCount,
// //   setApplyAttemptCount,
// //   disableCouponApply,
// //   setDisableCouponApply,
// //   rateLimitMessage,
// //   setRateLimitMessage,
// //   onOrderSubmit,
// // }) => {
// //   const discountedSubtotal = subtotal * (1 - discount);
// //   const tax = discountedSubtotal * taxRate;
// //   const total = discountedSubtotal + tax;
// //   const savings = subtotal * discount;

// //   const [isCouponExpanded, setIsCouponExpanded] = useState(false);
// //   const [couponHistory, setCouponHistory] = useState<string[]>([]);

// //   useEffect(() => {
// //     const storedHistory = localStorage.getItem('couponHistory');
// //     if (storedHistory) {
// //       setCouponHistory(JSON.parse(storedHistory));
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (applyAttemptCount > 3) {
// //       setRateLimitMessage('Whoa there, coupon ninja! Too many tries... chill for 10 minutes!');
// //       setDisableCouponApply(true);
// //       setTimeout(() => {
// //         setDisableCouponApply(false);
// //         setRateLimitMessage('');
// //         setApplyAttemptCount(0);
// //       }, 600000); // 10 minutes
// //     }
// //   }, [applyAttemptCount, setApplyAttemptCount, setDisableCouponApply, setRateLimitMessage]);

// //   useEffect(() => {
// //     if (validCoupon) {
// //       setCouponHistory(prevHistory => {
// //         const newHistory = [...new Set([validCoupon, ...prevHistory])].slice(0, 5);
// //         localStorage.setItem('couponHistory', JSON.stringify(newHistory));
// //         return newHistory;
// //       });
// //     }
// //   }, [validCoupon]);

// //   const handleCouponInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const newCouponCode = e.target.value;
// //     setCouponCode(newCouponCode);
// //     setValidCoupon('');
// //     localStorage.removeItem('validCoupon');
// //     setDiscount(0);
// //     setCouponError('');
// //     onCouponChange(e);
// //   };

// //   const handleApplyCouponClick = () => {
// //     if (!disableCouponApply) {
// //       setApplyAttemptCount(prevCount => prevCount + 1);
// //       onApplyCoupon();
// //     }
// //   };

// //   const handleCouponHistoryClick = (code: string) => {
// //     setCouponCode(code);
// //     setCouponError('');
// //     setIsCouponExpanded(true);
// //   };

// //   return (
// //     <motion.div
// //       className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.3 }}
// //     >
// //       {/* Header */}
// //       <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

// //       {/* Items List */}
// //       <div className="space-y-4 mb-6">
// //         {items.map((item) => (
// //           <div
// //             key={item._id}
// //             className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0"
// //           >
// //             <img
// //               src={item.images[0]}
// //               alt={item.name}
// //               className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
// //             />
// //             <div className="flex-1">
// //               <p className="text-sm font-medium text-gray-800">{item.name}</p>
// //               <p className="text-xs text-gray-500">
// //                 {item?.selectedModel && `Model: ${item.selectedModel}`}
// //                 {item?.selectedBrand && ` | Brand: ${item.selectedBrand}`}
// //               </p>
// //               <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
// //             </div>
// //             <p className="text-sm font-semibold text-gray-900">
// //               ₹{(item.price * item.quantity).toFixed(2)}
// //             </p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Coupon Section */}
// //       <div className="border-t border-gray-200 pt-4">
// //         <button
// //           onClick={() => setIsCouponExpanded(!isCouponExpanded)}
// //           className="w-full text-left text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center justify-between"
// //         >
// //           <span>Have a promo code?</span>
// //           <span>{isCouponExpanded ? '−' : '+'}</span>
// //         </button>
// //         <AnimatePresence>
// //           {isCouponExpanded && (
// //             <motion.div
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: 'auto' }}
// //               exit={{ opacity: 0, height: 0 }}
// //               transition={{ duration: 0.2 }}
// //               className="mt-2 space-y-2"
// //             >
// //               <div className="flex flex-col sm:flex-row gap-2">
// //                 <input
// //                   type="text"
// //                   value={couponCode}
// //                   onChange={handleCouponInputChange}
// //                   placeholder="Enter promo code"
// //                   className="w-full sm:flex-1 p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
// //                 />
// //                 <button
// //                   onClick={handleApplyCouponClick}
// //                   disabled={disableCouponApply}
// //                   className={`w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
// //                     disableCouponApply ? 'opacity-50 cursor-not-allowed' : ''
// //                   }`}
// //                 >
// //                   Apply
// //                 </button>
// //               </div>
// //               {couponError && (
// //                 <p className="text-red-500 text-xs">{couponError}</p>
// //               )}
// //               {rateLimitMessage && (
// //                 <p className="text-yellow-600 text-xs">{rateLimitMessage}</p>
// //               )}
// //               {couponHistory.length > 0 && (
// //                 <div>
// //                   <p className="text-xs font-medium text-gray-700">Recent Codes:</p>
// //                   <div className="flex flex-wrap gap-2 mt-1">
// //                     {couponHistory.map((code) => (
// //                       <button
// //                         key={code}
// //                         onClick={() => handleCouponHistoryClick(code)}
// //                         className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
// //                       >
// //                         {code}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </div>

// //       {/* Price Breakdown */}
// //       <div className="mt-6 pt-4 border-t border-gray-200">
// //         <div className="space-y-2 text-sm text-gray-600">
// //           <div className="flex justify-between">
// //             <span>Subtotal</span>
// //             <span>₹{subtotal.toFixed(2)}</span>
// //           </div>
// //           <AnimatePresence>
// //             {discount > 0 && (
// //               <motion.div
// //                 className="flex justify-between text-green-600"
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 exit={{ opacity: 0 }}
// //               >
// //                 <span>Savings</span>
// //                 <span>-₹{savings.toFixed(2)}</span>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //           <div className="flex justify-between">
// //             <span>Tax ({taxRate * 100}%)</span>
// //             <span>₹{tax.toFixed(2)}</span>
// //           </div>
// //         </div>
// //         <div className="flex justify-between mt-4 text-lg font-semibold text-gray-900">
// //           <span>Total</span>
// //           <span>₹{total.toFixed(2)}</span>
// //         </div>
// //       </div>

    
// //     </motion.div>
// //   );
// // };

// // export default OrderSummary;



// // // import React, { useState, useEffect } from 'react';
// // // import { ChevronRight } from 'lucide-react';
// // // import { motion, AnimatePresence } from 'framer-motion';

// // // interface OrderSummaryProps {
// // //   items: any[];
// // //   subtotal: number;
// // //   discount: number;
// // //   taxRate: number;
// // //   couponCode: string;
// // //   couponError: string;
// // //   validCoupon: string;
// // //   isSubmitted: boolean;
// // //   onApplyCoupon: () => void;
// // //   onCouponChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // //   setCouponCode: (value: string) => void;
// // //   setDiscount: (value: number) => void;
// // //   setCouponError: (value: string) => void;
// // //   setValidCoupon: (value: string) => void;
// // //   applyAttemptCount: number;
// // //   setApplyAttemptCount: (value: number) => void;
// // //   disableCouponApply: boolean;
// // //   setDisableCouponApply: (value: boolean) => void;
// // //   rateLimitMessage: string;
// // //   setRateLimitMessage: (value: string) => void;
// // //   onOrderSubmit: () => void;
// // // }

// // // const OrderSummary: React.FC<OrderSummaryProps> = ({
// // //   items,
// // //   subtotal,
// // //   discount,
// // //   taxRate,
// // //   couponCode,
// // //   couponError,
// // //   validCoupon,
// // //   isSubmitted,
// // //   onApplyCoupon,
// // //   onCouponChange,
// // //   setCouponCode,
// // //   setDiscount,
// // //   setCouponError,
// // //   setValidCoupon,
// // //   applyAttemptCount,
// // //   setApplyAttemptCount,
// // //   disableCouponApply,
// // //   setDisableCouponApply,
// // //   rateLimitMessage,
// // //   setRateLimitMessage,
// // //   onOrderSubmit,
// // // }) => {
// // //   const discountedSubtotal = subtotal * (1 - discount);
// // //   const tax = discountedSubtotal * taxRate;
// // //   const total = discountedSubtotal + tax;
// // //   const savings = subtotal * discount; // Calculate savings for display

// // //   const [isCouponExpanded, setIsCouponExpanded] = useState(false); // Toggle coupon section
// // //   const [couponHistory, setCouponHistory] = useState<string[]>([]);

// // //   // Load coupon history from localStorage
// // //   useEffect(() => {
// // //     const storedHistory = localStorage.getItem('couponHistory');
// // //     if (storedHistory) {
// // //       setCouponHistory(JSON.parse(storedHistory));
// // //     }
// // //   }, []);

// // //   // Handle rate limiting for coupon attempts
// // //   useEffect(() => {
// // //     if (applyAttemptCount > 3) {
// // //       setRateLimitMessage('Whoa there, coupon ninja! Too many tries... chill for 10 minutes!');
// // //       setDisableCouponApply(true);
// // //       setTimeout(() => {
// // //         setDisableCouponApply(false);
// // //         setRateLimitMessage('');
// // //         setApplyAttemptCount(0);
// // //       }, 600000); // 10 minutes
// // //     }
// // //   }, [applyAttemptCount, setApplyAttemptCount, setDisableCouponApply, setRateLimitMessage]);

// // //   // Update coupon history when a valid coupon is applied
// // //   useEffect(() => {
// // //     if (validCoupon) {
// // //       setCouponHistory(prevHistory => {
// // //         const newHistory = [...new Set([validCoupon, ...prevHistory])].slice(0, 5); // Limit to 5 items
// // //         localStorage.setItem('couponHistory', JSON.stringify(newHistory));
// // //         return newHistory;
// // //       });
// // //     }
// // //   }, [validCoupon]);

// // //   // Handle coupon input change
// // //   const handleCouponInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const newCouponCode = e.target.value;
// // //     setCouponCode(newCouponCode);
// // //     setValidCoupon('');
// // //     localStorage.removeItem('validCoupon');
// // //     setDiscount(0);
// // //     setCouponError('');
// // //     onCouponChange(e);
// // //   };

// // //   // Handle coupon apply click
// // //   const handleApplyCouponClick = () => {
// // //     if (!disableCouponApply) {
// // //       setApplyAttemptCount(prevCount => prevCount + 1);
// // //       onApplyCoupon();
// // //     }
// // //   };

// // //   // Handle clicking a coupon from history
// // //   const handleCouponHistoryClick = (code: string) => {
// // //     setCouponCode(code);
// // //     setCouponError('');
// // //     setIsCouponExpanded(true); // Expand coupon section when selecting from history
// // //   };

// // //   return (
// // //     <motion.div
// // //       className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
// // //       initial={{ opacity: 0, y: 20 }}
// // //       animate={{ opacity: 1, y: 0 }}
// // //       transition={{ duration: 0.3 }}
// // //     >
// // //       {/* Header */}
// // //       <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

// // //       {/* Items List */}
// // //       <div className="space-y-4 mb-6">
// // //         {items.map((item) => (
// // //           <div
// // //             key={item._id}
// // //             className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0"
// // //           >
// // //             <img
// // //               src={item.images[0]}
// // //               alt={item.name}
// // //               className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
// // //             />
// // //             <div className="flex-1">
// // //               <p className="text-sm font-medium text-gray-800">{item.name}</p>
// // //               <p className="text-xs text-gray-500">
// // //                 {item?.selectedModel && `Model: ${item.selectedModel}`}
// // //                 {item?.selectedBrand && ` | Brand: ${item.selectedBrand}`}
// // //               </p>
// // //               <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
// // //             </div>
// // //             <p className="text-sm font-semibold text-gray-900">
// // //               ₹{(item.price * item.quantity).toFixed(2)}
// // //             </p>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Coupon Section */}
// // //       <div className="border-t border-gray-200 pt-4">
// // //         <button
// // //           onClick={() => setIsCouponExpanded(!isCouponExpanded)}
// // //           className="w-full text-left text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center justify-between"
// // //         >
// // //           <span>Have a promo code?</span>
// // //           <span>{isCouponExpanded ? '−' : '+'}</span>
// // //         </button>
// // //         <AnimatePresence>
// // //           {isCouponExpanded && (
// // //             <motion.div
// // //               initial={{ opacity: 0, height: 0 }}
// // //               animate={{ opacity: 1, height: 'auto' }}
// // //               exit={{ opacity: 0, height: 0 }}
// // //               transition={{ duration: 0.2 }}
// // //               className="mt-2 space-y-2"
// // //             >
// // //               <div className="flex gap-2">
// // //                 <input
// // //                   type="text"
// // //                   value={couponCode}
// // //                   onChange={handleCouponInputChange}
// // //                   placeholder="Enter promo code"
// // //                   className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
// // //                 />
// // //                 <button
// // //                   onClick={handleApplyCouponClick}
// // //                   disabled={disableCouponApply}
// // //                   className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
// // //                     disableCouponApply ? 'opacity-50 cursor-not-allowed' : ''
// // //                   }`}
// // //                 >
// // //                   Apply
// // //                 </button>
// // //               </div>
// // //               {couponError && (
// // //                 <p className="text-red-500 text-xs">{couponError}</p>
// // //               )}
// // //               {rateLimitMessage && (
// // //                 <p className="text-yellow-600 text-xs">{rateLimitMessage}</p>
// // //               )}
// // //               {couponHistory.length > 0 && (
// // //                 <div>
// // //                   <p className="text-xs font-medium text-gray-700">Recent Codes:</p>
// // //                   <div className="flex flex-wrap gap-2 mt-1">
// // //                     {couponHistory.map((code) => (
// // //                       <button
// // //                         key={code}
// // //                         onClick={() => handleCouponHistoryClick(code)}
// // //                         className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
// // //                       >
// // //                         {code}
// // //                       </button>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </motion.div>
// // //           )}
// // //         </AnimatePresence>
// // //       </div>

// // //       {/* Price Breakdown */}
// // //       <div className="mt-6 pt-4 border-t border-gray-200">
// // //         <div className="space-y-2 text-sm text-gray-600">
// // //           <div className="flex justify-between">
// // //             <span>Subtotal</span>
// // //             <span>₹{subtotal.toFixed(2)}</span>
// // //           </div>
// // //           <AnimatePresence>
// // //             {discount > 0 && (
// // //               <motion.div
// // //                 className="flex justify-between text-green-600"
// // //                 initial={{ opacity: 0 }}
// // //                 animate={{ opacity: 1 }}
// // //                 exit={{ opacity: 0 }}
// // //               >
// // //                 <span>Savings</span>
// // //                 <span>-₹{savings.toFixed(2)}</span>
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>
// // //           <div className="flex justify-between">
// // //             <span>Tax ({taxRate * 100}%)</span>
// // //             <span>₹{tax.toFixed(2)}</span>
// // //           </div>
// // //         </div>
// // //         <div className="flex justify-between mt-4 text-lg font-semibold text-gray-900">
// // //           <span>Total</span>
// // //           <span>₹{total.toFixed(2)}</span>
// // //         </div>
// // //       </div>

// // //       {/* Proceed to Payment Button */}
// // //       <motion.button
// // //         onClick={onOrderSubmit}
// // //         className={`mt-6 w-full py-3 rounded-lg text-white font-medium flex items-center justify-center transition-colors ${
// // //           isSubmitted
// // //             ? 'bg-indigo-600 hover:bg-indigo-700'
// // //             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
// // //         }`}
// // //         whileTap={{ scale: isSubmitted ? 0.95 : 1 }}
// // //         disabled={!isSubmitted}
// // //       >
// // //         Proceed to Payment
// // //         <ChevronRight className="ml-2" size={18} />
// // //       </motion.button>
// // //     </motion.div>
// // //   );
// // // };

// // // export default OrderSummary;


// // // // import React, { useState, useEffect } from 'react';
// // // // import { Link } from 'react-router-dom';
// // // // import { ChevronRight } from 'lucide-react';
// // // // import { motion, AnimatePresence } from 'framer-motion';

// // // // interface OrderSummaryProps {
// // // //   items: any[];
// // // //   subtotal: number;
// // // //   discount: number;
// // // //   taxRate: number;
// // // //   couponCode: string;
// // // //   couponError: string;
// // // //   validCoupon: string;
// // // //   isSubmitted: boolean;
// // // //   onApplyCoupon: () => void;
// // // //   onCouponChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // // //   setCouponCode: (value: string) => void;
// // // //   setDiscount: (value: number) => void;
// // // //   setCouponError: (value: string) => void;
// // // //   setValidCoupon: (value: string) => void;
// // // //   applyAttemptCount: number;
// // // //   setApplyAttemptCount: (value: number) => void;
// // // //   disableCouponApply: boolean;
// // // //   setDisableCouponApply: (value: boolean) => void;
// // // //   rateLimitMessage: string;
// // // //   setRateLimitMessage: (value: string) => void;
// // // //   onOrderSubmit: () => void; // Add the new prop
// // // // }

// // // // const OrderSummary: React.FC<OrderSummaryProps> = ({
// // // //   items,
// // // //   subtotal,
// // // //   discount,
// // // //   taxRate,
// // // //   couponCode,
// // // //   couponError,
// // // //   validCoupon,
// // // //   isSubmitted,
// // // //   onApplyCoupon,
// // // //   onCouponChange,
// // // //   setCouponCode,
// // // //   setDiscount,
// // // //   setCouponError,
// // // //   setValidCoupon,
// // // //   applyAttemptCount,
// // // //   setApplyAttemptCount,
// // // //   disableCouponApply,
// // // //   setDisableCouponApply,
// // // //   rateLimitMessage,
// // // //   setRateLimitMessage,
// // // //   onOrderSubmit, // Destructure the new prop
// // // // }) => {
// // // //   const discountedSubtotal = subtotal * (1 - discount);
// // // //   const tax = discountedSubtotal * taxRate;
// // // //   const total = discountedSubtotal + tax;

// // // //   const [couponHistory, setCouponHistory] = useState<string[]>([]);

// // // //   useEffect(() => {
// // // //     const storedHistory = localStorage.getItem('couponHistory');
// // // //     if (storedHistory) {
// // // //       setCouponHistory(JSON.parse(storedHistory));
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (applyAttemptCount > 3) {
// // // //       setRateLimitMessage("Whoa there, coupon ninja! Too many tries... chill for 10 minutes, or the deals might run away! 😜");
// // // //       setDisableCouponApply(true);
// // // //       setTimeout(() => {
// // // //         setDisableCouponApply(false);
// // // //         setRateLimitMessage('');
// // // //         setApplyAttemptCount(0);
// // // //       }, 600000); // 10 minutes
// // // //     }
// // // //   }, [applyAttemptCount]);

// // // //   const handleCouponInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const newCouponCode = e.target.value;
// // // //     setCouponCode(newCouponCode);
// // // //     setValidCoupon('');
// // // //     localStorage.removeItem('validCoupon');
// // // //     setDiscount(0);
// // // //     setCouponError('');
// // // //     onCouponChange(e);
// // // //   };

// // // //   const handleApplyCouponClick = () => {
// // // //     if (!disableCouponApply) {
// // // //       setApplyAttemptCount(prevCount => prevCount + 1);
// // // //       onApplyCoupon();
// // // //     }
// // // //   };

// // // //   const handleCouponHistoryClick = (code: string) => {
// // // //     setCouponCode(code);
// // // //     setCouponError('');
// // // //   };

// // // //   useEffect(() => {
// // // //     if (validCoupon) {
// // // //       setCouponHistory(prevHistory => {
// // // //         const newHistory = [...new Set([validCoupon, ...prevHistory])];
// // // //         localStorage.setItem('couponHistory', JSON.stringify(newHistory));
// // // //         return newHistory;
// // // //       });
// // // //     }
// // // //   }, [validCoupon]);

// // // //   return (
// // // //     <motion.div
// // // //       className="bg-white p-6 rounded-lg shadow-md"
// // // //       initial={{ x: 20, opacity: 0 }}
// // // //       animate={{ x: 0, opacity: 1 }}
// // // //     >
// // // //       <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

// // // //       {/* <div className="space-y-4 mb-6">
// // // //         {items.map(item => (
// // // //           <div key={item._id} className="flex justify-between items-center border-b pb-4">
// // // //             <div className="flex items-center gap-4">
// // // //               <img
// // // //                 src={item.images[0]}
// // // //                 alt={item.name}
// // // //                 className="w-16 h-16 object-cover rounded"
// // // //               />
// // // //               <div>
// // // //                 <h3 className="font-medium">{item.name}</h3>
// // // //                 <h3 className="font-medium">Quantity: {item.quantity}</h3>
// // // //                 <p className="text-sm text-gray-500">Model: {item?.selectedModel}</p>
// // // //                 <p className="text-sm text-gray-500">Brand: {item?.selectedBrand}</p>
// // // //               </div>
// // // //             </div>
// // // //             <div className="text-right">
// // // //               <p className="font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</p>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div> */}
// // // // <div className="space-y-4 mb-6">
// // // //   {items.map((item) => (
// // // //     <div
// // // //       key={item._id}
// // // //       className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-white rounded-2xl shadow-md"
// // // //     >
// // // //       {/* Product Image */}
// // // //       <img
// // // //         src={item.images[0]}
// // // //         alt={item.name}
// // // //         className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
// // // //       />

// // // //       {/* Product Details */}
// // // //       <div className="flex-1">
// // // //         <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
// // // //         <p className="text-sm text-gray-500">Model: {item?.selectedModel}</p>
// // // //         <p className="text-sm text-gray-500">Brand: {item?.selectedBrand}</p>
// // // //         <p className="text-sm font-medium text-gray-700">Quantity: {item.quantity}</p>
// // // //       </div>

// // // //       {/* Price */}
// // // //       <div className="text-right">
// // // //         <p className="text-lg font-semibold text-gray-900">
// // // //           ₹{(item.price * item.quantity).toFixed(2)}
// // // //         </p>
// // // //       </div>
// // // //     </div>
// // // //   ))}
// // // // </div>


// // // //       <div>
// // // //         <label htmlFor="couponCode" className="block text-sm font-medium mb-1">Coupon Code</label>
// // // //         <input
// // // //           id="couponCode"
// // // //           type="text"
// // // //           value={couponCode}
// // // //           onChange={handleCouponInputChange}
// // // //           className="w-full p-2 border rounded-md"
// // // //           placeholder="Enter coupon code"
// // // //         />
// // // //         <AnimatePresence>
// // // //           {couponError && (
// // // //             <motion.p
// // // //               className="text-red-500 text-sm mt-1"
// // // //               initial={{ opacity: 0, y: -10 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               exit={{ opacity: 0, y: -10 }}
// // // //             >
// // // //               {couponError}
// // // //             </motion.p>
// // // //           )}
// // // //         </AnimatePresence>
// // // //       </div>

// // // //       {/* Coupon History */}
// // // //       {couponHistory.length > 0 && (
// // // //         <div className="mt-2">
// // // //           <p className="text-sm font-medium text-gray-700">Coupon History:</p>
// // // //           <div className="flex flex-wrap gap-2 mt-1">
// // // //             {couponHistory.map(code => (
// // // //               <button
// // // //                 key={code}
// // // //                 className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm hover:bg-gray-300 focus:outline-none"
// // // //                 onClick={() => handleCouponHistoryClick(code)}
// // // //               >
// // // //                 {code}
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {rateLimitMessage && (
// // // //         <motion.p
// // // //           className="text-yellow-500 text-sm mt-2"
// // // //           initial={{ opacity: 0, y: -10 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           exit={{ opacity: 0, y: -10 }}
// // // //         >
// // // //           {rateLimitMessage}
// // // //         </motion.p>
// // // //       )}

// // // //       <motion.button
// // // //         onClick={handleApplyCouponClick}
// // // //         className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 mt-4 ${disableCouponApply ? 'opacity-50 cursor-not-allowed' : ''}`}
// // // //         whileTap={{ scale: 0.95 }}
// // // //         disabled={disableCouponApply}
// // // //       >
// // // //         Apply Coupon
// // // //       </motion.button>

// // // //       <div className="space-y-2">
// // // //         <div className="flex justify-between">
// // // //           <span>Subtotal:</span>
// // // //           <span>Rs.{subtotal.toFixed(2)}</span>
// // // //         </div>
// // // //         <AnimatePresence>
// // // //           {discount > 0 && (
// // // //             <motion.div
// // // //               className="flex justify-between text-green-600"
// // // //               initial={{ opacity: 0, y: -10 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               exit={{ opacity: 0, y: -10 }}
// // // //             >
// // // //               <span>Discount:</span>
// // // //               <span>-Rs.{(subtotal * discount).toFixed(2)}</span>
// // // //             </motion.div>
// // // //           )}
// // // //         </AnimatePresence>
// // // //         <div className="flex justify-between">
// // // //           <span>GST Tax ({taxRate * 100}%):</span>
// // // //           <span>Rs.{tax.toFixed(2)}</span>
// // // //         </div>
// // // //         <div className="flex justify-between font-bold text-lg pt-4">
// // // //           <span>Total:</span>
// // // //           <span>Rs.{total.toFixed(2)}</span>
// // // //         </div>
// // // //       </div>

// // // //       <motion.button
// // // //         onClick={onOrderSubmit} // Call the onOrderSubmit function when clicked
// // // //         className={`mt-6 block w-full text-center py-3 rounded-md transition-colors ${
// // // //           isSubmitted
// // // //             ? 'bg-black text-white hover:bg-gray-800'
// // // //             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
// // // //         }`}
// // // //         whileTap={{ scale: 0.95 }}
// // // //         disabled={!isSubmitted}
// // // //       >
// // // //         Proceed to Payment <ChevronRight className="inline" size={18} />
// // // //       </motion.button>
// // // //     </motion.div>
// // // //   );
// // // // };

// // // // export default OrderSummary;