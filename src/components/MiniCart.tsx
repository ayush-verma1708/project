import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { CartItems } from '../components/cartItems/CartItem';
import { EmptyCart } from '../components/cartItems/EmptyCart';
import { CartTotals } from '../components/cartItems/CartTotals';
import { useRecommendations } from '../hook/useRecommendations';
import { RecommendedProducts } from '../components/RecommendedProducts';

export function MiniCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { state } = useCart();
  const { recommendedProducts, isLoading, isError } = useRecommendations();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex-none p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} />
              <h2 className="text-lg font-semibold">Your Cart ({state.items.length})</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content: Cart Items and Recommendations */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {state.items.length === 0 ? (
              <EmptyCart onClose={onClose} variant="mini" />
            ) : (
              <AnimatePresence>
                {state.items.map((item) => (
                  <motion.div
                    key={`${item._id}-${item.selectedBrand}-${item.selectedModel}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CartItems item={item} layout="mini" />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Recommended Products placed after cart items */}
            {recommendedProducts.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">You might also like</h3>
                <RecommendedProducts
                  products={recommendedProducts}
                  isLoading={isLoading}
                  isError={isError}
                  layout="mini"
                />
              </div>
            )}
          </div>

          {/* Footer: Checkout Totals */}
          <div className="flex-none border-t p-4 space-y-4">
            <CartTotals
              subtotal={state.subtotal}
              tax={state.tax}
              total={state.total}
              layout="mini"
            />
            <Link
              to="/checkout"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Checkout <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// import { motion, AnimatePresence } from 'framer-motion';
// import { ShoppingBag, X, ChevronRight } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { Link } from 'react-router-dom';
// import { CartItems } from '../components/cartItems/CartItem';
// import { EmptyCart } from '../components/cartItems/EmptyCart';
// import { CartTotals } from '../components/cartItems/CartTotals';
// import { useRecommendations } from '../hook/useRecommendations';
// import { RecommendedProducts } from '../components/RecommendedProducts';

// export function MiniCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
//   const { state } = useCart();
//   const { recommendedProducts, isLoading, isError } = useRecommendations();


//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, x: 300 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: 300 }}
//           className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50"
//         >
//           <div className="flex flex-col h-full">
//             <div className="flex justify-between items-center p-4 border-b">
//               <div className="flex items-center gap-2">
//                 <ShoppingBag size={20} />
//                 <h2 className="text-lg font-semibold">Your Cart ({state.items.length})</h2>
//               </div>
//               <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {state.items.length === 0 ? (
//                 <EmptyCart onClose={onClose} variant="mini" />
//               ) : (
//                 <AnimatePresence>
//                   {state.items.map((item) => (
//                     <motion.div
//                       key={`${item._id}-${item.selectedBrand}-${item.selectedModel}`}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                     >
//                       <CartItems item={item} layout="mini" />
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               )}
//             </div>

//             {state.items.length > 0 && (
//               <div className="border-t p-4 space-y-4">
//                 <CartTotals 
//                   subtotal={state.subtotal} 
//                   tax={state.tax} 
//                   total={state.total} 
//                   layout="mini" 
//                 />
//                 <Link
//                   to="/checkout"
//                   onClick={onClose}
//                   className="flex items-center justify-center gap-2 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
//                 >
//                   Checkout <ChevronRight size={16} />
//                 </Link>
//               </div>
//             )}

//  {/* Recommended Products in Mini Cart */}
//  {recommendedProducts.length > 0 && (
//               <div className="border-t p-4">
//                 <h3 className="text-lg font-semibold mb-2">You might also like</h3>
//                 <RecommendedProducts products={recommendedProducts} isLoading={isLoading} isError={isError} layout="mini" />
//               </div>
//             )}

//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



// // import { motion, AnimatePresence } from 'framer-motion';
// // import { ShoppingBag, X, ChevronRight } from 'lucide-react';
// // import { Link } from 'react-router-dom';
// // import { useCart } from '../context/CartContext';
// // // If using TypeScript, you might import the CartItem type:
// // // import { CartItem } from '../types/types';

// // export function MiniCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
// //   const { state, removeItem, updateQuantity } = useCart();

// //   // Group items by product id, selected brand, and selected model
// //   const groupedItems = Object.values(
// //     state.items.reduce((acc, item) => {
// //       // Use a key that uniquely identifies similar items.
// //       const key = `${item._id}-${item.selectedBrand}-${item.selectedModel}`;
// //       if (acc[key]) {
// //         // Increase quantity for duplicate items.
// //         acc[key].quantity += item.quantity;
// //       } else {
// //         acc[key] = { ...item };
// //       }
// //       return acc;
// //     }, {} as { [key: string]: any })
// //   );

// //   const handleDecreaseQuantity = (item: any) => {
// //     if (item.quantity === 1) {
// //       // Remove the item if quantity is 1.
// //       removeItem(item._id, item.selectedBrand, item.selectedModel);
// //     } else {
// //       updateQuantity(item._id, item.quantity - 1, item.selectedBrand, item.selectedModel);
// //     }
// //   };

// //   const handleRemoveItem = (item: any) => {
// //     removeItem(item._id, item.selectedBrand, item.selectedModel);
// //   };

// //   return (
// //     <AnimatePresence>
// //       {isOpen && (
// //         <motion.div
// //           initial={{ opacity: 0, x: 300 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           exit={{ opacity: 0, x: 300 }}
// //           className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50"
// //         >
// //           <div className="flex flex-col h-full">
// //             {/* Header */}
// //             <div className="flex justify-between items-center p-4 border-b">
// //               <div className="flex items-center gap-2">
// //                 <ShoppingBag size={20} />
// //                 <h2 className="text-lg font-semibold">Your Cart ({state.itemCount})</h2>
// //               </div>
// //               <button
// //                 onClick={onClose}
// //                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
// //                 aria-label="Close cart"
// //               >
// //                 <X size={20} />
// //               </button>
// //             </div>

// //             {/* Cart Items */}
// //             <div
// //               className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
// //               // If the 'scrollbar-hide' utility is not available, add custom CSS:
// //               // style={{ scrollbarWidth: 'none' }} and in Webkit browsers hide with CSS.
// //             >
// //               {groupedItems.length === 0 ? (
// //                 <div className="text-center text-gray-500 py-8">
// //                   Your cart is empty.{' '}
// //                   <Link to="/" onClick={onClose} className="text-black-600 hover:text-black-700">
// //                     Continue Shopping
// //                   </Link>
// //                 </div>
// //               ) : (
// //                 groupedItems.map((item: any) => (
// //                   <motion.div
// //                     key={`${item._id}-${item.selectedBrand}-${item.selectedModel}`}
// //                     layout
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     exit={{ opacity: 0 }}
// //                     className="flex gap-4 bg-gray-50 p-4 rounded-lg"
// //                   >
// //                     <img
// //                       src={item.images[0]}
// //                       alt={item.name}
// //                       className="w-20 h-20 object-cover rounded-md"
// //                     />
// //                     <div className="flex-1">
// //                       <h3 className="font-medium">{item.name}</h3>
// //                       <p className="text-xs text-gray-500">{item.description}</p>
// //                       <p className="text-sm text-blue-500 font-semibold">
// //                         Brand: {item.selectedBrand}
// //                       </p>
// //                       <p className="text-sm text-green-500 font-semibold">
// //                         Model: {item.selectedModel}
// //                       </p>
// //                       <div className="flex items-center gap-2 mt-2">
// //                         <button
// //                           onClick={() => handleDecreaseQuantity(item)}
// //                           className="p-1 hover:bg-gray-200 rounded"
// //                           disabled={item.quantity === 1}
// //                           aria-label="Decrease quantity"
// //                         >
// //                           -
// //                         </button>
// //                         <span className="w-8 text-center">{item.quantity}</span>
// //                         <button
// //                           onClick={() =>
// //                             updateQuantity(item._id, item.quantity + 1, item.selectedBrand, item.selectedModel)
// //                           }
// //                           className="p-1 hover:bg-gray-200 rounded"
// //                           aria-label="Increase quantity"
// //                         >
// //                           +
// //                         </button>
// //                       </div>
// //                     </div>
// //                     <div className="flex flex-col items-end justify-between">
// //                       <button
// //                         onClick={() => handleRemoveItem(item)}
// //                         className="text-gray-400 hover:text-red-500 transition-colors"
// //                         aria-label="Remove item"
// //                       >
// //                         <X size={16} />
// //                       </button>
// //                       <p className="font-medium">
// //                         Rs.{(item.price * item.quantity).toFixed(2)}
// //                       </p>
// //                     </div>
// //                   </motion.div>
// //                 ))
// //               )}
// //             </div>

// //             {/* Footer */}
// //             {groupedItems.length > 0 && (
// //               <div className="border-t p-4 space-y-4">
// //                 <div className="space-y-2">
// //                   <div className="flex justify-between text-sm">
// //                     <span>Subtotal</span>
// //                     <span>Rs.{state.subtotal.toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between text-sm">
// //                     <span>Tax</span>
// //                     <span>Rs.{state.tax.toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between font-semibold">
// //                     <span>Total</span>
// //                     <span>Rs.{state.total.toFixed(2)}</span>
// //                   </div>
// //                 </div>
// //                 <Link
// //                   to="/checkout"
// //                   onClick={onClose}
// //                   className="flex items-center justify-center gap-2 w-full bg-black-600 text-black py-3 rounded-lg hover:bg-black-700 transition-colors"
// //                 >
// //                   Checkout <ChevronRight size={16} />
// //                 </Link>
// //               </div>
// //             )}
// //           </div>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   );
// // }

// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { ShoppingBag, X, ChevronRight } from 'lucide-react';
// // // import { Link } from 'react-router-dom';
// // // import { useCart } from '../context/CartContext';

// // // export function MiniCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
// // //   const { state, removeItem, updateQuantity } = useCart();

// // //   const handleDecreaseQuantity = (item: CartItem) => {
// // //     if (item.quantity === 1) {
// // //       removeItem(item._id, item.selectedBrand, item.selectedModel); // Directly remove the item if quantity is 1
// // //     } else {
// // //       updateQuantity(item._id, item.quantity - 1, item.selectedBrand, item.selectedModel); // Decrease quantity
// // //     }
// // //   };

// // //   const handleRemoveItem = (item: CartItem) => {
// // //     removeItem(item._id, item.selectedBrand, item.selectedModel); // Directly remove the item
// // //   };

// // //   return (
// // //     <AnimatePresence>
// // //       {isOpen && (
// // //         <motion.div
// // //           initial={{ opacity: 0, x: 300 }}
// // //           animate={{ opacity: 1, x: 0 }}
// // //           exit={{ opacity: 0, x: 300 }}
// // //           className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50"
// // //         >
// // //           <div className="flex flex-col h-full">
// // //             {/* Header */}
// // //             <div className="flex justify-between items-center p-4 border-b">
// // //               <div className="flex items-center gap-2">
// // //                 <ShoppingBag size={20} />
// // //                 <h2 className="text-lg font-semibold">Your Cart ({state.itemCount})</h2>
// // //               </div>
// // //               <button
// // //                 onClick={onClose}
// // //                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
// // //                 aria-label="Close cart"
// // //               >
// // //                 <X size={20} />
// // //               </button>
// // //             </div>

// // //             {/* Cart Items */}
// // //             <div className="flex-1 overflow-y-auto p-4 space-y-4">
// // //               {state.items.length === 0 ? (
// // //                 <div className="text-center text-gray-500 py-8">
// // //                   Your cart is empty.{' '}
// // //                   <Link to="/" onClick={onClose} className="text-black-600 hover:text-black-700">
// // //                     Continue Shopping
// // //                   </Link>
// // //                 </div>
// // //               ) : (
// // //                 state.items.map((item) => (
// // //                   <motion.div
// // //                     key={item._id}
// // //                     layout
// // //                     initial={{ opacity: 0 }}
// // //                     animate={{ opacity: 1 }}
// // //                     exit={{ opacity: 0 }}
// // //                     className="flex gap-4 bg-gray-50 p-4 rounded-lg"
// // //                   >
// // //                     <img
// // //                       src={item.images[0]}
// // //                       alt={item.name}
// // //                       className="w-20 h-20 object-cover rounded-md"
// // //                     />
// // //                     <div className="flex-1">
// // //                       <h3 className="font-medium">{item.name}</h3>
// // //                       {/* <p className="text-sm text-gray-500">{item.description}</p> */}
// // //                       <p className="text-xs text-gray-500">{item.description}</p>

// // //                       <p className="text-sm text-blue-500 font-semibold">Brand: {item.selectedBrand}</p>
// // //                       <p className="text-sm text-green-500 font-semibold">Model: {item.selectedModel}</p>
// // //                       <div className="flex items-center gap-2 mt-2">
// // //                         <button
// // //                           onClick={() => handleDecreaseQuantity(item)}
// // //                           className="p-1 hover:bg-gray-200 rounded"
// // //                           disabled={item.quantity === 1}
// // //                           aria-label="Decrease quantity"
// // //                         >
// // //                           -
// // //                         </button>
// // //                         <span className="w-8 text-center">{item.quantity}</span>
// // //                         <button
// // //                           onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedBrand, item.selectedModel)}
// // //                           className="p-1 hover:bg-gray-200 rounded"
// // //                           aria-label="Increase quantity"
// // //                         >
// // //                           +
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                     <div className="flex flex-col items-end justify-between">
// // //                       <button
// // //                         onClick={() => handleRemoveItem(item)}
// // //                         className="text-gray-400 hover:text-red-500 transition-colors"
// // //                         aria-label="Remove item"
// // //                       >
// // //                         <X size={16} />
// // //                       </button>
// // //                       <p className="font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</p>
// // //                     </div>
// // //                   </motion.div>
// // //                 ))
// // //               )}
// // //             </div>

// // //             {/* Footer */}
// // //             {state.items.length > 0 && (
// // //               <div className="border-t p-4 space-y-4">
// // //                 <div className="space-y-2">
// // //                   <div className="flex justify-between text-sm">
// // //                     <span>Subtotal</span>
// // //                     <span>Rs.{state.subtotal.toFixed(2)}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm">
// // //                     <span>Tax</span>
// // //                     <span>Rs.{state.tax.toFixed(2)}</span>
// // //                   </div>
// // //                   <div className="flex justify-between font-semibold">
// // //                     <span>Total</span>
// // //                     <span>Rs.{state.total.toFixed(2)}</span>
// // //                   </div>
// // //                 </div>
// // //                 <Link
// // //                   to="/checkout"
// // //                   onClick={onClose}
// // //                   className="flex items-center justify-center gap-2 w-full bg-black-600 text-black py-3 rounded-lg hover:bg-black-700 transition-colors"
// // //                 >
// // //                   Checkout <ChevronRight size={16} />
// // //                 </Link>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </motion.div>
// // //       )}
// // //     </AnimatePresence>
// // //   );
// // // }
