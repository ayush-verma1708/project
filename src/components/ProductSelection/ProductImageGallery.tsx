import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = memo(({ images, productName }: ProductImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Filter out invalid image URLs
  const validImages = images.filter(image => image && image.trim() !== '');
  const hasMultipleImages = validImages.length > 1;

  // If no valid images, show placeholder
  if (validImages.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-500">
        No images available
      </div>
    );
  }

  const isVideo = (url: string) => {
    return /\.(mp4|mov|avi|webm|mkv|wmv|flv|ogv|ogg|m4v|3gp|3g2)$/i.test(url);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || isVideo(validImages[currentImageIndex])) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const zoomStyle = isZoomed && !isVideo(validImages[currentImageIndex])
    ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`, transform: 'scale(1.5)' }
    : {};

  const prevImage = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
      setIsPlaying(false);
    }
  };

  const nextImage = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
      setIsPlaying(false);
    }
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const currentMedia = validImages[currentImageIndex];
  const isCurrentMediaVideo = isVideo(currentMedia);

  // Preload all images/videos
  useEffect(() => {
    validImages.forEach((media, index) => {
      if (!loadedImages[index]) {
        if (isVideo(media)) {
          const video = document.createElement('video');
          video.src = media;
          video.preload = 'auto';
          video.onloadeddata = () => setLoadedImages(prev => ({ ...prev, [index]: true }));
        } else {
          const img = new Image();
          img.src = media;
          img.onload = () => setLoadedImages(prev => ({ ...prev, [index]: true }));
        }
      }
    });
  }, [validImages, loadedImages]);

  const preventContextMenu = (e: React.MouseEvent) => e.preventDefault();

  return (
    <>
      <div className="space-y-4">
        <div
          className="relative aspect-square overflow-hidden cursor-pointer"
          onMouseEnter={() => !isCurrentMediaVideo && setIsZoomed(true)}
          onMouseLeave={() => !isCurrentMediaVideo && setIsZoomed(false)}
          onMouseMove={!isCurrentMediaVideo ? handleMouseMove : undefined}
          onClick={() => setIsFullScreen(true)}
          onContextMenu={preventContextMenu}
        >
          {isCurrentMediaVideo ? (
            <>
              <video
                key={currentMedia} // Ensure re-render on src change
                ref={videoRef}
                src={currentMedia}
                className={`w-full h-full object-contain transition-opacity duration-200 ${
                  loadedImages[currentImageIndex] ? 'opacity-100' : 'opacity-0'
                }`}
                controls={isPlaying}
                muted
                loop
                playsInline
              />
              {!isPlaying && (
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayVideo();
                  }}
                >
                  <Play className="w-12 h-12 text-white" />
                </button>
              )}
            </>
          ) : (
            <img
              key={currentMedia} // Ensure re-render on src change
              ref={imageRef}
              src={currentMedia}
              alt={productName}
              className={`w-full h-full object-contain transition-transform duration-200 select-none ${
                loadedImages[currentImageIndex] ? 'opacity-100 hover:scale-105' : 'opacity-0'
              }`}
              style={{ ...zoomStyle, userSelect: 'none' }}
              onContextMenu={preventContextMenu}
              onDragStart={(e) => e.preventDefault()}
            />
          )}

          {!loadedImages[currentImageIndex] && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              Loading...
            </div>
          )}

          {/* Navigation buttons */}
          {hasMultipleImages && (
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                disabled={!hasMultipleImages}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                disabled={!hasMultipleImages}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {hasMultipleImages && (
          <div className="grid grid-cols-4 gap-4">
            {validImages.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={clsx(
                  'aspect-square rounded-lg overflow-hidden relative',
                  currentImageIndex === index && 'ring-2 ring-black'
                )}
                onClick={() => setCurrentImageIndex(index)}
              >
                {isVideo(image) ? (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <Play className="w-6 h-6 text-gray-600" />
                  </div>
                ) : (
                  <img
                    src={image}
                    alt={`${productName} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onContextMenu={preventContextMenu}
                  />
                )}
                {isVideo(image) && (
                  <div className="absolute bottom-1 right-1 bg-black/50 rounded-full p-1">
                    <Play className="w-3 h-3 text-white" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen View */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullScreen(false);
            }}
          >
            <div
              className="relative w-full max-w-5xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {isCurrentMediaVideo ? (
                <video
                  src={currentMedia}
                  className="w-full h-auto max-h-[90vh] object-contain"
                  controls
                  autoPlay
                  muted
                  loop
                />
              ) : (
                <img
                  src={currentMedia}
                  alt={productName}
                  className="w-full h-auto max-h-[90vh] object-contain select-none"
                  onContextMenu={preventContextMenu}
                  onDragStart={(e) => e.preventDefault()}
                />
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-gray-800"
                onClick={() => setIsFullScreen(false)}
              >
                <X size={24} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default ProductImageGallery;
