import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutUs() {
  const { scrollY } = useScroll();

  // Transform values for the hero section
  const heroHeight = useTransform(
    scrollY,
    [0, 300],
    ['calc(100vh - 64px)', '60vh'] // Subtracting header height
  );

  const textScale = useTransform(
    scrollY,
    [0, 300],
    [1, 0.8]
  );

  const gradientOpacity = useTransform(
    scrollY,
    [0, 300],
    [0.9, 1]
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#333333]">
      {/* Hero Section */}
      <motion.section
        style={{ 
          height: heroHeight,
        }}
        className="relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-500"
          style={{ opacity: gradientOpacity }}
        />
        
        <motion.div 
          className="relative h-full flex items-center justify-center text-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <motion.h1
              style={{ scale: textScale }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-4 transition-all duration-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to Mobiiwrap!
            </motion.h1>
            <motion.p
              style={{ scale: textScale }}
              className="text-xl text-gray-200 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Transforming everyday devices with custom, top-quality wraps since 2019.
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* Content Sections */}
      <div className="bg-[#F5F5F5]">
        {/* Our Story Section */}
        <section className="py-16 px-6 sm:px-8 lg:px-16 max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-[#333333] mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.h2>
          <motion.p
            className="mb-6 leading-relaxed text-lg text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Founded in 2019 and nestled in the bustling Gaffar Market of Karol Bagh, Mobiiwrap is your go-to destination for top-quality wrapping services. We specialize in mobile phone skins, earphone wraps, and other custom device skins, offering protection while giving a fresh, stylish look.
          </motion.p>
          <motion.p
            className="mb-6 leading-relaxed text-lg text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            I'm Shubham Khandelwal, the proud founder of Mobiiwrap. We believe in transforming ordinary items into extraordinary pieces, and our vision is to lead the global wrapping solutions industry by providing custom wraps for everything you own.
          </motion.p>
        </section>

        {/* Product Range Section */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16">
            <motion.h2
              className="text-3xl font-bold mb-6 text-center text-[#333333]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Wraps
            </motion.h2>
            <motion.p
              className="mb-8 text-center text-lg text-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              We offer a range of skins, including mobile phone skins, earphone wraps, and more. Our wraps not only add a customized touch but also protect your devices from scratches and everyday wear.
            </motion.p>
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="/category/mobile-skins"
                className="px-8 py-3 bg-[#FF8C00] text-white rounded-full font-medium hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Explore Our Skins Collection
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

// import { motion } from 'framer-motion';

// export default function AboutUs() {
//   return (
//     <div className="min-h-screen bg-[#F5F5F5] text-[#333333]">

//       {/* Hero Section */}
//       <motion.section
//         className="h-[60vh] bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-500 flex items-center justify-center text-center px-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="text-center">
//           <motion.h1
//             className="text-4xl md:text-5xl font-extrabold text-white mb-4"
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             Welcome to Mobiiwrap!
//           </motion.h1>
//           <motion.p
//             className="text-xl text-gray-200 max-w-2xl mx-auto"
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             Transforming everyday devices with custom, top-quality wraps since 2019.
//           </motion.p>
//         </div>
//       </motion.section>

//       {/* Our Story Section */}
//       <section className="py-16 px-6 sm:px-8 lg:px-16 max-w-5xl mx-auto text-center">
//         <motion.h2
//           className="text-3xl font-bold text-[#333333] mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           Our Story
//         </motion.h2>
//         <motion.p
//           className="mb-6 leading-relaxed text-lg text-gray-600"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.1 }}
//         >
//           Founded in 2019 and nestled in the bustling Gaffar Market of Karol Bagh, Mobiiwrap is your go-to destination for top-quality wrapping services. We specialize in mobile phone skins, earphone wraps, and other custom device skins, offering protection while giving a fresh, stylish look.
//         </motion.p>
//         <motion.p
//           className="mb-6 leading-relaxed text-lg text-gray-600"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           I’m Shubham Khandelwal, the proud founder of Mobiiwrap. We believe in transforming ordinary items into extraordinary pieces, and our vision is to lead the global wrapping solutions industry by providing custom wraps for everything you own.
//         </motion.p>
//         <motion.p
//           className="leading-relaxed text-lg text-gray-600"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           Join us on our journey to give your devices a fresh, customized look. Explore our skins collection today!
//         </motion.p>
//       </section>

//       {/* Product Range Section */}
//       <section className="py-8 bg-[#F9F9F9]">
//         <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16">
//           <motion.h2
//             className="text-3xl font-bold mb-6 text-center text-[#333333]"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           >
//             Our Wraps
//           </motion.h2>
//           <motion.p
//             className="mb-6 text-center text-lg text-gray-700"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.1 }}
//           >
//             We offer a range of skins, including mobile phone skins, earphone wraps, and more. Our wraps not only add a customized touch but also protect your devices from scratches and everyday wear.
//           </motion.p>
//           <div className="flex justify-center">
//             <a
//               href="/category/mobile-skins"
//               className="px-8 py-3 bg-[#FF8C00] text-white rounded-full font-medium hover:bg-orange-600 transition-all"
//             >
//               Explore Our Skins Collection
//             </a>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }
