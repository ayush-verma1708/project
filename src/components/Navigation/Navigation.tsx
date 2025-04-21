import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import { CartButton } from './Cart/CartButton';
import { SearchModal } from './Search/SearchModal';
import { productCategories } from '../../constants/productCategories';

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

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHoveringShop, setIsHoveringShop] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const shopDropdownRef = useRef<HTMLDivElement>(null);
  const shopButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/category/mobile-skins' },
    // { name: 'COLLECTIONS', path: '/collections' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

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
    
    const closeMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [isMenuOpen]);

  // Close search with ESC key
  useEffect(() => {
    if (!isSearchOpen) return;
    
    const handleEsc = (e: KeyboardEvent) => {
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
    
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        shopDropdownRef.current && 
        !shopDropdownRef.current.contains(e.target as Node) &&
        shopButtonRef.current && 
        !shopButtonRef.current.contains(e.target as Node)
      ) {
        setIsShopOpen(false);
      }
    };
    
    const handleEsc = (e: KeyboardEvent) => {
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
  
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleShopDropdown = (e: React.MouseEvent) => {
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
      {/* Desktop Navigation */}
      <header className={`hidden md:block transition-all duration-300 ${
        scrolled ? "bg-black text-white shadow-lg" : "bg-transparent text-black"
      } fixed top-0 left-0 right-0 z-40`}>
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="text-xl font-light tracking-[0.2em]">
              MOBIIWRAP
            </Link>

            {/* Desktop Menu */}
            <nav className="flex items-center space-x-12">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xs tracking-[0.1em] transition-colors duration-300 ${
                    location.pathname === item.path
                      ? (scrolled ? 'text-white' : 'text-black')
                      : (scrolled ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black')
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-8">
              <button 
                className={`transition-colors duration-300 ${
                  scrolled ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
                }`}
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <CartButton/>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <header className={`md:hidden transition-all duration-300 ${
        scrolled ? "bg-black text-white shadow-lg" : "bg-transparent text-black"
      } fixed top-0 left-0 right-0 z-40`}>
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button 
              className="relative w-6 h-6 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className={`absolute w-6 h-[1px] transition-all duration-300 transform ${
                scrolled ? 'bg-white' : 'bg-black'
              }`}
                style={{
                  top: isMenuOpen ? '50%' : '25%',
                  transform: isMenuOpen ? 'rotate(45deg)' : 'none'
                }}
              />
              <div className={`absolute w-6 h-[1px] transition-all duration-300 ${
                scrolled ? 'bg-white' : 'bg-black'
              }`}
                style={{
                  top: '50%',
                  opacity: isMenuOpen ? 0 : 1
                }}
              />
              <div className={`absolute w-6 h-[1px] transition-all duration-300 transform ${
                scrolled ? 'bg-white' : 'bg-black'
              }`}
                style={{
                  top: isMenuOpen ? '50%' : '75%',
                  transform: isMenuOpen ? 'rotate(-45deg)' : 'none'
                }}
              />
            </button>

            {/* Logo */}
            <Link to="/" className="text-xl font-light tracking-[0.2em]">
              MOBIIWRAP
            </Link>

            {/* Cart Button */}
            <CartButton/>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden transition-colors duration-300 ${
                scrolled ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              <div className="max-w-[1920px] mx-auto px-6 py-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-4 text-xs tracking-[0.1em] transition-colors duration-300 ${
                      location.pathname === item.path
                        ? (scrolled ? 'text-white' : 'text-black')
                        : (scrolled ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black')
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <button 
                  className={`flex items-center gap-2 transition-colors mt-8 ${
                    scrolled ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
                  }`}
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <Search className="w-4 h-4" />
                  <span className="text-xs tracking-[0.1em]">SEARCH</span>
                </button>
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