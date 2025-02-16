import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, ShoppingCart, Heart } from 'lucide-react';
import { CartButton } from './CartButton';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // <nav className="fixed w-full top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
 <nav className="bg-white shadow-md sticky top-0 z-50">
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="text-3xl font-serif tracking-wide text-olive">
            Mobiiwrap
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-12 text-sm tracking-wider">
            <Link to="/" className="hover:text-sage transition-colors">HOME</Link>
            <Link to="/category/mobile-skins" className="hover:text-sage transition-colors">SHOP</Link>
            <Link to="/about" className="hover:text-sage transition-colors">ABOUT</Link>
            <Link to="/blog" className="hover:text-sage transition-colors">BLOG</Link>
            <Link to="/contact" className="hover:text-sage transition-colors">CONTACT</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <CartButton />
            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }} 
        animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="lg:hidden bg-white border-t overflow-hidden"
      >
        <div className="px-4 py-6 space-y-4">
          <Link to="/" className="block hover:text-sage transition-colors">HOME</Link>
          <Link to="/shop" className="block hover:text-sage transition-colors">SHOP</Link>
          <Link to="/about" className="block hover:text-sage transition-colors">ABOUT</Link>
          <Link to="/blog" className="block hover:text-sage transition-colors">BLOG</Link>
          <Link to="/contact" className="block hover:text-sage transition-colors">CONTACT</Link>
        </div>
      </motion.div>
    </nav>
  );
}
