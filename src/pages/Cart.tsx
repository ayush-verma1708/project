import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Star, Zap, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productService } from '../api';
import { useQuery } from '@tanstack/react-query';
import { CartItem, Product } from '../types/types';

export function CartPage() {
  const { state, removeItem, updateQuantity } = useCart();

  // Fetch all products for recommendations
  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: productService.getAll,
  });

  // Calculate cart subtotal
  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Decrease item quantity (or remove if quantity is 1)
  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity === 1) {
      removeItem(item._id, item.selectedBrand, item.selectedModel);
    } else {
      updateQuantity(
        item._id,
        item.quantity - 1,
        item.selectedBrand,
        item.selectedModel
      );
    }
  };

  // Remove an item from the cart
  const handleRemoveItem = (item: CartItem) => {
    removeItem(item._id, item.selectedBrand, item.selectedModel);
  };

  // Get recommendations for one cart item based on a price difference of ₹100 or less
  const getBundleRecommendations = (currentItem: CartItem): Product[] => {
    return products.filter(
      (product) =>
        product._id !== currentItem._id &&
        Math.abs(product.price - currentItem.price) <= 100
    );
  };

  // Aggregate recommendations from all cart items and remove duplicates
  const recommendedProducts: Product[] = [];
  state.items.forEach((item) => {
    const recs = getBundleRecommendations(item);
    recs.forEach((rec) => {
      if (!recommendedProducts.some((prod) => prod._id === rec._id)) {
        recommendedProducts.push(rec);
      }
    });
  });

  // Limit the recommended products to a maximum of 4 items
  const limitedRecommendations = recommendedProducts.slice(0, 4);

  // Recommended Product Card component for the "You Might Also Like" section
  const RecommendedProductCard = ({
    product,
    originalProduct,
  }: {
    product: Product;
    originalProduct: CartItem | null;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-60 flex-shrink-0"
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-contain mb-4"
        />
      </div>
      <div className="space-y-2">
        <Link
          to={`/products/${product._id}?bundle=true&originalPrice=${
            originalProduct ? originalProduct.price : product.price
          }`}
          className="font-medium hover:text-blue-600 line-clamp-2"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm">4.5</span>
          <span className="text-gray-500 text-sm ml-2">(1.2k)</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="text-lg font-bold">
              Rs.{(product.price - 100).toFixed(2)}
              <span className="text-gray-500 line-through ml-2 text-sm">
                Rs.{product.price.toFixed(2)}
              </span>
            </div>
            <div className="text-green-600 text-sm flex items-center gap-1">
              <Package size={14} />
              Bundle Discount Applied
            </div>
          </div>
          <Link
            to={`/products/${product._id}?bundle=true&originalPrice=${
              originalProduct ? originalProduct.price : product.price
            }`}
            className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors"
          >
            Select Design
          </Link>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <ShoppingBag size={24} className="text-black" />
            <h1 className="text-2xl font-semibold">
              Your Cart ({state.itemCount})
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Cart Items */}
        <section>
          {state.items.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold mb-4">Your Cart is Empty</h2>
              <Link
                to="/"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {state.items.map((item: CartItem) => (
                  <motion.div
                    key={`${item._id}-${item.selectedBrand}-${item.selectedModel}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="bg-white p-4 rounded-lg shadow-md flex gap-4"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-32 h-32 object-contain"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <Link
                          to={`/products/${item._id}`}
                          className="font-medium hover:text-blue-600"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.selectedBrand}
                      </p>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                          <button
                            onClick={() => handleDecreaseQuantity(item)}
                            className="text-gray-600 hover:text-black disabled:opacity-50"
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity + 1,
                                item.selectedBrand,
                                item.selectedModel
                              )
                            }
                            className="text-gray-600 hover:text-black"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-lg font-bold">
                          Rs.{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* Right Column: Checkout Summary & "You Might Also Like" */}
        <aside className="space-y-8">
          {/* Checkout Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>Rs.{subtotal.toFixed(2)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>Rs.{subtotal.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>

          {/* You Might Also Like */}
          {limitedRecommendations.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">You Might Also Like</h3>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white p-4 rounded-lg shadow-md animate-pulse w-60 flex-shrink-0"
                    >
                      <div className="bg-gray-200 h-48 w-full rounded mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  ))
                ) : isError ? (
                  <div className="text-red-500">
                    Failed to load recommendations
                  </div>
                ) : (
                  limitedRecommendations.map((product) => (
                    <RecommendedProductCard
                      key={product._id}
                      product={product}
                      originalProduct={null}
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { X, ShoppingBag, Star, Zap, Package } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { productService } from '../api';
// import { useQuery } from '@tanstack/react-query';
// import { CartItem, Product } from '../types/types';

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
//       updateQuantity(item._id, item.quantity - 1, item.selectedBrand, item.selectedModel);
//     }
//   };

//   // Remove an item from the cart
//   const handleRemoveItem = (item: CartItem) => {
//     removeItem(item._id, item.selectedBrand, item.selectedModel);
//   };

//   // Get recommendations for one cart item based on price difference of ₹100 or less
//   const getBundleRecommendations = (currentItem: CartItem): Product[] => {
//     return products.filter(
//       (product) =>
//         product._id !== currentItem._id &&
//         Math.abs(product.price - currentItem.price) <= 100
//     );
//   };

//   // Aggregate recommendations from all cart items and remove duplicates
//   const recommendedProducts: Product[] = [];
//   state.items.forEach(item => {
//     const recs = getBundleRecommendations(item);
//     recs.forEach(rec => {
//       if (!recommendedProducts.some(prod => prod._id === rec._id)) {
//         recommendedProducts.push(rec);
//       }
//     });
//   });

//   // Recommended Product Card component for the "You Might Also Like" section
//   const RecommendedProductCard = ({
//     product,
//     originalProduct,
//   }: {
//     product: Product;
//     originalProduct: CartItem | null;
//   }) => (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//     >
//       <div className="relative">
//         <img
//           src={product.images[0]}
//           alt={product.name}
//           className="w-full h-48 object-contain mb-4"
//         />
//       </div>
//       <div className="space-y-2">
//         <Link
//           to={`/products/${product._id}?bundle=true&originalPrice=${
//             originalProduct ? originalProduct.price : product.price
//           }`}
//           className="font-medium hover:text-blue-600 line-clamp-2"
//         >
//           {product.name}
//         </Link>
//         <div className="flex items-center gap-1">
//           <Star size={16} className="text-yellow-400 fill-yellow-400" />
//           <span className="text-sm">4.5</span>
//           <span className="text-gray-500 text-sm ml-2">(1.2k)</span>
//         </div>
//         <div className="flex justify-between items-center">
//           <div className="space-y-1">
//             <div className="text-lg font-bold">
//               Rs.{(product.price - 100).toFixed(2)}
//               <span className="text-gray-500 line-through ml-2 text-sm">
//                 Rs.{product.price.toFixed(2)}
//               </span>
//             </div>
//             <div className="text-green-600 text-sm flex items-center gap-1">
//               <Package size={14} />
//               Bundle Discount Applied
//             </div>
//           </div>
//           <Link
//             to={`/products/${product._id}?bundle=true&originalPrice=${
//               originalProduct ? originalProduct.price : product.price
//             }`}
//             className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors"
//           >
//             Select Design
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-md py-4">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-2">
//             <ShoppingBag size={24} className="text-black" />
//             <h1 className="text-2xl font-semibold">
//               Your Cart ({state.itemCount})
//             </h1>
//           </div>
//         </div>
//       </header>

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
//                         {item.selectedBrand}
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

//         {/* Right Column: Checkout Summary & You Might Also Like */}
//         <aside className="space-y-8">
//           {/* Checkout Summary */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             <div className="flex justify-between mb-2">
//               <span>Subtotal</span>
//               <span>Rs.{subtotal.toFixed(2)}</span>
//             </div>
//             {/* Add additional details such as tax or shipping if needed */}
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
//           {recommendedProducts.length > 0 && (
//             <div>
//               <h3 className="text-xl font-semibold mb-4">You Might Also Like</h3>
//               <div className="grid grid-cols-1 gap-4">
//                 {isLoading ? (
//                   Array.from({ length: 4 }).map((_, i) => (
//                     <div
//                       key={i}
//                       className="bg-white p-4 rounded-lg shadow-md animate-pulse"
//                     >
//                       <div className="bg-gray-200 h-48 w-full rounded mb-4" />
//                       <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
//                       <div className="h-4 bg-gray-200 rounded w-1/2" />
//                     </div>
//                   ))
//                 ) : isError ? (
//                   <div className="text-red-500">
//                     Failed to load recommendations
//                   </div>
//                 ) : (
//                   recommendedProducts.map((product) => (
//                     <RecommendedProductCard
//                       key={product._id}
//                       product={product}
//                       originalProduct={null}
//                     />
//                   ))
//                 )}
//               </div>
//             </div>
//           )}
//         </aside>
//       </main>
//     </div>
//   );
// }
