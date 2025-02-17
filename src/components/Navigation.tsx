import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { CartButton } from './CartButton';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
  <nav className="bg-black shadow-md sticky top-0 z-50 border-b border-[#b57c50]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-14">
      {/* Logo */}
      <Link to="/" className="text-3xl font-serif tracking-wide text-[#fef9f3]">
        Mobiiwrap
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex space-x-12 text-sm tracking-wider text-[#fef9f3]">
        <Link to="/" className="hover:text-[#c95f00] transition-colors">HOME</Link>
        <Link to="/category/mobile-skins" className="hover:text-[#c95f00] transition-colors">SHOP</Link>
        <Link to="/about" className="hover:text-[#c95f00] transition-colors">ABOUT</Link>
        <Link to="/blog" className="hover:text-[#c95f00] transition-colors">BLOG</Link>
        <Link to="/contact" className="hover:text-[#c95f00] transition-colors">CONTACT</Link>
      </div>

      {/* Icons */}
      <CartButton />

      {/* Mobile Menu Button */}
      <button className="lg:hidden text-[#fef9f3]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  <motion.div 
    initial={{ height: 0, opacity: 0 }} 
    animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
    className="lg:hidden bg-[#e07a29] border-t border-[#b57c50] overflow-hidden"
  >
    <div className="px-4 py-6 space-y-4 text-[#fef9f3]">
      <Link to="/" className="block hover:text-[#c95f00] transition-colors">HOME</Link>
      <Link to="/category/mobile-skins" className="block hover:text-[#c95f00] transition-colors">SHOP</Link>
      <Link to="/about" className="block hover:text-[#c95f00] transition-colors">ABOUT</Link>
      <Link to="/blog" className="block hover:text-[#c95f00] transition-colors">BLOG</Link>
      <Link to="/contact" className="block hover:text-[#c95f00] transition-colors">CONTACT</Link>
    </div>
  </motion.div>
</nav>

  );
}
