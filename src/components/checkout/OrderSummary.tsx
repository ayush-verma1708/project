import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, TextField, Button, Divider } from '@mui/material';
import { CartItem } from '../../types/types';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  couponCode: string;
  couponError: string;
  validCoupon: string;
  isSubmitted: boolean;
  onApplyCoupon: () => Promise<void>;
  onCouponChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCouponCode: (code: string) => void;
  setDiscount: (discount: number) => void;
  setCouponError: (error: string) => void;
  setValidCoupon: (coupon: string) => void;
  applyAttemptCount: number;
  setApplyAttemptCount: (count: number) => void;
  disableCouponApply: boolean;
  setDisableCouponApply: (disabled: boolean) => void;
  rateLimitMessage: string;
  setRateLimitMessage: (message: string) => void;
  onOrderSubmit: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  discount,
  tax,
  total,
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
  onOrderSubmit
}) => {
  const discountedSubtotal = subtotal * (1 - discount);
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
    onCouponChange(e);
  };

  const handleApplyCouponClick = async () => {
    if (disableCouponApply) return;
    setApplyAttemptCount(applyAttemptCount + 1);
    await onApplyCoupon();
  };

  const handleCouponHistoryClick = (code: string) => {
    setCouponCode(code);
    setCouponError('');
    setIsCouponExpanded(true);
  };

  return (
    <Box className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <Typography variant="h6" className="mb-4">Order Summary</Typography>
      
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item._id} className="flex justify-between">
            <Typography variant="body2">
              {item.name} x {item.quantity}
            </Typography>
            <Typography variant="body2">
              ₹{(item.price * item.quantity).toFixed(2)}
            </Typography>
          </div>
        ))}
      </div>

      <Divider className="my-4" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2">₹{subtotal.toFixed(2)}</Typography>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <Typography variant="body2">Discount</Typography>
            <Typography variant="body2">-₹{discount.toFixed(2)}</Typography>
          </div>
        )}

        <div className="flex justify-between">
          <Typography variant="body2">Tax (0%)</Typography>
          <Typography variant="body2">₹0.00</Typography>
        </div>

        <Divider className="my-2" />

        <div className="flex justify-between font-semibold">
          <Typography variant="body1">Total</Typography>
          <Typography variant="body1">₹{total.toFixed(2)}</Typography>
        </div>
      </div>

      {!isSubmitted && (
        <div className="mt-4">
          <TextField
            fullWidth
            label="Coupon Code"
            value={couponCode}
            onChange={handleCouponInputChange}
            error={!!couponError}
            helperText={couponError || rateLimitMessage}
            disabled={disableCouponApply}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleApplyCouponClick}
            disabled={disableCouponApply}
            className="mt-2"
          >
            Apply Coupon
          </Button>
        </div>
      )}
    </Box>
  );
};

export default OrderSummary;