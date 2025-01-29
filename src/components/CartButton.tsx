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
        className="relative text-gray-700 hover:text-black-600 transition-colors"
      >
        <ShoppingCart size={20} />
        <AnimatePresence>
          {state.itemCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 bg-black-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
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