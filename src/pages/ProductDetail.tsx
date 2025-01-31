import React, { useState,useEffect , useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Truck,
  RotateCcw,
  Shield
} from 'lucide-react';
import { clsx } from 'clsx';
import { useCart } from '../context/CartContext';
import PhoneSelector from '../components/variantSelection/PhoneSelectorProps';
import {mobiles} from '../sample/mobileDevicesList'
import { productService } from '../api'; // Import the productService


export default function ProductsDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const { id } = useParams(); // Get the product ID from the URL
  const { addItem } = useCart(); // Destructure addItem from useCart
  const [product, setProduct] = useState<any>(null); // State to store the product
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string>(''); // Error state
   // **New State for Selected Phone**
   const [selectedPhone, setSelectedPhone] = useState({ brand: '', model: '' });
   const imageRef = useRef<HTMLImageElement | null>(null);
   const [loaded, setLoaded] = useState(false);
  

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

  // Set default color as the first color in the product's colors array

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  
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

// Apply the zoom position to the image
const zoomStyle = {
  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
  transform: isZoomed ? 'scale(2)' : 'scale(1)',
};

// Render the product image with zoom functionality
return (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div
            className="relative aspect-square overflow-hidden"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Main Product Image */}
            <img
              ref={imageRef}
              src={product.images[currentImageIndex]}
              alt={product.name}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`w-full h-full object-contain transition-transform duration-300 ${loaded ? 'opacity-100 hover:scale-105' : 'opacity-0'}`}
              onLoad={() => setLoaded(true)}
              style={zoomStyle}
            />
            {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
            
            {/* Zoom functionality for the main image */}
            {/* <motion.img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className={clsx(
                "w-full h-full object-cover transition-transform duration-200",
                isZoomed && "scale-150 translate-x-16 translate-y-16"
              )}
              style={isZoomed ? {
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              } : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={currentImageIndex}
            /> */}
            
            {/* Navigation buttons */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>

          {/* Image Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={clsx(
                  "aspect-square rounded-lg overflow-hidden",
                  currentImageIndex === index && "ring-2 ring-black-600"
                )}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>

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
