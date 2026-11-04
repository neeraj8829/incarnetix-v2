import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { isReducedMotion, MOTION_CONFIG } from "@/lib/motion-config";

interface RevealHeadingProps {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
  gradientWord?: string;
  gradientClassName?: string;
}

export const RevealHeading: React.FC<RevealHeadingProps> = ({
  as: Component = "h2",
  children,
  className = "",
  gradientWord,
  gradientClassName = "text-gradient-indigo animate-gradient-sweep",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const reducedMotion = isReducedMotion();

  const textContent = typeof children === "string" ? children : "";

  if (reducedMotion || !textContent) {
    return (
      <Component className={className}>
        {children}
      </Component>
    );
  }

  const words = textContent.split(" ");

  return (
    <Component
      ref={ref}
      aria-label={textContent}
      className={`overflow-hidden ${className}`}
    >
      <span className="flex flex-wrap gap-x-[0.28em] gap-y-1 justify-center" aria-hidden="true">
        {words.map((word, idx) => {
          const isGradient = gradientWord && word.toLowerCase().includes(gradientWord.toLowerCase());
          return (
            <span key={`${word}-${idx}`} className="inline-block overflow-hidden py-0.5">
              <motion.span
                className={`inline-block ${isGradient ? gradientClassName : ""}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : { y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.55,
                  delay: idx * MOTION_CONFIG.staggers.textWord,
                  ease: MOTION_CONFIG.easings.easeOut,
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Component>
  );
};

export default RevealHeading;
