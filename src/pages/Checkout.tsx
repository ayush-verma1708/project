// CheckoutPage.tsx (Main Component)
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShippingSection } from '../components/ShippingSection.tsx';
import { OrderSummary } from '../components/OrderSummary.tsx';
import { CouponHandler } from '../utils/CouponHandler.tsx';

const TAX_RATE = 0.18;

export function CheckoutPage() {
  const { state } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    couponCode,
    setCouponCode,
    discount,
    couponError,
    attemptCount,
    isBlocked,
    handleApplyCoupon
  } = CouponHandler();

  // Price calculations
  const discountedSubtotal = state.subtotal * (1 - discount);
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ShippingSection 
              isSubmitted={isSubmitted}
              isEditing={isEditing}
              setIsSubmitted={setIsSubmitted}
              setIsEditing={setIsEditing}
            />
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <OrderSummary
              items={state.items}
              subtotal={state.subtotal}
              tax={tax}
              total={total}
              discount={discount}
              couponCode={couponCode}
              couponError={couponError}
              isSubmitted={isSubmitted}
              isBlocked={isBlocked}
              attemptCount={attemptCount}
              setCouponCode={setCouponCode}
              handleApplyCoupon={handleApplyCoupon}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
