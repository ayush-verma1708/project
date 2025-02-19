import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/BreadCrumble/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { CartItems } from '../components/cartItems/CartItem';
import { EmptyCart } from '../components/cartItems/EmptyCart';
import { CartTotals } from '../components/cartitems/CartTotals';

export default function CartPage() {
  const { state } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs Component */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumbs />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        {/* Cart Items Section */}
        <section>
          <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
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
              {/* Continue Shopping Link */}
              <div className="mt-4">
                <Link
                  to="/category/mobile-skins"
                  className="text-blue-600 hover:underline text-sm"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Order Summary & Checkout Section */}
        <aside className="space-y-8">
          {state.items.length > 0 && (
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
                className="block mt-6 text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { CartItems } from '../components/cartItems/CartItem';
// import { EmptyCart } from '../components/cartItems/EmptyCart';
// import { CartTotals } from '../components/cartItems/CartTotals';

// export default function CartPage() {
//   const { state,  } = useCart();

  
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <main className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
//         <section>
          
//           {state.items.length === 0 ? (
//             <EmptyCart variant="page" />
//           ) : (
//             <div className="space-y-4">
//               <AnimatePresence>
//                 {state.items.map((item) => (
//                   <motion.div
//                     key={`${item.id}-${item.selectedBrand}-${item.selectedModel}`}
//                     layout
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, x: -50 }}
//                   >
//                     <CartItems item={item} layout="full" />
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           )}
//         </section>

//         <aside className="space-y-8">
//           {state.items.length > 0 && (
//             <>
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//                 <CartTotals 
//                   subtotal={state.subtotal || 0} 
//                   tax={state.tax || 0} 
//                   total={state.total || 0} 
//                   layout="page" 
//                 />
//                 <Link
//                   to="/checkout"
//                   className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//                 >
//                   Proceed to Checkout
//                 </Link>
//               </div>

//             </>
//           )}
//         </aside>
//       </main>
//     </div>
//   );
// }
