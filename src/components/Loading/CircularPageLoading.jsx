import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Loader2 } from "lucide-react"; // Import an icon
import "./CircularText.css";

const getRotationTransition = (duration, from, loop = true) => ({
  from: from,
  to: from + 360,
  ease: "linear",
  duration: duration,
  type: "tween",
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },
});

const CircularText = ({
  text = "Loading Your Favorite Designs...",
  spinDuration = 10,
  className = "",
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const [currentRotation, setCurrentRotation] = useState(0);

  useEffect(() => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, currentRotation),
    });
  }, [spinDuration, controls, text]);

  return (
    <div className="loading-container">
      {/* Rotating Text */}
      {/* <motion.div
        initial={{ rotate: 0 }}
        className={`circular-text ${className}`}
        animate={controls}
        onUpdate={(latest) => setCurrentRotation(Number(latest.rotate))}
      >
        {letters.map((letter, i) => {
          const rotation = (360 / letters.length) * i;
          const factor = 12; // Adjust size factor for better spacing
          const x = factor * Math.cos((rotation * Math.PI) / 180);
          const y = factor * Math.sin((rotation * Math.PI) / 180);
          const transform = `rotate(${rotation}deg) translate(${x}px, ${y}px)`;

          return (
            <span
              key={i}
              style={{
                transform,
                WebkitTransform: transform,
              }}
            >
              {letter}
            </span>
          );
        })}
      </motion.div> */}

      {/* Center Icon */}
      <motion.div
        className="loading-icon"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, yoyo: Infinity }}
      >
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
      </motion.div>
    </div>
  );
};

export default CircularText;
