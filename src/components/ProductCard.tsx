import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  selectedColor?: string;
  showFullDetails?: boolean;
}

export function ProductCard({ product, selectedColor, showFullDetails = false }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the add to cart button
    addItem({ ...product, color: selectedColor });
  };

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${
        showFullDetails ? 'p-6' : ''
      }`}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative pb-[100%]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity" />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-indigo-600">${product.price}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </motion.button>
          </div>
          {showFullDetails && (
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-${
                        i < Math.floor(product.rating) ? 'yellow' : 'gray'
                      }-400`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}