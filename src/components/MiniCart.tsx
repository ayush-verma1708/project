import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { CartItems } from '../components/cartItems/CartItem';
import { EmptyCart } from '../components/cartItems/EmptyCart';
import { CartTotals } from '../components/cartItems/CartTotals';
import { useRecommendations } from '../hook/useRecommendations';
import { RecommendedProducts } from '../components/RecommendedProducts';
import { useEffect, useRef } from 'react';

export function MiniCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { state } = useCart();
  const { recommendedProducts, isLoading, isError } = useRecommendations();
  
  
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ensure the event target is outside the MiniCart
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      // Use "mousedown" instead of "click" for better outside click detection
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex-none p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} />
              <h2 className="text-lg font-semibold">Your Cart ({state.items.length})</h2>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>

          </div>

          {/* Scrollable Content: Cart Items and Recommendations */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {state.items.length === 0 ? (
              <EmptyCart onClose={onClose} variant="mini" />
            ) : (
              <AnimatePresence>
                {state.items.map((item) => (
                  <motion.div
                    key={`${item._id}-${item.selectedBrand}-${item.selectedModel}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CartItems item={item} layout="mini" />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Recommended Products placed after cart items */}
            {/* {recommendedProducts.length > 0 && (
              <div className="mt-4">
                <RecommendedProducts
                  products={recommendedProducts}
                  isLoading={isLoading}
                  isError={isError}
                  layout="mini"
                />
              </div>
            )} */}
          </div>

          {/* Footer: Checkout Totals */}
          <div className="flex-none border-t p-4 space-y-4">
            <CartTotals
              subtotal={state.subtotal}
              tax={state.tax}
              total={state.total}
              layout="mini"
            />
            <Link
              to="/checkout"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Checkout <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
