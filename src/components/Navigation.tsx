import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { CartButton } from './CartButton';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Mock cart count
  
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

  // Close search with ESC key
  useEffect(() => {
    if (!isSearchOpen) return;
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isSearchOpen]);
  
  return (
    <>
      {/* Announcement Bar */}
      {/* <div className="bg-black text-white py-2 text-center text-sm font-light">
        <p>Free shipping on orders over 500INR | 30-day money-back guarantee</p>
      </div> */}
      
      <nav 
        className={`bg-white transition-all duration-300 ${
          scrolled ? "h-16 shadow-md" : "h-20"
        } sticky top-0 z-50 border-b border-gray-100`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                className="text-gray-800 hover:text-black transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
            
            {/* Logo - Centered on Mobile/Tablet, Left on Desktop */}
            <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0">
              <Link 
                to="/" 
                className="text-2xl font-serif tracking-wide text-gray-900 hover:text-black transition-colors"
              >
                <span className="font-bold">MOBIIWRAP</span>
              </Link>
            </div>
            
            {/* Desktop Menu - Hidden on Mobile */}
            <div className="hidden lg:flex space-x-8 text-sm font-medium tracking-wider text-gray-700">
              <Link to="/" className="hover:text-black transition-colors relative group py-2">
                HOME
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
              <div className="relative group">
                <Link to="/category/mobile-skins" className="hover:text-black transition-colors flex items-center gap-1 py-2">
                  SHOP
                  <ChevronDown className="w-4 h-4 opacity-70" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                </Link>
                {/* Shop Dropdown */}
                <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md overflow-hidden border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link to="/category/mobile-skins" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
                      Mobile Skins
                    </Link>
                    <Link to="/category/laptop-skins" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
                      Laptop Skins
                    </Link>
                    {/* <Link to="/category/custom-designs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
                      Custom Designs
                    </Link> */}
                    <Link to="/category/new-arrivals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
                      New Arrivals
                    </Link>
                  </div>
                </div>
              </div>
              <Link to="/about" className="hover:text-black transition-colors relative group py-2">
                ABOUT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/blog" className="hover:text-black transition-colors relative group py-2">
                BLOG
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/contact" className="hover:text-black transition-colors relative group py-2">
                CONTACT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
            
            {/* Icons Wrapper */}
            <div className="flex items-center gap-5">
              {/* Search Icon */}
              <button 
                className="text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Account Icon - Hidden on Mobile
              <Link 
                to="/account" 
                className="hidden sm:block text-gray-700 hover:text-black transition-colors"
                aria-label="My Account"
              >
                <User className="w-5 h-5" />
              </Link>
               */}
              {/* Cart Button */}
              {/* <Link 
                to="/cart" 
                className="flex items-center text-gray-700 hover:text-black transition-colors relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link> */}
              <CartButton/>
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
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden mobile-menu-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-6 space-y-4 text-gray-800">
                <Link to="/" className="block hover:text-black transition-colors text-lg">HOME</Link>
                <div className="space-y-3">
                  <Link to="/category/mobile-skins" className="block hover:text-black transition-colors text-lg font-medium">SHOP</Link>
                  <div className="pl-4 space-y-3 border-l border-gray-200">
                    <Link to="/category/mobile-skins" className="block hover:text-black transition-colors">Mobile Skins</Link>
                    <Link to="/category/laptop-skins" className="block hover:text-black transition-colors">Laptop Skins</Link>
                    {/* <Link to="/category/custom-designs" className="block hover:text-black transition-colors">Custom Designs</Link> */}
                    <Link to="/category/new-arrivals" className="block hover:text-black transition-colors">New Arrivals</Link>
                  </div>
                </div>
                <Link to="/about" className="block hover:text-black transition-colors text-lg">ABOUT</Link>
                <Link to="/blog" className="block hover:text-black transition-colors text-lg">BLOG</Link>
                <Link to="/contact" className="block hover:text-black transition-colors text-lg">CONTACT</Link>
                {/* <Link to="/account" className="block hover:text-black transition-colors text-lg">MY ACCOUNT</Link> */}
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
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-start justify-center pt-24"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div 
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-full max-w-2xl px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..."
                  className="w-full py-4 px-6 rounded-full bg-white text-gray-800 placeholder-gray-400 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
                  autoFocus
                />
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Quick links */}
              <div className="mt-8 text-white text-center">
                <p className="text-sm mb-2 opacity-80">POPULAR SEARCHES</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-sm transition-all">
                    Embossed Skins
                  </button>
                  <button className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-sm transition-all">
                    Transparent Skins
                  </button>
                  {/* <button className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-sm transition-all">
                    Custom Design
                  </button> */}
                  <button className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-sm transition-all">
                    Best Sellers
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, Search } from 'lucide-react';
// import { CartButton } from './CartButton';

// export function Navigation() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
  
//   // Handle scroll effect for navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     if (!isMenuOpen) return;
    
//     const closeMenu = (e) => {
//       if (!e.target.closest('.mobile-menu-container')) {
//         setIsMenuOpen(false);
//       }
//     };
    
//     document.addEventListener('click', closeMenu);
//     return () => document.removeEventListener('click', closeMenu);
//   }, [isMenuOpen]);
  
//   return (
//     <>
//       <nav 
//         className={`bg-[#333333] shadow-md sticky top-0 z-50 transition-all duration-300 ${
//           scrolled ? "h-16 shadow-lg" : "h-20"
//         } border-b border-[#B0AFAF]`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
//           <div className="flex justify-between items-center h-full">
//             {/* Logo */}
//             <Link 
//               to="/" 
//               className="text-3xl font-serif tracking-wide text-[#F5F5F5] hover:text-[#e07a29] transition-colors"
//             >
//               Mobiiwrap
//             </Link>
            
//             {/* Desktop Menu */}
//             <div className="hidden lg:flex space-x-12 text-sm tracking-wider text-[#F5F5F5]">
//               <Link to="/" className="hover:text-[#e07a29] transition-colors relative group">
//                 HOME
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e07a29] group-hover:w-full transition-all duration-300"></span>
//               </Link>
//               <Link to="/category/mobile-skins" className="hover:text-[#e07a29] transition-colors relative group">
//                 SHOP
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e07a29] group-hover:w-full transition-all duration-300"></span>
//               </Link>
//               <Link to="/about" className="hover:text-[#e07a29] transition-colors relative group">
//                 ABOUT
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e07a29] group-hover:w-full transition-all duration-300"></span>
//               </Link>
//               <Link to="/blog" className="hover:text-[#e07a29] transition-colors relative group">
//                 BLOG
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e07a29] group-hover:w-full transition-all duration-300"></span>
//               </Link>
//               <Link to="/contact" className="hover:text-[#e07a29] transition-colors relative group">
//                 CONTACT
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e07a29] group-hover:w-full transition-all duration-300"></span>
//               </Link>
//             </div>
            
//             {/* Icons Wrapper */}
//             <div className="flex items-center gap-6">
//               {/* Search Icon */}
//               <button 
//                 className="text-[#F5F5F5] hover:text-[#e07a29] transition-colors"
//                 onClick={() => setIsSearchOpen(true)}
//               >
//                 <Search className="w-5 h-5" />
//               </button>
              
//               {/* Cart Button - Reusing existing component */}
//               <CartButton />
              
//               {/* Mobile Menu Button */}
//               <button 
//                 className="lg:hidden text-[#F5F5F5] hover:text-[#e07a29] transition-colors"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setIsMenuOpen(!isMenuOpen);
//                 }}
//               >
//                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Mobile Menu with AnimatePresence */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: 'auto', opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="lg:hidden bg-[#3d3d3d] border-t border-[#B0AFAF] overflow-hidden mobile-menu-container"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="px-6 py-8 space-y-6 text-[#F5F5F5]">
//                 <Link to="/" className="block hover:text-[#e07a29] transition-colors text-lg font-medium">HOME</Link>
//                 <Link to="/category/mobile-skins" className="block hover:text-[#e07a29] transition-colors text-lg font-medium">SHOP</Link>
//                 <Link to="/about" className="block hover:text-[#e07a29] transition-colors text-lg font-medium">ABOUT</Link>
//                 <Link to="/blog" className="block hover:text-[#e07a29] transition-colors text-lg font-medium">BLOG</Link>
//                 <Link to="/contact" className="block hover:text-[#e07a29] transition-colors text-lg font-medium">CONTACT</Link>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* Search Overlay */}
//       <AnimatePresence>
//         {isSearchOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
//             onClick={() => setIsSearchOpen(false)}
//           >
//             <motion.div 
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: -50, opacity: 0 }}
//               transition={{ duration: 0.3, delay: 0.1 }}
//               className="w-full max-w-3xl px-6"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="relative">
//                 <input 
//                   type="text" 
//                   placeholder="Search products..." 
//                   className="w-full py-4 px-6 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 text-xl border-2 border-[#e07a29] focus:outline-none focus:ring-2 focus:ring-[#e07a29]"
//                   autoFocus
//                 />
//                 <button 
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#e07a29] transition-colors"
//                   onClick={() => setIsSearchOpen(false)}
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//               <div className="text-white text-center mt-8 opacity-80">
//                 Press ESC key or click outside to close
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { Menu, X } from 'lucide-react';
// // import { CartButton } from './CartButton';


// // export function Navigation() {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// //   return (
// //     <nav className="bg-[#333333] shadow-md sticky top-0 z-50 border-b border-[#B0AFAF]">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between items-center h-14">
// //           {/* Logo */}
// //           <Link to="/" className="text-3xl font-serif tracking-wide text-[#F5F5F5]">
// //             Mobiiwrap
// //           </Link>

// //           {/* Desktop Menu */}
// //           <div className="hidden lg:flex space-x-12 text-sm tracking-wider text-[#F5F5F5]">
// //             <Link to="/" className="hover:text-[#c95f00] transition-colors">HOME</Link>
// //             <Link to="/category/mobile-skins" className="hover:text-[#c95f00] transition-colors">SHOP</Link>
// //             <Link to="/about" className="hover:text-[#c95f00] transition-colors">ABOUT</Link>
// //             <Link to="/blog" className="hover:text-[#c95f00] transition-colors">BLOG</Link>
// //             <Link to="/contact" className="hover:text-[#c95f00] transition-colors">CONTACT</Link>
// //           </div>

// //           {/* Icons Wrapper (Ensures Right Alignment in Mobile) */}
// //           <div className="flex items-center gap-4">
// //             {/* Cart Button */}
// //             <CartButton />

// //             {/* Mobile Menu Button */}
// //             <button className="lg:hidden text-[#F5F5F5]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
// //               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       <motion.div 
// //         initial={{ height: 0, opacity: 0 }} 
// //         animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
// //         className="lg:hidden bg-[#e07a29] border-t border-[#B0AFAF] overflow-hidden"
// //       >
// //         <div className="px-4 py-6 space-y-4 text-[#F5F5F5]">
// //           <Link to="/" className="block hover:text-[#c95f00] transition-colors">HOME</Link>
// //           <Link to="/category/mobile-skins" className="block hover:text-[#c95f00] transition-colors">SHOP</Link>
// //           <Link to="/about" className="block hover:text-[#c95f00] transition-colors">ABOUT</Link>
// //           <Link to="/blog" className="block hover:text-[#c95f00] transition-colors">BLOG</Link>
// //           <Link to="/contact" className="block hover:text-[#c95f00] transition-colors">CONTACT</Link>
// //         </div>
// //       </motion.div>
// //     </nav>
// //   );
// // }
