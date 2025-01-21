import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { About } from './pages/About';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import  ProductDetail  from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';
import { NotFound } from './components/notAvailable/404notFound.tsx'; // Import the 404 page
import  PrivacyPolicy  from './pages/Terms pages/PrivacyPolicy.tsx';
import  ReturnAndRefundPolicy  from './pages/Terms pages/ReturnAndRefundPolicy.tsx';
import  ShippingPolicy  from './pages/Terms pages/ShippingPolicy.tsx';
import  TermsAndConditions  from './pages/Terms pages/TermsAndConditions.tsx';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
             {/* Policy Routes */}
             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/return-and-refund-policy" element={<ReturnAndRefundPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}