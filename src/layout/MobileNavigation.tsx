import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, Search, User } from 'lucide-react';
import { CartButton } from '../components/CartButton';
import { SearchModal } from '../components/GeneralComp/SearchModal';

export default function MobileNavigation() {
  const [cartItems] = useState(3); // Replace with actual cart count
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex justify-around items-center h-16 px-2">
          <Link 
            to="/" 
            className="flex flex-col items-center justify-center py-1 px-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Home className="h-5 w-5 text-gray-700" />
            <span className="text-xs mt-1 text-gray-600">Home</span>
          </Link>
          
          <Link 
            to="/category/mobile-skins" 
            className="flex flex-col items-center justify-center py-1 px-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag className="h-5 w-5 text-gray-700" />
            <span className="text-xs mt-1 text-gray-600">Shop</span>
          </Link>
          
          {/* Search Button */}
          <button
            className="flex flex-col items-center justify-center py-1 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-gray-700" />
            <span className="text-xs mt-1 text-gray-600">Search</span>
          </button>

          {/* Account Link */}
          {/* <Link 
            to="/account" 
            className="flex flex-col items-center justify-center py-1 px-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <User className="h-5 w-5 text-gray-700" />
            <span className="text-xs mt-1 text-gray-600">Account</span>
          </Link> */}

          {/* Cart Button */}
          {/* <div className="relative">
            <CartButton mobileView />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems}
              </span>
            )}
          </div> */}
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Home, ShoppingBag, Search, User, Menu } from 'lucide-react';
// import {CartButton} from '../components/CartButton'
// import { SearchModal } from '../components/GeneralComp/SearchModal';

// export default function MobileNavigation() {
//   const [cartItems] = useState(3); // Replace with actual cart count

//   return (
//     <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
//       <div className="flex justify-around items-center h-16 px-2">
//         <Link 
//           to="/" 
//           className="flex flex-col items-center justify-center py-1 px-3 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           <Home className="h-5 w-5 text-gray-700" />
//           <span className="text-xs mt-1 text-gray-600">Home</span>
//         </Link>
        
//         <Link 
//           to="/shop" 
//           className="flex flex-col items-center justify-center py-1 px-3 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           <ShoppingBag className="h-5 w-5 text-gray-700" />
//           <span className="text-xs mt-1 text-gray-600">Shop</span>
//         </Link>
        
      
//         <SearchModal 
//           isOpen={false} 
//           onClose={() => console.log('SearchModal closed')} 
//         />

//         <div className="relative">
//           <CartButton mobileView />
//           {cartItems > 0 && (
//             <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//               {cartItems}
//             </span>
//           )}
//         </div>
        
       
//       </div>
//     </div>
//   );
// }