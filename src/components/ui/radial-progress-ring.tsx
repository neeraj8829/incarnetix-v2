import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { isReducedMotion } from "@/lib/motion-config";

interface RadialProgressRingProps {
  value: number; // 0 to 100 percentage
  size?: number;
  strokeWidth?: number;
  label?: string;
  suffix?: string;
  color?: string;
  className?: string;
}

export const RadialProgressRing: React.FC<RadialProgressRingProps> = ({
  value,
  size = 110,
  strokeWidth = 7,
  label,
  suffix = "%",
  color = "url(#ringGrad)",
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reducedMotion = isReducedMotion();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (value / 100) * circumference;
  const currentOffset = isInView || reducedMotion ? targetOffset : circumference;

  return (
    <div
      ref={ref}
      className={`relative inline-flex flex-col items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-white/10"
          fill="none"
        />

        {/* Animated Progress Stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={currentOffset}
          strokeLinecap="round"
          fill="none"
          style={{
            transition: reducedMotion
              ? "none"
              : "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>

      {/* Centered Metric Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-heading font-bold text-lg sm:text-xl text-foreground tracking-tight">
          {isInView || reducedMotion ? value : 0}
          <span className="text-xs text-indigo-500 font-mono ml-0.5">{suffix}</span>
        </span>
        {label && (
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default RadialProgressRing;

