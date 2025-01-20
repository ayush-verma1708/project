import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, RefreshCw, Shield } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[80vh] bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80"
            alt="Hero background" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            {...fadeInUp}
          >
            Transform Your Device
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 max-w-2xl"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Premium mobile skins that protect and personalize your device with style.
          </motion.p>
          <motion.button
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-opacity-90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now <ArrowRight size={20} />
          </motion.button>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div 
            className="text-center p-6"
            whileHover={{ scale: 1.05 }}
          >
            <Truck className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600">On all orders over $50</p>
          </motion.div>
          <motion.div 
            className="text-center p-6"
            whileHover={{ scale: 1.05 }}
          >
            <RefreshCw className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
            <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day money back guarantee</p>
          </motion.div>
          <motion.div 
            className="text-center p-6"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">Durable materials that last</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Products
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {/* Product cards would be mapped here */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ y: -10 }}
            >
              <img 
                src={`https://images.unsplash.com/photo-156${i}484033936-6b7f63b47f5?auto=format&fit=crop&q=80`}
                alt={`Featured product ${i}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Premium Skin Design {i}</h3>
                <p className="text-gray-600 mb-4">High-quality mobile skin with precision cut</p>
                <p className="text-xl font-bold text-indigo-600">$29.99</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}