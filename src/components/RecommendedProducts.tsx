import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Package, ChevronLeft, ChevronRight, Sparkles, Timer } from 'lucide-react';
import { Product } from '../types/types';

interface RecommendedProductsProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

const RecommendedProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const discountPercentage = ((product.price - (product.price - 100)) / product.price * 100).toFixed(0);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 w-72 flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     

      {/* Image Section */}
      <Link to={`/products/${product._id}?bundle=true&originalPrice=${product.price}`}>
        <div className="relative overflow-hidden rounded-t-xl h-64">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain transform transition-transform duration-700"
            animate={{ scale: isHovered ? 1.05 : 1 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <Link
          to={`/products/${product._id}?bundle=true&originalPrice=${product.price}`}
          className="block"
        >
          <h3 className="font-semibold text-lg line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Ratings */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={`${
                  star <= 4.5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">4.5</span>
          <span className="text-sm text-gray-500">(1.2k reviews)</span>
        </div>

        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-600">
              Rs.{(product.price - 100).toFixed(2)}
            </span>
            <span className="text-gray-500 line-through text-sm">
              Rs.{product.price.toFixed(2)}
            </span>
            <span className="text-green-500 font-medium text-sm">
              {discountPercentage}% OFF
            </span>
          </div>

          {/* Bundle Info */}
          <div className="text-green-600 text-sm flex items-center gap-1">
            <Package size={14} className="animate-bounce" />
            Special Bundle Price
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg
                     font-medium shadow-lg hover:shadow-blue-200/50 transition-shadow"
        >
          View Bundle Deal
        </motion.button>
      </div>
    </motion.div>
  );
};

export function RecommendedProducts({ products, isLoading, isError }: RecommendedProductsProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(containerRef.current.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="relative py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Complete Your Style</h3>
          <p className="text-gray-600 mt-1">Exclusive bundle deals you'll love</p>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg text-gray-700
                     transition-all duration-200"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg text-gray-700
                     transition-all duration-200"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
      >
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md animate-pulse w-72 flex-shrink-0"
            >
              <div className="bg-gray-200 h-64 w-full rounded-lg mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-8 bg-gray-200 rounded w-full mt-4" />
              </div>
            </div>
          ))
        ) : isError ? (
          <div className="text-red-500 text-center w-full py-8">
            Failed to load recommendations. Please try again later.
          </div>
        ) : (
          products.map((product) => (
            <RecommendedProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Star, Package } from "lucide-react";
// import { Product } from "../types/types";

// interface RecommendedProductsProps {
//   products: Product[];
//   isLoading: boolean;
//   isError: boolean;
// }

// const RecommendedProductCard = ({ product }: { product: Product }) => (
//   <motion.div
//     whileHover={{ scale: 1.02 }}
//     className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-60 flex-shrink-0"
//   >
//     <div className="relative">
//     <Link
//           to={`/products/${product._id}?bundle=true&originalPrice=${product.price}`}
//           className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors"
//         >
//                   </Link>
//       <img
//         src={product.images[0]}
//         alt={product.name}
//         className="w-full h-48 object-contain mb-4"
//       />
//     </div>
//     <div className="space-y-2">
//       <Link
//         to={`/products/${product._id}?bundle=true&originalPrice=${product.price}`}
//         className="font-medium hover:text-blue-600 line-clamp-2"
//       >
//         {product.name}
//       </Link>
//       <div className="flex items-center gap-1">
//         <Star size={16} className="text-yellow-400 fill-yellow-400" />
//         <span className="text-sm">4.5</span>
//         <span className="text-gray-500 text-sm ml-2">(1.2k)</span>
//       </div>
//       <div className="flex justify-between items-center">
//         <div className="space-y-1">
//           <div className="text-lg font-bold">
//             Rs.{(product.price - 100).toFixed(2)}
//             <span className="text-gray-500 line-through ml-2 text-sm">
//               Rs.{product.price.toFixed(2)}
//             </span>
//           </div>
//           <div className="text-green-600 text-sm flex items-center gap-1">
//             <Package size={14} />
//             Bundle Discount Applied
//           </div>
//         </div>
       
//       </div>
//     </div>
//   </motion.div>
// );

// export function RecommendedProducts({ products, isLoading, isError }: RecommendedProductsProps) {
//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4">You Might Also Like</h3>
//       <div className="flex space-x-4 overflow-x-auto pb-2">
//         {isLoading ? (
//           Array.from({ length: 4 }).map((_, i) => (
//             <div
//               key={i}
//               className="bg-white p-4 rounded-lg shadow-md animate-pulse w-60 flex-shrink-0"
//             >
//               <div className="bg-gray-200 h-48 w-full rounded mb-4" />
//               <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
//               <div className="h-4 bg-gray-200 rounded w-1/2" />
//             </div>
//           ))
//         ) : isError ? (
//           <div className="text-red-500">Failed to load recommendations</div>
//         ) : (
//           products.map((product) => <RecommendedProductCard key={product._id} product={product} />)
//         )}
//       </div>
//     </div>
//   );
// }
