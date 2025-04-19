import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import type { Product } from '../types/types';

interface TrendingProductProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function TrendingProductCard({ product, onAddToCart, onViewDetails }: TrendingProductProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product._id}`} onClick={() => onViewDetails(product)}>
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-t-lg">
          {product.images && product.images.length > 0 && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Product Category */}
          <div className="text-xs text-gray-500 mb-1">
            {typeof product.productType === 'object' && product.productType !== null 
              ? product.productType.name 
              : "Product"}
          </div>
          
          {/* Product Name */}
          <h3 className="font-medium text-sm md:text-base line-clamp-1 mb-1">
            {product.name}
          </h3>
          
          {/* Ratings */}
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3.5 w-3.5" 
                  viewBox="0 0 20 20" 
                  fill={i < Math.floor(product.rating) ? "currentColor" : (i < Math.ceil(product.rating) ? "currentColor" : "none")}
                  stroke="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">₹{product.price}</span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        onClick={() => onAddToCart(product)}
        className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
      >
        Add to Cart
      </motion.button>
    </motion.div>
  );
} 