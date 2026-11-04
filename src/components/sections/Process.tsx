import React, { useRef, useEffect, useState } from "react";
import { Search, Compass, Cpu, CheckCircle2, ArrowRight } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  eyebrow: string;
  icon: React.ElementType;
  description: string;
  deliverables: string[];
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover & Map",
    duration: "Week 1",
    eyebrow: "Diagnostic Phase",
    icon: Search,
    description: "We conduct an in-depth audit of your current operational silos, data handoffs, and software subscriptions to isolate bottlenecks and compute automation ROI.",
    deliverables: [
      "Operational workflow blueprint",
      "Software stack & API audit",
      "Automation roadmap & milestone schedule",
    ],
  },
  {
    number: "02",
    title: "Design & Architect",
    duration: "Week 2 - 3",
    eyebrow: "Engineering Blueprint",
    icon: Compass,
    description: "Our systems architects formulate unified schemas, database synchronization models, security compliance protocols, and zero-downtime rollback strategies.",
    deliverables: [
      "Unified system architecture diagram",
      "API data contract specifications",
      "Security & access governance policies",
    ],
  },
  {
    number: "03",
    title: "Build & Integrate",
    duration: "Week 3 - 6",
    eyebrow: "Rapid Deployment",
    icon: Cpu,
    description: "We configure sandbox environments, build custom webhooks, train autonomous AI agents, and run rigorous edge-case load tests against real transaction data.",
    deliverables: [
      "Production-grade integration pipelines",
      "Custom AI agents & automations",
      "Comprehensive sandbox stress-testing",
    ],
  },
  {
    number: "04",
    title: "Adopt & Optimize",
    duration: "Continuous",
    eyebrow: "Full Empowerment",
    icon: CheckCircle2,
    description: "We lead interactive team training, publish customized role playbooks, oversee the live cutover, and deliver 24/7 continuous monitoring and iteration.",
    deliverables: [
      "Team SOPs & video training repository",
      "Zero-downtime live cutover management",
      "24/7 SLA monitoring & ongoing improvements",
    ],
  },
];

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight;
      if (totalDist > 0) {
        const currentDist = -rect.top;
        const progress = Math.max(0, Math.min(1, currentDist / totalDist));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="py-20 lg:py-32 section-alt relative overflow-hidden border-t border-slate-200 dark:border-white/10"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="eyebrow mb-3 justify-center">
            <span>Methodology</span>
          </div>
          <h2 className="text-foreground tracking-tight">
            How We Work: <br />
            <span className="text-gradient-indigo">From Chaos to Continuous Automation</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 leading-relaxed">
            A structured, engineering-first delivery framework guaranteeing zero operational disruption, strict data security, and high team adoption.
          </p>
        </div>

        {/* Desktop Sticky Stacking Cards Container */}
        <div className="relative space-y-8 sm:space-y-12">
          {/* Vertical Progress Line (Desktop Only) */}
          <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-1 bg-slate-200 dark:bg-white/10 rounded-full z-0">
            <div
              className="w-full bg-gradient-to-b from-indigo-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-150"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            // Sticky top offset so each card sticks and previous cards stack neatly
            const topOffset = 110 + idx * 24;

            return (
              <div
                key={step.number}
                style={{ top: `${topOffset}px` }}
                className="lg:sticky rounded-3xl glass-card border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-2xl transition-all duration-300 bg-white/95 dark:bg-slate-950/95"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Number and Icon */}
                  <div className="lg:col-span-4 flex flex-col justify-between h-full border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-white/10 pb-6 lg:pb-0 lg:pr-8">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-heading font-extrabold text-4xl sm:text-5xl text-gradient-indigo">
                          {step.number}
                        </span>
                        <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 font-semibold">
                          {step.duration}
                        </span>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 shadow-sm">
                        <Icon className="w-7 h-7" />
                      </div>

                      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        {step.eyebrow}
                      </div>
                      <h3 className="text-2xl font-bold font-heading text-foreground mt-1">
                        {step.title}
                      </h3>
                    </div>

                    <div className="mt-6 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold hidden lg:block">
                      Phase {idx + 1} of 4 · Guaranteed SLA
                    </div>
                  </div>

                  {/* Right Column: Description & Outcomes */}
                  <div className="lg:col-span-8 space-y-6">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
                      <div className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Core Deliverables & Outcomes</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {step.deliverables.map((deliv) => (
                          <div key={deliv} className="flex items-start gap-2 text-xs text-foreground/90 font-medium">
                            <span className="text-emerald-500 mt-0.5">●</span>
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Process CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
          >
            <span>Have a proprietary workflow? Let's blueprint it together</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
