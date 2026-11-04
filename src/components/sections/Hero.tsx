import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Cpu,
  Database,
  Network,
  ShieldCheck,
  Zap,
  Sparkles,
  Activity,
  Layers,
  CircleDot,
} from "lucide-react";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { CircularFillButton } from "@/components/ui/circular-button";
import { HalftoneDotWave } from "@/components/ui/halftone-dot-wave";
import { OrbitSystem } from "@/components/ui/orbit-system";
import { isReducedMotion } from "@/lib/motion-config";
import { smoothScrollTo } from "@/lib/scroll-utils";

export const Hero: React.FC = () => {
  const [viewMode, setViewMode] = useState<"workflow" | "orbit">("workflow");
  const mouseOffset = useMouseParallax(7);
  const reducedMotion = isReducedMotion();

  // Multi-layer hero scroll parallax
  const { scrollY } = useScroll();
  const yAurora = useTransform(scrollY, [0, 800], [0, 160]);
  const yMidDecor = useTransform(scrollY, [0, 800], [0, 90]);
  const yMockup = useTransform(scrollY, [0, 800], [0, 35]);

  const scrollTo = (id: string) => {
    smoothScrollTo(id, 80, 1.35);
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Layer 1: Ambient Dot Wave & Aurora Mesh (Parallax Speed: 0.15) */}
      <motion.div
        style={reducedMotion ? {} : { y: yAurora }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <HalftoneDotWave dotSpacing={36} baseRadius={1.4} amplitude={1.6} />
        <div className="aurora-indigo top-10 left-1/4 w-[460px] h-[460px] -translate-x-1/2 -z-10" />
        <div className="aurora-cyan top-40 right-1/4 w-[500px] h-[500px] translate-x-1/3 -z-10" />
      </motion.div>

      {/* Layer 2: Floating Decorative Geometric Rings (Parallax Speed: 0.35) */}
      <motion.div
        style={reducedMotion ? {} : { y: yMidDecor }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-24 left-[10%] w-16 h-16 rounded-full border border-indigo-500/20 animate-float" />
        <div className="absolute bottom-40 right-[8%] w-24 h-24 rounded-full border border-cyan-500/20 animate-float [animation-delay:2s]" />
        <div className="absolute top-1/2 right-[14%] w-3 h-3 rounded-full bg-violet-400/40 animate-ping" />
      </motion.div>

      {/* Layer 3: Foreground Content & Mockup (Parallax Speed: 0.85 + Mouse Follow) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono uppercase tracking-wider mb-6 animate-pulse-glow"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>The Incarnation of Business Automation</span>
          </motion.div>

          {/* Masked Split Headline with Animated Gradient Sweep */}
          <div className="mb-6">
            <RevealHeading
              as="h1"
              className="text-foreground tracking-tight"
              gradientWord="Automation."
              gradientClassName="text-gradient-indigo animate-gradient-sweep"
            >
              One Platform. Complete Business Automation.
            </RevealHeading>
          </div>

          {/* Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8"
          >
            Revolutionize how your enterprise operates by unifying CRM, ERP, HRMS, and AI workflows into a single synchronized platform. Eliminate manual bottlenecks and scale without friction.
          </motion.p>

          {/* Signature Circular Fill CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <CircularFillButton
              variant="primary"
              onClick={() => scrollTo("contact")}
              className="w-full sm:w-auto px-8 py-4 text-base"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </CircularFillButton>

            <CircularFillButton
              variant="secondary"
              onClick={() => scrollTo("services")}
              className="w-full sm:w-auto px-8 py-4 text-base"
            >
              <span>Explore 9 Services</span>
            </CircularFillButton>
          </motion.div>

          {/* Subtext guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-muted-foreground font-mono"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              Zero-Downtime Migration
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Tailored Integrations
            </span>
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              24/7 Dedicated Support
            </span>
          </motion.div>
        </div>

        {/* Floating HTML/CSS/SVG Automation Workflow Canvas Mockup with Subtle Mouse Parallax */}
        <motion.div
          style={
            reducedMotion
              ? {}
              : {
                  y: yMockup,
                  x: mouseOffset.x,
                  rotateX: -mouseOffset.y * 0.15,
                  rotateY: mouseOffset.x * 0.15,
                }
          }
          className="relative max-w-5xl mx-auto transition-transform duration-100 ease-out perspective-1000"
        >
          {/* Glowing Backing Frame */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-cyan-500/15 to-purple-500/20 blur-xl opacity-75 pointer-events-none" />

          <div className="relative rounded-2xl glass-card border border-slate-200 dark:border-white/10 p-4 sm:p-6 lg:p-8 shadow-2xl overflow-hidden bg-white/90 dark:bg-slate-950/80">
            {/* Top Mockup Header Bar with Interactive Switch */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200 dark:border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-muted-foreground hidden sm:inline">
                  incarnetix-orchestrator.engine // active-stream
                </span>
              </div>

              {/* View Switcher: Live Workflow vs Ecosystem Orbit */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setViewMode("workflow")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-[11px] transition-all ${
                    viewMode === "workflow"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>Workflow Nodes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("orbit")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-[11px] transition-all ${
                    viewMode === "orbit"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CircleDot className="w-3 h-3" />
                  <span>Orbit Ring</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live Sync
                </span>
                <span className="font-mono text-muted-foreground text-[11px] hidden md:inline">
                  Latency: 14ms
                </span>
              </div>
            </div>

            {/* View Mode 1: Interactive Workflow Stream Canvas */}
            {viewMode === "workflow" ? (
              <div className="relative py-6 sm:py-10 px-2 sm:px-6">
                {/* Connecting SVG Animated Data Stream Lines */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 180 80 Q 340 80 480 150"
                    fill="none"
                    stroke="url(#streamGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="animate-pulse"
                  />
                  <path
                    d="M 180 230 Q 340 230 480 160"
                    fill="none"
                    stroke="url(#streamGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="animate-pulse"
                  />
                  <path
                    d="M 520 150 Q 660 80 820 80"
                    fill="none"
                    stroke="url(#streamGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="animate-pulse"
                  />
                  <path
                    d="M 520 160 Q 660 230 820 230"
                    fill="none"
                    stroke="url(#streamGrad)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="animate-pulse"
                  />
                </svg>

                {/* Grid of Nodes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
                  {/* Column 1: Inbound Sources */}
                  <div className="space-y-4">
                    <div className="glass-card p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-indigo-500/40 transition-all hover:translate-x-1 group">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                          <Database className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-mono text-muted-foreground uppercase">Source Ingestion</div>
                          <div className="text-sm font-semibold font-heading text-foreground">CRM & Lead Pipeline</div>
                          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">Kommo / Pipedrive</div>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all hover:translate-x-1 group">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                          <Network className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-mono text-muted-foreground uppercase">Omnichannel Hub</div>
                          <div className="text-sm font-semibold font-heading text-foreground">WhatsApp & VoIP Calls</div>
                          <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono mt-0.5">Wazzup24 / MyOperator</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Central IncarnetiX Orchestrator Core with Concentric Ripple Rings */}
                  <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-indigo-50 via-white to-slate-50 dark:from-indigo-950/80 dark:to-slate-900/90 border-2 border-indigo-400/60 dark:border-indigo-500/50 shadow-glow relative group">
                    {/* Concentric expanding ripple rings */}
                    <div className="absolute inset-2 rounded-2xl border border-indigo-500/30 animate-ripple-1 pointer-events-none" />
                    <div className="absolute -inset-2 rounded-2xl border border-cyan-500/20 animate-ripple-2 pointer-events-none" />

                    <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-indigo-600 text-[10px] font-mono uppercase tracking-widest text-white shadow-sm">
                      Automation Core
                    </div>
                    <div className="relative w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-400/40 flex items-center justify-center mb-3 animate-float">
                      <Cpu className="w-8 h-8 text-indigo-600 dark:text-cyan-300" />
                      <div className="absolute inset-0 rounded-2xl bg-indigo-500/30 blur-md -z-10 animate-ping opacity-30" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-foreground text-center">
                      IncarnetiX Engine
                    </h4>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      Rule Engine · AI Dispatch · Real-Time Sync
                    </p>
                    <div className="w-full mt-4 pt-3 border-t border-slate-200 dark:border-indigo-500/20 flex items-center justify-between text-[11px] font-mono text-indigo-600 dark:text-indigo-300">
                      <span>99.9% Efficiency</span>
                      <span className="text-emerald-600 dark:text-emerald-400">0 Errors</span>
                    </div>
                  </div>

                  {/* Column 3: Outbound Execution */}
                  <div className="space-y-4">
                    <div className="glass-card p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-violet-500/40 transition-all hover:-translate-x-1 group">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-mono text-muted-foreground uppercase">AI Copilot</div>
                          <div className="text-sm font-semibold font-heading text-foreground">Autonomous Workflows</div>
                          <div className="text-[11px] text-violet-600 dark:text-violet-400 font-mono mt-0.5">Custom LLM Agents</div>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 transition-all hover:-translate-x-1 group">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-mono text-muted-foreground uppercase">ERP & Compliance</div>
                          <div className="text-sm font-semibold font-heading text-foreground">Billing & Attendance</div>
                          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">Marg / HrOne / greytHR</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* View Mode 2: Concentric Circular Orbit System */
              <div className="py-8 flex items-center justify-center min-h-[380px]">
                <OrbitSystem className="my-auto scale-90 sm:scale-100" />
              </div>
            )}

            {/* Bottom Status Ticker */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xs text-muted-foreground">Platforms Unified</div>
                <div className="text-lg font-bold font-heading text-foreground">13+ Systems</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Execution Model</div>
                <div className="text-lg font-bold font-heading text-gradient-indigo">Event-Driven</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Team Support</div>
                <div className="text-lg font-bold font-heading text-foreground">24/7 Monitored</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Architecture</div>
                <div className="text-lg font-bold font-heading text-emerald-600 dark:text-emerald-400">Enterprise Ready</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
