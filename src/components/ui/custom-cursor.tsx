import React, { useEffect, useRef, useState } from "react";
import { isReducedMotion } from "@/lib/motion-config";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (isReducedMotion()) return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    setIsDesktop(true);

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number | null = null;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }

      const target = e.target as HTMLElement | null;
      const shouldHover = !!(
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("[role='button']") ||
          target.classList.contains("interactive"))
      );

      if (shouldHover !== isHovering) {
        isHovering = shouldHover;
        if (ringRef.current) {
          if (isHovering) {
            ringRef.current.classList.add("scale-125", "bg-indigo-500/15", "border-indigo-400");
            ringRef.current.classList.remove("scale-100", "bg-indigo-500/5", "border-indigo-500/40");
          } else {
            ringRef.current.classList.remove("scale-125", "bg-indigo-500/15", "border-indigo-400");
            ringRef.current.classList.add("scale-100", "bg-indigo-500/5", "border-indigo-500/40");
          }
        }
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999] opacity-0 transition-opacity duration-300 will-change-transform -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/40 bg-indigo-500/5 scale-100 transition-all duration-200"
      />
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 pointer-events-none" />
    </div>
  );
};

export default CustomCursor;
