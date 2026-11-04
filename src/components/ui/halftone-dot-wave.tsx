import React, { useEffect, useRef } from "react";
import { isReducedMotion } from "@/lib/motion-config";

interface HalftoneDotWaveProps {
  className?: string;
  dotSpacing?: number;
  baseRadius?: number;
  amplitude?: number;
}

export const HalftoneDotWave: React.FC<HalftoneDotWaveProps> = ({
  className = "",
  dotSpacing = 36,
  baseRadius = 1.4,
  amplitude = 1.6,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    const reducedMotion = isReducedMotion();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry ? entry.isIntersecting : true;
        if (isVisible && !reducedMotion) {
          lastTime = performance.now();
          render(lastTime);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    let lastTime = performance.now();
    let time = 0;

    const render = (now: number) => {
      if (!isVisible || width === 0 || height === 0) return;

      const delta = Math.min(now - lastTime, 64);
      lastTime = now;
      time += delta * 0.0016;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark
        ? "rgba(129, 140, 248, 0.16)"
        : "rgba(99, 102, 241, 0.14)";

      const centerX = width / 2;
      const centerY = height / 2;

      // Batched path rendering: 1 draw call per frame instead of thousands
      ctx.beginPath();
      for (let x = dotSpacing / 2; x < width; x += dotSpacing) {
        for (let y = dotSpacing / 2; y < height; y += dotSpacing) {
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const wave = Math.sin(dist * 0.015 - time);
          const r = Math.max(0.6, baseRadius + wave * amplitude);

          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      intersectionObserver.disconnect();
    };
  }, [dotSpacing, baseRadius, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default HalftoneDotWave;
