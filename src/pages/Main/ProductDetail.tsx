import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Truck, RotateCcw, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import PhoneSelector from '../../components/variantSelection/PhoneSelectorProps';
import { mobiles } from '../../sample/mobileDevicesList';
import { productService } from '../../api';
import ProductImageGallery from '../../components/ProductSelection/ProductImageGallery';
import Toast from "../../components/ui/Toast";
import { LoadingSpinner } from '../../components/Loading/LoadingSpinner';
import FAQSection from '../../components/FAQ/FAQSmall';
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumbs';
import ProductVideoPlayer from '../../components/ProductSelection/ProductVideoPlayer';
import { AnnouncementBar } from '../../components/ui/AnnouncementBar';

export default function ProductDetail() {
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedPhone, setSelectedPhone] = useState({ brand: '', model: '' });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          setError('Product ID is required');
          setLoading(false);
          return;
        }
        const fetchedProduct = await productService.getById(id);
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (err) {
        setError('Product not found!');
        setLoading(false);
        navigate('/not-found');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found!</div>;

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

    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 2000);
  };

  return (
    <>
      <AnnouncementBar />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Breadcrumbs />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            {/* Left Column - Images */}
            <div className="space-y-8">
              <ProductImageGallery images={product.images} productName={product.name} />
              <ProductVideoPlayer 
                videoLink={product.instagramLink}
                posterImage={product.images[0]}
                productName={product.name}
              />
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-light tracking-wide"
                >
                  {product.name}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-medium"
                >
                  ₹{product.price.toFixed(2)}
                </motion.div>
              </div>

              {/* Device Selection */}
              {product.productType.name === 'mobile-skins' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-sm font-medium tracking-wide">SELECT YOUR DEVICE</h3>
                  <PhoneSelector brands={mobiles} setSelectedPhone={setSelectedPhone} />
                </motion.div>
              )}

              {/* Add to Cart Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-4 flex items-center justify-center gap-3 hover:bg-black/90 transition-colors"
                >
                  <ShoppingCart size={20} />
                  <span className="text-sm tracking-wide">ADD TO CART</span>
                </button>
              </motion.div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-black/10">
                <div className="text-center space-y-2">
                  <Truck size={24} className="mx-auto text-black/60" />
                  <span className="block text-xs tracking-wide text-black/60">Fast Delivery</span>
                </div>
                <div className="text-center space-y-2">
                  <RotateCcw size={24} className="mx-auto text-black/60" />
                  <span className="block text-xs tracking-wide text-black/60">Easy To Apply</span>
                </div>
                <div className="text-center space-y-2">
                  <Shield size={24} className="mx-auto text-black/60" />
                  <span className="block text-xs tracking-wide text-black/60">Quality Assured</span>
                </div>
              </div>

              {/* Description */}
              <div className="pt-8 border-t border-black/10">
                <h3 className="text-sm font-medium tracking-wide mb-4">DESCRIPTION</h3>
                <p className="text-sm leading-relaxed text-black/60">{product.description}</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <FAQSection />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {errorMessage && (
          <Toast message={errorMessage} type="error" onClose={() => setErrorMessage("")} />
        )}
        {showAddedNotification && (
          <Toast message="Added to cart!" type="success" onClose={() => setShowAddedNotification(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
