# IncarnetiX Tech V1 to V2 Migration Guide

## 1. Directory Structure Changes
The new site lives inside `incarnetix-v2/`. To deploy:
- Point your Vercel/Netlify/Hosting build root to `incarnetix-v2/`.
- Build Command: `npm run build`
- Output Directory: `dist`
- Node Version: Node 18+ or 20+

## 2. Environment Variables
Ensure the following are configured in your deployment settings:
```env
VITE_EMAILJS_SERVICE_ID=service_aq8ndoj
VITE_EMAILJS_TEMPLATE_ID=template_1euq6h9
VITE_EMAILJS_PUBLIC_KEY=g7VSggQz_vV-1ALbt
VITE_TO_EMAIL=reify.workspace@gmail.com
```

## 3. Asset Migrations
- **Safe Assets Retained:**
  - `logo.png`
  - Integration logos (`Freshworks.png`, `HrONe.png`, `Marg.png`, `MyOperator.png`, `chatApp.png`, `greyHr.png`, `kommo.png`, `mercariGlobalerphd.png`, `pipedrive.png`, `taskTrackerSuite.png`, `taskopad.png`, `wazzup24.png`, `BuildScalehd.png`)
  - Favicons & `site.webmanifest`
- **Removed Assets (Careers/Team Photos):**
  - All team member portrait images have been permanently removed per instructions.
  - No external Unsplash stock images are imported or rendered.

