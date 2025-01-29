import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';

export function CartPage() {
  const { state, removeItem, updateQuantity } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Cart ({state.itemCount})</h2>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state.items.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Your cart is empty
          </div>
        ) : (
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow-md">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  {item.colors && (
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {state.items.length > 0 && (
        <div className="bg-white shadow-md border-t py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {/* Cart Summary */}
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

              {/* Checkout Button */}
              <div>
                <Link
                  to="/checkout"
                  className="flex items-center justify-center gap-2 w-full bg-black-600 text-white py-3 rounded-lg hover:bg-black-700 transition-colors"
                >
                  Checkout <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
