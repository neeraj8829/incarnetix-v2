import React, { useEffect, useRef, useState } from "react";
import { TrendingUp, ShieldCheck, Clock, Layers } from "lucide-react";
import { Card, CardGroup } from "@/components/ui/card-system";
import { RadialProgressRing } from "@/components/ui/radial-progress-ring";

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  sparkline: "sparkline" | "ring" | "wave" | "bars";
}

const stats: StatItem[] = [
  {
    id: "stat-1",
    value: 99,
    suffix: "%",
    label: "Efficiency Rate",
    sublabel: "Across automated business workflows",
    icon: TrendingUp,
    sparkline: "sparkline",
  },
  {
    id: "stat-2",
    value: 1,
    suffix: "",
    label: "Unified Platform",
    sublabel: "Eliminating multi-software silos",
    icon: Layers,
    sparkline: "ring",
  },
  {
    id: "stat-3",
    value: 24,
    suffix: "/7",
    label: "Continuous Support",
    sublabel: "Dedicated architecture monitoring",
    icon: Clock,
    sparkline: "wave",
  },
  {
    id: "stat-4",
    value: 13,
    suffix: "+",
    label: "Core Integrations",
    sublabel: "Enterprise CRM, ERP & HR systems",
    icon: ShieldCheck,
    sparkline: "bars",
  },
];

export const StatsBand: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1600;
          const frameRate = 1000 / 60;
          const totalFrames = Math.round(duration / frameRate);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);

            setCounts(stats.map((s) => Math.round(s.value * easeOutQuad)));

            if (frame >= totalFrames) {
              clearInterval(timer);
              setCounts(stats.map((s) => s.value));
            }
          }, frameRate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="py-14 border-y border-slate-200 dark:border-white/10 section-alt relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CardGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.id}
                id={stat.id}
                variant="metric"
                glowColor="indigo"
                borderBeam
                className="p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    {stat.id === "stat-1" ? (
                      <RadialProgressRing value={99} size={48} strokeWidth={4} suffix="%" />
                    ) : (
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                      {hasAnimated ? counts[idx] : 0}
                    </span>
                    <span className="font-heading text-2xl sm:text-3xl font-bold text-gradient-indigo">
                      {stat.suffix}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground mt-2 font-heading">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {stat.sublabel}
                  </p>
                </div>

                {/* Micro SVG Graphics */}
                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  {stat.sparkline === "sparkline" && (
                    <svg className="w-28 h-6" viewBox="0 0 112 24" fill="none">
                      <path
                        d="M 2 20 Q 28 18 50 10 T 90 6 L 110 2"
                        stroke="#6366f1"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle cx="110" cy="2" r="2" fill="#6366f1" />
                    </svg>
                  )}

                  {stat.sparkline === "ring" && (
                    <svg className="w-7 h-7" viewBox="0 0 28 28">
                      <circle cx="14" cy="14" r="11" stroke="#e2e8f0" strokeWidth="2.5" fill="none" className="dark:stroke-slate-800" />
                      <circle
                        cx="14"
                        cy="14"
                        r="11"
                        stroke="#06b6d4"
                        strokeWidth="2.5"
                        fill="none"
                        strokeDasharray="69"
                        strokeDashoffset="17"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}

                  {stat.sparkline === "wave" && (
                    <svg className="w-24 h-6" viewBox="0 0 96 24" fill="none">
                      <path
                        d="M 0 12 L 25 12 L 35 4 L 45 20 L 55 12 L 96 12"
                        stroke="#10b981"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  {stat.sparkline === "bars" && (
                    <div className="flex items-end gap-1 h-5">
                      <div className="w-1.5 h-2 bg-indigo-500/40 rounded-full" />
                      <div className="w-1.5 h-3.5 bg-indigo-500/60 rounded-full" />
                      <div className="w-1.5 h-5 bg-indigo-600 rounded-full" />
                      <div className="w-1.5 h-4 bg-cyan-500 rounded-full" />
                    </div>
                  )}

                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    Platform Metric
                  </span>
                </div>
              </Card>
            );
          })}
        </CardGroup>
      </div>
    </section>
  );
};

export default StatsBand;
