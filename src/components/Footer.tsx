import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-2xl font-serif text-olive mb-6">Mobiiwrap</h4>
            <p className="text-sm text-gray-600">Elevating spaces with bespoke curtains and drapery solutions since 2020</p>
          </div>
          {/* <div> */}
            {/* <h5 className="font-medium mb-4 uppercase tracking-wider text-sm">Collections</h5>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>Custom Made</li>
              <li>Ready to Ship</li>
              <li>New Arrivals</li>
              <li>Best Sellers</li>
            </ul>
          </div> */}
          <div>
            <h5 className="font-medium mb-4 uppercase tracking-wider text-sm">Help</h5>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              {/* <li><Link to="/cart">Shopping Cart</Link></li> */}
              {/* <li><Link to="/checkout">Checkout</Link></li> */}
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-4 uppercase tracking-wider text-sm">Policies</h5>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/policies/privacy">Privacy Policy</Link></li>
              <li><Link to="/policies/returns">Return & Refund Policy</Link></li>
              <li><Link to="/policies/shipping">Shipping Policy</Link></li>
              <li><Link to="/policies/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-4 uppercase tracking-wider text-sm">Connect</h5>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="https://www.instagram.com/mobiiwrap/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.youtube.com/@mobiiwrapbyshubhamkhandelw3434" target="_blank" rel="noopener noreferrer">Youtube</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-16 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2025 Mobiiwrap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
