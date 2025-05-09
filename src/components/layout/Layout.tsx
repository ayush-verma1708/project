import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import  Navigation  from '../Navigation/Navigation';
import { Footer } from './Footer';
import ScrollToTop from './ScrollToTop.tsx';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <ScrollToTop />
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