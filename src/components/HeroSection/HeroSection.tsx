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
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {
      image: heroImage,
      title: "Premium Device Skins",
      subtitle: "Elevate your style with our custom-designed, high-quality skins",
      position: "left",
      bgColor: "from-purple-900/80 to-blue-900/80",
      textColor: "text-white",
      buttonVariant: "light",
      action: () => navigate('/category/mobile-skins')
    },
    {
      image: heroImage2,
      title: "Precision Crafted",
      subtitle: "Perfect fit guaranteed with our laser-cut precision",
      position: "right",
      bgColor: "from-orange-900/80 to-red-900/80",
      textColor: "text-white",
      buttonVariant: "light",
      action: () => navigate('/category/mobile-skins')
    },
    {
      image: heroImage4,
      title: "Limited Edition",
      subtitle: "Exclusive collections updated monthly",
      position: "center",
      bgColor: "from-teal-900/80 to-emerald-900/80",
      textColor: "text-white",
      buttonVariant: "dark",
      action: () => navigate('/category/mobile-skins')
    }
  ];

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-advance slides
  useEffect(() => {
    if (!isHovered && !isMobile) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, handleNext, isMobile]);

  const getPositionClasses = (position) => {
    const baseClasses = "absolute inset-y-0 flex items-center w-full px-6 md:px-12";
    switch (position) {
      case "right":
        return `${baseClasses} right-0 justify-end text-right`;
      case "center":
        return `${baseClasses} left-1/2 -translate-x-1/2 justify-center text-center`;
      default:
        return `${baseClasses} left-0`;
    }
  };

  const handleSlideClick = useCallback(() => {
    slides[currentIndex].action();
  }, [currentIndex, slides]);

  // Button variants
  const buttonStyles = {
    light: "bg-white/90 text-gray-900 hover:bg-white hover:shadow-white/20",
    dark: "bg-black/80 text-white hover:bg-black hover:shadow-black/20"
  };

  return (
    <section 
      className="relative h-[80vh] md:h-[90vh] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <AnimatePresence mode="wait">
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-r ${slides[currentIndex].bgColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          key={`bg-${currentIndex}`}
        />
      </AnimatePresence>

      {/* Image Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`slide-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 cursor-pointer"
          onClick={handleSlideClick}
          whileHover={{ scale: isMobile ? 1 : 1.01 }}
        >
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.6, 0.01, 0.05, 0.95] }}
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        <div className={getPositionClasses(slides[currentIndex].position)}>
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`max-w-xl p-6 rounded-lg backdrop-blur-sm ${slides[currentIndex].textColor}`}
          >
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {slides[currentIndex].title}
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              {slides[currentIndex].subtitle}
            </motion.p>

            <motion.button
              className={`group flex items-center gap-2 ${buttonStyles[slides[currentIndex].buttonVariant]} px-6 py-3 md:px-8 md:py-3 rounded-full
                       hover:shadow-lg transition-all duration-300 font-medium`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                handleSlideClick();
              }}
            >
              Shop Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Navigation Arrows - Only show on desktop */}
      {!isMobile && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-black/30 hover:bg-black/40 text-white backdrop-blur-sm transition-all duration-300 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-black/30 hover:bg-black/40 text-white backdrop-blur-sm transition-all duration-300 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      )}

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
// import heroImage from "../../assets/heroImage.jpg";
// import heroImage2 from "../../assets/heroImage2.jpg";
// import heroImage4 from "../../assets/heroImage4.jpg";
// import { useNavigate } from 'react-router-dom';

// const HeroSection = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate();

//   const slides = [
//     {
//       image: heroImage,
//       title: "Premium Device Skins",
//       subtitle: "Elevate your style with custom designs",
//       position: "left",
//       bgColor: "from-purple-900 to-blue-900",
//       link: "/category/premium-skins",
//       action: () =>  navigate('/category/mobile-skins') // Replace with your action
//     },
//     {
//       image: heroImage2,
//       title: "Precision Crafted",
//       subtitle: "Perfect fit guaranteed for every device",
//       position: "right",
//       bgColor: "from-orange-900 to-red-900",
//       link: "/category/precision-skins",
//       action: () =>  navigate('/category/mobile-skins') // Replace with your action
//     },
//     {
//       image: heroImage4,
//       title: "Limited Edition",
//       subtitle: "Exclusive collections updated monthly",
//       position: "left",
//       bgColor: "from-teal-900 to-emerald-900",
//       link: "/category/limited-edition",
//       action: () =>  navigate('/category/mobile-skins') // Replace with your action
//     }
//   ];

//   const handleNext = useCallback(() => {
//     setCurrentIndex((prev) => (prev + 1) % slides.length);
//   }, [slides.length]);

//   const handlePrev = useCallback(() => {
//     setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
//   }, [slides.length]);

//   useEffect(() => {
//     if (!isHovered) {
//       const interval = setInterval(handleNext, 3500);
//       return () => clearInterval(interval);
//     }
//   }, [isHovered, handleNext]);

//   const getPositionClasses = (position) => {
//     const baseClasses = "absolute inset-y-0 flex items-center w-full lg:w-1/2 px-6 lg:px-12";
//     switch (position) {
//       case "right":
//         return `${baseClasses} right-0 justify-end`;
//       case "center":
//         return `${baseClasses} left-1/2 -translate-x-1/2 justify-center text-center`;
//       default:
//         return `${baseClasses} left-0`;
//     }
//   };

//   // Handle slide click
//   const handleSlideClick = useCallback(() => {
//     const currentSlide = slides[currentIndex];
//     if (currentSlide.action) {
//       currentSlide.action();
//     }
//     // You can also use react-router-dom's navigate here
//     // navigate(currentSlide.link);
//   }, [currentIndex, slides]);

//   return (
//     <section 
//       className="relative h-[90vh] overflow-hidden"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
     
//       {/* Background gradient with smoother transition */}
//       <AnimatePresence mode="wait">
//         <motion.div 
//           className={`absolute inset-0 bg-gradient-to-r ${slides[currentIndex].bgColor}`}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.8 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8, ease: "easeInOut" }}
//           key={`bg-${currentIndex}`}
//         />
//       </AnimatePresence>

//       {/* Image Slideshow with improved transitions and click handling */}
//       <AnimatePresence initial={false}>
//         <motion.div
//           key={`slide-${currentIndex}`}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8, ease: "easeInOut" }}
//           className="absolute inset-0 cursor-pointer"
//           onClick={handleSlideClick}
//           whileHover={{ scale: 1.02 }}
//         >
//           <motion.div 
//             className="absolute inset-0 bg-cover bg-center transform"
//             initial={{ scale: 1.1 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1.5, ease: "easeOut" }}
//             style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
//         </motion.div>
//       </AnimatePresence>

//       {/* Content with coordinated animations */}
//       <AnimatePresence mode="wait">
//         <div className={getPositionClasses(slides[currentIndex].position)}>
//           <motion.div
//             key={`content-${currentIndex}`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className="max-w-xl bg-black/40 p-6 rounded-lg backdrop-blur-sm"
//             onClick={handleSlideClick}
//             style={{ cursor: 'pointer' }}
//           >
//             <motion.h2 
//               className="text-5xl md:text-6xl font-bold text-white mb-6"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
//             >
//               {slides[currentIndex].title}
//             </motion.h2>
            
//             <motion.p 
//               className="text-xl text-white/90 mb-8"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
//             >
//               {slides[currentIndex].subtitle}
//             </motion.p>

//             <motion.button
//               className="group flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-3 rounded-full
//                        hover:bg-white hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent triggering parent's onClick
//                 handleSlideClick();
//               }}
//             >
//               Shop Now
//               <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
//             </motion.button>
//           </motion.div>
//         </div>
//       </AnimatePresence>

//       {/* Navigation Arrows */}
//       <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white backdrop-blur-sm transition-all duration-300"
//           onClick={(e) => {
//             e.stopPropagation();
//             handlePrev();
//           }}
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </motion.button>
        
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white backdrop-blur-sm transition-all duration-300"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleNext();
//           }}
//         >
//           <ChevronRight className="w-6 h-6" />
//         </motion.button>
//       </div>

//       {/* Progress Indicators */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
//         {slides.map((_, index) => (
//           <motion.button
//             key={index}
//             onClick={(e) => {
//               e.stopPropagation();
//               setCurrentIndex(index);
//             }}
//             className={`h-2 rounded-full transition-all duration-300
//               ${index === currentIndex 
//                 ? "w-8 bg-white" 
//                 : "w-2 bg-white/50 hover:bg-white/80"
//               }`}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
