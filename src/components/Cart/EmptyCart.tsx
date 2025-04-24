import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyCartProps {
  onClose?: () => void;
  variant?: 'page' | 'mini';
}

export function EmptyCart({ onClose, variant = 'page' }: EmptyCartProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${variant === 'mini' ? 'py-12' : 'py-24'}`}>
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-black/5" />
        <ShoppingBag size={variant === 'mini' ? 40 : 56} className="relative text-black/20" />
      </div>
      <h3 className="text-sm font-medium tracking-wide mb-3">YOUR CART IS EMPTY</h3>
      <p className="text-xs text-black/60 mb-8 text-center max-w-xs">
        Looks like you haven't added anything to your cart yet.
      </p>
      <Link
        to="/category/mobile-skins"
        onClick={onClose}
        className="group flex items-center gap-2 text-sm font-medium tracking-wide text-black hover:text-black/70 transition-colors"
      >
        <span>START SHOPPING</span>
        <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}