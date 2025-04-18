import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop.tsx';
import { NotFound } from './components/notAvailable/404notFound.tsx';
import { Suspense, lazy } from "react";
import { LoadingSpinner } from './components/Loading/LoadingSpinner.tsx';
import LockScreen from "./pages/LockScreen/LockScreen.tsx";
import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import CheckoutPage from './pages/Main/Checkout';
// import OrderConfirmationPage from './pages/Main/OrderConfirmationPage';
import OrderConfirmation from './pages/Main/OrderConfirmation';

// Lazy Load Pages
const Home = lazy(() => import("./pages/Main/Home.tsx"));
const ProductListing = lazy(() => import("./pages/Main/ProductListing.tsx"));
const ProductDetail = lazy(() => import("./pages/Main/ProductDetail.tsx"));
const CartPage = lazy(() => import("./pages/Main/Cart.tsx"));
const About = lazy(() => import("./pages/Main/About.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/Termspages/PrivacyPolicy"));
const ReturnAndRefundPolicy = lazy(() => import("./pages/Termspages/ReturnAndRefundPolicy"));
const ShippingPolicy = lazy(() => import("./pages/Termspages/ShippingPolicy"));
const TermsAndConditions = lazy(() => import("./pages/Termspages/TermsAndConditions"));
const Blog = lazy(() => import("./pages/Main/Blog.tsx"));
const Contact = lazy(() => import("./pages/Main/Contact.tsx"));
const FAQ = lazy(() => import("./pages/Main/FAQ.tsx"));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Come back! ⚡" : "Mobiiwrap";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timer);
    };
  }, []);

  const isUnlocked = localStorage.getItem("siteUnlocked") === "true";
  if (!isUnlocked) {
    return <LockScreen />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          {isLoading && <LoadingSpinner />}
          <Suspense fallback={<LoadingSpinner/>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Homepage */}
                <Route index element={<Home />} />
                
                {/* Category Routes */}
                <Route path="category">
                  <Route index element={<Navigate to="/category/mobile-skins" replace />} />
                  <Route path=":categoryName" element={<ProductListing />} />
                </Route>

                {/* Product Routes */}
                <Route path="product">
                  <Route path=":id" element={<ProductDetail />} />
                </Route>

                {/* Search Route */}
                <Route path="search" element={<ProductListing />} />

                {/* Core Pages */}
                <Route path="about" element={<About />} />
                <Route path="blog" element={<Blog />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<FAQ />} />

                {/* Policy Pages */}
                <Route path="policies">
                  <Route path="privacy" element={<PrivacyPolicy />} />
                  <Route path="returns" element={<ReturnAndRefundPolicy />} />
                  <Route path="shipping" element={<ShippingPolicy />} />
                  <Route path="terms" element={<TermsAndConditions />} />
                </Route>

                {/* Checkout Routes */}
                <Route path="checkout">
                  <Route index element={<Navigate to={`/checkout/p/${crypto.randomUUID()}/pay`} replace />} />
                  <Route path="p/:pipelineId/:action" element={<CheckoutPage />} />
                  <Route path="p/:pipelineId/:action/:productId" element={<CheckoutPage />} />
                </Route>

                {/* Order Confirmation */}
                <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />

                {/* 404 Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
