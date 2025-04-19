import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop.tsx';
import { NotFound } from './components/notAvailable/404notFound.tsx';
import { Suspense, lazy } from "react";
import  { LoadingSpinner }  from './components/Loading/LoadingSpinner.tsx';
import LockScreen from "./pages/LockScreen/LockScreen.tsx"; // Import it
import {useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import CheckoutPage from './pages/Main/Checkout';
import OrderConfirmationPage from './pages/Main/OrderConfirmationPage';

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
// const Store = lazy(() => import("./pages/Store")); // Ensure this is correct

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Come back! ⚡" : "Mobiiwrap";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Simulate loading completion (replace with your actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust this timeout based on your actual loading time

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timer);
    };
  }, []);


  const isUnlocked = localStorage.getItem("siteUnlocked") === "true";
  if (!isUnlocked) {
    return <LockScreen />; // Show lock screen if not unlocked
  }
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        {isLoading && <LoadingSpinner />}
        <Suspense fallback={<LoadingSpinner/>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* Core Pages */}
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blog />} />
            <Route path="cart" element={<CartPage />} />
            <Route path = "contact" element = {<Contact />} />
            <Route path = "faq" element = {<FAQ />} />
            {/* Product Routes */}
            {/* <Route path="category/:category/:id" element={<ProductDetail />} />
            <Route path="category/:category" element={<ProductListing />} /> */}
           <Route path="category" element={<Navigate to="/category/mobile-skins" replace />} />
            <Route path="category/:categoryName" element={<ProductListing />} />
            <Route path="category/:categoryName/:productName" element={<ProductDetail />} />
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
            <Route path="/checkout/:checkoutId" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="/checkout" element={<Navigate to="/checkout/new" replace />} />
        </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
}
