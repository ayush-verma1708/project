import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, X, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { QuantityControl } from './QuantityControl';
import { useEffect, useRef } from 'react';

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const { state, removeItem, updateQuantity } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus the panel when opened
      panelRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleQuantityChange = (itemId: string, newQuantity: number, selectedBrand: string, selectedModel: string) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity, selectedBrand, selectedModel);
  };

  const handleRemoveItem = (itemId: string, selectedBrand: string, selectedModel: string) => {
    removeItem(itemId, selectedBrand, selectedModel);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Mini Cart Panel */}
          <motion.div
            ref={panelRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 focus:outline-none"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} className="text-indigo-600" aria-hidden="true" />
                  <h2 className="text-lg font-semibold">Your Cart</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <X size={20} className="text-gray-700" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {state.items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Your cart is empty</p>
                    <Link
                      to="/category/mobile-skins"
                      className="mt-4 inline-block text-indigo-600 hover:text-indigo-700"
                      onClick={onClose}
                    >
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <motion.div
                        key={`${item._id}-${item.selectedBrand}-${item.selectedModel}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="flex gap-4 py-4 border-b last:border-b-0"
                      >
                        <div className="w-16 h-16 flex-shrink-0">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.selectedBrand} {item.selectedModel}
                          </p>
                          <div className="mt-2">
                            <QuantityControl
                              quantity={item.quantity}
                              onIncrease={() => handleQuantityChange(item._id, item.quantity + 1, item.selectedBrand, item.selectedModel)}
                              onDecrease={() => handleQuantityChange(item._id, item.quantity - 1, item.selectedBrand, item.selectedModel)}
                              size="sm"
                            />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => handleRemoveItem(item._id, item.selectedBrand, item.selectedModel)}
                            className="text-red-500 hover:text-red-600 mt-2"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{state.subtotal.toFixed(2)}</span>
                  </div>
                  <Link
                    to="/cart"
                    className="block w-full bg-indigo-600 text-white py-2 rounded-lg text-center hover:bg-indigo-700 transition-colors"
                    onClick={onClose}
                  >
                    View Cart
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 