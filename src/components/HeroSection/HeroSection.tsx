import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "../../assets/heroImage.jpg";
import heroImage2 from "../../assets/heroImage2.jpg";
import heroImage4 from "../../assets/heroImage4.jpg";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {
      image: heroImage,
      title: "Premium Device Skins",
      subtitle: "Elevate your style with custom designs",
      position: "left",
      bgColor: "from-purple-900 to-blue-900",
      link: "/category/premium-skins",
      action: () =>  navigate('/category/mobile-skins') // Replace with your action
    },
    {
      image: heroImage2,
      title: "Precision Crafted",
      subtitle: "Perfect fit guaranteed for every device",
      position: "right",
      bgColor: "from-orange-900 to-red-900",
      link: "/category/precision-skins",
      action: () =>  navigate('/category/mobile-skins') // Replace with your action
    },
    {
      image: heroImage4,
      title: "Limited Edition",
      subtitle: "Exclusive collections updated monthly",
      position: "left",
      bgColor: "from-teal-900 to-emerald-900",
      link: "/category/limited-edition",
      action: () =>  navigate('/category/mobile-skins') // Replace with your action
    }
  ];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(handleNext, 3500);
      return () => clearInterval(interval);
    }
  }, [isHovered, handleNext]);

  const getPositionClasses = (position) => {
    const baseClasses = "absolute inset-y-0 flex items-center w-full lg:w-1/2 px-6 lg:px-12";
    switch (position) {
      case "right":
        return `${baseClasses} right-0 justify-end`;
      case "center":
        return `${baseClasses} left-1/2 -translate-x-1/2 justify-center text-center`;
      default:
        return `${baseClasses} left-0`;
    }
  };

  // Handle slide click
  const handleSlideClick = useCallback(() => {
    const currentSlide = slides[currentIndex];
    if (currentSlide.action) {
      currentSlide.action();
    }
    // You can also use react-router-dom's navigate here
    // navigate(currentSlide.link);
  }, [currentIndex, slides]);

  return (
    <section 
      className="relative h-[90vh] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient with smoother transition */}
      <AnimatePresence mode="wait">
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-r ${slides[currentIndex].bgColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          key={`bg-${currentIndex}`}
        />
      </AnimatePresence>

      {/* Image Slideshow with improved transitions and click handling */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`slide-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 cursor-pointer"
          onClick={handleSlideClick}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="absolute inset-0 bg-cover bg-center transform"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content with coordinated animations */}
      <AnimatePresence mode="wait">
        <div className={getPositionClasses(slides[currentIndex].position)}>
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-xl bg-black/40 p-6 rounded-lg backdrop-blur-sm"
            onClick={handleSlideClick}
            style={{ cursor: 'pointer' }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              {slides[currentIndex].title}
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              {slides[currentIndex].subtitle}
            </motion.p>

            <motion.button
              className="group flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-3 rounded-full
                       hover:bg-white hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent's onClick
                handleSlideClick();
              }}
            >
              Shop Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white backdrop-blur-sm transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white backdrop-blur-sm transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? "w-8 bg-white" 
                : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
