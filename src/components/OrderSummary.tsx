import { motion } from 'framer-motion';
import { CartItem } from '../types/types';
import { CouponSection } from './CouponSection';
import { PriceBreakdown } from './PriceBreakdown.tsx';
import { PaymentButton } from './PaymentButton.tsx';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  discount: number;
  couponCode: string;
  couponError: string;
  isSubmitted: boolean;
  isBlocked: boolean;
  attemptCount: number;
  setCouponCode: (code: string) => void;
  handleApplyCoupon: () => void;
}

export function OrderSummary({
  items,
  subtotal,
  tax,
  total,
  discount,
  couponCode,
  couponError,
  isSubmitted,
  isBlocked,
  attemptCount,
  setCouponCode,
  handleApplyCoupon,
}: OrderSummaryProps) {
  return (
    <section>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <h3 className="font-medium">{item?.selectedBrand} {item?.selectedModel}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  Rs.{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Coupon Section */}
        <CouponSection
          couponCode={couponCode}
          couponError={couponError}
          isBlocked={isBlocked}
          attemptCount={attemptCount}
          onCodeChange={setCouponCode}
          onApply={handleApplyCoupon}
        />

        {/* Price Breakdown */}
        <PriceBreakdown
          subtotal={subtotal}
          tax={tax}
          total={total}
          discount={discount}
        />

        {/* Payment Button */}
        <PaymentButton isSubmitted={isSubmitted} />
      </motion.div>
    </section>
  );
}