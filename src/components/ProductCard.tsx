import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types/types';

interface ProductCardProps {
  product: Product;
  selectedColor?: string;
  showFullDetails?: boolean;
}

export function ProductCard({ product, selectedColor, showFullDetails = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [loaded, setLoaded] = useState(false);
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior (e.g., navigation) when clicking the button
  };

  const handleImageRef = (node: HTMLImageElement) => {
    if (node?.complete && node.naturalWidth !== 0) {
      setLoaded(true);
    }
    setImgRef(node);
  };

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${
        showFullDetails ? 'p-6' : 'h-full flex flex-col'
      }`}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      // Scroll animation trigger
      whileInView={{ opacity: 1, y: 0 }} // This ensures it comes in smoothly on scroll
      // initial={{ opacity: 0, y: 50 }} // Starts from a lower position and fades in
      viewport={{ once: true }} // Trigger the animation only once when it's in view
    >
      <Link to={`/products/${product._id}`} className="block flex-1 flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <img
            ref={handleImageRef}
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`w-full h-full object-contain transition-transform duration-300 ${
              loaded ? 'opacity-100 hover:scale-105' : 'opacity-0'
            }`}
            onLoad={() => setLoaded(true)}
          />
          {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>

          <div className="mt-auto flex justify-between items-center">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            <Link to={`/products/${product._id}`} className="block">
              <button
                onClick={handleAddToCart}
                className="p-2 text-white bg-blue-500 rounded-md"
              >
                <ShoppingCart size={20} />
              </button>
            </Link>
          </div>

          {showFullDetails && (
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-${i < Math.floor(product.rating) ? 'yellow' : 'gray'}-400`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

// import React ,{useState} from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { ShoppingCart } from 'lucide-react';
// import type { Product } from '../types/types';

// interface ProductCardProps {
//   product: Product;
//   selectedColor?: string;
//   showFullDetails?: boolean;
// }

// export function ProductCard({ product, selectedColor, showFullDetails = false }: ProductCardProps) {
//   const { addItem } = useCart();
//   const [loaded, setLoaded] = useState(false);
//   const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault(); // Prevent default behavior (e.g., navigation) when clicking the button
//   };
//   const handleImageRef = (node: HTMLImageElement) => {
//     if (node?.complete && node.naturalWidth !== 0) {
//       setLoaded(true);
//     }
//     setImgRef(node);
//   };

//   return (
//     <motion.div
//     className={`bg-white rounded-lg shadow-lg overflow-hidden ${
//       showFullDetails ? 'p-6' : 'h-full flex flex-col'
//     }`}
//     whileHover={{ y: -8 }}
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//   >
//     <Link to={`/products/${product._id}`} className="block flex-1 flex flex-col">
//       <div className="relative aspect-square overflow-hidden">
//       <img
//             ref={handleImageRef}
//             src={product.images[0]}
//             alt={product.name}
//             loading="lazy"
//             decoding="async"
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className={`w-full h-full object-contain transition-transform duration-300 ${
//               loaded ? 'opacity-100 hover:scale-105' : 'opacity-0'
//             }`}
//             onLoad={() => setLoaded(true)}
//           />
//         {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
//       </div>
//       <div className="p-4 flex-1 flex flex-col">
//         <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
//         <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
        
//         <div className="mt-auto flex justify-between items-center">
//           <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
//           <Link to={`/products/${product._id}`} className="block ">
//   <button
//     onClick={handleAddToCart}
//     className="p-2 text-white bg-blue-500 rounded-md"
//   >
//             <ShoppingCart size={20} />
//           </button>
//           </Link>
//         </div>

//           {showFullDetails && (
//             <div className="mt-4">
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <span
//                       key={i}
//                       className={`text-${
//                         i < Math.floor(product.rating) ? 'yellow' : 'gray'
//                       }-400`}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//                 <span className="text-gray-600">
//                   ({product.reviews} reviews)
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>
//       </Link>
//     </motion.div>
//   );
// }