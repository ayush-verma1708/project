// CheckoutHeader.tsx
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function CheckoutHeader() {
  return (
    <motion.header 
      className="bg-white shadow-sm p-4 flex justify-between items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link to="/cart" className="text-gray-600 hover:text-black flex items-center">
        <ChevronLeft size={20} /> Back to Cart
      </Link>
    </motion.header>
  );
}