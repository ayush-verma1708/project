import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { CartButton } from './CartButton';
import { SearchModal } from './GeneralComp/SearchModal';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHoveringShop, setIsHoveringShop] = useState(false);

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

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <header className={`bg-white transition-all duration-300 ${
        scrolled ? "h-16 shadow-md" : "h-20"
      } sticky top-0 z-50 border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                className="text-gray-800 hover:text-orange-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
            
            {/* Logo - Centered on Mobile/Tablet, Left on Desktop */}
            <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0">
              <Link 
                to="/" 
                className="text-2xl font-bold tracking-tight hover:text-orange-500 transition-colors"
              >
                <span className="text-orange-500">MOBIIWRAP</span>
              </Link>
            </div>
            
            {/* Desktop Menu - Hidden on Mobile */}
            <nav className="hidden lg:flex space-x-8 text-sm font-medium">
              <Link 
                to="/" 
                className="hover:text-orange-500 transition-colors py-2"
              >
                HOME
              </Link>
              
              <div 
                className="relative"
                onMouseEnter={() => setIsHoveringShop(true)}
                onMouseLeave={() => setIsHoveringShop(false)}
              >
                <button 
                  className="hover:text-orange-500 transition-colors flex items-center gap-1 py-2"
                >
                  SHOP
                  <ChevronDown className={`w-4 h-4 transition-transform ${isHoveringShop ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Shop Dropdown */}
                <AnimatePresence>
                  {isHoveringShop && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md overflow-hidden border border-gray-100"
                      onMouseEnter={() => setIsHoveringShop(true)}
                      onMouseLeave={() => setIsHoveringShop(false)}
                    >
                      <div className="py-2">
                        <Link 
                          to="/category/mobile-skins" 
                          className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-orange-500"
                        >
                          Mobile Skins
                        </Link>
                        <Link 
                          to="/category/laptop-skins" 
                          className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-orange-500"
                        >
                          Laptop Skins
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link 
                to="/about" 
                className="hover:text-orange-500 transition-colors py-2"
              >
                ABOUT
              </Link>
              <Link 
                to="/blog" 
                className="hover:text-orange-500 transition-colors py-2"
              >
                BLOG
              </Link>
              <Link 
                to="/contact" 
                className="hover:text-orange-500 transition-colors py-2"
              >
                CONTACT
              </Link>
            </nav>
            
            {/* Icons Wrapper */}
            <div className="flex items-center gap-5">
              {/* Search Icon */}
              <button 
                className="text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Account Icon */}
              {/* <Link 
                to="/account" 
                className="text-gray-700 hover:text-orange-500 transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
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
                <Link 
                  to="/" 
                  className="block hover:text-orange-500 transition-colors text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  HOME
                </Link>
                
                <div className="space-y-3">
                  <button 
                    className="flex items-center gap-2 hover:text-orange-500 transition-colors text-lg font-medium"
                    onClick={() => toggleDropdown('mobileShop')}
                  >
                    SHOP
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'mobileShop' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'mobileShop' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 space-y-3 border-l border-gray-200"
                    >
                      <Link 
                        to="/category/mobile-skins" 
                        className="block hover:text-orange-500 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Mobile Skins
                      </Link>
                      <Link 
                        to="/category/laptop-skins" 
                        className="block hover:text-orange-500 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Laptop Skins
                      </Link>
                    </motion.div>
                  )}
                </div>
                
                <Link 
                  to="/about" 
                  className="block hover:text-orange-500 transition-colors text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link 
                  to="/blog" 
                  className="block hover:text-orange-500 transition-colors text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  BLOG
                </Link>
                <Link 
                  to="/contact" 
                  className="block hover:text-orange-500 transition-colors text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
// import { CartButton } from './CartButton';
// import { SearchModal } from './GeneralComp/SearchModal';

// export function Navigation() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

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

//   // Close search with ESC key
//   useEffect(() => {
//     if (!isSearchOpen) return;
    
//     const handleEsc = (e) => {
//       if (e.key === 'Escape') {
//         setIsSearchOpen(false);
//       }
//     };
    
//     document.addEventListener('keydown', handleEsc);
//     return () => document.removeEventListener('keydown', handleEsc);
//   }, [isSearchOpen]);

//   const toggleDropdown = (dropdown) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
//   };
  
//   return (
//     <>
//       <header className={`bg-white transition-all duration-300 ${
//         scrolled ? "h-16 shadow-md" : "h-20"
//       } sticky top-0 z-50 border-b border-gray-100`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
//           <div className="flex justify-between items-center h-full">
//             {/* Mobile Menu Button */}
//             <div className="lg:hidden flex items-center">
//               <button 
//                 className="text-gray-800 hover:text-orange-500 transition-colors"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setIsMenuOpen(!isMenuOpen);
//                 }}
//                 aria-label="Toggle menu"
//               >
//                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
            
//             {/* Logo - Centered on Mobile/Tablet, Left on Desktop */}
//             <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0">
//               <Link 
//                 to="/" 
//                 className="text-2xl font-bold tracking-tight hover:text-orange-500 transition-colors"
//               >
//                 <span className="text-orange-500">MOBIIWRAP</span>
//               </Link>
//             </div>
            
//             {/* Desktop Menu - Hidden on Mobile */}
//             <nav className="hidden lg:flex space-x-8 text-sm font-medium">
//               <Link 
//                 to="/" 
//                 className="hover:text-orange-500 transition-colors py-2"
//               >
//                 HOME
//               </Link>
              
//               <div className="relative">
//                 <button 
//                   className="hover:text-orange-500 transition-colors flex items-center gap-1 py-2"
//                   onClick={() => toggleDropdown('shop')}
//                 >
//                   SHOP
//                   <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'shop' ? 'rotate-180' : ''}`} />
//                 </button>
                
//                 {/* Shop Dropdown */}
//                 <AnimatePresence>
//                   {activeDropdown === 'shop' && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md overflow-hidden border border-gray-100"
//                     >
//                       <div className="py-2">
//                         <Link 
//                           to="/category/mobile-skins" 
//                           className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-orange-500"
//                         >
//                           Mobile Skins
//                         </Link>
//                         <Link 
//                           to="/category/laptop-skins" 
//                           className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-orange-500"
//                         >
//                           Laptop Skins
//                         </Link>
//                         {/* <Link 
//                           to="/category/new-arrivals" 
//                           className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-orange-500"
//                         >
//                           New Arrivals
//                         </Link> */}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
              
//               <Link 
//                 to="/about" 
//                 className="hover:text-orange-500 transition-colors py-2"
//               >
//                 ABOUT
//               </Link>
//               <Link 
//                 to="/blog" 
//                 className="hover:text-orange-500 transition-colors py-2"
//               >
//                 BLOG
//               </Link>
//               <Link 
//                 to="/contact" 
//                 className="hover:text-orange-500 transition-colors py-2"
//               >
//                 CONTACT
//               </Link>
//             </nav>
            
//             {/* Icons Wrapper */}
//             <div className="flex items-center gap-5">
//               {/* Search Icon */}
//               <button 
//                 className="text-gray-700 hover:text-orange-500 transition-colors"
//                 onClick={() => setIsSearchOpen(true)}
//                 aria-label="Search"
//               >
//                 <Search className="w-5 h-5" />
//               </button>
              
//               {/* Account Icon */}
//               <Link 
//                 to="/account" 
//                 className="text-gray-700 hover:text-orange-500 transition-colors"
//                 aria-label="Account"
//               >
//                 <User className="w-5 h-5" />
//               </Link>
              
//               <CartButton/>
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
//               className="lg:hidden bg-white border-t border-gray-100 overflow-hidden mobile-menu-container"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="px-6 py-6 space-y-4 text-gray-800">
//                 <Link 
//                   to="/" 
//                   className="block hover:text-orange-500 transition-colors text-lg"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   HOME
//                 </Link>
                
//                 <div className="space-y-3">
//                   <button 
//                     className="flex items-center gap-2 hover:text-orange-500 transition-colors text-lg font-medium"
//                     onClick={() => toggleDropdown('mobileShop')}
//                   >
//                     SHOP
//                     <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'mobileShop' ? 'rotate-180' : ''}`} />
//                   </button>
                  
//                   {activeDropdown === 'mobileShop' && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className="pl-4 space-y-3 border-l border-gray-200"
//                     >
//                       <Link 
//                         to="/category/mobile-skins" 
//                         className="block hover:text-orange-500 transition-colors"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         Mobile Skins
//                       </Link>
//                       <Link 
//                         to="/category/laptop-skins" 
//                         className="block hover:text-orange-500 transition-colors"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         Laptop Skins
//                       </Link>
//                       {/* <Link 
//                         to="/category/new-arrivals" 
//                         className="block hover:text-orange-500 transition-colors"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         New Arrivals
//                       </Link> */}
//                     </motion.div>
//                   )}
//                 </div>
                
//                 <Link 
//                   to="/about" 
//                   className="block hover:text-orange-500 transition-colors text-lg"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   ABOUT
//                 </Link>
//                 <Link 
//                   to="/blog" 
//                   className="block hover:text-orange-500 transition-colors text-lg"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   BLOG
//                 </Link>
//                 <Link 
//                   to="/contact" 
//                   className="block hover:text-orange-500 transition-colors text-lg"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   CONTACT
//                 </Link>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>

//       {/* Search Modal */}
//       <SearchModal 
//         isOpen={isSearchOpen} 
//         onClose={() => setIsSearchOpen(false)} 
//       />
//     </>
//   );
// }

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
// import { CartButton } from './CartButton';
// import { SearchModal } from './GeneralComp/SearchModal';

// export function Navigation() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(3); // Mock cart count
//   const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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

//   // Close search with ESC key
//   useEffect(() => {
//     if (!isSearchOpen) return;
    
//     const handleEsc = (e) => {
//       if (e.key === 'Escape') {
//         setIsSearchOpen(false);
//       }
//     };
    
//     document.addEventListener('keydown', handleEsc);
//     return () => document.removeEventListener('keydown', handleEsc);
//   }, [isSearchOpen]);
  
//   return (
//     <>
//       {/* Announcement Bar */}
//       {/* <div className="bg-black text-white py-2 text-center text-sm font-light">
//         <p>Free shipping on orders over 500INR | 30-day money-back guarantee</p>
//       </div> */}
      
//       <nav 
//         className={`bg-white transition-all duration-300 ${
//           scrolled ? "h-16 shadow-md" : "h-20"
//         } sticky top-0 z-50 border-b border-gray-100`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
//           <div className="flex justify-between items-center h-full">
//             {/* Mobile Menu Button */}
//             <div className="lg:hidden flex items-center">
//               <button 
//                 className="text-gray-800 hover:text-black transition-colors"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setIsMenuOpen(!isMenuOpen);
//                 }}
//               >
//                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
            
//             {/* Logo - Centered on Mobile/Tablet, Left on Desktop */}
//             <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0">
//               <Link 
//                 to="/" 
//                 className="text-2xl font-serif tracking-wide text-gray-900 hover:text-black transition-colors"
//               >
//                 <span className="font-bold">MOBIIWRAP</span>
//               </Link>
//             </div>
            
//             {/* Desktop Menu - Hidden on Mobile */}
//             <div className="hidden lg:flex space-x-8 text-sm font-medium tracking-wider text-gray-700">
//               <Link to="/" className="hover:text-black transition-colors relative group py-2">
//                 HOME
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
//               </Link>
//               <div className="relative group">
//                 <Link to="/category/mobile-skins" className="hover:text-black transition-colors flex items-center gap-1 py-2">
//                   SHOP
//                   <ChevronDown className="w-4 h-4 opacity-70" />
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
//                 </Link>
//                 {/* Shop Dropdown */}
//                 <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md overflow-hidden border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                   <div className="py-2">
//                     <Link to="/category/mobile-skins" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
//                       Mobile Skins
//                     </Link>
//                     <Link to="/category/laptop-skins" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
//                       Laptop Skins
//                     </Link>
//                     {/* <Link to="/category/custom-designs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
//                       Custom Designs
//                     </Link> */}
//                     <Link to="/category/new-arrivals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
//                       New Arrivals
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//               <Link to="/about" className="hover:text-black transition-colors relative group py-2">
//                 ABOUT
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
//               </Link>
//               <Link to="/blog" className="hover:text-black transition-colors relative group py-2">
//                 BLOG
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
//               </Link>
//               <Link to="/contact" className="hover:text-black transition-colors relative group py-2">
//                 CONTACT
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
//               </Link>
//             </div>
            
//             {/* Icons Wrapper */}
//             <div className="flex items-center gap-5">
//               {/* Search Icon */}
//               <button 
//                 className="text-gray-700 hover:text-black transition-colors"
//                 onClick={() => setIsSearchOpen(true)}
//                 aria-label="Search"
//               >
//                 <Search className="w-5 h-5" />
//               </button>
//               <CartButton/>
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
//               className="lg:hidden bg-white border-t border-gray-100 overflow-hidden mobile-menu-container"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="px-6 py-6 space-y-4 text-gray-800">
//                 <Link to="/" className="block hover:text-black transition-colors text-lg">HOME</Link>
//                 <div className="space-y-3">
//                   <Link to="/category/mobile-skins" className="block hover:text-black transition-colors text-lg font-medium">SHOP</Link>
//                   <div className="pl-4 space-y-3 border-l border-gray-200">
//                     <Link to="/category/mobile-skins" className="block hover:text-black transition-colors">Mobile Skins</Link>
//                     <Link to="/category/laptop-skins" className="block hover:text-black transition-colors">Laptop Skins</Link>
//                     {/* <Link to="/category/custom-designs" className="block hover:text-black transition-colors">Custom Designs</Link> */}
//                     <Link to="/category/new-arrivals" className="block hover:text-black transition-colors">New Arrivals</Link>
//                   </div>
//                 </div>
//                 <Link to="/about" className="block hover:text-black transition-colors text-lg">ABOUT</Link>
//                 <Link to="/blog" className="block hover:text-black transition-colors text-lg">BLOG</Link>
//                 <Link to="/contact" className="block hover:text-black transition-colors text-lg">CONTACT</Link>
//                 {/* <Link to="/account" className="block hover:text-black transition-colors text-lg">MY ACCOUNT</Link> */}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* Search Overlay */}
     
//          <SearchModal 
//         isOpen={isSearchOpen} 
//         onClose={() => setIsSearchOpen(false)} 
//       />
//     </>
//   );
// }