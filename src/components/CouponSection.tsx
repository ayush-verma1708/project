import { motion } from 'framer-motion';

interface CouponSectionProps {
  couponCode: string;
  couponError: string;
  isBlocked: boolean;
  attemptCount: number;
  onCodeChange: (code: string) => void;
  onApply: () => void;
}

export function CouponSection({
  couponCode,
  couponError,
  isBlocked,
  attemptCount,
  onCodeChange,
  onApply,
}: CouponSectionProps) {
  const getRemainingAttempts = () => Math.max(5 - attemptCount, 0);

  return (
    <div>
      <label htmlFor="couponCode" className="block text-sm font-medium mb-1">
        Coupon Code
        {!isBlocked && (
          <span className="text-gray-500 text-xs ml-2">
            ({getRemainingAttempts()} attempts remaining)
          </span>
        )}
      </label>
      <input
        id="couponCode"
        type="text"
        value={couponCode}
        onChange={(e) => onCodeChange(e.target.value)}
        className={`w-full p-2 border rounded-md ${
          isBlocked ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
        placeholder="Enter coupon code"
        disabled={isBlocked}
      />
      {couponError && (
        <motion.p
          className="text-red-500 text-sm mt-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {couponError}
        </motion.p>
      )}
      <motion.button
        onClick={onApply}
        className={`w-full py-2 rounded-md mt-4 ${
          isBlocked
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
        whileTap={{ scale: isBlocked ? 1 : 0.95 }}
        disabled={isBlocked}
      >
        Apply Coupon
      </motion.button>
    </div>
  );
}