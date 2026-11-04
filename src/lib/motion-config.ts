/**
 * IncarnetiX Motion System — Centralized Configuration
 * 
 * Rules:
 * - Only animate transform, opacity, clip-path, and filter (blur <= 8px).
 * - Keep durations purposeful and calm.
 * - Enforce strict limits on tilt and parallax amplitudes.
 */

export const MOTION_CONFIG = {
  // Timing Durations (ms)
  durations: {
    instant: 0,
    micro: 200,      // button fills, badges, quick icons
    reveal: 500,     // text lines, card fades, dropdowns
    showcase: 800,   // sticky section switches, circle masks
    hero: 1100,      // hero intro orchestration
    marquee: 35000,  // infinite logo loop
    orbitSlow: 42000,// outer orbit cycle
    orbitFast: 28000,// inner orbit cycle
    dotWave: 4000,   // halftone canvas cycle
  },

  // Cubic Bezier Easings
  easings: {
    // Smooth deceleration for entrances and reveals
    easeOut: [0.22, 1, 0.36, 1] as const,
    // Symmetrical smooth transition for continuous looping & state switches
    easeInOut: [0.65, 0, 0.35, 1] as const,
    // Snappy spring-like curve for click feedback & pills
    springSnappy: [0.34, 1.56, 0.64, 1] as const,
  },

  // CSS Easing Strings (for pure CSS / View Transitions)
  cssEasings: {
    easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
    easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    springSnappy: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },

  // Stagger intervals (seconds)
  staggers: {
    textWord: 0.04,
    textLine: 0.08,
    cardGroup: 0.08,
    menuLink: 0.06,
  },

  // Amplitude limits for safe, premium depth
  limits: {
    mouseParallaxPx: 12,    // max mouse-tracking displacement
    cardTiltDeg: 7,         // max 3D perspective tilt
    driftYPx: 8,            // floating shapes vertical drift
    layerParallaxFactor: 0.25, // background layer scroll factor
  },
} as const;

/**
 * Feature Detection Helpers
 */
export const hasScrollTimelineSupport = (): boolean => {
  if (typeof window === "undefined" || typeof CSS === "undefined") return false;
  return CSS.supports("animation-timeline", "view()");
};

export const hasViewTransitionSupport = (): boolean => {
  return typeof document !== "undefined" && "startViewTransition" in document;
};

export const isReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

