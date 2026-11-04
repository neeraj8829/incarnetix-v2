import React from "react";
import taskopadIcon from "@/assets/taskopad.png";
import kommoIcon from "@/assets/kommo.png";
import margIcon from "@/assets/Marg.png";
import taskTrackerSuiteIcon from "@/assets/taskTrackerSuite.png";
import hrOneIcon from "@/assets/HrONe.png";
import pipedriveIcon from "@/assets/pipedrive.png";
import greytHrIcon from "@/assets/greyHr.png";
import myOperatorIcon from "@/assets/MyOperator.png";
import freshworksIcon from "@/assets/Freshworks.png";
import wazzup24Icon from "@/assets/wazzup24.png";
import chatAppIcon from "@/assets/chatApp.png";
import buildscaleIcon from "@/assets/BuildScalehd.png";
import merciGlobalErpIcon from "@/assets/mercariGlobalerphd.png";
import { ArrowUpRight, Cpu } from "lucide-react";

interface IntegrationItem {
  title: string;
  category: string;
  description: string;
  icon: string;
  link: string;
}

const integrations: IntegrationItem[] = [
  {
    title: "Kommo",
    category: "CRM & Pipelines",
    description: "Messaging-centric CRM automating lead nurture & sales pipelines",
    icon: kommoIcon,
    link: "https://www.kommo.com/",
  },
  {
    title: "Pipedrive",
    category: "Sales CRM",
    description: "Activity-based sales CRM automating deals & outbound follow-ups",
    icon: pipedriveIcon,
    link: "https://www.pipedrive.com/",
  },
  {
    title: "Marg ERP",
    category: "ERP & Billing",
    description: "Complete GST billing, trade inventory & enterprise accounting",
    icon: margIcon,
    link: "https://margcompusoft.com/",
  },
  {
    title: "HrOne",
    category: "HRMS Suite",
    description: "End-to-end HR automation for payroll, attendance & employee life cycle",
    icon: hrOneIcon,
    link: "https://hronereadymade.com/",
  },
  {
    title: "GreytHR",
    category: "HR & Compliance",
    description: "Cloud HR platform managing payroll, statutory compliance & leave",
    icon: greytHrIcon,
    link: "https://www.greythr.com/",
  },
  {
    title: "Freshworks",
    category: "Customer Experience",
    description: "AI-powered omnichannel ticketing, CRM & support automation",
    icon: freshworksIcon,
    link: "https://www.freshworks.com/",
  },
  {
    title: "Taskopad",
    category: "Project Management",
    description: "Real-time task tracking, project milestones & team collaboration",
    icon: taskopadIcon,
    link: "https://www.taskopad.com/",
  },
  {
    title: "Wazzup24",
    category: "Messaging API",
    description: "Unified WhatsApp & Telegram integration directly into CRM pipelines",
    icon: wazzup24Icon,
    link: "https://wazzup24.com/",
  },
  {
    title: "MyOperator",
    category: "Cloud Telephony",
    description: "Virtual numbers, IVR routing, automated call logs & SMS bots",
    icon: myOperatorIcon,
    link: "https://myoperator.com/",
  },
  {
    title: "Task Tracker Suite",
    category: "Productivity",
    description: "Enterprise task governance, deadline alerts & team performance",
    icon: taskTrackerSuiteIcon,
    link: "https://tasktracker.in/",
  },
  {
    title: "Merci Global ERP",
    category: "Enterprise ERP",
    description: "Cross-departmental resource planning, supply chain & finance",
    icon: merciGlobalErpIcon,
    link: "https://incarnetix.com/",
  },
  {
    title: "Buildscale",
    category: "Marketing Automation",
    description: "Video funnels, conversion analytics & audience scaling systems",
    icon: buildscaleIcon,
    link: "https://incarnetix.com/",
  },
  {
    title: "ChatApp",
    category: "Secure Comms",
    description: "Encrypted internal communication & compliant corporate chat",
    icon: chatAppIcon,
    link: "https://incarnetix.com/",
  },
];

export const IntegrationsMarquee: React.FC = () => {
  const row1 = integrations.slice(0, 7);
  const row2 = integrations.slice(7);

  return (
    <section id="integrations" className="py-20 lg:py-28 relative overflow-hidden section-alt border-b border-slate-200 dark:border-white/10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <div className="eyebrow mb-3 justify-center">
          <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Ecosystem & Integrations</span>
        </div>
        <h2 className="text-foreground tracking-tight">
          Seamlessly Connected to <br />
          <span className="text-gradient-indigo">Your Everyday Software Stack</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
          We don't force you to rip-and-replace what works. IncarnetiX connects natively into your CRM, ERP, and communications platforms to form a synchronized ecosystem.
        </p>
      </div>

      {/* Infinite Marquee Container with Edge Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left Gradient Fade Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        {/* Right Gradient Fade Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        {/* Row 1: Left to Right */}
        <div className="flex w-max gap-6 mb-6 animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {[...row1, ...row1, ...row1].map((item, idx) => (
            <a
              key={`row1-${item.title}-${idx}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-72 sm:w-80 p-4 rounded-2xl glass-card border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 hover:shadow-glow transition-all duration-300 group shrink-0"
            >
              <div className="w-12 h-12 rounded-xl p-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-10 h-10 object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold font-heading text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {item.title}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-semibold">
                  {item.category}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex w-max gap-6 animate-marquee-reverse hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {[...row2, ...row2, ...row2].map((item, idx) => (
            <a
              key={`row2-${item.title}-${idx}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-72 sm:w-80 p-4 rounded-2xl glass-card border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:shadow-glow transition-all duration-300 group shrink-0"
            >
              <div className="w-12 h-12 rounded-xl p-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-10 h-10 object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold font-heading text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                    {item.title}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-semibold">
                  {item.category}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsMarquee;
