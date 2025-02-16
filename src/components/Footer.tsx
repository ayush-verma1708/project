import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    // <footer className="bg-gray-900 text-gray-300">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    //     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    //       {/* Company Info */}
    //       <div>
    //         <h3 className="text-white text-lg font-semibold mb-4">MobiiWrap</h3>
    //         <p className="text-sm">
    //           Premium mobile device skins and wraps for the tech-savvy individual.
    //         </p>
    //       </div>

    //       {/* Quick Links */}
    //       <div>
    //         <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
    //         <ul className="space-y-2">
    //           <li>
    //             <Link to="/" className="text-sm hover:text-white transition-colors">
    //               Home
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/category/mobile-skins" className="text-sm hover:text-white transition-colors">
    //               Mobile Skins
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/category/laptop-skins" className="text-sm hover:text-white transition-colors">
    //               Laptop Skins
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/category/stickers" className="text-sm hover:text-white transition-colors">
    //               Stickers
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/about" className="text-sm hover:text-white transition-colors">
    //               About Us
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/contact" className="text-sm hover:text-white transition-colors">
    //               Contact
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>

    //       {/* Legal */}
    //       <div>
    //         <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
    //         <ul className="space-y-2">
    //           <li>
    //             <Link to="/policies/privacy" className="text-sm hover:text-white transition-colors">
    //               Privacy Policy
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/policies/returns" className="text-sm hover:text-white transition-colors">
    //               Return & Refund Policy
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/policies/shipping" className="text-sm hover:text-white transition-colors">
    //               Shipping Policy
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/policies/terms" className="text-sm hover:text-white transition-colors">
    //               Terms & Conditions
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>

    //       {/* Social Media */}
    //       <div>
    //         <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
    //         <div className="flex space-x-4">
            
    //                      <motion.a
    //             href="https://www.instagram.com/mobiiwrap/#"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             whileHover={{ scale: 1.1 }}
    //             whileTap={{ scale: 0.9 }}
    //             className="hover:text-white transition-colors"
    //           >
    //             <Instagram size={20} />
    //           </motion.a>
    //           <motion.a
    //             href="https://www.youtube.com/@mobiiwrapbyshubhamkhandelw3434"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             whileHover={{ scale: 1.1 }}
    //             whileTap={{ scale: 0.9 }}
    //             className="hover:text-white transition-colors"
    //           >
    //             <Youtube size={20} />
    //           </motion.a>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
    //       <p>&copy; {new Date().getFullYear()} MobiiWrap. All rights reserved.</p>
    //     </div>
    //   </div>
    // </footer>
     <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-2xl font-serif text-olive mb-6">Mobiiwrap</h4>
              <p className="text-sm text-gray-600">Elevating spaces with bespoke curtains and drapery solutions since 2020</p>
            </div>
            <div>
              <h5 className="font-medium mb-4 uppercase tracking-wider text-sm">Collections</h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>Custom Made</li>
                <li>Ready to Ship</li>
                <li>New Arrivals</li>
                <li>Best Sellers</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4 uppercase tracking-wider text-sm">Help</h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>Shipping Information</li>
                <li>Returns & Exchange</li>
                <li>Size Guide</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4 uppercase tracking-wider text-sm">Connect</h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>Instagram</li>
                <li>Pinterest</li>
                <li>Facebook</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-16 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Saukins. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}

// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

// export function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">MobiiWrap</h3>
//             <p className="text-sm">
//               Premium mobile device skins and wraps for the tech-savvy individual.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/products" className="text-sm hover:text-white transition-colors">
//                   Products
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-sm hover:text-white transition-colors">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="text-sm hover:text-white transition-colors">
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/faq" className="text-sm hover:text-white transition-colors">
//                   FAQ
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Legal */}
//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/privacy-policy" className="text-sm hover:text-white transition-colors">
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/terms-and-conditions" className="text-sm hover:text-white transition-colors">
//                   Terms of Service
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/shipping-policy" className="text-sm hover:text-white transition-colors">
//                   Shipping Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/return-and-refund-policy" className="text-sm hover:text-white transition-colors">
//                   Returns
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Social Media */}
//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
//             <div className="flex space-x-4">
//               <motion.a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="hover:text-white transition-colors"
//               >
//                 <Facebook size={20} />
//               </motion.a>
//               <motion.a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="hover:text-white transition-colors"
//               >
//                 <Twitter size={20} />
//               </motion.a>
//               <motion.a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="hover:text-white transition-colors"
//               >
//                 <Instagram size={20} />
//               </motion.a>
//               <motion.a
//                 href="https://youtube.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="hover:text-white transition-colors"
//               >
//                 <Youtube size={20} />
//               </motion.a>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
//           <p>&copy; {new Date().getFullYear()} MobiiWrap. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }