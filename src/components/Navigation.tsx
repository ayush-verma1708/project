import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, ShoppingCart, Heart } from 'lucide-react';
import { CartButton } from './CartButton';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="text-3xl font-serif tracking-wide text-olive">
            Mobiiwrap
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-12 text-sm tracking-wider">
            <Link to="/" className="hover:text-sage transition-colors">HOME</Link>
            <Link to="/category/mobile-skins" className="hover:text-sage transition-colors">SHOP</Link>
            <Link to="/about" className="hover:text-sage transition-colors">ABOUT</Link>
            <Link to="/blog" className="hover:text-sage transition-colors">BLOG</Link>
            <Link to="/contact" className="hover:text-sage transition-colors">CONTACT</Link>
          </div>

          {/* Icons */}
          {/* <div className="flex items-center space-x-6">
            <Heart className="w-6 h-6 text-olive hover:text-sage transition-colors cursor-pointer" />
            <CartButton />
            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div> */}
            <CartButton />
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }} 
        animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="lg:hidden bg-white border-t overflow-hidden"
      >
        <div className="px-4 py-6 space-y-4">
          <Link to="/" className="block hover:text-sage transition-colors">HOME</Link>
          <Link to="/shop" className="block hover:text-sage transition-colors">SHOP</Link>
          <Link to="/about" className="block hover:text-sage transition-colors">ABOUT</Link>
          <Link to="/blog" className="block hover:text-sage transition-colors">BLOG</Link>
          <Link to="/contact" className="block hover:text-sage transition-colors">CONTACT</Link>
        </div>
      </motion.div>
    </nav>
  );
}

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Menu, X,  User, ShoppingCart } from 'lucide-react';
// import { CartButton } from './CartButton';


// export function Navigation() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
          
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0 flex items-center">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="text-2xl font-bold text-black"
//               >
//                 MobiiWrap
//               </motion.div>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden sm:flex sm:items-center space-x-6">
//             <Link to="/" className="text-gray-700 hover:text-black transition">
//               Home
//             </Link>
            
//             {/* Products Dropdown */}
//             <div className="relative group">
//               <button className="text-gray-700 hover:text-black transition">Products</button>
//               <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
//                 <Link to="/category/mobile-skins" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                   Mobile Skins
//                 </Link>
//                 <Link to="/category/laptop-skins" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                   Laptop Skins
//                 </Link>
//                 <Link to="/category/stickers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                   Stickers
//                 </Link>
//               </div>
//             </div>

//             <Link to="/about" className="text-gray-700 hover:text-black transition">
//               About
//             </Link>
//             <Link to="/track" className="text-gray-700 hover:text-black transition">
//               Track Your Order
//             </Link>

//             <Link to="/contact" className="text-gray-700 hover:text-black transition">
//               Contact
//             </Link>

            

//             {/* Cart Button */}
//             <CartButton />
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="sm:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-black">
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       <motion.div
//         initial={false}
//         animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
//         className="sm:hidden bg-white shadow-md overflow-hidden"
//       >
//         <div className="px-4 py-3 space-y-2">
//           <Link to="/" className="block text-gray-700 hover:text-black">Home</Link>
//           <Link to="/category/mobile-skins" className="block text-gray-700 hover:text-black">Mobile Skins</Link>
//           <Link to="/category/laptop-skins" className="block text-gray-700 hover:text-black">Laptop Skins</Link>
//           <Link to="/category/stickers" className="block text-gray-700 hover:text-black">Stickers</Link>
//           <Link to="/about" className="block text-gray-700 hover:text-black">About</Link>
//           <Link to="/contact" className="block text-gray-700 hover:text-black">Contact</Link>
//           <Link to="/policies/privacy" className="block text-gray-700 hover:text-black">Privacy Policy</Link>
//           <Link to="/policies/returns" className="block text-gray-700 hover:text-black">Return & Refund Policy</Link>
//           <Link to="/policies/shipping" className="block text-gray-700 hover:text-black">Shipping Policy</Link>
//           <Link to="/policies/terms" className="block text-gray-700 hover:text-black">Terms & Conditions</Link>
//           <Link to="/cart" className="block text-gray-700 hover:text-black flex items-center">
//             <ShoppingCart size={20} className="mr-2" /> Cart
//           </Link>
//           <Link to="/account" className="block text-gray-700 hover:text-black flex items-center">
//             <User size={20} className="mr-2" /> Account
//           </Link>
//         </div>
//       </motion.div>
//     </nav>
//   );
// }


// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { Menu, X, Search, User, ShoppingCart } from 'lucide-react';
// // import { CartButton } from './CartButton';
// // import { InputText } from 'primereact/inputtext';
// // import { Button } from 'primereact/button';

// // export function Navigation() {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   return (
// //     <nav className="bg-white shadow-md sticky top-0 z-50">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between items-center h-16">
          
// //           {/* Logo */}
// //           <div className="flex items-center">
// //             <Link to="/" className="flex-shrink-0 flex items-center">
// //               <motion.div
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="text-2xl font-bold text-black"
// //               >
// //                 MobiiWrap
// //               </motion.div>
// //             </Link>
// //           </div>

// //           {/* Desktop Navigation */}
// //           <div className="hidden sm:flex sm:items-center space-x-6">
// //             <Link to="/" className="text-gray-700 hover:text-black transition">
// //               Home
// //             </Link>
            
// //             {/* Products Dropdown */}
// //             <div className="relative group">
// //               <button className="text-gray-700 hover:text-black transition">Products</button>
// //               <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
// //                 <Link to="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100  ">Embossed Phone Skins</Link>
// //                 <Link to="#" className="block px-4 py-2 text-gray-400 cursor-not-allowed">
// //  Stickers
// // </Link>
// // <Link to="#" className="block px-4 py-2 text-gray-400 cursor-not-allowed">
// //   Laptop Skins
// // </Link>

// //               </div>
// //             </div>

// //             <Link to="/about" className="text-gray-700 hover:text-black transition">
// //               About
// //             </Link>
// //             <Link to="/track" className="text-gray-700 hover:text-black transition">
// //               Track Your Order
// //             </Link>

// //             <Link to="/contact" className="text-gray-700 hover:text-black transition">
// //               Contact
// //             </Link>

         
// //             {/* Cart Button */}
// //             <CartButton />
// //           </div>

// //           {/* Mobile Menu Button */}
// //           <div className="sm:hidden">
// //             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-black">
// //               {isOpen ? <X size={24} /> : <Menu size={24} />}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile Dropdown Menu */}
// //       <motion.div
// //         initial={false}
// //         animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
// //         className="sm:hidden bg-white shadow-md overflow-hidden"
// //       >
// //         <div className="px-4 py-3 space-y-2">
// //           <Link to="/" className="block text-gray-700 hover:text-black">Home</Link>
// //           <Link to="/products" className="block text-gray-700 hover:text-black">Products</Link>
// //           <Link to="/about" className="block text-gray-700 hover:text-black">About</Link>
// //           <Link to="/contact" className="block text-gray-700 hover:text-black">Contact</Link>
// //           <Link to="/cart" className="block text-gray-700 hover:text-black flex items-center">
// //             <ShoppingCart size={20} className="mr-2" /> Cart
// //           </Link>
// //           <Link to="/account" className="block text-gray-700 hover:text-black flex items-center">
// //             <User size={20} className="mr-2" /> Account
// //           </Link>
// //         </div>
// //       </motion.div>
// //     </nav>
// //   );
// // }

// // import  { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { Menu, X, Search, User } from 'lucide-react';
// // import { CartButton } from './CartButton';

// // export function Navigation() {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <nav className="bg-white shadow-lg">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-16">
// //           <div className="flex items-center">
// //             <Link to="/" className="flex-shrink-0 flex items-center">
// //               <motion.div
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="text-2xl font-bold text-black-600"
// //               >
// //                 MobiiWrap
// //               </motion.div>
// //             </Link>
// //           </div>

// //           <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
// //             <Link to="/products" className="text-gray-700 hover:text-black-600 transition-colors">
// //               Products
// //             </Link>
// //             <Link to="/about" className="text-gray-700 hover:text-black-600 transition-colors">
// //               About
// //             </Link>
// //             <button className="text-gray-700 hover:text-black-600 transition-colors">
// //               <Search size={20} />
// //             </button>
// //             <CartButton />
         
// //           </div>

// //           <div className="flex items-center sm:hidden">
// //             <button
// //               onClick={() => setIsOpen(!isOpen)}
// //               className="text-gray-700 hover:text-black-600 transition-colors"
// //             >
// //               {isOpen ? <X size={24} /> : <Menu size={24} />}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile menu */}
// //       <motion.div
// //         initial={false}
// //         animate={isOpen ? { height: 'auto' } : { height: 0 }}
// //         className="sm:hidden overflow-hidden"
// //       >
// //         <div className="px-2 pt-2 pb-3 space-y-1">
// //           <Link
// //             to="/products"
// //             className="block px-3 py-2 text-gray-700 hover:text-black-600 transition-colors"
// //           >
// //             Products
// //           </Link>
// //           <Link
// //             to="/about"
// //             className="block px-3 py-2 text-gray-700 hover:text-black-600 transition-colors"
// //           >
// //             About
// //           </Link>
// //           <Link
// //             to="/cart"
// //             className="block px-3 py-2 text-gray-700 hover:text-black-600 transition-colors"
// //           >
// //             Cart
// //           </Link>
// //           <Link
// //             to="/account"
// //             className="block px-3 py-2 text-gray-700 hover:text-black-600 transition-colors"
// //           >
// //             Account
// //           </Link>
// //         </div>
// //       </motion.div>
// //     </nav>
// //   );
// // }