import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutUs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smoother scroll-based transformations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section - Fullscreen with parallax effect */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Dark gradient overlay at the top for header contrast */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-900/70 to-transparent z-10"></div>
    
         <div className="absolute inset-0 overflow-hidden">
 
  {/* Animated background image */}
  <motion.div 
    className="absolute inset-0 bg-[url('https://res.cloudinary.com/dskopgpgi/image/upload/v1744241247/heroImage3_ptgjy3.jpg')] bg-cover bg-center"
    initial={{ opacity: 0.8, scale: 1 }}
    animate={{ 
      opacity: 1,
      scale: 1.05,
      backgroundPosition: ['0% 0%', '10% 10%'] // More subtle movement
    }}
    transition={{ 
      duration: 30,  // Slower for more elegance
      repeat: Infinity,
      repeatType: "mirror", // Smoother reversal
      ease: "linear"
    }}
  />
</div>
        {/* Hero Content - adjusted positioning to account for header */}
        <div className="relative z-10 text-center px-6 max-w-4xl mt-12"> {/* Added top margin */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="block">Mobiiwrap</span>
              <span className="text-3xl md:text-4xl font-light block mt-2">Since 2019</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white font-light max-w-2xl mx-auto">
              Transforming ordinary devices into extraordinary statements of style
            </p>
            
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("our-story")?.scrollIntoView({ 
                    behavior: "smooth" 
                  });
                }}
                className="px-8 py-3 bg-white text-orange-500 rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg"
              >
                Discover Our Story
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </motion.section>

      {/* Content Sections with staggered animations */}
      <motion.div 
        className="bg-gray-50 relative z-20"
        style={{ opacity: contentOpacity }}
      >
        {/* Our Story Section */}
        <section id="our-story" className="py-24 px-6 sm:px-8 lg:px-16 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6 inline-block relative">
                Our Story
                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-orange-500"></span>
              </h2>
              <p className="mb-6 leading-relaxed text-lg text-gray-600">
                Founded in 2019 and nestled in the bustling Gaffar Market of Karol Bagh, Mobiiwrap is your go-to destination for top-quality wrapping services. We specialize in mobile phone skins, earphone wraps, and other custom device skins, offering protection while giving a fresh, stylish look.
              </p>
              <p className="leading-relaxed text-lg text-gray-600">
                I'm Shubham Khandelwal, the proud founder of Mobiiwrap. We believe in transforming ordinary items into extraordinary pieces, and our vision is to lead the global wrapping solutions industry by providing custom wraps for everything you own.
              </p>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">Our Workshop</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Product Range Section */}
        <section className="py-24 bg-orange-50">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Premium Wraps For Every Device
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                We offer a range of skins, including mobile phone skins, earphone wraps, and more. Our wraps not only add a customized touch but also protect your devices from scratches and everyday wear.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Mobile Skins", icon: "📱", description: "Custom designs for all popular smartphone models" },
                { title: "Earphone Wraps", icon: "🎧", description: "Unique styles for your audio accessories" }, 
                { title: "Device Protection", icon: "🛡️", description: "Scratch-proof, water-resistant durability" }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="bg-white p-8 rounded-xl shadow-lg text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="flex justify-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="/products"
                className="px-8 py-4 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Explore Our Collection
              </a>
            </motion.div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-24 px-6 sm:px-8 lg:px-16 max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-16 text-center text-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What Makes Us Different
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: "Premium Materials", description: "We use only top-quality vinyl that's built to last" },
              { title: "Custom Designs", description: "Your imagination is our blueprint" },
              { title: "Expert Application", description: "Precision fitting for a perfect finish every time" },
              { title: "Local Craftsmanship", description: "Supporting and showcasing Delhi's skilled artisans" }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="flex gap-4"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mt-1">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-yellow-400 text-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Transform Your Devices?
            </motion.h2>
            <motion.p
              className="text-xl mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Visit our shop in Gaffar Market, Karol Bagh or browse our online catalog to find the perfect wrap for your device.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a 
                href="/contact" 
                className="px-8 py-3 bg-white text-orange-500 rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg"
              >
                Find Our Store
              </a>
              <a 
                href="/products" 
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-orange-500 transition-all"
              >
                Shop Online
              </a>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
