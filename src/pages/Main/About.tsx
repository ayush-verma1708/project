import { useRef } from 'react';
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
    <div ref={containerRef} className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://res.cloudinary.com/dskopgpgi/image/upload/f_auto,q_auto,w_1920/v1744241247/heroImage3_ptgjy3.jpg"
            alt="Mobiiwrap Workshop"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
              MOBIIWRAP
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide max-w-2xl mx-auto mb-12">
              Transforming ordinary devices into extraordinary statements of style
            </p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={() => document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 bg-white text-black font-light tracking-wider hover:bg-black hover:text-white transition-all duration-300"
              >
                DISCOVER OUR STORY
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <motion.div 
        className="bg-white relative z-20"
        style={{ opacity: contentOpacity }}
      >
        {/* Our Story Section */}
        <section id="our-story" className="py-24 px-6 sm:px-8 lg:px-16 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-light tracking-tight text-black mb-8">
                OUR STORY
              </h2>
              <div className="space-y-6 text-black/80">
                <p className="leading-relaxed text-lg">
                  Founded in 2019 and nestled in the bustling Gaffar Market of Karol Bagh, Mobiiwrap is your go-to destination for top-quality wrapping services. We specialize in mobile phone skins, earphone wraps, and other custom device skins, offering protection while giving a fresh, stylish look.
                </p>
                <p className="leading-relaxed text-lg">
                  I'm Shubham Khandelwal, the proud founder of Mobiiwrap. We believe in transforming ordinary items into extraordinary pieces, and our vision is to lead the global wrapping solutions industry by providing custom wraps for everything you own.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-[400px] bg-black">
                <img 
                  src="https://res.cloudinary.com/dskopgpgi/image/upload/f_auto,q_auto,w_1920/v1744193202/Mobiiwrap%20pictures/Transparent%20skin/cmrixhrt1ve4yqu7oelv.jpg"
                  alt="Our Workshop"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Product Range Section */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-light tracking-tight mb-6">
                PREMIUM WRAPS FOR EVERY DEVICE
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-white/80 tracking-wide">
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
                  className="bg-white/5 p-8 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-light tracking-tight mb-3">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-24 px-6 sm:px-8 lg:px-16 max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl font-light tracking-tight mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            WHAT MAKES US DIFFERENT
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              { title: "Premium Materials", description: "We use only top-quality vinyl that's built to last" },
              { title: "Custom Designs", description: "Your imagination is our blueprint" },
              { title: "Expert Application", description: "Precision fitting for a perfect finish every time" },
              { title: "Local Craftsmanship", description: "Supporting and showcasing Delhi's skilled artisans" }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="flex gap-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-light">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-light tracking-tight mb-2">{item.title}</h3>
                  <p className="text-black/60">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-light tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              READY TO TRANSFORM YOUR DEVICES?
            </motion.h2>
            <motion.p
              className="text-xl mb-10 max-w-2xl mx-auto text-white/80"
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
                className="px-8 py-3 bg-white text-black font-light tracking-wider hover:bg-black hover:text-white transition-all duration-300"
              >
                FIND OUR STORE
              </a>
              <a 
                href="/category/mobile-skins" 
                className="px-8 py-3 border border-white text-white font-light tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              >
                SHOP ONLINE
              </a>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
