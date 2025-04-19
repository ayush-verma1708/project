import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export function CartButton() {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <Link 
      to="/cart" 
      className="relative text-gray-700 hover:text-orange-500 transition-colors"
      aria-label="Shopping Cart"
    >
      <ShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
} 