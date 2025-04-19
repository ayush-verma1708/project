import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, Package, Truck, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { EmptyCart } from '../../components/Cart/EmptyCart';
import { CartTotals } from '../../components/Cart/CartTotals';
import { LoadingSpinner } from '../../components/Loading/LoadingSpinner';
import { QuantityControl } from '../../components/Cart/QuantityControl';
import { useState } from 'react';

export default function CartPage() {
  const { state, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (itemId: string, newQuantity: number, selectedBrand: string, selectedModel: string) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity, selectedBrand, selectedModel);
  };

  const handleRemoveItem = (itemId: string, selectedBrand: string, selectedModel: string) => {
    removeItem(itemId, selectedBrand, selectedModel);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate loading state
    setTimeout(() => {
      navigate('/checkout');
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ShoppingBag size={24} className="text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Your Shopping Cart</h1>
          </div>
          <Link
            to="/category/mobile-skins"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {state.items.length === 0 ? (
              <EmptyCart variant="page" />
            ) : (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <AnimatePresence>
                    {state.items.map((item) => (
                      <motion.div
                        key={`${item._id}-${item.selectedBrand}-${item.selectedModel}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.selectedBrand} {item.selectedModel}
                          </p>
                          <div className="mt-2">
                            <QuantityControl
                              quantity={item.quantity}
                              onIncrease={() => handleQuantityChange(item._id, item.quantity + 1, item.selectedBrand, item.selectedModel)}
                              onDecrease={() => handleQuantityChange(item._id, item.quantity - 1, item.selectedBrand, item.selectedModel)}
                              size="md"
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
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            {state.items.length > 0 && (
              <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  <CartTotals
                    subtotal={state.subtotal || 0}
                    tax={state.tax || 0}
                    total={state.total || 0}
                    layout="page"
                  />
                  
                  {/* Benefits Section */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Package size={16} />
                      <span>Free shipping on orders over ₹1000</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck size={16} />
                      <span>Fast delivery within 3-5 business days</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield size={16} />
                      <span>Easy returns within 7 days</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner />
                        Processing...
                      </>
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
