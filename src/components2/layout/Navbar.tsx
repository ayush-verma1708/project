import { useState } from 'react';
import { Link } from 'wouter';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo */}
          <Link href="/" className="flex items-center font-bold text-xl tracking-tight">
            <span className="text-orange-500">Boutique</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium hover:text-orange-500 transition-colors">Home</Link>
            <Link href="/shop" className="font-medium hover:text-orange-500 transition-colors">Shop</Link>
            <Link href="/collections" className="font-medium hover:text-orange-500 transition-colors">Collections</Link>
            <Link href="/about" className="font-medium hover:text-orange-500 transition-colors">About</Link>
            <Link href="/contact" className="font-medium hover:text-orange-500 transition-colors">Contact</Link>
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/search"
              className="p-2 hover:text-orange-500 transition-colors" 
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            {/* <Link 
              href="/account" 
              className="p-2 hover:text-orange-500 transition-colors" 
              aria-label="Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link> */}
            <Link 
              href="/cart" 
              className="p-2 relative hover:text-orange-500 transition-colors" 
              aria-label="Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white border-t`}>
        <div className="px-4 py-3 space-y-3">
          <Link href="/" className="block font-medium hover:text-orange-500">Home</Link>
          <Link href="/shop" className="block font-medium hover:text-orange-500">Shop</Link>
          <Link href="/collections" className="block font-medium hover:text-orange-500">Collections</Link>
          <Link href="/about" className="block font-medium hover:text-orange-500">About</Link>
          <Link href="/contact" className="block font-medium hover:text-orange-500">Contact</Link>
        </div>
      </div>
    </header>
  );
}
