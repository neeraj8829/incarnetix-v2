import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

/* =========================================================================
   CARD GROUP: Manages sibling hover-dim effect on desktop
   ========================================================================= */
interface CardGroupContextType {
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  isTouch: boolean;
}

const CardGroupContext = React.createContext<CardGroupContextType>({
  hoveredId: null,
  setHoveredId: () => {},
  isTouch: false,
});

export const CardGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  enableHoverDim?: boolean;
}> = ({ children, className, enableHoverDim = true }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <CardGroupContext.Provider
      value={{
        hoveredId: enableHoverDim && !isTouch ? hoveredId : null,
        setHoveredId,
        isTouch,
      }}
    >
      <div className={className}>{children}</div>
    </CardGroupContext.Provider>
  );
};

/* =========================================================================
   BASE CARD PROPS & PRIMITIVE
   ========================================================================= */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  variant?: "bento" | "spotlight" | "tilt" | "row" | "metric";
  glowColor?: "indigo" | "cyan" | "violet" | "emerald";
  borderBeam?: boolean;
  className?: string;
  index?: number;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  id,
  variant = "spotlight",
  glowColor = "indigo",
  borderBeam = false,
  className,
  index = 0,
  children,
  ...props
}) => {
  const { hoveredId, setHoveredId, isTouch } = React.useContext(CardGroupContext);
  const isDimmed = hoveredId !== null && id !== undefined && hoveredId !== id;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    if (variant === "tilt") {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((y - centerY) / centerY) * -6; // max -6 to +6 deg
      const tiltY = ((x - centerX) / centerX) * 6;
      setTilt({ x: tiltX, y: tiltY });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (id) setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    if (id) setHoveredId(null);
  };

  // Color mapping for radial spotlight
  const glowRgb = {
    indigo: "99, 102, 241",
    cyan: "6, 182, 212",
    violet: "139, 92, 246",
    emerald: "16, 185, 129",
  }[glowColor];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          variant === "tilt" && !isTouch && isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
            : undefined,
        transition:
          variant === "tilt"
            ? "transform 0.15s ease-out, opacity 0.3s ease, border-color 0.3s ease"
            : "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease, border-color 0.3s ease",
        animationDelay: index ? `${index * 0.08}s` : undefined,
      }}
      className={cn(
        "relative rounded-2xl glass-card border border-slate-200 dark:border-white/10 overflow-hidden",
        "focus-within:ring-2 focus-within:ring-indigo-500/80 focus-within:outline-none",
        isDimmed && "opacity-60 scale-[0.99] filter brightness-95",
        borderBeam && isHovered && "border-transparent",
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Radial Overlay */}
      {!isTouch && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 -z-0"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${glowRgb}, 0.12), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Tilt Light Sheen Reflection */}
      {variant === "tilt" && !isTouch && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200 -z-0"
          style={{
            background: `linear-gradient(${tilt.x * 20 + 45}deg, rgba(255, 255, 255, 0.08), transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Animated Traveling Border Beam */}
      {borderBeam && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl border-2 transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          style={{
            borderColor: `rgba(${glowRgb}, 0.5)`,
            boxShadow: `0 0 25px -5px rgba(${glowRgb}, 0.35)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Card Contents */}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
};

export default Card;

