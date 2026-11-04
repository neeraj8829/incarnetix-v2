import { useState, useEffect } from "react";
import { isReducedMotion, MOTION_CONFIG } from "@/lib/motion-config";

export const useMouseParallax = (factor: number = 8) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isReducedMotion()) return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;
    let isRunning = false;

    const loop = () => {
      const diffX = targetX - currentX;
      const diffY = targetY - currentY;

      if (Math.abs(diffX) < 0.1 && Math.abs(diffY) < 0.1) {
        currentX = targetX;
        currentY = targetY;
        setOffset({ x: currentX, y: currentY });
        isRunning = false;
        rafId = null;
        return;
      }

      currentX += diffX * 0.1;
      currentY += diffY * 0.1;
      setOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const maxDist = MOTION_CONFIG.limits.mouseParallaxPx;

      targetX = ((e.clientX - centerX) / centerX) * maxDist * (factor / 10);
      targetY = ((e.clientY - centerY) / centerY) * maxDist * (factor / 10);

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [factor]);

  return offset;
};

export default useMouseParallax;
