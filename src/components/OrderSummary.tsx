import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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
  onOrderSubmit: () => void; // Add the new prop
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
  onOrderSubmit, // Destructure the new prop
}) => {
  const discountedSubtotal = subtotal * (1 - discount);
  const tax = discountedSubtotal * taxRate;
  const total = discountedSubtotal + tax;

  const [couponHistory, setCouponHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('couponHistory');
    if (storedHistory) {
      setCouponHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (applyAttemptCount > 3) {
      setRateLimitMessage("Whoa there, coupon ninja! Too many tries... chill for 10 minutes, or the deals might run away! 😜");
      setDisableCouponApply(true);
      setTimeout(() => {
        setDisableCouponApply(false);
        setRateLimitMessage('');
        setApplyAttemptCount(0);
      }, 600000); // 10 minutes
    }
  }, [applyAttemptCount]);

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
  };

  useEffect(() => {
    if (validCoupon) {
      setCouponHistory(prevHistory => {
        const newHistory = [...new Set([validCoupon, ...prevHistory])];
        localStorage.setItem('couponHistory', JSON.stringify(newHistory));
        return newHistory;
      });
    }
  }, [validCoupon]);

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      {/* <div className="space-y-4 mb-6">
        {items.map(item => (
          <div key={item._id} className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-4">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <h3 className="font-medium">Quantity: {item.quantity}</h3>
                <p className="text-sm text-gray-500">Model: {item?.selectedModel}</p>
                <p className="text-sm text-gray-500">Brand: {item?.selectedBrand}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div> */}
<div className="space-y-4 mb-6">
  {items.map((item) => (
    <div
      key={item._id}
      className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-white rounded-2xl shadow-md"
    >
      {/* Product Image */}
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
      />

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">Model: {item?.selectedModel}</p>
        <p className="text-sm text-gray-500">Brand: {item?.selectedBrand}</p>
        <p className="text-sm font-medium text-gray-700">Quantity: {item.quantity}</p>
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-900">
          ₹{(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  ))}
</div>


      <div>
        <label htmlFor="couponCode" className="block text-sm font-medium mb-1">Coupon Code</label>
        <input
          id="couponCode"
          type="text"
          value={couponCode}
          onChange={handleCouponInputChange}
          className="w-full p-2 border rounded-md"
          placeholder="Enter coupon code"
        />
        <AnimatePresence>
          {couponError && (
            <motion.p
              className="text-red-500 text-sm mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {couponError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Coupon History */}
      {couponHistory.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-700">Coupon History:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {couponHistory.map(code => (
              <button
                key={code}
                className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm hover:bg-gray-300 focus:outline-none"
                onClick={() => handleCouponHistoryClick(code)}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      )}

      {rateLimitMessage && (
        <motion.p
          className="text-yellow-500 text-sm mt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {rateLimitMessage}
        </motion.p>
      )}

      <motion.button
        onClick={handleApplyCouponClick}
        className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 mt-4 ${disableCouponApply ? 'opacity-50 cursor-not-allowed' : ''}`}
        whileTap={{ scale: 0.95 }}
        disabled={disableCouponApply}
      >
        Apply Coupon
      </motion.button>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>Rs.{subtotal.toFixed(2)}</span>
        </div>
        <AnimatePresence>
          {discount > 0 && (
            <motion.div
              className="flex justify-between text-green-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span>Discount:</span>
              <span>-Rs.{(subtotal * discount).toFixed(2)}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex justify-between">
          <span>GST Tax ({taxRate * 100}%):</span>
          <span>Rs.{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-4">
          <span>Total:</span>
          <span>Rs.{total.toFixed(2)}</span>
        </div>
      </div>

      <motion.button
        onClick={onOrderSubmit} // Call the onOrderSubmit function when clicked
        className={`mt-6 block w-full text-center py-3 rounded-md transition-colors ${
          isSubmitted
            ? 'bg-black text-white hover:bg-gray-800'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        whileTap={{ scale: 0.95 }}
        disabled={!isSubmitted}
      >
        Proceed to Payment <ChevronRight className="inline" size={18} />
      </motion.button>
    </motion.div>
  );
};

export default OrderSummary;