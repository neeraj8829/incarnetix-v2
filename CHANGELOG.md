# Changelog & Migration Guide — IncarnetiX Tech V2

## Overview of Changes vs. Original (`incarnetix-tech-1`)

### 1. Safety & Architecture
- **Non-Destructive Development:** Built exclusively in sibling folder `incarnetix-v2`. The original repository was untouched.
- **Dependency Rationalization:** Replaced bulky, unused component libraries with lightweight, direct Radix UI primitives (`@radix-ui/react-accordion`, `@radix-ui/react-dialog`) and [Lenis](https://github.com/darkroomengineering/lenis) for 60fps smooth scrolling.
- **TypeScript & ESLint 9:** Migrated to ESLint 9 Flat Config with 0 errors and 0 warnings.
- **Production Build:** Passes `vite build` with optimal chunking, code splitting, and tree-shaking.

---

### 2. Careers Image Removal (Step 1)
- **Eliminated All Careers/Team Photos:**
  - Removed: `CA Shubh Bansal.png`
  - Removed: `Naman Agnihotri.png`
  - Removed: `Pallavi.png`
  - Removed: `Rudransh Gupta.png`
  - Removed: `Shreesh Jain.jpg`
  - Removed: `Ved Prakash Tripathi.png`
- **Zero Assets Copied:** None of the team photos were copied into `incarnetix-v2/src/assets`.
- **Pure Typographic Careers Section:**
  - Removed all mock job vacancy cards (`Business Automation Consultant`, `Senior Full-Stack Engineer`, `AI Tools Lead`).
  - Redesigned into a focused, premium "Join Our Dynamic Team" invitation card with direct email link to `hey@incarnetix.com`, strictly preserving the real content from the original site.

---

### 3. Visual & Design System Overhaul
- **Dark-Theme-First B2B Identity:** Built on a full Indigo (`#6366f1`) 50–950 scale, complemented by electric cyan and violet accents.
- **Glassmorphism & Surfaces:** Layered card surfaces (`rgba(15, 23, 42, 0.65)`) with subtle 1px translucent borders and GPU-accelerated aurora background glows.
- **Fluid Type Scale:** Utilized CSS `clamp()` across headings (H1, H2, H3) and paragraphs with Plus Jakarta Sans and Inter.
- **Light Theme Toggle:** Supports instant toggle with `localStorage` memory, system `prefers-color-scheme` fallback, and full WCAG AA contrast on both dark and light modes.

---

### 4. Interactive Card System (Follow-Up Upgrade)

#### Why the Previous Cards Felt Basic:
- **Monotonous Structure:** Every card shared identical rectangular dimensions, leading to a repetitive "wall of boxes."
- **Uniform Micro-interactions:** Every card used a plain Y-axis translation (`-translate-y-1`) with no directional or spatial awareness.
- **Static Imagery:** Cards relied purely on static Lucide icons with no sense of living automation or data motion.

#### Solutions Implemented:
- **Reusable Card Primitive (`card-system.tsx`):** Built with variants: `bento`, `spotlight`, `tilt`, `row`, `metric`, border beam animations, and `<CardGroup>` hover-dim desktop context.
- **Services (Asymmetric Bento Grid):**
  - Highlighting priority services in large/wide tiles (`Business Automation`, `Process Automation`, `AI Tools Integration`).
  - Embedded bespoke SVG/CSS animated mini-visuals (`ServiceVisuals.tsx`): interactive workflow node pulses, data flow lines, circular progress rings, AI chat pulses, schema migration arrows, and shield security motifs.
  - Cursor-following spotlight glow with radial gradients and an animated border beam traveling along card perimeters.
- **Why IncarnetiX (Interactive Sticky Showcase):**
  - Sticky two-column showcase pairing a vertical interactive selector with 3D tilt glass cards (subtle <8° pointer-tracking perspective and specular light reflection).
  - *Design Choice:* Bento was chosen for **Services** (to give all 9 disciplines distinctive visual hierarchy), and the Interactive Showcase was chosen for **Why IncarnetiX** (allowing visitors to inspect core enterprise differentiators one by one).
- **Process ("How We Work" - Sticky Stacking Cards):**
  - Cards stack and overlap on scroll, with previous cards scaling down and dimming smoothly.
  - Linked to a vertical SVG progress indicator; gracefully degrades to a vertical timeline on mobile and under `prefers-reduced-motion`.
- **Careers (Horizontal Role Cards):**
  - Expands on hover with gradient sweep, animated chevron, skill chips, and accordion expansion for responsibilities. 100% typographic.
- **Stats Band (Animated Metric Cards):**
  - Count-up counters paired with animated SVG sparklines, concentric radial gauges, and heartbeat waves.

---

### 5. Contact Section & Form Overhaul (Follow-Up Upgrade)

#### Why the Previous Form Felt Basic:
- **Fatiguing Wall of Inputs:** Plain stacked form with no visual progression, making high-intent B2B visitors feel overwhelmed.
- **No Friction Reducers:** Contact info was static text; visitors couldn't one-click copy emails or phone numbers.
- **Zero Continuity:** Accidentally refreshing or navigating lost all typed data.

#### Solutions Implemented:
- **Split Layout:**
  - Left Column: Outcome headline, SLA response promise (`[PLACEHOLDER: Confirm SLA response time]`), 3-step "What Happens Next" timeline, click-to-copy cards for `hey@incarnetix.com`, `+91-9773880816`, and `New Delhi, India` with toast feedback, and a Calendly direct scheduling option (`[PLACEHOLDER: Add Calendly link]`).
  - Right Column: 3-step progressive glass form card.
- **Multi-Step Guided Flow:**
  - **Step 1 (Identity):** Full Name, Work Email, Organization, Phone (with floating labels and inline regex validation).
  - **Step 2 (Scope & Timeline):** Multi-select interactive pills for the 9 core services + budget tier selection chips.
  - **Step 3 (Brief & Compliance):** Project overview with live character counter (10–1000 chars), NDA request checkbox, and statutory consent.
- **Form Intelligence & Resilience:**
  - Auto-persists drafts to `sessionStorage` (`incarnetix_form_draft`).
  - Honeypot antispam field (`website_trap`) hidden from screen readers and visual users.
  - Preserved direct EmailJS transmission (`service_aq8ndoj`, `template_1euq6h9`).
  - Rich celebratory confirmation screen with confetti-style particles, reference ID, and reset actions.

---

### 6. Modern Animation Layer (Follow-Up Upgrade)

#### Why the Previous Animations Felt Dated or Generic:
- **Uniform Fade-Ups:** Every section slid into view with identical delays and uniform opacity fades, lacking brand identity and spatial hierarchy.
- **Static Imagery & Transitions:** Section boundaries were flat horizontal cuts; background aurora blobs were motionless; the theme toggle was an instantaneous CSS class swap with no visual transition.
- **No Cursor or Micro-Feedback:** Buttons used standard uniform hover scaling rather than pointer-directed momentum or localized ripples.

#### Solutions Implemented:
- **Circular Signature System:**
  - **Circular Theme Reveal:** Integrated the `document.startViewTransition` API with an expanding `clip-path: circle()` originating from the user's click coordinates $(x, y)$, smoothly unveiling the opposite theme across the viewport.
  - **Circular Mobile Menu:** Replaced the drawer with a full-screen circular reveal expanding from the hamburger button, featuring staggered link springs (60ms), scroll-locking, and accessible keyboard focus trapping.
  - **Circular Button Fill:** Reusable `<CircularFillButton>` tracks pointer entry angles to expand a radial gradient fill from under the cursor.
  - **Concentric Orbit System (`OrbitSystem.tsx`):** Tool icons for real integrations (Kommo, Pipedrive, Marg, HrOne, Freshworks, WhatsApp, MyOperator, Taskopad) orbit the central IncarnetiX nucleus on concentric rings with counter-rotation to keep icons upright.
  - **Radial Progress Rings (`RadialProgressRing.tsx`):** Animated SVG `strokeDashoffset` rings synchronized with count-up numbers in the Stats Band.
  - **Scroll-Driven Circle Mask Section Transitions (`CircleMaskTransition.tsx`):** Native CSS `animation-timeline: view()` circle mask scaling from 12% to 100% between sections.
  - **Concentric Ripple & Pulse Rings:** Ambient looping rings behind the automation core.
  - **Halftone Dot-Wave (`HalftoneDotWave.tsx`):** 60fps radial sine wave canvas background, automatically paused off-screen with `IntersectionObserver`.
- **Text & Content Reveals:**
  - **Masked Split Headline (`RevealHeading.tsx`):** Lines slide up from behind overflow-hidden wrappers with staggered timing, preserving accessibility via `aria-label` and `aria-hidden`.
  - **Scroll-Scrubbed Text Highlight (`ScrubbedParagraph.tsx`):** Paragraph words transition from dim (`opacity-25`) to full illumination as the user scrolls past.
  - **Blur-to-Sharp Card Staggers:** Cards enter view with a subtle blur fade (`filter: blur(4px) -> blur(0px)`).
- **Parallax & Depth:**
  - Multi-layer hero depth (background at 0.15 factor, mid-layer floating geometry at 0.35 factor, foreground canvas at 0.85 factor).
  - Subtle mouse parallax on desktop (<12px displacement).
- **Hardware Smooth Scrolling & Tokens:**
  - Integrated Lenis with automatic `-80px` sticky navbar clearance on anchor clicks.
  - Top scroll progress bar powered by CSS `animation-timeline: scroll(root)`.
  - Subtle circular custom cursor (`CustomCursor.tsx`) on desktop.
  - Centralized motion tokens in `src/lib/motion-config.ts` and `src/index.css`.

---

### 7. Items for Decision / Review
1. **Calendly Booking Link:** Currently marked with `[PLACEHOLDER: Add Calendly link]` in `src/components/sections/Contact.tsx`. Supply your direct scheduling link to enable live booking.
2. **SLA Response Promise:** Marked with `[PLACEHOLDER: Confirm SLA response time]`. Update to your team's guaranteed SLA (e.g., "within 2 hours" or "within 1 business day").
3. **Open Job Roles:** Check `src/components/sections/Careers.tsx` to align active job titles with immediate hiring needs.
4. **Hero Mockup Default Mode:** The Hero mockup includes a toggle between "Workflow Nodes" and "Orbit Ring". The default is currently set to "Workflow Nodes". If you prefer "Orbit Ring" as the immediate default, it can be switched in `src/components/sections/Hero.tsx`.
