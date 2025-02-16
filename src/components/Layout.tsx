import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
// import ScrollVelocity from './Banner/ScrollVelocity';
import ScrollBanner from './Banner/ScrollBanner';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <ScrollVelocity
        texts={[
          "🚀 Flash Sale: Get 30% Off – Limited Time!",
          "🎁 Free Shipping on Orders Over ₹999!",
          "📢 Follow us on Instagram for Exclusive Deals!",
        ]}
        velocity={23} 
        className="custom-scroll-text"
      /> */}
{/* <ScrollBanner 
  text="🚀 Flash Sale: Get 30% Off – Limited Time!"
  // backgroundColor="bg-red-500"
  backgroundColor="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 "
  textColor="text-white"
  height="h-10"
  fontSize="text-s"
  baseVelocity={75}
  pauseOnHover={true}
  reverse={false}
  className="shadow-lg"
/> */}
<ScrollBanner 
  text="🚀 Flash Sale: Get 30% Off – Limited Time!"
  backgroundColor="bg-gradient-to-r from-[#fdae61] via-[#f57c00] to-[#d84315]" 
  textColor="text-[#fef9f3]" 
  height="h-10"
  fontSize="text-s"
  baseVelocity={75}
  pauseOnHover={true}
  reverse={false}
  className="shadow-md border-b border-[#b57c50]"
/>

      <Navigation />
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}