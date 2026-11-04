import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { isReducedMotion, MOTION_CONFIG } from "@/lib/motion-config";

interface ClipRevealProps {
  children: React.ReactNode;
  direction?: "bottom" | "top" | "left" | "right";
  className?: string;
  delay?: number;
}

export const ClipReveal: React.FC<ClipRevealProps> = ({
  children,
  direction = "bottom",
  className = "",
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = isReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialClip = {
    bottom: "inset(0% 0% 100% 0%)",
    top: "inset(100% 0% 0% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[direction];

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: initialClip }}
        animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{
          duration: 0.9,
          delay,
          ease: MOTION_CONFIG.easings.easeOut,
        }}
      >
        <motion.div
          initial={{ scale: 1.12 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            duration: 0.9,
            delay,
            ease: MOTION_CONFIG.easings.easeOut,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClipReveal;

