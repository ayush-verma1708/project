import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'; // Import icons

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isPlaying, setIsPlaying] = useState(false); // Track video play state
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Helper function to check if a URL is a video
  const isVideo = (url: string) => {
    return /\.(mp4|mov|avi|webm|mkv|wmv|flv|ogv|ogg|m4v|3gp|3g2)$/i.test(url);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || isVideo(images[currentImageIndex])) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const zoomStyle = isZoomed && !isVideo(images[currentImageIndex])
    ? {
        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
        transform: 'scale(1.5)',
      }
    : {};

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setLoaded(false); // Reset loading state for new media
    setIsPlaying(false); // Reset play state for new media
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setLoaded(false); // Reset loading state for new media
    setIsPlaying(false); // Reset play state for new media
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const currentMedia = images[currentImageIndex];
  const isCurrentMediaVideo = isVideo(currentMedia);

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-square overflow-hidden"
        onMouseEnter={() => !isCurrentMediaVideo && setIsZoomed(true)}
        onMouseLeave={() => !isCurrentMediaVideo && setIsZoomed(false)}
        onMouseMove={!isCurrentMediaVideo ? handleMouseMove : undefined}
      >
        {/* Main Media (Image or Video) */}
        {isCurrentMediaVideo ? (
          <>
            <video
              ref={videoRef}
              src={currentMedia}
              className={`w-full h-full object-contain transition-transform duration-300 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadedData={() => setLoaded(true)}
              controls={isPlaying} // Show controls only when playing
              muted
              loop
              playsInline
              autoPlay // Enable autoplay
            />
            {!isPlaying && (
              <button
                className="absolute inset-0 flex items-center justify-center "
                onClick={handlePlayVideo}
              >
                {/* <Play className="w-12 h-12 text-white" /> */}
              </button>
            )}
          </>
        ) : (
          <img
            ref={imageRef}
            src={currentMedia}
            alt={productName}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`w-full h-full object-contain transition-transform duration-300 ${
              loaded ? 'opacity-100 hover:scale-105' : 'opacity-0'
            }`}
            onLoad={() => setLoaded(true)}
            style={zoomStyle}
          />
        )}

        {/* Loading skeleton */}
        {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />

        {/* Navigation buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
            onClick={prevImage}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
            onClick={nextImage}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => {
          const isVideoFile = isVideo(image);
          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                'aspect-square rounded-lg overflow-hidden relative',
                currentImageIndex === index && 'ring-2 ring-black-600'
              )}
              onClick={() => setCurrentImageIndex(index)}
            >
              {isVideoFile ? (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Play className="w-6 h-6 text-gray-600" />
                </div>
              ) : (
                <img
                  src={image}
                  alt={`${productName} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
              {isVideoFile && (
                <div className="absolute bottom-1 right-1 bg-black/50 rounded-full p-1">
                  <Play className="w-3 h-3 text-white" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImageGallery;

// import { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import clsx from 'clsx';
// import { ChevronLeft, ChevronRight, Play } from 'lucide-react'; // Import icons

// interface ProductImageGalleryProps {
//   images: string[];
//   productName: string;
// }

// const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [loaded, setLoaded] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
//   const imageRef = useRef<HTMLImageElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   // Helper function to check if a URL is a video
//   const isVideo = (url: string) => {
//     return /\.(mp4|mov|avi|webm|mkv|wmv|flv|ogv|ogg|m4v|3gp|3g2)$/i.test(url);
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!imageRef.current || isVideo(images[currentImageIndex])) return;

//     const { left, top, width, height } = imageRef.current.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoomPosition({ x, y });
//   };

//   const zoomStyle = isZoomed && !isVideo(images[currentImageIndex])
//     ? {
//         transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//         transform: 'scale(1.5)',
//       }
//     : {};

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//     setLoaded(false); // Reset loading state for new media
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     setLoaded(false); // Reset loading state for new media
//   };

//   const currentMedia = images[currentImageIndex];
//   const isCurrentMediaVideo = isVideo(currentMedia);

//   return (
//     <div className="space-y-4">
//       <div
//         className="relative aspect-square overflow-hidden"
//         onMouseEnter={() => !isCurrentMediaVideo && setIsZoomed(true)}
//         onMouseLeave={() => !isCurrentMediaVideo && setIsZoomed(false)}
//         onMouseMove={!isCurrentMediaVideo ? handleMouseMove : undefined}
//       >
//         {/* Main Media (Image or Video) */}
//         {isCurrentMediaVideo ? (
//           <video
//             ref={videoRef}
//             src={currentMedia}
//             className={`w-full h-full object-contain transition-transform duration-300 ${
//               loaded ? 'opacity-100' : 'opacity-0'
//             }`}
//             onLoadedData={() => setLoaded(true)}
//             controls
//             muted
//             loop
//             playsInline
//           />
//         ) : (
//           <img
//             ref={imageRef}
//             src={currentMedia}
//             alt={productName}
//             loading="lazy"
//             decoding="async"
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className={`w-full h-full object-contain transition-transform duration-300 ${
//               loaded ? 'opacity-100 hover:scale-105' : 'opacity-0'
//             }`}
//             onLoad={() => setLoaded(true)}
//             style={zoomStyle}
//           />
//         )}

//         {/* Loading skeleton */}
//         {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />

//         {/* Navigation buttons */}
//         <div className="absolute inset-0 flex items-center justify-between p-4">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
//             onClick={prevImage}
//           >
//             <ChevronLeft size={24} />
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
//             onClick={nextImage}
//           >
//             <ChevronRight size={24} />
//           </motion.button>
//         </div>
//       </div>

//       {/* Thumbnails */}
//       <div className="grid grid-cols-4 gap-4">
//         {images.map((image, index) => {
//           const isVideoFile = isVideo(image);
//           return (
//             <motion.button
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className={clsx(
//                 'aspect-square rounded-lg overflow-hidden relative',
//                 currentImageIndex === index && 'ring-2 ring-black-600'
//               )}
//               onClick={() => setCurrentImageIndex(index)}
//             >
//               {isVideoFile ? (
//                 <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                   <Play className="w-6 h-6 text-gray-600" />
//                 </div>
//               ) : (
//                 <img
//                   src={image}
//                   alt={`${productName} view ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               )}
//               {isVideoFile && (
//                 <div className="absolute bottom-1 right-1 bg-black/50 rounded-full p-1">
//                   <Play className="w-3 h-3 text-white" />
//                 </div>
//               )}
//             </motion.button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ProductImageGallery;

// import { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import clsx from 'clsx';
// import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import icons

// interface ProductImageGalleryProps {
//   images: string[];
//   productName: string;
// }


// const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [loaded, setLoaded] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
//   const imageRef = useRef<HTMLImageElement>(null);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!imageRef.current) return;

//     const { left, top, width, height } = imageRef.current.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoomPosition({ x, y });
//   };

//   const zoomStyle = isZoomed
//     ? {
//         transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//         transform: 'scale(1.5)',
//       }
//     : {};

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//     setLoaded(false); // Reset loading state for new image
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     setLoaded(false); // Reset loading state for new image
//   };

//   return (
//     <div className="space-y-4">
//       <div
//         className="relative aspect-square overflow-hidden"
//         onMouseEnter={() => setIsZoomed(true)}
//         onMouseLeave={() => setIsZoomed(false)}
//         onMouseMove={handleMouseMove}
//       >
//         {/* Main Product Image */}
//         <img
//           ref={imageRef}
//           src={images[currentImageIndex]}
//           alt={productName}
//           loading="lazy"
//           decoding="async"
//           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//           className={`w-full h-full object-contain transition-transform duration-300 ${
//             loaded ? 'opacity-100 hover:scale-105' : 'opacity-0'
//           }`}
//           onLoad={() => setLoaded(true)}
//           style={zoomStyle}
//         />
//         {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />

//         {/* Navigation buttons */}
//         <div className="absolute inset-0 flex items-center justify-between p-4">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
//             onClick={prevImage}
//           >
//             <ChevronLeft size={24} />
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
//             onClick={nextImage}
//           >
//             <ChevronRight size={24} />
//           </motion.button>
//         </div>
//       </div>

//       {/* Image Thumbnails */}
//       <div className="grid grid-cols-4 gap-4">
//         {images.map((image, index) => (
//           <motion.button
//             key={index}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className={clsx(
//               'aspect-square rounded-lg overflow-hidden',
//               currentImageIndex === index && 'ring-2 ring-black-600'
//             )}
//             onClick={() => setCurrentImageIndex(index)}
//           >
//             <img
//               src={image}
//               alt={`${productName} view ${index + 1}`}
//               className="w-full h-full object-cover"
//             />
//           </motion.button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductImageGallery;