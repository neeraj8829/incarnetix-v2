# IncarnetiX Tech — V2 Redesign

> **"One Platform, Complete Business Automation"**  
> Modern, premium, animated, accessible enterprise website for IncarnetiX Tech Pvt. Ltd. (New Delhi, India).

---

## 🚀 Overview

`incarnetix-v2` is a complete redesign and rebuild of the IncarnetiX Tech platform. Inspired by world-class B2B SaaS experiences (e.g. cis.cx), it features an outcome-led hero, interactive SVG/HTML automation workflow canvas, animated metric counters, an infinite technology marquee, structured 9-service grid, 4-stage methodology timeline, bento-grid differentiators, clean typographic careers section, accessible Radix FAQ accordion, and floating multi-channel actions.

---

## 🛠 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) with fluid typography (`clamp()`) and custom design tokens
- **Animations:** [Lenis](https://github.com/darkroomengineering/lenis) (60fps smooth scrolling with reduced-motion support) + CSS GPU-accelerated keyframes
- **UI Primitives:** [@radix-ui/react-accordion](https://www.radix-ui.com/primitives/docs/components/accordion), [@radix-ui/react-dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
- **Icons:** [Lucide React](https://lucide.dev/) (pure SVG, 0 stock photos)
- **Forms & Backend:** [@emailjs/browser](https://www.emailjs.com/) (configured with original service and template credentials)
- **Routing:** [React Router DOM v6](https://reactrouter.com/)

---

## 📁 Folder Structure

```
incarnetix-v2/
├── index.html                  # Semantic HTML5, preloaded fonts, OpenGraph, JSON-LD schemas
├── package.json                # Dependencies, build scripts & metadata
├── tsconfig.json               # TypeScript path alias configuration (@/* -> src/*)
├── vite.config.ts              # Vite SWC bundling, port 8080
├── tailwind.config.ts          # Indigo 50-950 scale, fluid type, custom shadows
├── postcss.config.js           # PostCSS Tailwind and Autoprefixer
├── eslint.config.js            # ESLint 9 Flat Config
├── .env                        # EmailJS credentials & target email
├── public/
│   ├── logo.png                # Primary brand mark
│   ├── favicon*.png            # App and browser icons
│   ├── robots.txt              # Search engine crawling rules
│   ├── sitemap.xml             # Search engine index sitemap
│   └── site.webmanifest        # PWA & mobile web manifest
├── src/
│   ├── main.tsx                # React root mount and EmailJS initialization
│   ├── App.tsx                 # Route definitions & ThemeProvider
│   ├── index.css               # Design tokens, CSS variables, fluid type, glass-card
│   ├── assets/                 # Brand mark + 13 real software integration logos
│   ├── config/                 # Service configurations
│   ├── hooks/                  # Custom hooks (useTheme)
│   ├── lib/                    # Utility functions (cn / twMerge)
│   ├── types/                  # TypeScript interface contracts (email, data)
│   ├── services/               # Resilient EmailJS dispatch service
│   ├── components/
│   │   ├── smooth-scroll.tsx   # Lenis smooth-scroll controller
│   │   ├── theme-provider.tsx  # Dark/Light theme state & storage persistence
│   │   ├── theme-toggle.tsx    # Accessible Sun/Moon toggle pill
│   │   ├── ContactPopup.tsx    # Timed consultation modal
│   │   ├── ui/                 # Accessible Radix primitives (accordion, dialog, etc.)
│   │   └── sections/
│   │       ├── Hero.tsx                 # Outcome-led hero + SVG/CSS workflow canvas
│   │       ├── StatsBand.tsx            # Count-up animated numbers
│   │       ├── IntegrationsMarquee.tsx  # Dual infinite marquee with edge masks
│   │       ├── Services.tsx             # 9 canonical enterprise services
│   │       ├── Process.tsx              # 4-stage "How We Work" methodology
│   │       ├── WhyUs.tsx                # Differentiator Bento Grid
│   │       ├── Careers.tsx              # Clean typographic role cards (0 photos)
│   │       ├── FAQ.tsx                  # Radix accessible accordion
│   │       ├── ClosingCTA.tsx           # High-impact CTA band
│   │       ├── Contact.tsx              # Contact form + Rohini Sector 17 map
│   │       └── Footer.tsx               # Enterprise footer with legal links
│   └── pages/
│       ├── Index.tsx           # Main landing experience
│       ├── NotFound.tsx        # 404 page
│       └── privacy/
│           ├── PrivacyPolicy.tsx    # Complete privacy policy (Easebuzz, GDPR)
│           └── TermsOfService.tsx   # Terms of service (New Delhi jurisdiction)
```

---

## ⚡ Quick Start & Development

### 1. Installation
```bash
cd incarnetix-v2
npm install
```

### 2. Run Dev Server
```bash
npm run dev
```
The site will start at `http://localhost:8080/`.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production build inside `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Run Lint Check
```bash
npm run lint
```

---

## 🎨 Design System & Customization

### Colors & Tokens
All global color and surface tokens are defined in `src/index.css` and mapped in `tailwind.config.ts`:
- **Primary Identity:** Indigo `#6366f1` (`hsl(239, 84%, 67%)`) with complete 50–950 tints.
- **Accents:** Cyan `#06b6d4` / `#22d3ee`, Violet `#8b5cf6`.
- **Dark Mode Background:** `#070a14` (`hsl(228, 45%, 5%)`).
- **Surface Cards:** `rgba(15, 23, 42, 0.65)` with 1px `rgba(255, 255, 255, 0.08)` border.
- **Light Mode Support:** Accessible `#f8fafc` surface with dark text and persisted state in `localStorage`.

### Fluid Typography Scale
Defined using CSS `clamp()` in `src/index.css`:
- **H1:** `clamp(2.5rem, 5.5vw, 4.75rem)`
- **H2:** `clamp(1.85rem, 3.8vw, 3.25rem)`
- **H3:** `clamp(1.25rem, 2vw, 1.75rem)`
- **Body:** `1rem` - `1.125rem` with `1.65` line height.

---

## 🛡 Security & Privacy Highlights

- **Zero Stock Imagery / Clean Careers:** All photos on the careers page have been eliminated in favor of clean typography.
- **EmailJS Protection:** Contact inquiries are validated and dispatched via client-side EmailJS with retry logic.
- **Accessible & Reduced Motion:** Automatically pauses marquee and parallax transforms when `prefers-reduced-motion` is detected.
- **Semantic SEO:** Complete JSON-LD Schema markup for `Organization` and `LocalBusiness` centered on New Delhi, India.

# incarnetix-v2
