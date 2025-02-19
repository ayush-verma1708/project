import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import ScrollBanner from './Banner/ScrollBanner';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      
<ScrollBanner 
  text="🚀 Flash Sale: Get 20% Off – Limited Time! Use Code EARLY20"
  backgroundColor="bg-gradient-to-r from-[#fdae61] via-[#f57c00] to-[#d84315]" 
  textColor="text-[#fef9f3]" 
  height="h-10"
  fontSize="text-s"
  baseVelocity={75}
  pauseOnHover={true}
  reverse={true}
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