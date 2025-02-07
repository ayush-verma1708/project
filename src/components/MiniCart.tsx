import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function MiniCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { state, removeItem, updateQuantity } = useCart();

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity === 1) {
      removeItem(item._id, item.selectedBrand, item.selectedModel); // Directly remove the item if quantity is 1
    } else {
      updateQuantity(item._id, item.quantity - 1, item.selectedBrand, item.selectedModel); // Decrease quantity
    }
  };

  const handleRemoveItem = (item: CartItem) => {
    removeItem(item._id, item.selectedBrand, item.selectedModel); // Directly remove the item
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <h2 className="text-lg font-semibold">Your Cart ({state.itemCount})</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {state.items.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  Your cart is empty.{' '}
                  <Link to="/" onClick={onClose} className="text-black-600 hover:text-black-700">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                state.items.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-4 bg-gray-50 p-4 rounded-lg"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <p className="text-sm text-blue-500 font-semibold">Brand: {item.selectedBrand}</p>
                      <p className="text-sm text-green-500 font-semibold">Model: {item.selectedModel}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleDecreaseQuantity(item)}
                          className="p-1 hover:bg-gray-200 rounded"
                          disabled={item.quantity === 1}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedBrand, item.selectedModel)}
                          className="p-1 hover:bg-gray-200 rounded"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                      <p className="font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>Rs.{state.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>Rs.{state.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>Rs.{state.total.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full bg-black-600 text-black py-3 rounded-lg hover:bg-black-700 transition-colors"
                >
                  Checkout <ChevronRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
