import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { isReducedMotion } from "@/lib/motion-config";

interface CircularFillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  fillClassName?: string;
}

export const CircularFillButton: React.FC<CircularFillButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  fillClassName,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [fillCoords, setFillCoords] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isReducedMotion()) return;
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setFillCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsHovered(true);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isReducedMotion()) return;
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setFillCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsHovered(false);
    }
  };

  const handleTouchStart = () => {
    setIsTouched(true);
    setTimeout(() => setIsTouched(false), 400);
  };

  const variantStyles = {
    primary:
      "text-white bg-slate-900 dark:bg-slate-950 border border-indigo-500/30 shadow-glow hover:border-indigo-400/60",
    secondary:
      "text-foreground glass-card hover:border-indigo-500/40 border border-slate-200 dark:border-white/10",
    ghost:
      "text-muted-foreground hover:text-foreground bg-transparent hover:bg-slate-100 dark:hover:bg-white/5",
  };

  const defaultFillColor = {
    primary: "bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500",
    secondary: "bg-gradient-to-r from-indigo-500/15 via-cyan-500/15 to-violet-500/15",
    ghost: "bg-slate-200/50 dark:bg-white/10",
  }[variant];

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
        variantStyles[variant],
        isTouched && "scale-[0.98]",
        className
      )}
      {...props}
    >
      {/* Expanding circular fill following pointer entrance */}
      {fillCoords && (
        <span
          className={cn(
            "absolute rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out",
            fillClassName || defaultFillColor
          )}
          style={{
            left: `${fillCoords.x}px`,
            top: `${fillCoords.y}px`,
            width: "300%",
            paddingBottom: "300%",
            transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Touch tap pulse ripple */}
      {isTouched && (
        <span
          className="absolute inset-0 rounded-full bg-white/20 animate-ping pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Inner Label & Icon (Always above the expanding circular fill) */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default CircularFillButton;

