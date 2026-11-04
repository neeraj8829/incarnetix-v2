# IncarnetiX Tech V2 — Modern Animation & Motion System (`MOTION.md`)

## 1. Executive Motion Philosophy

The IncarnetiX V2 motion system is engineered around **purposeful, high-velocity enterprise clarity**. It transforms static B2B interfaces into an interconnected, living automation platform while adhering strictly to:
- **GPU-accelerated properties only:** Exclusively `transform`, `opacity`, `clip-path`, and constrained `filter` (blur $\le 6$px). Zero layout property mutations (`width`, `height`, `top`, `left`).
- **Progressive enhancement first:** Native CSS Scroll-Driven Animations (`animation-timeline: view()` and `scroll(root)`) execute on the browser compositor thread without main-thread scripting overhead.
- **Strict `prefers-reduced-motion` compliance:** Disables loops, orbits, marquees, parallax transforms, and View Transitions instantly, falling back to static 100% opacity content.
- **Zero CLS & 60fps budget:** All containers reserve static dimensional bounding boxes; animations occur purely in local stacking contexts.
- **Centralized tokens:** Governed exclusively by `src/lib/motion-config.ts` and `src/index.css`.

---

## 2. Inventory of Motion Effects & Architecture

| Effect & Component | Section / Placement | Primary Technique | Graceful Fallback | Tuning & Disabling Guide |
| :--- | :--- | :--- | :--- | :--- |
| **Circular Theme Toggle Reveal**<br>[`ThemeToggle.tsx`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/components/theme-toggle.tsx) | Header / Navbar | **View Transitions API** (`document.startViewTransition`) + expanding `clip-path: circle()` from click $(x, y)$ coordinates. | Instant color class swap if API is unsupported or reduced motion is active. | Tune duration in `src/index.css` under `@keyframes circularThemeReveal` (default `500ms`). |
| **Circular Mobile Menu Reveal**<br>[`CircularMobileMenu.tsx`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/components/ui/circular-mobile-menu.tsx) | Mobile / Tablet Nav (<1024px) | **Framer Motion `clip-path: circle()`** originating from hamburger button center with 60ms staggered link springs + body scroll lock. | Opacity fade on reduced motion; standard DOM focus trap. | Adjust `origin` prop or stagger timing in `MOTION_CONFIG.staggers.menuLink` (`0.06s`). |
| **Circular Button Fill**<br>[`CircularFillButton.tsx`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/components/ui/circular-button.tsx) | Hero primary/secondary, Header, Closing CTA | **Coordinate-aware radial expanding fill** tracking pointer entrance vector (`scale: 0` $\rightarrow$ `scale: 1`). Touch devices use a soft radial ping. | Standard button background with hover opacity. | Adjust scale multiplier or duration in `CircularFillButton.tsx` (default `500ms`). |
| **Concentric Automation Orbit**<br>[`OrbitSystem.tsx`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/components/ui/orbit-system.tsx) | Hero Canvas (Toggle Tab) | **Pure CSS 2D Transform loops** (`@keyframes orbitRotate`). Counter-rotates icons at inverse angle so they remain upright at all degrees. | Pauses on hover; static layout under `prefers-reduced-motion`. | Adjust ring cycle speed via `.animate-orbit-cw` (38s) and `.animate-orbit-ccw` (28s) in `src/index.css`. |
| **Concentric Ripple & Pulse Rings** | Central Nucleus in Hero & Orbit | **Pure CSS Keyframes** (`@keyframes rippleExpand`) with 3 staggered opacity delays (0s, 1.33s, 2.66s). | Fixed static border under reduced motion. | Controlled via `.animate-ripple-1/2/3` in `src/index.css`. |
| **Radial Progress Rings**<br>[`RadialProgressRing.tsx`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/components/ui/radial-progress-ring.tsx) | Stats Band (`99% Efficiency`) | **SVG `strokeDashoffset`** triggered via `useInView` with count-up number. | Full stroke rendered statically without transition if reduced motion is requested. | Tune stroke width, duration, or size via props (`size={48}`, `strokeWidth={4}`). |
| **Scroll Circle Mask Section Transition**<br>[`CircleMaskTransition.tsx`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/components/ui/circle-mask-transition.tsx) | Before Integrations Marquee & Before Closing CTA | **Native CSS `animation-timeline: view()`** with `@supports`. Fallback uses hardware-accelerated Framer Motion `useScroll` scrub. | Standard block container with full visibility. | Set `animation-range` in `src/index.css` (default `entry 15% cover 50%`). |
| **Halftone Dot-Wave Ambient Canvas**<br>[`HalftoneDotWave.tsx`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/components/ui/halftone-dot-wave.tsx) | Hero Background | **HTML5 Canvas radial sine oscillator** throttled at 60fps via `requestAnimationFrame`. Automatically paused when off-screen via `IntersectionObserver`. | Renders single static dot grid once on reduced motion. | Adjust `dotSpacing` (36px), `baseRadius` (1.4px), or `amplitude` (1.6px). |
| **Masked Split Headline Reveal**<br>[`RevealHeading.tsx`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/components/ui/reveal-heading.tsx) | Hero Title | **Overflow-hidden split line spans** sliding up from `115%` with `0.04s` stagger. Accessible with `aria-label` on heading and `aria-hidden` on spans. | Semantic standard `<h1>` with full visibility. | Adjust duration (`0.65s`) or stagger in `src/lib/motion-config.ts`. |
| **Scroll-Scrubbed Text Highlight**<br>[`ScrubbedText.tsx`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/components/ui/scrubbed-text.tsx) | Narrative Bridge between Services & Process | **Scroll-linked word illumination** changing from `opacity-25` to `opacity-100` as viewport passes. | Solid text at `opacity-100`. | Modify `offset: ["start 85%", "center 45%"]` in `ScrubbedParagraph.tsx`. |
| **Multi-Layer Hero Parallax** | Hero Section | **Framer Motion `useScroll`** driving 3 distinct depth speeds (0.15 background aurora, 0.35 floating geometric rings, 0.85 foreground canvas). | `y: 0` static layout. | Multipliers configured via `useTransform(scrollY, [0, 800], [0, offset])`. |
| **Subtle Mouse Pointer Parallax**<br>[`use-mouse-parallax.ts`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/hooks/use-mouse-parallax.ts) | Hero Mockup Canvas | **Window `mousemove` listener with rAF easing**. Desktop only (`hover: hover` and `pointer: fine`). Clamped strictly to $\le 12$px. | Disabled on touch devices and reduced motion. | Adjust sensitivity via `useMouseParallax(factor)`. |
| **Card Blur-to-Sharp Stagger**<br>[`card-system.tsx`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/components/ui/card-system.tsx) | Services Bento Grid & Metric Cards | Native `.scroll-view-reveal` transitioning `filter: blur(4px) -> blur(0px)` and `opacity: 0 -> 1`. | Unblurred static cards. | Stagger set via inline `animationDelay: ${index * 0.08}s`. |
| **Circular Custom Cursor**<br>[`CustomCursor.tsx`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/components/ui/custom-cursor.tsx) | Global Viewport (Desktop) | **Lagging trailing ring + precise center dot**. Expands over clickable nodes (`a`, `button`, inputs). Never hides the OS cursor. | Completely unmounted on touch/mobile/reduced motion. | Styles configured in `CustomCursor.tsx`. |
| **60fps Smooth Scrolling**<br>[`smooth-scroll.tsx`](file:///Users/neeraj/Desktop/Neeraj/Personal/incarnetix/incarnetix-v2/src/components/smooth-scroll.tsx) | Global Document Root | **Lenis Smooth Scroll** with custom power curve and automatic `-80px` sticky navbar clearance on anchor clicks. | Native browser smooth scroll. | Duration and multipliers tuned in `src/components/smooth-scroll.tsx`. |
| **Hardware Scroll Progress** | Sticky Top Navbar | **CSS `animation-timeline: scroll(root)`** running directly on GPU compositor thread, synced with React state fallback. | Standard CSS width percentage. | `.scroll-driven-progress` in `src/index.css`. |

---

## 3. Motion Governance: Preventing Visual Fatigue

To maintain a calm, premium B2B SaaS tone, the application enforces **one dominant signature animation per section**:
1. **Header:** Circular ViewTransition theme toggle & circular menu reveal.
2. **Hero:** Concentric Orbit System + Halftone Dot-Wave + masked split text reveal.
3. **Transition 1:** Scroll-scrubbed circle mask revealing Integrations.
4. **Stats Band:** Radial progress rings + verified metric counters.
5. **Services:** Cursor-following spotlight glow + traveling border beams + pure SVG micro-animations.
6. **Narrative Bridge:** Scroll-scrubbed word illumination.
7. **Process:** Scroll-driven stacking cards with vertical progress line.
8. **Why IncarnetiX:** 3D perspective tilt glass card with specular sheen.
9. **Careers:** Pure typographic row expansion with horizontal gradient sweep.
10. **Transition 2 & Closing CTA:** Center-growing circle mask + circular button fill.
11. **Contact:** 3-step progressive glass form with live validation and confetti celebration.

---

## 4. Accessibility & Safety Verification

All motion utilities query:
```typescript
window.matchMedia("(prefers-reduced-motion: reduce)").matches
```
When enabled:
- All CSS animations (`.animate-orbit-*`, `.animate-ripple-*`, `.animate-marquee`, `.animate-float`, `.scroll-driven-progress`, `.scroll-circle-mask`) are overridden with `animation: none !important; opacity: 1 !important; transform: none !important; clip-path: none !important;`.
- Canvas rendering loop stops immediately.
- Custom cursor is unmounted.
- Lenis smooth scroll instance is skipped, allowing standard native scrolling.
- View Transitions fall back to immediate DOM updates.

