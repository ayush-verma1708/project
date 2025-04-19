import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import type { Product } from '../types/types';

interface ProductCardProps {
  product: Product;
  showFullDetails?: boolean;
}

export function ProductCard({ product, showFullDetails = false }: ProductCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Intersection Observer for viewport detection
  useEffect(() => {
    if (!cardRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInViewport(entry.isIntersecting);
        
        // Auto-play brief preview when entering viewport
        if (entry.isIntersecting && !hasPlayed && product.instagramLink) {
          playPreview();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(cardRef.current);
    
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [hasPlayed, product.instagramLink]);

  // Play a 2-second preview of the video
  const playPreview = () => {
    if (!videoRef.current) return;
    
    videoRef.current.currentTime = 0;
    videoRef.current.play()
      .then(() => {
        setHasPlayed(true);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }, 2000); // 2-second preview
      })
      .catch(() => {
        // Silent catch for autoplay policy issues
      });
  };

  // Handle video playback based on hover state
  useEffect(() => {
    if (!videoRef.current || !product.instagramLink) return;
    
    if (isHovered) {
      videoRef.current.play().catch(() => {
        // Silent catch for autoplay policy issues
      });
    } else {
      videoRef.current.pause();
    }
  }, [isHovered, product.instagramLink]);
  
  const handleHover = () => setIsHovered(true);
  const handleLeave = () => setIsHovered(false);
  
  // For mobile, handle touch events
  const handleTouchStart = () => {
    if (isMobile) {
      setIsHovered(true);
    }
  };
  
  const handleTouchEnd = () => {
    if (isMobile) {
      setTimeout(() => setIsHovered(false), 1000);
    }
  };

  const renderProductMedia = () => {
    const hasSecondImage = product.images.length > 1;
  
    return (
      <div
        className="relative overflow-hidden aspect-square w-full group"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* First image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-300 absolute inset-0 ${
            isHovered && hasSecondImage ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setLoaded(true)}
        />
  
        {/* Second image (only if available) */}
        {hasSecondImage && (
          <img
            src={product.images[1]}
            alt={`${product.name} - alternate`}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-opacity duration-300 absolute inset-0 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
  
        {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10" />
      </div>
    );
  };
  

  return (
    <Link 
      to={`/product/${product._id}`}
      className="group relative block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden rounded-t-lg">
        {product.images && product.images.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Category */}
        <div className="text-xs text-gray-500 mb-1">
          {typeof product.productType === 'object' && product.productType !== null 
            ? product.productType.name 
            : "Product"}
        </div>
        
        {/* Product Name */}
        <h3 className="font-medium text-sm md:text-base line-clamp-1 mb-1">
          {product.name}
        </h3>
        
        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 text-xs">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3.5 w-3.5" 
                viewBox="0 0 20 20" 
                fill={i < Math.floor(product.rating) ? "currentColor" : (i < Math.ceil(product.rating) ? "currentColor" : "none")}
                stroke="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">₹{product.price}</span>
        </div>
      </div>
    </Link>
  );
}



// import { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import type { Product } from '../types/types';

// interface ProductCardProps {
//   product: Product;
//   showFullDetails?: boolean;
// }

// export function ProductCard({ product, showFullDetails = false }: ProductCardProps) {
//   const [loaded, setLoaded] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isInViewport, setIsInViewport] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const cardRef = useRef<HTMLDivElement>(null);
  
//   // Check if device is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);
  
//   // Intersection Observer for viewport detection
//   useEffect(() => {
//     if (!cardRef.current) return;
    
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries;
//         setIsInViewport(entry.isIntersecting);
//       },
//       { threshold: 0.3 }
//     );
    
//     observer.observe(cardRef.current);
    
//     return () => {
//       if (cardRef.current) observer.unobserve(cardRef.current);
//     };
//   }, []);
  
//   // Handle video playback based on hover state, mobile, and viewport visibility
//   useEffect(() => {
//     if (!videoRef.current) return;
    
//     if ((isHovered || (isMobile && isInViewport)) && product.instagramLink) {
//       videoRef.current.play().catch(() => {
//         // Silent catch for autoplay policy issues
//       });
//     } else {
//       videoRef.current.pause();
//     }
//   }, [isHovered, isMobile, isInViewport, product.instagramLink]);
  
//   const handleHover = () => setIsHovered(true);
//   const handleLeave = () => setIsHovered(false);
  
//   // For mobile, handle touch events
//   const handleTouchStart = () => {
//     if (isMobile) {
//       setIsHovered(true);
//     }
//   };
  
//   const handleTouchEnd = () => {
//     if (isMobile) {
//       // Add small delay before reverting to image on mobile
//       setTimeout(() => setIsHovered(false), 300);
//     }
//   };

//   // Conditional rendering of image or MP4 video from Cloudinary
//   const renderProductMedia = () => {
//     if (product.instagramLink) {
//       return (
//         <div
//           className="relative overflow-hidden aspect-square w-full group"
//           onMouseEnter={handleHover}
//           onMouseLeave={handleLeave}
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//         >
//           {/* Show image when not hovered/playing */}
//           <img
//             src={product.images[0]}
//             alt={product.name}
//             loading="lazy"
//             decoding="async"
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className={`w-full h-full object-cover transition-opacity duration-300 absolute inset-0 ${
//               isHovered ? 'opacity-0' : 'opacity-100'
//             }`}
//             onLoad={() => setLoaded(true)}
//           />
          
//           {/* Video element */}
//           <video
//             ref={videoRef}
//             className={`w-full h-full object-cover transition-opacity duration-300 absolute inset-0 ${
//               isHovered ? 'opacity-100' : 'opacity-0'
//             }`}
//             src={product.instagramLink}
//             poster={product.images[0]}
//             preload="metadata"
//             muted
//             loop
//             playsInline
//           />
          
//           {/* Overlay gradient */}
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10" />
          
//           {/* Play indicator for mobile */}
//           {isMobile && !isHovered && (
//             <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-active:opacity-100 transition-opacity">
//               <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
//                 <span className="text-white text-xl">▶</span>
//               </div>
//             </div>
//           )}
//         </div>
//       );
//     } else {
//       return (
//         <div className="relative overflow-hidden aspect-square w-full">
//           <img
//             src={product.images[0]}
//             alt={product.name}
//             loading="lazy"
//             decoding="async"
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className={`w-full h-full object-cover transition-transform duration-300 ${
//               loaded ? 'opacity-100 hover:scale-105' : 'opacity-0'
//             }`}
//             onLoad={() => setLoaded(true)}
//           />
//           {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
//         </div>
//       );
//     }
//   };

//   return (
//     <motion.div
//       ref={cardRef}
//       className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col ${showFullDetails ? 'p-6' : 'h-full'}`}
//       whileHover={{ y: -8 }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//     >
//       <Link to={`/category/${product.productType?.name}/${product.name}`} className="block flex-1">
//         {renderProductMedia()}
//         <div className="p-4 flex-1 flex flex-col">
//           <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
//           <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
          
//           <div className="mt-auto flex justify-between items-center">
//             <span className="text-lg font-bold">Rs.{product.price.toFixed(2)}</span>
//             <Link to={`/category/${product.categoryName}/${product.name}`} className="block">
//               {/* Empty Link as in your original code */}
//             </Link>
//           </div>
          
//           {showFullDetails && (
//             <div className="mt-4">
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <span
//                       key={i}
//                       className={`text-${i < Math.floor(product.rating) ? 'yellow' : 'gray'}-400`}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//                 <span className="text-gray-600">({product.reviews} reviews)</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </Link>
//     </motion.div>
//   );
// }
// // import { useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { Link } from 'react-router-dom';
// // import type { Product } from '../types/types';

// // interface ProductCardProps {
// //   product: Product;
// //   showFullDetails?: boolean;
// // }

// // export function ProductCard({ product, showFullDetails = false }: ProductCardProps) {
// //   const [loaded, setLoaded] = useState(false);
// //   const [isHovered, setIsHovered] = useState(false);

 

// //   const handleHover = () => setIsHovered(true);
// //   const handleLeave = () => setIsHovered(false);

// //   // Conditional rendering of image or MP4 video from Cloudinary
// //   const renderProductMedia = () => {
// //     if (product.instagramLink) {
// //       return (
// //         <div
// //           className="relative overflow-hidden aspect-square w-full"
// //           onMouseEnter={handleHover}
// //           onMouseLeave={handleLeave}
// //         >
// //           <video
// //             className="w-full h-full object-cover"
// //             src={product.instagramLink}
// //             poster={product.images[0]}
// //             preload="metadata"
// //             muted
// //             loop
// //             playsInline
// //             autoPlay={isHovered}
// //             onMouseEnter={(e) => e.target.play()}
// //             onMouseLeave={(e) => e.target.pause()}
// //           />
// //         </div>
// //       );
// //     } else {
// //       return (
// //         <div className="relative overflow-hidden aspect-square w-full">
// //           <img
// //             src={product.images[0]}
// //             alt={product.name}
// //             loading="lazy"
// //             decoding="async"
// //             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
// //             className={`w-full h-full object-cover transition-transform duration-300 ${
// //               loaded ? 'opacity-100 hover:scale-105' : 'opacity-0'
// //             }`}
// //             onLoad={() => setLoaded(true)}
// //           />
// //           {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
// //           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
// //         </div>
// //       );
// //     }
// //   };

// //   return (
// //     <motion.div
// //       className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col ${showFullDetails ? 'p-6' : 'h-full'}`}
// //       whileHover={{ y: -8 }}
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.3 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true }}
// //     >
// //       <Link to={`/category/${product.productType?.name}/${product.name}`} className="block flex-1 flex flex-col">
// //         {renderProductMedia()}
// //         <div className="p-4 flex-1 flex flex-col">
// //           <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
// //           <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>

// //            <div className="mt-auto flex justify-between items-center">
// //             <span className="text-lg font-bold">Rs.{product.price.toFixed(2)}</span>
// //             <Link to={`/category/${product.categoryName}/${product.name}`} className="block">
            
// //             </Link>
// //           </div> 

// //           {showFullDetails && (
// //             <div className="mt-4">
// //               <div className="flex items-center gap-2">
// //                 <div className="flex items-center">
// //                   {[...Array(5)].map((_, i) => (
// //                     <span
// //                       key={i}
// //                       className={`text-${i < Math.floor(product.rating) ? 'yellow' : 'gray'}-400`}
// //                     >
// //                       ★
// //                     </span>
// //                   ))}
// //                 </div>
// //                 <span className="text-gray-600">({product.reviews} reviews)</span>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </Link>
// //     </motion.div>
// //   );
// // }

// // // import React, { useState } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { Link } from 'react-router-dom';
// // // import { ShoppingCart } from 'lucide-react';
// // // import type { Product } from '../types/types';

// // // interface ProductCardProps {
// // //   product: Product;
// // //   showFullDetails?: boolean;
// // // }

// // // export function ProductCard({ product, showFullDetails = false }: ProductCardProps) {
// // //   const [loaded, setLoaded] = useState(false);
// // //   const [isHovered, setIsHovered] = useState(false);

// // //   const handleAddToCart = (e: React.MouseEvent) => {
// // //     e.preventDefault(); // Prevent default behavior (e.g., navigation) when clicking the button
// // //   };

// // //   const handleHover = () => setIsHovered(true);
// // //   const handleLeave = () => setIsHovered(false);

// // //   // Conditional rendering of image or MP4 video from Cloudinary
// // //   const renderProductMedia = () => {
// // //     if (product.instagramLink) {
// // //       // Display MP4 video from Cloudinary on hover
// // //       return (
// // //         <div
// // //           className="relative aspect-square overflow-hidden"
// // //           onMouseEnter={handleHover}
// // //           onMouseLeave={handleLeave}
// // //         >
// // //           <video
// // //             className="w-full h-full object-cover"
// // //             src={product.instagramLink}
// // //             poster={product.images[0]} // Use an image as the poster until the video is played
// // //             preload="metadata"
// // //             muted
// // //             loop
// // //             playsInline
// // //             autoPlay={isHovered} // Start the video when hovered
// // //             onMouseEnter={(e) => e.target.play()} // Ensure video plays when hovered
// // //             onMouseLeave={(e) => e.target.pause()} // Pause the video when hover ends
// // //           />
// // //         </div>
// // //       );
// // //     } else {
// // //       // Default image rendering if no Instagram link or video link
// // //       return (
// // //         <div className="relative aspect-square overflow-hidden">
// // //           <img
// // //             src={product.images[0]}
// // //             alt={product.name}
// // //             loading="lazy"
// // //             decoding="async"
// // //             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
// // //             className={`w-full h-full object-contain transition-transform duration-300 ${loaded ? 'opacity-100 hover:scale-105' : 'opacity-0'}`}
// // //             onLoad={() => setLoaded(true)}
// // //           />
// // //           {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
// // //           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
// // //         </div>
// // //       );
// // //     }
// // //   };

// // //   return (
// // //     <motion.div
// // //       className={`bg-white rounded-lg shadow-lg overflow-hidden ${showFullDetails ? 'p-6' : 'h-full flex flex-col'}`}
// // //       whileHover={{ y: -8 }}
// // //       initial={{ opacity: 0, y: 20 }}
// // //       animate={{ opacity: 1, y: 0 }}
// // //       transition={{ duration: 0.3 }}
// // //       whileInView={{ opacity: 1, y: 0 }}
// // //       viewport={{ once: true }}
// // //     >
// // //       <Link to={`/category/${product.productType?.name}/${product.name}`} className="block flex-1 flex flex-col">
// // //         {renderProductMedia()} {/* Render either image, Instagram post, or video */}
// // //         <div className="p-4 flex-1 flex flex-col">
// // //           <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
// // //           <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>

// // //           <div className="mt-auto flex justify-between items-center">
// // //             <span className="text-lg font-bold">Rs.{product.price.toFixed(2)}</span>
// // //             <Link to={`/category/${product.categoryName}/${product.name}`} className="block">
// // //               <button
// // //                 onClick={handleAddToCart}
// // //                 className="p-2 text-white bg-blue-500 rounded-md"
// // //               >
// // //                 <ShoppingCart size={20} />
// // //               </button>
// // //             </Link>
// // //           </div>

// // //           {showFullDetails && (
// // //             <div className="mt-4">
// // //               <div className="flex items-center gap-2">
// // //                 <div className="flex items-center">
// // //                   {[...Array(5)].map((_, i) => (
// // //                     <span
// // //                       key={i}
// // //                       className={`text-${i < Math.floor(product.rating) ? 'yellow' : 'gray'}-400`}
// // //                     >
// // //                       ★
// // //                     </span>
// // //                   ))}
// // //                 </div>
// // //                 <span className="text-gray-600">({product.reviews} reviews)</span>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </Link>
// // //     </motion.div>
// // //   );
// // // }

// // // // import React, { useState } from 'react';
// // // // import { motion } from 'framer-motion';
// // // // import { Link } from 'react-router-dom';
// // // // import { ShoppingCart } from 'lucide-react';
// // // // import type { Product } from '../types/types';

// // // // interface ProductCardProps {
// // // //   product: Product;
// // // //   selectedColor?: string;
// // // //   showFullDetails?: boolean;
// // // // }

// // // // export function ProductCard({ product,  showFullDetails = false }: ProductCardProps) {
// // // //   const [loaded, setLoaded] = useState(false);
// // // //   const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);

// // // //   const handleAddToCart = (e: React.MouseEvent) => {
// // // //     e.preventDefault(); // Prevent default behavior (e.g., navigation) when clicking the button
// // // //   };

// // // //   const handleImageRef = (node: HTMLImageElement) => {
// // // //     if (node?.complete && node.naturalWidth !== 0) {
// // // //       setLoaded(true);
// // // //     }
// // // //     setImgRef(node);
// // // //   };

// // // //   return (
// // // //     <motion.div
// // // //       className={`bg-white rounded-lg shadow-lg overflow-hidden ${
// // // //         showFullDetails ? 'p-6' : 'h-full flex flex-col'
// // // //       }`}
// // // //       whileHover={{ y: -8 }}
// // // //       initial={{ opacity: 0, y: 20 }}
// // // //       animate={{ opacity: 1, y: 0 }}
// // // //       transition={{ duration: 0.3 }}
// // // //       whileInView={{ opacity: 1, y: 0 }} // This ensures it comes in smoothly on scroll
// // // //       viewport={{ once: true }} // Trigger the animation only once when it's in view
// // // //     >
// // // //       <Link  to={`/category/${product.productType?.name}/${product.name}`} className="block flex-1 flex flex-col">
// // // //         <div className="relative aspect-square overflow-hidden">
// // // //           <img
// // // //             ref={handleImageRef}
// // // //             src={product.images[0]}
// // // //             alt={product.name}
// // // //             loading="lazy"
// // // //             decoding="async"
// // // //             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
// // // //             className={`w-full h-full object-contain transition-transform duration-300 ${
// // // //               loaded ? 'opacity-100 hover:scale-105' : 'opacity-0'
// // // //             }`}
// // // //             onLoad={() => setLoaded(true)}
// // // //           />
// // // //           {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
// // // //           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
// // // //         </div>
// // // //         <div className="p-4 flex-1 flex flex-col">
// // // //           <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
// // // //           <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>

// // // //           <div className="mt-auto flex justify-between items-center">
// // // //             <span className="text-lg font-bold">Rs.{product.price.toFixed(2)}</span>
// // // //             <Link  to={`/category/${product.categoryName}/${product.name}`} className="block">
// // // //               <button
// // // //                 onClick={handleAddToCart}
// // // //                 className="p-2 text-white bg-blue-500 rounded-md"
// // // //               >
// // // //                 <ShoppingCart size={20} />
// // // //               </button>
// // // //             </Link>
// // // //           </div>

// // // //           {showFullDetails && (
// // // //             <div className="mt-4">
// // // //               <div className="flex items-center gap-2">
// // // //                 <div className="flex items-center">
// // // //                   {[...Array(5)].map((_, i) => (
// // // //                     <span
// // // //                       key={i}
// // // //                       className={`text-${i < Math.floor(product.rating) ? 'yellow' : 'gray'}-400`}
// // // //                     >
// // // //                       ★
// // // //                     </span>
// // // //                   ))}
// // // //                 </div>
// // // //                 <span className="text-gray-600">({product.reviews} reviews)</span>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </Link>
// // // //     </motion.div>
// // // //   );
// // // // }
