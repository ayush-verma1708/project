// CouponHandler.ts (Utility)
import { useState, useEffect } from 'react';
import { campaignService } from '../api/services/campaigns';

export const CouponHandler = () => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [validCoupon, setValidCoupon] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockEndTime, setBlockEndTime] = useState<Date | null>(null);

  useEffect(() => {
        const storedBlockEndTime = localStorage.getItem('couponBlockEndTime');
        const storedAttemptCount = localStorage.getItem('couponAttemptCount');
        
        if (storedBlockEndTime) {
          const endTime = new Date(storedBlockEndTime);
          if (endTime > new Date()) {
            setIsBlocked(true);
            setBlockEndTime(endTime);
          } else {
            // Clear expired block
            localStorage.removeItem('couponBlockEndTime');
            localStorage.removeItem('couponAttemptCount');
          }
        }
        
        if (storedAttemptCount) {
          setAttemptCount(Number(storedAttemptCount));
        }
      }, []);
  
  const handleApplyCoupon = async () => {
    if (isBlocked) {
      const timeRemaining = blockEndTime ? Math.ceil((blockEndTime.getTime() - new Date().getTime()) / 60000) : 0;
      setCouponError(`Please wait ${timeRemaining} minutes before trying again.`);
      return;
    }

    const code = couponCode.trim().toUpperCase();
    setCouponError('');

    try {
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);
      localStorage.setItem('couponAttemptCount', String(newAttemptCount));

      // Check if we should warn the user
      if (newAttemptCount === 4) {
        alert('Warning: You have 1 attempt remaining before being temporarily blocked.');
      }

      const response = await campaignService.search(code);
      const coupon = response[0];

      if (!coupon) {
        handleInvalidCoupon('Invalid coupon code');
        return;
      }

      // ... rest of the validation logic remains the same
      const currentDate = new Date();
      const startDate = new Date(coupon.startDate);
      const endDate = new Date(coupon.endDate);

      if (!coupon.active) {
        handleInvalidCoupon('This coupon is no longer active');
        return;
      }

      if (currentDate < startDate || currentDate > endDate) {
        handleInvalidCoupon('Coupon code has expired');
        return;
      }

      // Success case
      setDiscount(coupon.discount / 100);
      setCouponError('');
      setValidCoupon(code);
      localStorage.setItem('validCoupon', code);
      alert(`Coupon applied! Discount: ${coupon.discount}%`);
      
      // Reset attempt count on successful application
      setAttemptCount(0);
      localStorage.removeItem('couponAttemptCount');

    } catch (error) {
      if (error instanceof Error && error.message === 'Too many requests, please try again later.') {
        handleRateLimit();
      } else {
        handleInvalidCoupon('Failed to validate coupon');
      }
    }
  };


  const handleInvalidCoupon = (errorMessage: string) => {
    if (attemptCount >= 5) {
      handleRateLimit();
    } else {
      setCouponError(validCoupon 
        ? `${errorMessage}. Previous valid coupon will remain applied.` 
        : errorMessage);
      
      if (validCoupon) {
        setCouponCode(validCoupon);
        setDiscount(validCoupon ? discount : 0);
      } else {
        setDiscount(0);
      }
    }
  };

  const handleRateLimit = () => {
    const blockEndTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    setIsBlocked(true);
    setBlockEndTime(blockEndTime);
    localStorage.setItem('couponBlockEndTime', blockEndTime.toISOString());
    setCouponError('Too many attempts. Please try again in 10 minutes.');
  };

  return {
    couponCode,
    setCouponCode,
    discount,
    setDiscount,
    couponError,
    validCoupon,
    attemptCount,
    isBlocked,
    handleApplyCoupon
  };
};