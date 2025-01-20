import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { About } from './pages/About';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import  ProductDetail  from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';

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
            <Route path="/Cart" element= {<CartPage/>} />
            <Route path="/Checkout" element= {<CheckoutPage/>} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}