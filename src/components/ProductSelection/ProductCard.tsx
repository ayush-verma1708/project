import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../../types/types';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

export default function ProductCard({
  product,
  viewMode
}: ProductCardProps) {
  return (
    <div className={`group ${
      viewMode === 'grid' 
        ? 'p-3 md:p-6' 
        : 'p-4 md:p-8 flex flex-col md:flex-row md:gap-8'
    }`}>
      {/* Image Container */}
      <Link 
        to={`/product/${product._id}`}
        className={`block bg-black/[0.02] ${
          viewMode === 'grid' 
            ? 'aspect-square w-full' 
            : 'w-full md:w-80 aspect-square'
        }`}
      >
        <motion.div
          className="w-full h-full relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain p-2"
            loading="lazy"
          />
        </motion.div>
      </Link>

      {/* Content */}
      <div className={`${
        viewMode === 'grid' 
          ? 'mt-3 md:mt-6' 
          : 'mt-4 md:mt-0 flex-1 flex flex-col justify-between min-w-0'
      }`}>
        <div className="min-w-0">
          <Link 
            to={`/product/${product._id}`}
            className="block text-xs md:text-sm tracking-wide text-black/80 hover:text-black transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
          <p className="mt-1 md:mt-2 text-[10px] md:text-xs tracking-wide uppercase text-black/40">
            {product.productType.name}
          </p>
        </div>

        <div className={`${
          viewMode === 'grid' 
            ? 'mt-2 md:mt-4' 
            : ''
        } flex items-center justify-between`}>
          <p className="text-xs md:text-sm tracking-wide font-medium">
            ₹{product.price.toFixed(2)}
          </p>
          <Link
            to={`/product/${product._id}`}
            className="text-[10px] md:text-xs tracking-wide text-black/40 hover:text-black transition-colors ml-3 md:ml-4 shrink-0"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
