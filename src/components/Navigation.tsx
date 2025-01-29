import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react';
import { CartButton } from './CartButton';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl font-bold text-black"
              >
                MobiiWrap
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-black transition">
              Home
            </Link>
            
            {/* Products Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-black transition">Products</button>
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100  ">Embossed Phone Skins</Link>
                <Link to="#" className="block px-4 py-2 text-gray-400 cursor-not-allowed">
 Stickers
</Link>
<Link to="#" className="block px-4 py-2 text-gray-400 cursor-not-allowed">
  Laptop Skins
</Link>

              </div>
            </div>

            <Link to="/about" className="text-gray-700 hover:text-black transition">
              About
            </Link>
            <Link to="/track" className="text-gray-700 hover:text-black transition">
              Track Your Order
            </Link>

            <Link to="/contact" className="text-gray-700 hover:text-black transition">
              Contact
            </Link>

            {/* Search Bar */}
            {/* <div className="relative">
              <InputText 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="input px-3 py-1 border rounded-md"
              />
              <button className="absolute right-2 top-2 text-gray-500">
                <Search size={18} />
              </button>
            </div> */}

            {/* Account */}
            {/* <Link to="/account" className="text-gray-700 hover:text-black transition flex items-center">
              <User size={20} className="mr-1" /> Account
            </Link> */}

            {/* Cart Button */}
            <CartButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-black">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="sm:hidden bg-white shadow-md overflow-hidden"
      >
        <div className="px-4 py-3 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-black">Home</Link>
          <Link to="/products" className="block text-gray-700 hover:text-black">Products</Link>
          <Link to="/about" className="block text-gray-700 hover:text-black">About</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-black">Contact</Link>
          <Link to="/cart" className="block text-gray-700 hover:text-black flex items-center">
            <ShoppingCart size={20} className="mr-2" /> Cart
          </Link>
          <Link to="/account" className="block text-gray-700 hover:text-black flex items-center">
            <User size={20} className="mr-2" /> Account
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}

// import  { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Menu, X, Search, User } from 'lucide-react';
// import { CartButton } from './CartButton';

// export function Navigation() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0 flex items-center">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="text-2xl font-bold text-black-600"
//               >
//                 MobiiWrap
//               </motion.div>
//             </Link>
//           </div>

//           <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
//             <Link to="/products" className="text-gray-700 hover:text-black-600 transition-colors">
//               Products
//             </Link>
//             <Link to="/about" className="text-gray-700 hover:text-black-600 transition-colors">
//               About
//             </Link>
//             <button className="text-gray-700 hover:text-black-600 transition-colors">
//               <Search size={20} />
//             </button>
//             <CartButton />
         
//           </div>

//           <div className="flex items-center sm:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-700 hover:text-black-600 transition-colors"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <motion.div
//         initial={false}
//         animate={isOpen ? { height: 'auto' } : { height: 0 }}
//         className="sm:hidden overflow-hidden"
//       >
//         <div className="px-2 pt-2 pb-3 space-y-1">
//           <Link
//             to="/products"
//             className="block px-3 py-2 text-gray-700 hover:text-black-600 transition-colors"
//           >
//             Products
//           </Link>
//           <Link
//             to="/about"
//             className="block px-3 py-2 text-gray-700 hover:text-black-600 transition-colors"
//           >
//             About
//           </Link>
//           <Link
//             to="/cart"
//             className="block px-3 py-2 text-gray-700 hover:text-black-600 transition-colors"
//           >
//             Cart
//           </Link>
//           <Link
//             to="/account"
//             className="block px-3 py-2 text-gray-700 hover:text-black-600 transition-colors"
//           >
//             Account
//           </Link>
//         </div>
//       </motion.div>
//     </nav>
//   );
// }