import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black text-white py-3 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm tracking-wide">
        <Truck size={16} className="text-white/80" />
        <span>FREE SHIPPING ON PAN INDIA</span>
      </div>
    </motion.div>
  );
} 