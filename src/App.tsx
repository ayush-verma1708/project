import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop.tsx';
import { NotFound } from './components/notAvailable/404notFound.tsx';

// Page imports
import { Home } from './pages/Home';
import { ProductListing } from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import { About } from './pages/About';
// Policy components - fix these imports
// import PrivacyPolicy from './pages/TermsPages/PrivacyPolicy';
import PrivacyPolicy from './pages/Termspages/PrivacyPolicy';
import ReturnAndRefundPolicy from './pages/Termspages/ReturnAndRefundPolicy.tsx';
import ShippingPolicy from './pages/Termspages/ShippingPolicy.tsx';
import TermsAndConditions from './pages/Termspages/TermsAndConditions.tsx';


export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Core Pages */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="products/:id" element={<ProductDetail />} />

            {/* Product Routes */}
            {/* <Route path="category">
              <Route
                path=":category"
                element={<ProductListing />} // Missing required props
                loader={({ params }) => {
                  const categoryConfig = productCategories[params.category as keyof typeof productCategories];
                  if (!categoryConfig) throw new Error('Category not found');
                  return categoryConfig;
                }}
                errorElement={<NotFound />}
                />
            </Route> */}
<Route path="category/:category" element={<ProductListing />} />

            {/* Policy Pages */}
            <Route path="policies">
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="returns" element={<ReturnAndRefundPolicy />} />
              <Route path="shipping" element={<ShippingPolicy />} />
              <Route path="terms" element={<TermsAndConditions />} />
            </Route>

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Layout } from './components/Layout';
// import { Home } from './pages/Home';
// import { Products } from './pages/Products';
// import { About } from './pages/About';
// import { CartPage } from './pages/Cart';
// import { CheckoutPage } from './pages/Checkout';
// import  ProductDetail  from './pages/ProductDetail';
// import { CartProvider } from './context/CartContext';
// import { NotFound } from './components/notAvailable/404notFound.tsx'; // Import the 404 page
// import  PrivacyPolicy  from './pages/Terms pages/PrivacyPolicy.tsx';
// import  ReturnAndRefundPolicy  from './pages/Terms pages/ReturnAndRefundPolicy.tsx';
// import  ShippingPolicy  from './pages/Terms pages/ShippingPolicy.tsx';
// import  TermsAndConditions  from './pages/Terms pages/TermsAndConditions.tsx';
// import ScrollToTop from './components/ScrollToTop.tsx';

// import { ProductListing } from './pages/ProductListing.tsx';


// export default function App() {
//   return (
//     <CartProvider>
//       <Router>
//       <ScrollToTop />
//         <Routes>
//         <Route path="/" element={<Layout />}>
//             <Route index element={<Home />} />
//             <Route path="/products" element={<Products />} />

//             {/* Product routes */}
//             <Route 
//           path="/mobile-skins" 
//           element={
//             <ProductListing
//               productType="mobile-skins"
//               categories={['All', 'Embossed', 'Leather', 'Matte']}
//               tags={['All', 'Premium', 'Designer', 'Limited Edition']}
//               sortOptions={['Newest', 'Price: Low to High', 'Most Popular']}
//               pageTitle="Mobile Phone Skins"
//               pageDescription="Premium protective skins for your smartphone"
//             />
//           }
//         />
//         <Route 
//           path="/laptop-skins" 
//           element={
//             <ProductListing
//               productType="laptop-skins"
//               categories={['All', 'Textured', 'Transparent', 'Metallic']}
//               tags={['All', '15-inch', '17-inch', 'MacBook', 'Windows']}
//               sortOptions={['Price: Low to High', 'Most Popular', 'Best Rating']}
//               pageTitle="Laptop Skins"
//               pageDescription="Durable skins for laptops and notebooks"
//             />
//           }
//         />
//         <Route 
//           path="/stickers" 
//           element={
//             <ProductListing
//               productType="stickers"
//               categories={['All', 'Cartoon', 'Minimalist', 'Custom']}
//               tags={['All', 'Small', 'Medium', 'Large']}
//               sortOptions={['Newest', 'Price: High to Low', 'Best Selling']}
//               pageTitle="Decorative Stickers"
//               pageDescription="Express yourself with our unique sticker collection"
//             />
//           }
//         />
//             <Route path="/about" element={<About />} />
//             <Route path="/products/:id" element={<ProductDetail />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/checkout" element={<CheckoutPage />} />
//              {/* Policy Routes */}
//              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//             <Route path="/return-and-refund-policy" element={<ReturnAndRefundPolicy />} />
//             <Route path="/shipping-policy" element={<ShippingPolicy />} />
//             <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
//           </Route>
          
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </CartProvider>
//   );
// }