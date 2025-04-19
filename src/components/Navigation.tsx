import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import { CartButton } from './Cart/CartButton';
import { SearchModal } from './Search/SearchModal.tsx';
import MobileNavigation from '../layout/MobileNavigation.tsx';
import { productCategories } from '../constants/productCategories';

interface Category {
  title: string;
  description: string;
  available: boolean;
  filters: {
    categories: string[];
    tags: string[];
    sortOptions: string[];
  };
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHoveringShop, setIsHoveringShop] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const shopDropdownRef = useRef(null);
  const shopButtonRef = useRef(null);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const closeMenu = (e) => {
      if (!e.target.closest('.mobile-menu-container') && !e.target.closest('.mobile-menu-button')) {
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

  // Close shop dropdown when clicking outside or pressing ESC
  useEffect(() => {
    if (!isShopOpen) return;
    
    const handleOutsideClick = (e) => {
      if (
        shopDropdownRef.current && 
        !shopDropdownRef.current.contains(e.target) &&
        shopButtonRef.current && 
        !shopButtonRef.current.contains(e.target)
      ) {
        setIsShopOpen(false);
      }
    };
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsShopOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEsc);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isShopOpen]);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  
  const toggleMenu = (e) => {
    e.stopPropagation(); // Stop event propagation
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleShopDropdown = (e) => {
    e.preventDefault();
    setIsShopOpen(!isShopOpen);
  };
  
  const isShopDropdownVisible = isShopOpen || isHoveringShop;
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Desktop Navigation - Hidden on Mobile */}
      <header className={`hidden md:block bg-white transition-all duration-300 ${
        scrolled ? "h-16 shadow-md" : "h-20"
      } sticky top-0 z-50 border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="text-2xl font-bold tracking-tight hover:text-orange-500 transition-colors"
              >
                <span className="text-orange-500">MOBIIWRAP</span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              <Link 
                to="/" 
                className="hover:text-orange-500 transition-colors py-2"
              >
                HOME
              </Link>
              
              <div 
                className="relative"
                onMouseEnter={() => setIsHoveringShop(true)}
                onMouseLeave={() => {
                  setIsHoveringShop(false);
                  // Don't close dropdown if it was opened by click
                  if (!isShopOpen) return;
                }}
              >
                <button 
                  ref={shopButtonRef}
                  className={`transition-colors flex items-center gap-1 py-2 ${
                    isShopDropdownVisible ? 'text-orange-500' : 'hover:text-orange-500'
                  }`}
                  onClick={toggleShopDropdown}
                  aria-expanded={isShopDropdownVisible}
                >
                  SHOP
                  <ChevronDown className={`w-4 h-4 transition-transform ${isShopDropdownVisible ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Shop Dropdown */}
                <AnimatePresence>
                  {isShopDropdownVisible && (
                    <motion.div
                      ref={shopDropdownRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md overflow-hidden border border-gray-100 z-50"
                      onMouseEnter={() => setIsHoveringShop(true)}
                      onMouseLeave={() => {
                        setIsHoveringShop(false);
                        // Don't close dropdown if it was opened by click
                        if (!isShopOpen) return;
                      }}
                    >
                      <div className="py-2">
                        {Object.entries(productCategories).map(([key, category]) => (
                          <Link
                            key={key}
                            to={`/category/${key}`}
                            className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-orange-500"
                            onClick={() => {
                              setIsShopOpen(false);
                              setIsHoveringShop(false);
                            }}
                          >
                            {category.title}
                          </Link>
                        ))}
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
            
            {/* Icons */}
            <div className="flex items-center gap-5">
              <button 
                className="text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <CartButton/>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Hidden on Desktop */}
      <header className="md:hidden bg-white sticky top-0 z-50 border-b border-gray-100 h-16">
        <div className="px-4 h-full flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button text-gray-800 hover:text-orange-500 transition-colors z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          {/* Logo - Centered */}
          <Link 
            to="/" 
            className="text-xl font-bold tracking-tight hover:text-orange-500 transition-colors absolute left-1/2 transform -translate-x-1/2 z-40"
          >
            <span className="text-orange-500">MOBIIWRAP</span>
          </Link>
          
          {/* Cart Button */}
          <div className="flex items-center gap-4 z-40">
            <CartButton/>
          </div>
        </div>
        
        {/* Background Overlay for Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-30"
              onClick={toggleMenu}
            />
          )}
        </AnimatePresence>
        
        {/* Mobile Menu - Fullscreen with integrated design */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mobile-menu-container fixed inset-0 pt-16 bg-white z-40 overflow-y-auto"
            >
              <div className="px-6 py-8 space-y-6">
                <Link 
                  to="/" 
                  className="block hover:text-orange-500 transition-colors text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  HOME
                </Link>
                
                <div className="space-y-4">
                  <button 
                    className="flex items-center gap-2 hover:text-orange-500 transition-colors text-lg font-medium w-full text-left"
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
                      className="pl-4 space-y-4 border-l-2 border-orange-500"
                    >
                      {Object.entries(productCategories).map(([key, category]) => (
                        <Link 
                          key={key}
                          to={`/category/${key}`}
                          className="block hover:text-orange-500 transition-colors py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
                
                <Link 
                  to="/about" 
                  className="block hover:text-orange-500 transition-colors text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link 
                  to="/blog" 
                  className="block hover:text-orange-500 transition-colors text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  BLOG
                </Link>
                <Link 
                  to="/contact" 
                  className="block hover:text-orange-500 transition-colors text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </Link>
                
                <div className="pt-8 mt-6 border-t border-gray-200 flex items-center gap-6">
                  <button 
                    className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors"
                    onClick={() => {
                      setIsSearchOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </button>
                
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Bottom Navigation - Mobile Only */}
      <MobileNavigation />

      {/* Background Overlay for Desktop Shop Dropdown */}
      <AnimatePresence>
        {isShopDropdownVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40 hidden md:block pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsSearchOpen(false)}
          >
            <div 
              className="max-w-3xl mx-auto mt-20 px-4"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}