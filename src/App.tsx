import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop.tsx';
import { NotFound } from './components/notAvailable/404notFound.tsx';

// Page imports
// import { Home } from './pages/Home';
// import { ProductListing } from './pages/ProductListing';
// import ProductDetail from './pages/ProductDetail';
// import { CartPage } from './pages/Cart';
// import { CheckoutPage } from './pages/Checkout';
// import { About } from './pages/About';
// import PrivacyPolicy from './pages/Termspages/PrivacyPolicy';
// import ReturnAndRefundPolicy from './pages/Termspages/ReturnAndRefundPolicy.tsx';
// import ShippingPolicy from './pages/Termspages/ShippingPolicy.tsx';
// import TermsAndConditions from './pages/Termspages/TermsAndConditions.tsx';
import { Suspense, lazy } from "react";
import CircularText from './components/Loading/CircularPageLoading';



// Lazy Load Pages
const Home = lazy(() => import("./pages/Home"));
const ProductListing = lazy(() => import("./pages/ProductListing"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const CartPage = lazy(() => import("./pages/Cart"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/Termspages/PrivacyPolicy"));
const ReturnAndRefundPolicy = lazy(() => import("./pages/Termspages/ReturnAndRefundPolicy"));
const ShippingPolicy = lazy(() => import("./pages/Termspages/ShippingPolicy"));
const TermsAndConditions = lazy(() => import("./pages/Termspages/TermsAndConditions"));


export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<CircularText text="Loading..." />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Core Pages */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="products/:id" element={<ProductDetail />} />

            {/* Product Routes */}
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
        </Suspense>

      </Router>
    </CartProvider>
  );
}
