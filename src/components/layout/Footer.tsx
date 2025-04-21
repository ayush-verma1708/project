import { Link } from 'react-router-dom';
import { Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Company Information */}
          <div>
            <h4 className="text-3xl font-light tracking-[0.2em] uppercase mb-8">
              MOBIIWRAP
            </h4>
            <p className="text-lg text-black/60 mb-8 tracking-wide">
              Elevating your devices with premium skins and wraps since 2020
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://www.instagram.com/mobiiwrap/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:text-black/60 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.youtube.com/@mobiiwrapbyshubhamkhandelw3434" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:text-black/60 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-light tracking-[0.2em] uppercase mb-8 text-lg">Quick Links</h5>
            <ul className="space-y-4 text-lg text-black/60">
              <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
              <li><Link to="/category/mobile-skins" className="hover:text-black transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-black transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-black transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="font-light tracking-[0.2em] uppercase mb-8 text-lg">Customer Service</h5>
            <ul className="space-y-4 text-lg text-black/60">
              <li><Link to="/policies/shipping" className="hover:text-black transition-colors">Shipping Policy</Link></li>
              <li><Link to="/policies/returns" className="hover:text-black transition-colors">Return Policy</Link></li>
              <li><Link to="/faq" className="hover:text-black transition-colors">FAQs</Link></li>
              <li><Link to="/size-guide" className="hover:text-black transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h5 className="font-light tracking-[0.2em] uppercase mb-8 text-lg">Contact Us</h5>
            <ul className="space-y-4 text-lg text-black/60">
              <li className="flex items-start">
                <MapPin className="w-6 h-6 mr-4 mt-0.5 flex-shrink-0" />
                <span>123 Tech Street, Bangalore, 560001, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-6 h-6 mr-4 flex-shrink-0" />
                <a href="tel:+911234567890" className="hover:text-black transition-colors">+91 123 456 7890</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-6 h-6 mr-4 flex-shrink-0" />
                <a href="mailto:support@mobiiwrap.com" className="hover:text-black transition-colors">support@mobiiwrap.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods + Copyright */}
        <div className="border-t border-black/10 mt-20 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg text-black/60 mb-8 md:mb-0 tracking-wide">
              &copy; {new Date().getFullYear()} Mobiiwrap. All rights reserved.
            </p>
            <div className="flex space-x-8">
              {/* Payment Icons */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8" viewBox="0 0 48 48">
                <path fill="#000" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
                <path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.835-3.433-.835-3.936 0-4.532 2.141-4.532 3.289 0 2.14.865 3.03 3.099 4.043 1.339.581 1.8.976 1.8 1.513 0 .732-.985 1.067-2.385 1.067-1.339 0-2.786-.976-2.786-.976l-.523 2.378c0 0 1.406 1.042 3.93 1.042 2.323 0 4.65-1.532 4.65-3.734C32.572 24.575 26.369 23.643 26.369 22.206z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8" viewBox="0 0 48 48">
                <path fill="#000" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
                <path fill="#FFF" d="M30,24c0,3.314-2.686,6-6,6s-6-2.686-6-6s2.686-6,6-6S30,20.686,30,24z"/>
                <path fill="#FFF" d="M22.319,22.681c-0.813,0.813-0.813,2.134,0,2.948c0.799,0.798,2.086,0.815,2.907,0.052c-0.994-0.897-1.798-1.992-2.322-3.227C22.691,22.475,22.495,22.495,22.319,22.681z"/>
                <path fill="#FFF" d="M24,12c6.627,0,12,5.373,12,12s-5.373,12-12,12S12,30.627,12,24S17.373,12,24,12z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8" viewBox="0 0 48 48">
                <path fill="#000" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
                <path fill="#FFF" d="M22.255 20.044H24.322V26.998000000000005H22.255z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
