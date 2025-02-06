import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { MiniCart } from './MiniCart';

export function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useCart();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`relative flex items-center justify-center p-2 rounded-md transition-all duration-200 ease-in-out ${
          state.itemCount > 0
            ? 'bg-primary text-black hover:bg-primary-dark'
            : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
        }`}
      >
        {/* Cart Icon */}
        <ShoppingCart size={24} />
        
        {/* Badge for item count */}
        <AnimatePresence>
          {state.itemCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
            >
              {state.itemCount}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <MiniCart isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
