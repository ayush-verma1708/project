import React from 'react';
import { motion } from 'framer-motion';

interface PromotionalBannerProps {
  message: string;
  backgroundColor: string;
  link?: string;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ message, backgroundColor, link }) => {
  return (
    <motion.div
      className={`w-full py-4 ${backgroundColor} text-white text-center`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xl font-semibold">
          {message}
        </p>
        {link && (
          <a 
            href={link} 
            className="inline-block mt-2 bg-white text-indigo-600 font-medium py-2 px-4 rounded-full hover:bg-gray-100 transition"
          >
            Shop Now
          </a>
        )}
      </div>
    </motion.div>
  );
};
