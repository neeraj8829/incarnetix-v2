# IncarnetiX Tech V2 — Content & Action Items TODO

This file tracks content placeholders, verified metrics, and optional future enhancements.

---

## 📋 Content & Metrics Placeholders

- [ ] **Support & Inbound Reply SLA:**
  - *Current Status:* Standard messaging: `We typically review briefs and respond within 1 business day`.

- [ ] **[ADD REAL STAT] Client Count / Hours Saved Metric:**
  - *Current Status:* The Stats Band highlights verified platform figures: `99% Efficiency Rate`, `1 Unified Platform`, `24/7 Continuous Support`, and `13+ Core Integrations`.
  - *Action:* If IncarnetiX wishes to display a total enterprise client count (e.g. `50+ Enterprises Automated`) or cumulative hours saved (e.g. `100,000+ Hours Saved`), add this verified number to `src/components/sections/StatsBand.tsx`.

- [ ] **[ADD REAL CASE STUDY] Client Testimonials / Logos:**
  - *Current Status:* Per safety rules, no fake client testimonials or fabricated reviews were invented.
  - *Action:* Once enterprise NDAs permit public attribution, add a client success stories slider with real quotes and logo marks.

- [x] **Careers Section (Clean "Join Our Team" Invitation):**
  - *Current Status:* All mock job listings have been removed. Displays a clean, focused "Join Our Dynamic Team" invitation with real contact email `hey@incarnetix.com`, strictly aligning with the original site content.

- [ ] **Google Analytics / Tracking:**
  - *Current Status:* The original repository had no Google Analytics tag configured (only EmailJS was hooked up).
  - *Action:* If GA4 or PostHog is needed, insert the measurement ID in `index.html` or through an environment variable.

---

## 🚀 Technical Features Completed in V2

- [x] Full bespoke `<Card>` primitive system (`bento`, `spotlight`, `tilt`, `row`, `metric`).
- [x] Pure SVG & CSS animated micro-visuals for all 9 services (`ServiceVisuals.tsx`).
- [x] Asymmetrical Bento grid for Services.
- [x] Scroll-driven sticky stacking cards for "How We Work" (Process) with mobile timeline fallback.
- [x] Interactive sticky showcase with 3D tilt glass cards for "Why IncarnetiX".
- [x] 100% typographic horizontal expandable role cards for Careers (zero team images).
- [x] Animated metric cards with SVG sparklines and gauges for the Stats Band.
- [x] Split-layout contact section with click-to-copy email/phone/address tiles and "What Happens Next" timeline.
- [x] 3-step interactive progressive form with floating labels, inline regex validation, honeypot spam protection, `sessionStorage` draft persistence, and confetti confirmation screen.
- [x] Dark/light theme engine with high-contrast token enforcement across all components.
- [x] Verified zero ESLint errors and zero TypeScript/Vite build warnings.
