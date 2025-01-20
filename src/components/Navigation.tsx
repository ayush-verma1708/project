import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Search, User } from 'lucide-react';
import { CartButton } from './CartButton';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl font-bold text-indigo-600"
              >
                MobiiWrap
              </motion.div>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">
              About
            </Link>
            <button className="text-gray-700 hover:text-indigo-600 transition-colors">
              <Search size={20} />
            </button>
            <CartButton />
            <Link to="/account" className="text-gray-700 hover:text-indigo-600 transition-colors">
              <User size={20} />
            </Link>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto' } : { height: 0 }}
        className="sm:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/products"
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
          >
            About
          </Link>
          <Link
            to="/cart"
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Cart
          </Link>
          <Link
            to="/account"
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Account
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}