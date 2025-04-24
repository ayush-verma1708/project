import { Link } from 'react-router-dom';
import { Instagram, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto">
        {/* Upper Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 divide-white/10">
          {/* Company Information */}
          <div className="p-8 md:p-12">
            <h4 className="text-2xl font-light tracking-[0.2em] mb-6">
              MOBIIWRAP
            </h4>
            <p className="text-sm text-white/60 mb-8 tracking-wide leading-relaxed">
              Premium device customization since 2020. Transform your tech with our expertly crafted skins and wraps.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://www.instagram.com/mobiiwrap/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white hover:text-black transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@mobiiwrapbyshubhamkhandelw3434" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white hover:text-black transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-8 md:p-12">
            <h5 className="text-sm font-light tracking-[0.2em] mb-6">CONTACT</h5>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="w-5 h-5 mr-4 mt-1 text-white/40 group-hover:text-white transition-colors" />
                <div>
                  <p className="text-sm text-white/60 group-hover:text-white transition-colors">
                    Gaffar Market, Karol Bagh<br />
                    New Delhi, India
                  </p>
                </div>
              </li>
              <li className="flex items-center group">
                <Phone className="w-5 h-5 mr-4 text-white/40 group-hover:text-white transition-colors" />
                <a 
                  href="tel:+917838880955" 
                  className="text-sm text-white/60 group-hover:text-white transition-colors"
                >
                  +91 7838880955
                </a>
              </li>
              <li className="flex items-center group">
                <Mail className="w-5 h-5 mr-4 text-white/40 group-hover:text-white transition-colors" />
                <a 
                  href="mailto:mobiiwrapshopify@gmail.com" 
                  className="text-sm text-white/60 group-hover:text-white transition-colors"
                >
                  mobiiwrapshopify@gmail.com
                </a>
              </li>
              <li className="flex items-start group">
                <Clock className="w-5 h-5 mr-4 mt-1 text-white/40 group-hover:text-white transition-colors" />
                <div>
                  <p className="text-sm text-white/60 group-hover:text-white transition-colors">
                    Tuesday - Sunday: 10AM - 8PM<br />
                    Monday: Closed
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="p-8 md:p-12">
            <h5 className="text-sm font-light tracking-[0.2em] mb-6">NAVIGATION</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/mobile-skins" className="text-sm text-white/60 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-white/60 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="p-8 md:p-12">
            <h5 className="text-sm font-light tracking-[0.2em] mb-6">SUPPORT</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/policies/shipping" className="text-sm text-white/60 hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/policies/returns" className="text-sm text-white/60 hover:text-white transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-white/60 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              {/* <li>
                <Link to="/size-guide" className="text-sm text-white/60 hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10">
          <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-xs text-white/40 tracking-wide order-2 md:order-1">
              © {new Date().getFullYear()} MOBIIWRAP. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center space-x-6 order-1 md:order-2">
              <span className="text-xs text-white/40 tracking-wide">SECURE PAYMENTS WITH</span>
              <div className="flex space-x-4">
                <div className="w-10 h-6 bg-white/5"></div>
                <div className="w-10 h-6 bg-white/5"></div>
                <div className="w-10 h-6 bg-white/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
