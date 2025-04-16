// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface ImageCarouselProps {
//   images: string[];
//   autoPlay?: boolean;
//   interval?: number;
// }

// export default function ImageCarousel({ 
//   images, 
//   autoPlay = true, 
//   interval = 5000 
// }: ImageCarouselProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState<"left" | "right">("right");

//   useEffect(() => {
//     if (!autoPlay) return;

//     const timer = setInterval(() => {
//       nextSlide();
//     }, interval);

//     return () => clearInterval(timer);
//   }, [currentIndex, autoPlay, interval]);

//   const nextSlide = () => {
//     setDirection("right");
//     setCurrentIndex((prevIndex) => 
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setDirection("left");
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   const goToSlide = (index: number) => {
//     setDirection(index > currentIndex ? "right" : "left");
//     setCurrentIndex(index);
//   };

//   const slideVariants = {
//     hiddenRight: {
//       x: "100%",
//       opacity: 0,
//     },
//     hiddenLeft: {
//       x: "-100%",
//       opacity: 0,
//     },
//     visible: {
//       x: "0",
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//       },
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.8,
//       transition: {
//         duration: 0.3,
//       },
//     },
//   };

//   return (
//     <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-xl">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIndex}
//           variants={slideVariants}
//           initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
//           animate="visible"
//           exit="exit"
//           className="absolute inset-0"
//         >
//           <img
//             src={images[currentIndex]}
//             alt={`Gallery image ${currentIndex + 1}`}
//             className="w-full h-full object-cover"
//           />
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
//         aria-label="Previous slide"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
//         aria-label="Next slide"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>

//       {/* Indicators */}
//       <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-white w-6" : "bg-white bg-opacity-50"}`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }