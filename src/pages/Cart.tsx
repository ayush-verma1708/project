import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItems } from '../components/cartItems/CartItem';
import { EmptyCart } from '../components/cartItems/EmptyCart';
import { CartTotals } from '../components/cartItems/CartTotals';
import { useRecommendations } from '../hook/useRecommendations';
import { RecommendedProducts } from '../components/RecommendedProducts';

export default function CartPage() {
  const { state,  } = useCart();
  const { recommendedProducts, isLoading, isError } = useRecommendations();

  
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        <section>
          {state.items.length === 0 ? (
            <EmptyCart variant="page" />
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {state.items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.selectedBrand}-${item.selectedModel}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                  >
                    <CartItems item={item} layout="full" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        <aside className="space-y-8">
          {state.items.length > 0 && (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <CartTotals 
                  subtotal={state.subtotal || 0} 
                  tax={state.tax || 0} 
                  total={state.total || 0} 
                  layout="page" 
                />
                <Link
                  to="/checkout"
                  className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Proceed to Checkout
                </Link>
              </div>

                {/* Recommended Products Section
                {recommendedProducts.length > 0 && (
                <RecommendedProducts products={recommendedProducts} isLoading={isLoading} isError={isError} />
              )} */}
            </>
          )}
        </aside>
      </main>
    </div>
  );
}
