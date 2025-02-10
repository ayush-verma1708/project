import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItems } from '../components/cartItems/CartItem';
import { EmptyCart } from '../components/cartItems/EmptyCart';
import { CartTotals } from '../components/cartItems/CartTotals';
import { useRecommendations } from '../hook/useRecommendations';
import { RecommendedProducts } from '../components/RecommendedProducts';

export function CartPage() {
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
                    key={`${item._id}-${item.selectedBrand}-${item.selectedModel}`}
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

                {/* Recommended Products Section */}
                {recommendedProducts.length > 0 && (
                <RecommendedProducts products={recommendedProducts} isLoading={isLoading} isError={isError} />
              )}
            </>
          )}
        </aside>
      </main>
    </div>
  );
}





// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { X, ShoppingBag, Star,  Package } from 'lucide-react';
// import { productService } from '../api';
// import { useQuery } from '@tanstack/react-query';
// import { CartItem, Product } from '../types/types';
// import { useCart } from '../context/CartContext';
// import { RecommendedProducts } from '../components/RecommendedProducts'; // Import the new component

// export function CartPage() {
//   const { state, removeItem, updateQuantity } = useCart();

//   // Fetch all products for recommendations
//   const { data: products = [], isLoading, isError } = useQuery<Product[]>({
//     queryKey: ['products'],
//     queryFn: productService.getAll,
//   });

//   // Calculate cart subtotal
//   const subtotal = state.items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   // Decrease item quantity (or remove if quantity is 1)
//   const handleDecreaseQuantity = (item: CartItem) => {
//     if (item.quantity === 1) {
//       removeItem(item._id, item.selectedBrand, item.selectedModel);
//     } else {
//       updateQuantity(
//         item._id,
//         item.quantity - 1,
//         item.selectedBrand,
//         item.selectedModel
//       );
//     }
//   };

//   // Remove an item from the cart
//   const handleRemoveItem = (item: CartItem) => {
//     removeItem(item._id, item.selectedBrand, item.selectedModel);
//   };

//   // Get recommendations for one cart item based on a price difference of ₹100 or less
//   const getBundleRecommendations = (currentItem: CartItem): Product[] => {
//     return products.filter(
//       (product) =>
//         product._id !== currentItem._id &&
//         Math.abs(product.price - currentItem.price) <= 100
//     );
//   };

//   // Aggregate recommendations from all cart items and remove duplicates
//   const recommendedProducts: Product[] = [];
//   state.items.forEach((item) => {
//     const recs = getBundleRecommendations(item);
//     recs.forEach((rec) => {
//       if (!recommendedProducts.some((prod) => prod._id === rec._id)) {
//         recommendedProducts.push(rec);
//       }
//     });
//   });

//   // Limit the recommended products to a maximum of 4 items
//   const limitedRecommendations = recommendedProducts.slice(0, 4);


//   return (
//     <div className="min-h-screen bg-gray-50">
    

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Left Column: Cart Items */}
//         <section>
//           {state.items.length === 0 ? (
//             <div className="bg-white p-8 rounded-lg shadow-md text-center">
//               <h2 className="text-xl font-semibold mb-4">Your Cart is Empty</h2>
//               <Link
//                 to="/"
//                 className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Continue Shopping
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <AnimatePresence>
//                 {state.items.map((item: CartItem) => (
//                   <motion.div
//                     key={`${item._id}-${item.selectedBrand}-${item.selectedModel}`}
//                     layout
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, x: -50 }}
//                     className="bg-white p-4 rounded-lg shadow-md flex gap-4"
//                   >
//                     <img
//                       src={item.images[0]}
//                       alt={item.name}
//                       className="w-32 h-32 object-contain"
//                     />
//                     <div className="flex-1">
//                       <div className="flex justify-between">
//                         <Link
//                           to={`/products/${item._id}`}
//                           className="font-medium hover:text-blue-600"
//                         >
//                           {item.name}
//                         </Link>
//                         <button
//                           onClick={() => handleRemoveItem(item)}
//                           className="text-gray-400 hover:text-red-500"
//                         >
//                           <X size={20} />
//                         </button>
//                       </div>
//                       <p className="text-sm text-gray-500 mt-1">
//                         {item.selectedBrand} - {item.selectedModel}
//                       </p>
//                       <div className="flex items-center gap-4 mt-4">
//                         <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
//                           <button
//                             onClick={() => handleDecreaseQuantity(item)}
//                             className="text-gray-600 hover:text-black disabled:opacity-50"
//                             disabled={item.quantity === 1}
//                           >
//                             -
//                           </button>
//                           <span className="w-8 text-center">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() =>
//                               updateQuantity(
//                                 item._id,
//                                 item.quantity + 1,
//                                 item.selectedBrand,
//                                 item.selectedModel
//                               )
//                             }
//                             className="text-gray-600 hover:text-black"
//                           >
//                             +
//                           </button>
//                         </div>
//                         <span className="text-lg font-bold">
//                           Rs.{(item.price * item.quantity).toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           )}
//         </section>

//         {/* Right Column: Checkout Summary & "You Might Also Like" */}
//         <aside className="space-y-8">
//           {/* Checkout Summary */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             <div className="flex justify-between mb-2">
//               <span>Subtotal</span>
//               <span>Rs.{subtotal.toFixed(2)}</span>
//             </div>
//             <hr className="my-4" />
//             <div className="flex justify-between font-bold text-lg mb-4">
//               <span>Total</span>
//               <span>Rs.{subtotal.toFixed(2)}</span>
//             </div>
//             <Link
//               to="/checkout"
//               className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Proceed to Checkout
//             </Link>
//           </div>

//           {/* You Might Also Like */}
//           {limitedRecommendations.length > 0 && (
//   <RecommendedProducts 
//     products={limitedRecommendations} 
//     isLoading={isLoading} 
//     isError={isError} 
//   />
// )}
      
//         </aside>

//       </main>
//     </div>
//   );
// }

// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { CartItem } from '../components/cartItems/CartItem';
// import { EmptyCart } from '../components/cartItems/EmptyCart';
// import { CartTotals } from '../components/cartItems/CartTotals';
// import { RecommendedProducts } from '../components/RecommendedProducts'; // Import the new component
// import { productService } from '../api';


//   // Get recommendations for one cart item based on a price difference of ₹100 or less
//   const getBundleRecommendations = (currentItem: CartItem): Product[] => {
//     return products.filter(
//       (product) =>
//         product._id !== currentItem._id &&
//         Math.abs(product.price - currentItem.price) <= 100
//     );
//   };

//   // Aggregate recommendations from all cart items and remove duplicates
//   const recommendedProducts: Product[] = [];
//   state.items.forEach((item) => {
//     const recs = getBundleRecommendations(item);
//     recs.forEach((rec) => {
//       if (!recommendedProducts.some((prod) => prod._id === rec._id)) {
//         recommendedProducts.push(rec);
//       }
//     });
//   });

//   // Limit the recommended products to a maximum of 4 items
//   const limitedRecommendations = recommendedProducts.slice(0, 4);




// export function CartPage() {
//     const { state, removeItem, updateQuantity } = useCart();
  
//     // Fetch all products for recommendations
//     const { data: products = [], isLoading, isError } = useQuery<Product[]>({
//       queryKey: ['products'],
//       queryFn: productService.getAll,
//     });
  
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
//                     key={`${item._id}-${item.selectedBrand}-${item.selectedModel}`}
//                     layout
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, x: -50 }}
//                   >
//                     <CartItem item={item} layout="full" />
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
//                   subtotal={state.subtotal} 
//                   tax={state.tax} 
//                   total={state.total} 
//                   layout="page" 
//                 />
//                 <Link
//                   to="/checkout"
//                   className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//                 >
//                   Proceed to Checkout
//                 </Link>
//               </div>
//              {/* You Might Also Like */}

//            {limitedRecommendations.length > 0 && (
//   <RecommendedProducts 
//     products={limitedRecommendations} 
//     isLoading={isLoading} 
//     isError={isError} 
//   />
// )}

//             </>
//           )}
//         </aside>
//       </main>
//     </div>
//   );
// }
