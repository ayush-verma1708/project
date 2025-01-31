import  { useState,useEffect  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import {  ShoppingCart,
  Check,
  Truck,
  RotateCcw,
  Shield
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import PhoneSelector from '../components/variantSelection/PhoneSelectorProps';
import {mobiles} from '../sample/mobileDevicesList'
import { productService } from '../api'; // Import the productService
import ProductImageGallery from '../components/ProductImageGallery';

export default function ProductsDetail() {
    const [showAddedNotification, setShowAddedNotification] = useState(false);
  const { id } = useParams(); // Get the product ID from the URL
  const { addItem } = useCart(); // Destructure addItem from useCart
  const [product, setProduct] = useState<any>(null); // State to store the product
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string>(''); // Error state
   // **New State for Selected Phone**
   const [selectedPhone, setSelectedPhone] = useState({ brand: '', model: '' });
  

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
  // If the product is not found, you can display an error or return early
  
    // If loading, show a loading spinner
    if (loading) {
      return <div>Loading...</div>;
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
  if (!selectedPhone.brand || !selectedPhone.model) {
    alert('Please select a phone brand and model before adding to cart.');
    return;
  }

  addItem({ 
    ...product, 
    selectedBrand: selectedPhone.brand, 
    selectedModel: selectedPhone.model 
  });

  setShowAddedNotification(true);
  setTimeout(() => setShowAddedNotification(false), 2000);
};
if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;
if (!product) return <div>Product not found!</div>;



// Render the product image with zoom functionality
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
            <div className="flex items-center space-x-4 mt-2">
              {/* <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span> */}
            </div>
          </div>

          <motion.div 
            className="text-3xl font-bold text-black-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            ${product.price}
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold">Select Your Device</h3>
            <div className="flex space-x-4">

              <PhoneSelector brands={mobiles}  setSelectedPhone={setSelectedPhone}/>
            </div>
          </motion.div>

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
                // className="flex-1 bg-black-600 text-black px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-black-700"
                className="flex-1 bg-black text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-black/70"
 
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </motion.button>
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <Heart size={20} />
              </motion.button> */}
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                
                className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <Share2 size={20} />
              </motion.button> */}
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

    {/* Added to Cart Notification */}
    <AnimatePresence>
      {showAddedNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
        >
          <Check size={20} />
          <span>Added to cart!</span>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
}
