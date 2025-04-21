import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  instagramLink?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onViewDetails: () => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={`/product/${product._id}`} onClick={onViewDetails}>
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-lg font-light tracking-wide mb-2">
          {product.name}
        </h3>
              <p className="text-white text-sm tracking-wider">
                ₹{product.price}
              </p>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="mt-4">
        <button
          onClick={onAddToCart}
          className="w-full bg-black text-white py-3 text-sm tracking-wider hover:bg-white hover:text-black border border-black transition-all duration-300"
        >
          ADD TO CART
        </button>
      </div>
    </motion.div>
  );
}
