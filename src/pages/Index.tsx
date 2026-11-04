import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/sections/Hero";
import StatsBand from "@/components/sections/StatsBand";
import IntegrationsMarquee from "@/components/sections/IntegrationsMarquee";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import Careers from "@/components/sections/Careers";
import FAQ from "@/components/sections/FAQ";
import ClosingCTA from "@/components/sections/ClosingCTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ContactPopup from "@/components/ContactPopup";
import WhatsAppIcon from "@/components/ui/whatsapp-icon";
import { SmoothScroll } from "@/components/smooth-scroll";
import { smoothScrollTo } from "@/lib/scroll-utils";
import { CircleMaskTransition } from "@/components/ui/circle-mask-transition";
import { ScrubbedParagraph } from "@/components/ui/scrubbed-text";
import { CustomCursor } from "@/components/ui/custom-cursor";

export const Index: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>("Business Automation");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  // Gentle timed consultation popup (15 seconds, shown once per session)
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("incarnetix_popup_shown");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
        sessionStorage.setItem("incarnetix_popup_shown", "true");
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Ensure page starts at the very top if no anchor hash is specified
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Handle URL hashes smoothly
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        smoothScrollTo(hash, 80, 1.35);
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Precision Circular Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* 60fps Smooth scroll controller */}
      <SmoothScroll />

      {/* Sticky Glass Navbar with Progress indicator & Scrollspy */}
      <Navbar />

      {/* Main Page Flow */}
      <main id="main-content">
        {/* 1. Outcome-led Hero with animated Automation Workflow & Orbit Mockup */}
        <Hero />

        {/* 2. Animated Count-up Stats Band */}
        <StatsBand />

        {/* 3. Partner Software & Integrations Marquee (Wrapped in Scroll-Driven Circle Mask) */}
        <CircleMaskTransition>
          <IntegrationsMarquee />
        </CircleMaskTransition>

        {/* 4. Complete 9 Services Grid */}
        <Services onSelectService={(srv) => setSelectedService(srv)} />

        {/* Narrative Scroll-Scrubbed Text Bridge */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200/60 dark:border-white/5 section-alt relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center">
            <span className="eyebrow mb-4 justify-center">The Automation Mandate</span>
            <ScrubbedParagraph
              text="From fragmented software silos to a unified autonomous operating system. We architect your data pipelines, eliminate manual bottlenecks, and empower your enterprise to execute at peak velocity."
              className="text-xl sm:text-3xl font-heading font-semibold text-foreground tracking-tight leading-snug"
            />
          </div>
        </section>

        {/* 5. "How We Work" Numbered Methodology */}
        <Process />

        {/* 6. Why IncarnetiX / Differentiators Bento Grid */}
        <WhyUs />

        {/* 7. Clean Typographic Careers Section (Zero photos) */}
        <Careers />

        {/* 8. Accessible FAQ Accordion */}
        <FAQ />

        {/* 9. Closing High-Impact CTA Band (Wrapped in Circle Mask) */}
        <CircleMaskTransition>
          <ClosingCTA />
        </CircleMaskTransition>

        {/* 10. Modern Contact Form + Interactive Map */}
        <Contact selectedService={selectedService} />
      </main>

      {/* Structured Enterprise Footer */}
      <Footer />

      {/* Floating Action Button: WhatsApp (Bottom Right) */}
      <a
        href="https://wa.me/919773880816"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20"
        aria-label="Chat with IncarnetiX on WhatsApp"
        title="Chat on WhatsApp (+91-9773880816)"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>

      {/* Floating Action Button: Direct Phone Call (Bottom Left) */}
      <a
        href="tel:+919773880816"
        className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-gradient-to-tr from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20"
        aria-label="Call IncarnetiX Tech"
        title="Call +91-9773880816"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Timed Consultation Popup */}
      <ContactPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default Index;

