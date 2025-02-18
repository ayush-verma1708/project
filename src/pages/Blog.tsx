import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Blog() {
  const [showMessage, setShowMessage] = useState(false);

  const handleReadMoreClick = () => {
    setShowMessage(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#333333]">
      {/* Hero Section */}
      <motion.section
        className="h-[60vh] bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-500 flex items-center justify-center text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Mobiiwrap Blog
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Stay updated with the latest trends, tips, and news in custom device wraps.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Blog Posts Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#333333] mb-8 text-center">Latest Posts</h2>

        {/* Blog Post 1 */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold text-[#333333] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Why Custom Skins are the Ultimate Protection for Your Devices
          </motion.h3>
          <motion.p
            className="text-lg text-gray-700 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            In today’s fast-paced world, our devices are more than just tools; they’re an extension of ourselves. From mobile phones to earphones, these items accompany us everywhere, and as such, they need to be well protected. Custom wraps provide the perfect solution, offering both style and durability.
          </motion.p>
          <motion.a
            href="#"
            className="text-[#FF8C00] font-medium hover:underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={handleReadMoreClick}
          >
            Read More
          </motion.a>
        </div>

        {/* Blog Post 2 */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold text-[#333333] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            The Art of Personalizing Your Devices with Skins
          </motion.h3>
          <motion.p
            className="text-lg text-gray-700 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Personalization is key to making something truly yours. Custom skins allow you to express your personality and make a statement. Whether you’re looking for bold, minimalist designs or something more playful, Mobiiwrap has something for everyone.
          </motion.p>
          <motion.a
            href="#"
            className="text-[#FF8C00] font-medium hover:underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={handleReadMoreClick}
          >
            Read More
          </motion.a>
        </div>

        {/* Blog Post 3 */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold text-[#333333] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            How Custom Skins Can Enhance Your Device's Longevity
          </motion.h3>
          <motion.p
            className="text-lg text-gray-700 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            One of the most overlooked aspects of device care is protecting the outer surface. Scratches, fingerprints, and daily wear and tear can significantly reduce the lifespan and appearance of your phone or earphones. With a custom skin from Mobiiwrap, you’re giving your devices an added layer of defense.
          </motion.p>
          <motion.a
            href="#"
            className="text-[#FF8C00] font-medium hover:underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={handleReadMoreClick}
          >
            Read More
          </motion.a>
        </div>
      </section>

      {/* Fun Animation for Read More Click */}
      {showMessage && (
        <motion.div
          className="bg-[#FF8C00] text-white p-6 text-center mx-auto max-w-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h4
            className="text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Whoops! No blogs here yet, but we're working on something fun!
          </motion.h4>
          <motion.p
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Stay tuned for exciting blog posts coming soon about custom wraps, personalization, and more!
          </motion.p>
        </motion.div>
      )}

      {/* Call to Action Section */}
      <section className="bg-[#333333] py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Get Your Custom Wraps Today</h2>
        <p className="text-lg mb-6">
          Whether you want to protect your device or add a unique touch, Mobiiwrap has the perfect solution for you.
        </p>
        <a
          href="/category/mobile-skins"
          className="px-8 py-3 bg-[#FF8C00] text-white rounded-full font-medium hover:bg-orange-600 transition-all"
        >
          Explore Our Skins Collection
        </a>
      </section>
    </div>
  );
}
