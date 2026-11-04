import React from "react";
import { Mail, Sparkles, ArrowRight } from "lucide-react";
import { CircularFillButton } from "@/components/ui/circular-button";

export const Careers: React.FC = () => {
  return (
    <section id="careers" className="py-20 lg:py-28 section-alt relative overflow-hidden border-t border-slate-200 dark:border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>Work With Us</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground tracking-tight mb-4">
          Join Our Dynamic Team
        </h2>

        {/* Original Real Site Copy */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
          Ready to shape the future of business automation? We're always looking for talented, driven individuals who are passionate about eliminating operational silos and scaling modern enterprises.
        </p>

        {/* Polished Join Us Card */}
        <div className="rounded-3xl glass-card p-8 sm:p-12 border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden bg-gradient-to-b from-white/95 via-slate-50/90 to-slate-100/90 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-950/95 max-w-2xl mx-auto">
          {/* Subtle aurora glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Mail className="w-7 h-7" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-3">
            Send Us Your Resume & Portfolio
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Tell us about your background in software engineering, CRM/ERP integration, or solutions consulting. We review every application personally.
          </p>

          <a
            href="mailto:hey@incarnetix.com?subject=Career%20Inquiry%20-%20IncarnetiX%20Tech"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
          >
            <Mail className="w-4 h-4" />
            <span>hey@incarnetix.com</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="mt-6 text-xs text-muted-foreground font-mono">
            New Delhi, India · Direct hiring · No recruitment agencies
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
