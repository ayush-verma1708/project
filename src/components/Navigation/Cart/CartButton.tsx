import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { useState, useEffect } from 'react';
import { MiniCart } from '../../Cart/MiniCart'
import { useNavigate } from 'react-router-dom';

export function CartButton() {
  const { state } = useCart();
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMobile) {
      // On mobile, navigate to cart page
      navigate('/cart');
    } else {
      // On desktop, toggle mini-cart
      setIsMiniCartOpen(!isMiniCartOpen);
    }
  };

  const handleCloseMiniCart = () => {
    setIsMiniCartOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="relative flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label={`Shopping cart (${state.itemCount} items)`}
      >
        <ShoppingBag size={20} className="text-gray-700" />
        {state.itemCount > 0 && (
          <span 
            className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center"
            aria-hidden="true"
          >
            {state.itemCount}
          </span>
        )}
      </button>

      {/* Mini Cart */}
      <MiniCart 
        isOpen={isMiniCartOpen} 
        onClose={handleCloseMiniCart} 
      />
    </div>
  );
} 