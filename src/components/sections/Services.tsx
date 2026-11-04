import React, { useState } from "react";
import { 
  Cpu, 
  Workflow, 
  Sparkles, 
  Code2, 
  Bot, 
  Rocket, 
  RefreshCw, 
  GraduationCap, 
  HeadphonesIcon, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Card, CardGroup } from "@/components/ui/card-system";
import { smoothScrollTo } from "@/lib/scroll-utils";
import {
  BusinessAutomationVisual,
  ProcessAutomationVisual,
  DigitalTransformationVisual,
  CustomSoftwareVisual,
  AIToolsVisual,
  SoftwareImplementationVisual,
  SoftwareMigrationVisual,
  SoftwareTrainingVisual,
  SoftwareSupportVisual,
} from "./ServiceVisuals";

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleConsultService = (title: string) => {
    if (onSelectService) {
      onSelectService(title);
    }
    smoothScrollTo("contact", 80, 1.35);
  };

  return (
    <section id="services" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Subtle Blobs */}
      <div className="aurora-indigo top-1/3 left-0 w-96 h-96 -z-10" />
      <div className="aurora-cyan bottom-10 right-0 w-96 h-96 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="eyebrow mb-3 justify-center">
            <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Comprehensive Solutions</span>
          </div>
          <h2 className="text-foreground tracking-tight">
            Enterprise Services for <br />
            <span className="text-gradient-indigo">End-to-End Business Automation</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 leading-relaxed">
            From architecture discovery to autonomous AI agents and 24/7 continuous support, explore our 9 core disciplines structured in an intelligent bento ecosystem.
          </p>
        </div>

        {/* Bento Grid with CardGroup Sibling Hover-Dim */}
        <CardGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Tile 1: Business Automation (Flagship Large Tile - 2 cols on lg) */}
          <Card
            id="srv-1"
            variant="bento"
            borderBeam
            glowColor="indigo"
            className="md:col-span-2 lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("srv-1")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 font-semibold">
                  Flagship Capability
                </span>
              </div>

              <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
                Business Automation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Architect holistic, cross-departmental automation systems that unite CRM, billing, accounting, and client communication into a synchronized operational machine.
              </p>

              {/* Unique Mini-Visual */}
              <BusinessAutomationVisual isHovered={hoveredCard === "srv-1"} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
                {["Unified System Orchestration", "Cross-Platform Data Pipes", "Automated KPI Dashboards", "Error Auto-Recovery"].map((deliv) => (
                  <div key={deliv} className="flex items-center gap-2 text-xs text-foreground/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {["Multi-App Sync", "Event Triggers", "Zero Latency"].map((c) => (
                  <span key={c} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-muted-foreground border border-slate-200 dark:border-white/5">
                    {c}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleConsultService("Business Automation")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Card>

          {/* Tile 2: AI Tools Integration (Tall / High-Priority - 2 rows on xl) */}
          <Card
            id="srv-2"
            variant="bento"
            borderBeam
            glowColor="violet"
            className="md:col-span-1 lg:col-span-1 xl:col-span-2 p-6 sm:p-8 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("srv-2")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shadow-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20 font-semibold">
                  Next-Gen AI
                </span>
              </div>

              <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
                AI Tools Integration
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Embed state-of-the-art Large Language Models, autonomous agentic workers, and predictive intelligence directly into your daily operational stack.
              </p>

              {/* Unique Mini-Visual */}
              <AIToolsVisual isHovered={hoveredCard === "srv-2"} />

              <div className="space-y-1.5 my-4">
                {["Autonomous AI Dispatchers", "Document & OCR Extraction", "Context-Aware WhatsApp Bots"].map((deliv) => (
                  <div key={deliv} className="flex items-center gap-2 text-xs text-foreground/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400 shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {["LLM Agents", "Vector Search", "Smart Routing"].map((c) => (
                  <span key={c} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-muted-foreground border border-slate-200 dark:border-white/5">
                    {c}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleConsultService("AI Tools Integration")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 transition-colors"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Card>

          {/* Tile 3: Custom Software Development (Wide - 2 cols on lg) */}
          <Card
            id="srv-3"
            variant="bento"
            borderBeam
            glowColor="cyan"
            className="md:col-span-2 lg:col-span-2 p-6 sm:p-7 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("srv-3")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full font-semibold">
                  Engineering
                </span>
              </div>
              <h3 className="text-xl font-bold font-heading text-foreground mb-1">
                Custom Software Development
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Design and engineer tailored software applications that standard off-the-shelf SaaS cannot accommodate, solving unique business bottlenecks.
              </p>
              <CustomSoftwareVisual isHovered={hoveredCard === "srv-3"} />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <div className="flex gap-1.5">
                {["React & Node", "TypeScript", "Secure Auth"].map((c) => (
                  <span key={c} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-muted-foreground">
                    {c}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleConsultService("Custom Software Development")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </Card>

          {/* Tile 4: Process Automation */}
          <Card
            id="srv-4"
            variant="bento"
            borderBeam
            glowColor="cyan"
            className="p-6 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("srv-4")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Workflow className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
                  Efficiency
                </span>
              </div>
              <h3 className="text-lg font-bold font-heading text-foreground mb-1">
                Process Automation
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pinpoint repetitive operational bottlenecks and replace manual data entry with autonomous workflows.
              </p>
              <ProcessAutomationVisual isHovered={hoveredCard === "srv-4"} />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground">RPA · Approvals</span>
              <button
                type="button"
                onClick={() => handleConsultService("Process Automation")}
                className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 inline-flex items-center gap-1"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </Card>

          {/* Tile 5: Digital Transformation */}
          <Card
            id="srv-5"
            variant="bento"
            borderBeam
            glowColor="violet"
            className="p-6 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("srv-5")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold">
                  Modernization
                </span>
              </div>
              <h3 className="text-lg font-bold font-heading text-foreground mb-1">
                Digital Transformation
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Transition legacy operations into modern cloud-first infrastructure configured for high resilience and speed.
              </p>
              <DigitalTransformationVisual isHovered={hoveredCard === "srv-5"} />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground">Cloud-First</span>
              <button
                type="button"
                onClick={() => handleConsultService("Digital Transformation")}
                className="text-xs font-semibold text-violet-600 dark:text-violet-400 inline-flex items-center gap-1"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </Card>

          {/* Tile 6: Software Implementation */}
          <Card
            id="srv-6"
            variant="bento"
            borderBeam
            glowColor="emerald"
            className="p-6 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("srv-6")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Rocket className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
                  Deployment
                </span>
              </div>
              <h3 className="text-lg font-bold font-heading text-foreground mb-1">
                Software Implementation
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Flawless onboarding, configuration, and integration of enterprise SaaS platforms tuned to your rules.
              </p>
              <SoftwareImplementationVisual isHovered={hoveredCard === "srv-6"} />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground">CRM & ERP Setup</span>
              <button
                type="button"
                onClick={() => handleConsultService("Software Implementation")}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </Card>

          {/* Tile 7: Software Migration */}
          <Card
            id="srv-7"
            variant="bento"
            borderBeam
            glowColor="indigo"
            className="p-6 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("srv-7")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
                  Zero Downtime
                </span>
              </div>
              <h3 className="text-lg font-bold font-heading text-foreground mb-1">
                Software Migration
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Safely migrate historical data, accounts, and client records between legacy and modern platforms.
              </p>
              <SoftwareMigrationVisual isHovered={hoveredCard === "srv-7"} />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground">Zero Data Loss</span>
              <button
                type="button"
                onClick={() => handleConsultService("Software Migration")}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </Card>

          {/* Tile 8: Software Training */}
          <Card
            id="srv-8"
            variant="bento"
            borderBeam
            glowColor="indigo"
            className="p-6 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("srv-8")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
                  Team Adoption
                </span>
              </div>
              <h3 className="text-lg font-bold font-heading text-foreground mb-1">
                Software Training
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Empower non-technical teams with role-based interactive workshops, SOPs, and video playbooks.
              </p>
              <SoftwareTrainingVisual isHovered={hoveredCard === "srv-8"} />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground">99% Team Mastery</span>
              <button
                type="button"
                onClick={() => handleConsultService("Software Training")}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </Card>

          {/* Tile 9: Software Support (Wide Anchor Tile - spans 2 cols on lg) */}
          <Card
            id="srv-9"
            variant="bento"
            borderBeam
            glowColor="emerald"
            className="md:col-span-2 lg:col-span-2 xl:col-span-4 p-6 sm:p-7 flex flex-col justify-between"
            onMouseEnter={() => setHoveredCard("srv-9")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <HeadphonesIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-semibold">
                    Mission-Critical 24/7 SLA
                  </span>
                </div>
                <h3 className="text-xl font-bold font-heading text-foreground mb-1">
                  Software Support & SLA Maintenance
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Continuous enterprise-grade technical support, automated infrastructure health monitoring, API maintenance, and rapid SLA-guaranteed issue resolution based in New Delhi.
                </p>
              </div>
              <div className="lg:col-span-5">
                <SoftwareSupportVisual isHovered={hoveredCard === "srv-9"} />
              </div>
            </div>

            <div className="pt-3 mt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <div className="flex gap-2">
                {["24/7 Monitoring", "Guaranteed SLA", "API Health Checks"].map((c) => (
                  <span key={c} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-muted-foreground">
                    {c}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleConsultService("Software Support")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
              >
                <span>Consult on SLA support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        </CardGroup>
      </div>
    </section>
  );
};

export default Services;
