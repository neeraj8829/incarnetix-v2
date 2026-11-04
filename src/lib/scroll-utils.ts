import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Universal smooth scroll to target element, ID, or vertical coordinate with sticky header clearance.
 * Uses Lenis when available (for silky 60fps easing) and falls back to browser smooth scroll.
 */
export const smoothScrollTo = (
  target: string | HTMLElement | number,
  offset = 80,
  duration = 1.35
) => {
  if (typeof window === "undefined") return;

  const lenis = window.__lenis;

  // Handle scroll to top or numeric position
  if (typeof target === "number" || target === "top") {
    const targetY = typeof target === "number" ? target : 0;
    if (lenis) {
      lenis.scrollTo(targetY, {
        duration,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        immediate: false,
      });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
    return;
  }

  // Handle DOM element or ID selector
  const el =
    typeof target === "string"
      ? document.getElementById(target.replace(/^#/, ""))
      : target;

  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, {
      offset: -offset,
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      immediate: false,
    });
  } else {
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: Math.max(0, elementPosition - offset),
      behavior: "smooth",
    });
  }
};

