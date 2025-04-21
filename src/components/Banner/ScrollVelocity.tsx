// import { useRef, useLayoutEffect, useState, RefObject, CSSProperties } from "react";
// import {
//   motion,
//   useScroll,
//   useSpring,
//   useTransform,
//   useMotionValue,
//   useVelocity,
//   useAnimationFrame,
// } from "framer-motion";

// function useElementWidth(ref: RefObject<HTMLElement>): number {
//   const [width, setWidth] = useState(0);

//   useLayoutEffect(() => {
//     function updateWidth() {
//       if (ref.current) {
//         setWidth(ref.current.offsetWidth);
//       }
//     }
//     updateWidth();
//     window.addEventListener("resize", updateWidth);
//     return () => window.removeEventListener("resize", updateWidth);
//   }, [ref]);

//   return width;
// }

// interface ScrollVelocityProps {
//   scrollContainerRef?: RefObject<HTMLElement>;
//   texts?: string[];
//   velocity?: number;
//   className?: string;
//   damping?: number;
//   stiffness?: number;
//   numCopies?: number;
//   velocityMapping?: { input: [number, number]; output: [number, number] };
//   parallaxClassName?: string;
//   scrollerClassName?: string;
//   parallaxStyle?: CSSProperties;
//   scrollerStyle?: CSSProperties;
// }

// interface VelocityTextProps extends ScrollVelocityProps {
//   children: React.ReactNode;
//   baseVelocity?: number;
// }

// function VelocityText({
//   children,
//   baseVelocity = 100,
//   scrollContainerRef,
//   className = "",
//   damping = 50,
//   stiffness = 400,
//   numCopies = 6,
//   velocityMapping = { input: [0, 1000], output: [0, 5] },
//   parallaxClassName,
//   scrollerClassName,
//   parallaxStyle,
//   scrollerStyle,
// }: VelocityTextProps) {
//   const baseX = useMotionValue(0);
//   const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
//   const { scrollY } = useScroll(scrollOptions);
//   const scrollVelocity = useVelocity(scrollY);
//   const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });
//   const velocityFactor = useTransform(
//     smoothVelocity,
//     velocityMapping.input,
//     velocityMapping.output,
//     { clamp: false }
//   );

//   const copyRef = useRef<HTMLSpanElement>(null);
//   const copyWidth = useElementWidth(copyRef);

//   function wrap(min: number, max: number, v: number): number {
//     const range = max - min;
//     return (((v - min) % range) + range) % range + min;
//   }

//   const x = useTransform(baseX, (v) => (copyWidth === 0 ? "0px" : `${wrap(-copyWidth, 0, v)}px`));

//   const directionFactor = useRef(1);
//   useAnimationFrame((_t, delta) => {
//     let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

//     if (velocityFactor.get() < 0) {
//       directionFactor.current = -1;
//     } else if (velocityFactor.get() > 0) {
//       directionFactor.current = 1;
//     }

//     moveBy += directionFactor.current * moveBy * velocityFactor.get();
//     baseX.set(baseX.get() + moveBy);
//   });

//   return (
//     <div className={`${parallaxClassName} relative overflow-hidden`} style={parallaxStyle}>
//       <motion.div
//         className={`${scrollerClassName} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]`}
//         style={{ x, ...scrollerStyle }}
//       >
//         {Array.from({ length: numCopies }).map((_, i) => (
//           <span className={`flex-shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
//             {children}
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// export const ScrollVelocity = ({
//   texts = [],
//   velocity = 100,
//   ...props
// }: ScrollVelocityProps) => {
//   return (
//     <section>
//       {texts.map((text, index) => (
//         <VelocityText key={index} baseVelocity={index % 2 !== 0 ? -velocity : velocity} {...props}>
//           {text}&nbsp;
//         </VelocityText>
//       ))}
//     </section>
//   );
// };

// export default ScrollVelocity;
