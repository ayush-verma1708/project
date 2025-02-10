import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Package } from "lucide-react";
import { Product } from "../types/types";

interface RecommendedProductsProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

const RecommendedProductCard = ({ product }: { product: Product }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-60 flex-shrink-0"
  >
    <div className="relative">
    <Link
          to={`/products/${product._id}?bundle=true&originalPrice=${product.price}`}
          className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors"
        >
                  </Link>
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
    </div>
    <div className="space-y-2">
      <Link
        to={`/products/${product._id}?bundle=true&originalPrice=${product.price}`}
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
       
      </div>
    </div>
  </motion.div>
);

export function RecommendedProducts({ products, isLoading, isError }: RecommendedProductsProps) {
  return (
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
          <div className="text-red-500">Failed to load recommendations</div>
        ) : (
          products.map((product) => <RecommendedProductCard key={product._id} product={product} />)
        )}
      </div>
    </div>
  );
}
