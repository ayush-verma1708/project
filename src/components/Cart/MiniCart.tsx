import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { CartItems } from '../Cart/CartItem';
import { EmptyCart } from '../Cart/EmptyCart';
import CartTotals from '../Cart/CartTotals';
import { useEffect, useRef, useState } from 'react';

export function MiniCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { state } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <AnimatePresence onExitComplete={() => setIsClosing(false)}>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={handleClose}
          />
          
          {/* Cart Panel */}
          <motion.div
            ref={cartRef}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex-none px-8 h-20 border-b border-black/5 flex justify-between items-center sticky top-0 bg-white z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-black" />
                <h2 className="text-sm font-bold tracking-wide">YOUR CART ({state.items.length})</h2>
              </div>
              <button 
                onClick={handleClose} 
                className="w-8 h-8 flex items-center justify-center hover:bg-black/5 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} className="text-black/60" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {state.items.length === 0 ? (
                <EmptyCart onClose={handleClose} variant="mini" />
              ) : (
                <AnimatePresence mode="popLayout">
                  {state.items.map((item) => (
                    <motion.div
                      key={`${item._id}-${item.selectedBrand}-${item.selectedModel}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CartItems item={item} layout="mini" theme="light" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-none border-t border-black/5 bg-black/[0.02] px-8 py-6 space-y-6"
              >
                <CartTotals
                  subtotal={state.subtotal}
                  tax={state.tax}
                  total={state.total}
                  layout="mini"
                  theme="light"
                />
                <Link
                  to="/checkout"
                  onClick={handleClose}
                  className="flex items-center justify-center gap-2 w-full bg-black text-white py-4 hover:bg-black/90 transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">CHECKOUT</span>
                  <ChevronRight size={16} />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}