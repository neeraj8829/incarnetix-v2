import React from "react";
import { ArrowRight, Phone, Mail, Sparkles } from "lucide-react";
import { CircularFillButton } from "@/components/ui/circular-button";
import { smoothScrollTo } from "@/lib/scroll-utils";

export const ClosingCTA: React.FC = () => {
  const scrollToContact = () => {
    smoothScrollTo("contact", 80, 1.35);
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Glow */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 overflow-hidden border border-indigo-200/80 dark:border-indigo-500/30 shadow-2xl shadow-indigo-500/5 dark:shadow-none bg-gradient-to-br from-indigo-50/90 via-white to-slate-50/90 dark:from-indigo-950/95 dark:via-slate-900/95 dark:to-slate-950 text-center transition-colors">
          {/* Subtle aurora blob inside */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-400/30 bg-indigo-100/60 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
            <span>Transform Your Operations Today</span>
          </div>

          {/* Big Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight max-w-3xl mx-auto leading-tight mb-6">
            Ready to turn operational friction into your <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 dark:from-indigo-300 dark:via-cyan-300 dark:to-indigo-200">
              greatest competitive advantage?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Eliminate hours of manual data sync, integrate AI into your core workflows, and manage your entire business through one unified automation platform.
          </p>

          {/* Action Button & Contact Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <CircularFillButton
              variant="primary"
              onClick={scrollToContact}
              className="w-full sm:w-auto px-8 py-4 text-base"
            >
              <span>Schedule Architecture Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </CircularFillButton>

            <a
              href="tel:+919773880816"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-medium text-slate-800 dark:text-white bg-white hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/15 transition-all border border-slate-200 dark:border-white/20 shadow-sm"
            >
              <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>+91-9773880816</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              hey@incarnetix.com
            </span>
            <span>·</span>
            <span>New Delhi, India</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;
