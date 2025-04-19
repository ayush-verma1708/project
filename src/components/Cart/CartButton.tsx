// CartButton.tsx
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import { useCart } from '../context/CartContext';

import { useCart } from '../../context/CartContext';
import { MiniCart } from './MiniCart';

export const CartButton = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useCart();

  // Expose the openMiniCart method to the parent component
  useImperativeHandle(ref, () => ({
    openMiniCart: () => {
      setIsOpen(true);
    },
    closeMiniCart: () => {
      setIsOpen(false);
    }
  }));

  return (
    <>
      {/* <button
        onClick={(e) => { 
          e.stopPropagation(); 
          setIsOpen(prev => !prev); // Toggle instead of always opening
        }}
        className={`relative flex items-center justify-center p-2 rounded-md transition-all duration-200 ease-in-out ${
          state.itemCount > 0
            ? 'text-white hover:bg-primary-dark'
            : 'text-neutral-600 hover:bg-primary-dark'
        }`}
        aria-expanded={isOpen}
        aria-label={`Shopping cart with ${state.itemCount} items`}
      >
        <ShoppingBag size={24} />*/}
      <button
  onClick={(e) => { 
    e.stopPropagation(); 
    setIsOpen(prev => !prev);
  }}
  className={`relative flex items-center justify-center p-2 rounded-md transition-all duration-200 ease-in-out ${
    state.itemCount > 0
      ? 'text-black hover:bg-primary-dark'  // Change text-white to text-black
      : 'text-neutral-600 hover:bg-primary-dark'
  }`}
  aria-expanded={isOpen}
  aria-label={`Shopping cart with ${state.itemCount} items`}
>
  <ShoppingBag size={24} className="text-current" /> {/* Ensures it takes the text color */}

      <AnimatePresence> 
          {state.itemCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
            >
              {state.itemCount}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <MiniCart 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        key="mini-cart" // Add key to prevent premature unmounting
      />
    </>
  );
});


// // CartButton.tsx
// import { forwardRef, useImperativeHandle, useState } from 'react';
// import { ShoppingBag } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useCart } from '../context/CartContext';
// import { MiniCart } from './MiniCart';

// export const CartButton = forwardRef((props, ref) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { state } = useCart();

//   // Expose the openMiniCart method to the parent component
//   useImperativeHandle(ref, () => ({
//     openMiniCart: () => {
//       setIsOpen(true);
//     },
//   }));

//   return (
//     <>
//       <button
//   onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
//   className={`relative flex items-center justify-center p-2 rounded-md transition-all duration-200 ease-in-out ${
//     state.itemCount > 0
//       ? ' text-white hover:bg-primary-dark'
//       : ' text-neutral-600 hover:bg-neutral-300'
//   }`}
// >
//   <ShoppingBag size={24} />
//   <AnimatePresence>
//     {state.itemCount > 0 && (
//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0 }}
//         className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
//       >
//         {state.itemCount}
//       </motion.div>
//     )}
//   </AnimatePresence>
// </button>
//       <MiniCart isOpen={isOpen} onClose={() => setIsOpen(false)} />
//     </>
//   );
// });

// import { ShoppingCart } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useCart } from '../../context/CartContext';

// export function CartButton() {
//   const { getTotalItems } = useCart();
//   const itemCount = getTotalItems();

//   return (
//     <Link 
//       to="/cart" 
//       className="relative text-gray-700 hover:text-orange-500 transition-colors"
//       aria-label="Shopping Cart"
//     >
//       <ShoppingCart className="w-5 h-5" />
//       {itemCount > 0 && (
//         <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//           {itemCount}
//         </span>
//       )}
//     </Link>
//   );
// } 