import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { CartButton } from './CartButton';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const closeMenu = (e) => {
      if (!e.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [isMenuOpen]);
  
  return (
    <>
      <nav 
        className={`bg-[#333333] shadow-md sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "h-16 shadow-lg" : "h-20"
        } border-b border-[#B0AFAF]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-3xl font-serif tracking-wide text-[#F5F5F5] hover:text-[#e07a29] transition-colors"
            >
              Mobiiwrap
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-12 text-sm tracking-wider text-[#F5F5F5]">
              <Link to="/" className="hover:text-[#e07a29] transition-colors relative group">
                HOME
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e07a29] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/category/mobile-skins" className="hover:text-[#e07a29] transition-colors relative group">
                SHOP
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e07a29] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/about" className="hover:text-[#e07a29] transition-colors relative group">
                ABOUT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e07a29] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/blog" className="hover:text-[#e07a29] transition-colors relative group">
                BLOG
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e07a29] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/contact" className="hover:text-[#e07a29] transition-colors relative group">
                CONTACT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e07a29] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
            
            {/* Icons Wrapper */}
            <div className="flex items-center gap-6">
              {/* Search Icon */}
              <button 
                className="text-[#F5F5F5] hover:text-[#e07a29] transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Cart Button - Reusing existing component */}
              <CartButton />
              
              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden text-[#F5F5F5] hover:text-[#e07a29] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu with AnimatePresence */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#3d3d3d] border-t border-[#B0AFAF] overflow-hidden mobile-menu-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-8 space-y-6 text-[#F5F5F5]">
                <Link to="/" className="block hover:text-[#e07a29] transition-colors text-lg font-medium">HOME</Link>
                <Link to="/category/mobile-skins" className="block hover:text-[#e07a29] transition-colors text-lg font-medium">SHOP</Link>
                <Link to="/about" className="block hover:text-[#e07a29] transition-colors text-lg font-medium">ABOUT</Link>
                <Link to="/blog" className="block hover:text-[#e07a29] transition-colors text-lg font-medium">BLOG</Link>
                <Link to="/contact" className="block hover:text-[#e07a29] transition-colors text-lg font-medium">CONTACT</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-full max-w-3xl px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full py-4 px-6 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 text-xl border-2 border-[#e07a29] focus:outline-none focus:ring-2 focus:ring-[#e07a29]"
                  autoFocus
                />
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#e07a29] transition-colors"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-white text-center mt-8 opacity-80">
                Press ESC key or click outside to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Menu, X } from 'lucide-react';
// import { CartButton } from './CartButton';


// export function Navigation() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="bg-[#333333] shadow-md sticky top-0 z-50 border-b border-[#B0AFAF]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-14">
//           {/* Logo */}
//           <Link to="/" className="text-3xl font-serif tracking-wide text-[#F5F5F5]">
//             Mobiiwrap
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex space-x-12 text-sm tracking-wider text-[#F5F5F5]">
//             <Link to="/" className="hover:text-[#c95f00] transition-colors">HOME</Link>
//             <Link to="/category/mobile-skins" className="hover:text-[#c95f00] transition-colors">SHOP</Link>
//             <Link to="/about" className="hover:text-[#c95f00] transition-colors">ABOUT</Link>
//             <Link to="/blog" className="hover:text-[#c95f00] transition-colors">BLOG</Link>
//             <Link to="/contact" className="hover:text-[#c95f00] transition-colors">CONTACT</Link>
//           </div>

//           {/* Icons Wrapper (Ensures Right Alignment in Mobile) */}
//           <div className="flex items-center gap-4">
//             {/* Cart Button */}
//             <CartButton />

//             {/* Mobile Menu Button */}
//             <button className="lg:hidden text-[#F5F5F5]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <motion.div 
//         initial={{ height: 0, opacity: 0 }} 
//         animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
//         className="lg:hidden bg-[#e07a29] border-t border-[#B0AFAF] overflow-hidden"
//       >
//         <div className="px-4 py-6 space-y-4 text-[#F5F5F5]">
//           <Link to="/" className="block hover:text-[#c95f00] transition-colors">HOME</Link>
//           <Link to="/category/mobile-skins" className="block hover:text-[#c95f00] transition-colors">SHOP</Link>
//           <Link to="/about" className="block hover:text-[#c95f00] transition-colors">ABOUT</Link>
//           <Link to="/blog" className="block hover:text-[#c95f00] transition-colors">BLOG</Link>
//           <Link to="/contact" className="block hover:text-[#c95f00] transition-colors">CONTACT</Link>
//         </div>
//       </motion.div>
//     </nav>
//   );
// }
