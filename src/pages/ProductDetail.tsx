import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Check, Truck, RotateCcw, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PhoneSelector from '../components/variantSelection/PhoneSelectorProps';
import { mobiles } from '../sample/mobileDevicesList';
import { productService } from '../api'; // Import the productService
import ProductImageGallery from '../components/ProductImageGallery';
import Toast from "../components/Toast"; // Import Toast
import LoadingSpinner from '../components/LoadingSpinner';
import FAQSection from '../components/FAQ/FAQSmall';

export default function ProductsDetail() {
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const cartButtonRef = useRef<any>(null);
  const { id } = useParams(); // Get the product ID from the URL
  const { addItem } = useCart(); // Destructure addItem from useCart
  const [product, setProduct] = useState<any>(null); // State to store the product
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string>(''); // Error state
  const [selectedPhone, setSelectedPhone] = useState({ brand: '', model: '' });
  const [errorMessage, setErrorMessage] = useState(""); // State for error toast

  // Fetch product details using getById
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await productService.getById(id!); // Fetch product by ID
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (err) {
        setError('Product not found!');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-fetch when product ID changes

  // If loading, show a loading spinner
  if (loading) {
    return <LoadingSpinner/>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (product.productType.name === "mobile-skins" && (!selectedPhone.brand || !selectedPhone.model)) {
      setErrorMessage("Please select a phone brand and model before adding to cart.");
      return;
    }

    addItem({
      ...product,
      selectedBrand: selectedPhone.brand,
      selectedModel: selectedPhone.model,
    });

    // ✅ Ensure the mini cart opens after adding an item
 

    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ProductImageGallery images={product.images} productName={product.name} />
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <motion.h1
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {product.name}
              </motion.h1>
              <div className="flex items-center space-x-4 mt-2"></div>
            </div>

            <motion.div
              className="text-3xl font-bold text-black-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Rs. {product.price}
              
            </motion.div>

            {/* Conditionally render PhoneSelector if productType is 'mobile' */}
            {product.productType.name === 'mobile-skins' && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-semibold">Select Your Device</h3>
                <div className="flex space-x-4">
                  <PhoneSelector brands={mobiles} setSelectedPhone={setSelectedPhone} />
                </div>
              </motion.div>
            )}

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-black text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-black/70"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </motion.div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Truck size={20} />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <RotateCcw size={20} />
                  <span>Easy To Apply</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield size={20} />
                  <span>Quality Assurance</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold mb-4">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        </div>
      </div>


<FAQSection/>
      {/* Added to Cart Notification */}
      <AnimatePresence>
         {/* Toast Notification for Errors */}
     {errorMessage && <Toast message={errorMessage} type="error" onClose={() => setErrorMessage("")} />}
      
      {/* Toast Notification for Success */}
      {showAddedNotification && <Toast message="Added to cart!" type="success" onClose={() => setShowAddedNotification(false)} />}
    
      </AnimatePresence>
    </div>
  );
}
