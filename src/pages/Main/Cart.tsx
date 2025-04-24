import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, Package, Truck, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { EmptyCart } from '../../components/Cart/EmptyCart';
import CartTotals from '../../components/Cart/CartTotals';
import { LoadingSpinner } from '../../components/Loading/LoadingSpinner';
import { QuantityControl } from '../../components/Cart/QuantityControl';
import { useState, useEffect } from 'react';

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
    setTimeout(() => {
      navigate('/checkout');
      setIsLoading(false);
    }, 500);
  };

  const calculateCartTotals = () => {
    const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = 0;
    const total = subtotal;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateCartTotals();

  useEffect(() => {
    state.subtotal = subtotal;
    state.tax = tax;
    state.total = total;
  }, [subtotal, tax, total]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} className="text-black" />
            <h1 className="text-2xl font-bold tracking-wide">YOUR CART</h1>
          </div>
          <Link
            to="/category/mobile-skins"
            className="flex items-center gap-2 text-black hover:text-black/70 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium tracking-wide">CONTINUE SHOPPING</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {state.items.length === 0 ? (
              <EmptyCart variant="page" />
            ) : (
              <div className="border border-black/10">
                <div className="p-6">
                  <AnimatePresence>
                    {state.items.map((item) => (
                      <motion.div
                        key={`${item._id}-${item.selectedBrand}-${item.selectedModel}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex items-center gap-6 py-6 border-b border-black/10 last:border-b-0"
                      >
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium tracking-wide">{item.name}</h3>
                          <p className="text-xs text-black/60 mt-1">
                            {item.selectedBrand} {item.selectedModel}
                          </p>
                          <div className="mt-3">
                            <QuantityControl
                              quantity={item.quantity}
                              onIncrease={() => handleQuantityChange(item._id, item.quantity + 1, item.selectedBrand, item.selectedModel)}
                              onDecrease={() => handleQuantityChange(item._id, item.quantity - 1, item.selectedBrand, item.selectedModel)}
                              size="md"
                            />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => handleRemoveItem(item._id, item.selectedBrand, item.selectedModel)}
                            className="text-black/40 hover:text-black mt-3 transition-colors"
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
              <div className="sticky top-12">
                <div className="border border-black/10 p-6">
                  <h2 className="text-sm font-bold tracking-wide mb-6">ORDER SUMMARY</h2>
                  <CartTotals
                    subtotal={subtotal}
                    tax={tax}
                    total={total}
                    layout="page"
                  />
                  
                  {/* Benefits Section */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-xs text-black/60">
                      <Package size={16} />
                      <span>Free shipping on orders</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-black/60">
                      <Truck size={16} />
                      <span>Fast delivery</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-black/60">
                      <Shield size={16} />
                      <span>Easy to Apply</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full mt-8 bg-black text-white py-4 hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner />
                        <span className="text-sm font-medium tracking-wide">PROCESSING...</span>
                      </>
                    ) : (
                      <span className="text-sm font-medium tracking-wide">PROCEED TO CHECKOUT</span>
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
