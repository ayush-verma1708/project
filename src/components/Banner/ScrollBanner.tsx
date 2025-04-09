import { useRef, useLayoutEffect, useState } from "react";
import { motion, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";

const ScrollBanner = ({
  text = "Sample Text",
  baseVelocity = 50,
  backgroundColor = "bg-blue-600",
  textColor = "text-white",
  height = "h-8",
  fontSize = "text-lg",
  pauseOnHover = true,
  reverse = false,
  className = ""
}) => {
  const baseX = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, [text]);

  const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const x = useTransform(baseX, (v) => `${wrap(-contentWidth, 0, v)}px`);

  useAnimationFrame((_, delta) => {
    if (isPaused && pauseOnHover) return;
    const moveBy = (reverse ? -1 : 1) * baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  // Calculate number of copies needed based on viewport width
  const copies = Math.ceil(typeof window !== 'undefined' ? window.innerWidth / (contentWidth || 1) : 4) + 2;

  return (
    <div 
      className={`${backgroundColor} ${height} overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div 
        className="flex whitespace-nowrap items-center h-full"
        style={{ x }}
      >
        {[...Array(copies)].map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? contentRef : null}
            className={`${textColor} ${fontSize} inline-flex items-center px-4 font-medium`}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollBanner;