import React from 'react';

interface CartTotalsProps {
  subtotal: number;
  tax: number;
  total: number;
  layout?: 'page' | 'mini';
  theme?: 'light' | 'dark';
}

const CartTotals: React.FC<CartTotalsProps> = ({ 
  subtotal, 
  tax, 
  total, 
  layout = 'page',
  theme = 'light'
}) => {
  // Ensure total is exactly equal to subtotal
  const finalTotal = subtotal;
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const borderColor = theme === 'dark' ? 'bg-white/10' : 'bg-black/10';
  const secondaryColor = theme === 'dark' ? 'text-white/60' : 'text-black/60';

  return (
    <div className={`space-y-4 ${layout === 'mini' ? 'p-6' : 'p-8'}`}>
      <div className="flex justify-between items-center">
        <span className={`text-xs font-medium tracking-wide ${secondaryColor}`}>SUBTOTAL</span>
        <span className={`text-sm font-medium ${textColor}`}>₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className={`text-xs font-medium tracking-wide ${secondaryColor}`}>TAX (0%)</span>
        <span className={`text-sm font-medium ${textColor}`}>₹0.00</span>
      </div>

      <div className={`h-px ${borderColor} my-4`} />

      <div className="flex justify-between items-center">
        <span className={`text-sm font-bold tracking-wide ${textColor}`}>TOTAL</span>
        <span className={`text-base font-bold ${textColor}`}>₹{finalTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartTotals;