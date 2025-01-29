import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export function MiniCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { state, removeItem, updateQuantity } = useCart();
  const [showConfirmDialog, setShowConfirmDialog] = useState<string | null>(null);

  const handleDecreaseQuantity = (itemId: string, quantity: number) => {
    if (quantity === 1) {
      setShowConfirmDialog(itemId); // Show confirmation if quantity is 1
    } else {
      updateQuantity(itemId, quantity - 1); // Reduce quantity if greater than 1
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId); // Remove item from cart
    setShowConfirmDialog(null); // Close confirmation dialog
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
                  <Link to="/" onClick={onClose} className="text-indigo-600 hover:text-indigo-700">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                state.items.map((item) => (
                  <motion.div
                    key={item.id}
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
                          onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                          className="p-1 hover:bg-gray-200 rounded"
                          disabled={item.quantity === 1}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
                <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                  <h3 className="text-lg font-semibold">Remove Item</h3>
                  <p className="text-gray-700 mt-2">Are you sure you want to remove this item from your cart?</p>
                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      onClick={() => setShowConfirmDialog(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRemoveItem(showConfirmDialog)}
                      className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${state.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${state.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
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
