import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Maximize, Minimize } from 'lucide-react';

interface ProductVideoPlayerProps {
  videoLink: string;
  posterImage?: string; // Optional poster image
  productName: string;
}

const ProductVideoPlayer = ({ videoLink, posterImage, productName }: ProductVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.error("Video play failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  if (!videoLink) return null;

  return (
    <div className="mt-6">
      <div 
        ref={containerRef}
        className="relative aspect-video bg-black rounded-lg overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <video
          ref={videoRef}
          src={videoLink}
          poster={posterImage}
          className="w-full h-full object-contain"
          muted={isMuted}
          loop
          playsInline
          onClick={togglePlay}
        />
        
        {/* Video controls overlay */}
        <AnimatePresence>
          {(isHovered || !isPlaying) && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {!isPlaying && (
                <button
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  <Play className="w-16 h-16 text-white/90 hover:text-white transition-colors" />
                </button>
              )}
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 px-4">
                <button
                  onClick={togglePlay}
                  className="p-2 text-white/80 hover:text-white transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <span className="text-xl">❚❚</span>
                  ) : (
                    <Play size={20} />
                  )}
                </button>
                
                <button
                  onClick={toggleMute}
                  className="p-2 text-white/80 hover:text-white transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>
                
                <div className="flex-1 max-w-md mx-2 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white/80" style={{ width: '30%' }}></div>
                </div>
                
                <button
                  onClick={toggleFullScreen}
                  className="p-2 text-white/80 hover:text-white transition-colors"
                  aria-label={isFullScreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <p className="mt-2 text-sm text-gray-600">
        Watch {productName} in action
      </p>
    </div>
  );
};

export default ProductVideoPlayer;