import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ShieldCheck, Zap, Bot, ArrowRight, Lock, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card-system";

interface Differentiator {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  eyebrow: string;
  badge: string;
  details: string;
  stats: { label: string; value: string }[];
  bulletPoints: string[];
}

const differentiators: Differentiator[] = [
  {
    id: "unified",
    title: "Unified Multi-Software Ecosystem",
    shortDesc: "Eliminate 8+ fragmented SaaS tabs with one centralized control room.",
    icon: Layers,
    eyebrow: "Holistic Architecture",
    badge: "1 Platform",
    details:
      "Most businesses juggle disconnected CRMs, ERPs, HRMS, and messaging apps, leaking hundreds of operational hours into manual copy-pasting. IncarnetiX creates an interconnected digital nervous system where every transaction propagates in real time.",
    stats: [
      { label: "Software Silos", value: "0" },
      { label: "Data Integrity", value: "100%" },
    ],
    bulletPoints: [
      "Synchronized real-time webhooks across all applications",
      "Single operational source of truth for leadership",
      "No duplicate data entry between sales, billing, and inventory",
    ],
  },
  {
    id: "security",
    title: "Enterprise Security & DPDP Compliance",
    shortDesc: "Bank-grade data residency, end-to-end encryption, and role governance.",
    icon: Lock,
    eyebrow: "Governance",
    badge: "AES-256",
    details:
      "Enterprise automation demands ironclad security. All data streams are encrypted in transit via TLS 1.3 and at rest with AES-256. Granular role-based access control guarantees employees only view what their clearance permits.",
    stats: [
      { label: "Encryption", value: "TLS 1.3" },
      { label: "Audit Trails", value: "24/7" },
    ],
    bulletPoints: [
      "Indian Digital Personal Data Protection (DPDP) alignment",
      "Automated disaster recovery with isolated sandbox staging",
      "Strict zero-knowledge access policies for proprietary IP",
    ],
  },
  {
    id: "cutover",
    title: "Zero-Disruption Live Cutover",
    shortDesc: "Migrate historical and live records without losing a single order or customer.",
    icon: Zap,
    eyebrow: "Continuity",
    badge: "0 Downtime",
    details:
      "We test all schema mappings, API edge cases, and rollback procedures in pre-production staging. When cutover day arrives, historical and real-time records shift smoothly while business continues uninterrupted.",
    stats: [
      { label: "Cutover Downtime", value: "0 min" },
      { label: "Record Retention", value: "100%" },
    ],
    bulletPoints: [
      "Parallel sandbox testing before live production switch",
      "Instant automated rollback safeguards",
      "Complete historical verification audit before decommissioning old tools",
    ],
  },
  {
    id: "ai-agents",
    title: "Custom Autonomous AI Agents",
    shortDesc: "Purpose-built LLM agents calibrated to your company's proprietary SOPs.",
    icon: Bot,
    eyebrow: "Agentic Workers",
    badge: "Custom LLMs",
    details:
      "Instead of generic chatbots, we deploy tailored autonomous agents that read your company knowledge base, triage WhatsApp & email leads, reconcile incoming invoices with OCR, and auto-update your CRM pipeline.",
    stats: [
      { label: "Response Time", value: "< 5s" },
      { label: "Human Escalation", value: "Selective" },
    ],
    bulletPoints: [
      "Context-aware WhatsApp & omnichannel triage bots",
      "Automated invoice OCR and ledger reconciliation",
      "Autonomous self-correction with audit logs",
    ],
  },
];

export const WhyUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDiff = differentiators[activeIndex];
  const ActiveIcon = activeDiff.icon;

  return (
    <section id="why-us" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="eyebrow mb-3 justify-center">
            <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>The IncarnetiX Advantage</span>
          </div>
          <h2 className="text-foreground tracking-tight">
            Engineered to Solve <br />
            <span className="text-gradient-indigo">The Multi-Software Chaos</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 leading-relaxed">
            Explore our architectural differentiators. Select a capability to inspect its technical safeguards and operational impact.
          </p>
        </div>

        {/* Interactive Sticky Showcase with 3D Tilt Glass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {differentiators.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeIndex === idx;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 group ${
                    isSelected
                      ? "bg-white dark:bg-slate-900/90 border-indigo-500 shadow-glow"
                      : "bg-slate-50/60 dark:bg-slate-900/30 border-slate-200 dark:border-white/10 hover:border-indigo-400/50"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500/20"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        {item.eyebrow}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/20">
                          Active View
                        </span>
                      )}
                    </div>
                    <h3
                      className={`text-base font-bold font-heading transition-colors ${
                        isSelected
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {item.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: 3D Tilt Glass Card with Depth & Reflection (7 cols) */}
          <div className="lg:col-span-7">
            <Card
              variant="tilt"
              borderBeam
              glowColor="indigo"
              className="p-8 sm:p-10 min-h-[460px] flex flex-col justify-between bg-white/95 dark:bg-slate-900/90"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDiff.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm">
                          <ActiveIcon className="w-7 h-7" />
                        </div>
                        <div>
                          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold block">
                            {activeDiff.eyebrow}
                          </span>
                          <h3 className="text-2xl font-bold font-heading text-foreground">
                            {activeDiff.title}
                          </h3>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                        {activeDiff.badge}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                      {activeDiff.details}
                    </p>

                    {/* Key Safeguards / Bullets */}
                    <div className="space-y-2.5 mb-8">
                      {activeDiff.bulletPoints.map((bullet) => (
                        <div key={bullet} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Metrics Bar */}
                  <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <div className="flex gap-6">
                      {activeDiff.stats.map((s) => (
                        <div key={s.label}>
                          <div className="text-2xl font-bold font-heading text-gradient-indigo">
                            {s.value}
                          </div>
                          <div className="text-[11px] font-mono text-muted-foreground uppercase">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm"
                    >
                      <span>Consult with us</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
