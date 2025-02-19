import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { CartButton } from '../CartButton';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackgroundClass = isScrolled
    ? "bg-[#333333] shadow-md"
    : "bg-transparent";

    const navStyle = {
        backgroundColor: isScrolled ? '#333333' : isHovered ? 'rgba(51, 51, 51, 0.8)' : 'transparent',
        backdropFilter: isHovered || isScrolled ? 'blur(8px)' : 'none',
        top: '40px',  // Ensure it starts at the top
        position: 'fixed',
        width: '100%',
      };

  return (
    <motion.nav
    className={`fixed w-full z-50 transition-colors duration-300 ${navBackgroundClass}`}
    style={navStyle}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    animate={{
      backgroundColor: isScrolled ? '#333333' : isHovered ? 'rgba(51, 51, 51, 0.8)' : 'transparent',
      y: isHovered || isScrolled ? 0 : 0,  // Prevent shifting
    }}
    transition={{ duration: 0.3 }}
  >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isScrolled ? 1 : 0.7 }}
          >
            <Link to="/" className="text-3xl font-serif tracking-wide text-[#F5F5F5]">
              Mobiiwrap
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div
            className="hidden lg:flex space-x-12 text-sm tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isScrolled ? 1 : 0.7 }}
          >
            {['HOME', 'SHOP', 'ABOUT', 'BLOG', 'CONTACT'].map((item) => (
              <Link
                key={item}
                to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                className="text-[#F5F5F5] hover:text-[#c95f00] transition-colors relative group"
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c95f00]"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            ))}
          </motion.div>

          {/* Cart Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isScrolled ? 1 : 0.7 }}
          >
            <CartButton />
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-[#F5F5F5]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isScrolled ? 1 : 0.7 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#333333]/90 backdrop-blur-sm border-t border-[#B0AFAF] overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 text-[#F5F5F5]">
              {['HOME', 'SHOP', 'ABOUT', 'BLOG', 'CONTACT'].map((item) => (
                <Link
                  key={item}
                  to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                  className="block hover:text-[#c95f00] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navigation;