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
            <span>Tax ({taxRate}%)</span>
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
