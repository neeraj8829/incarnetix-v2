import React from "react";
import logo from "@/assets/logo.png";
import { Sparkles, MessageSquare, PhoneCall, CheckSquare } from "lucide-react";

interface OrbitNode {
  name: string;
  category: string;
  icon: React.ReactNode;
  color: string;
}

// Verified real enterprise software platforms integrated by IncarnetiX
const innerRingNodes: OrbitNode[] = [
  {
    name: "Kommo",
    category: "CRM Pipeline",
    color: "from-blue-500 to-indigo-600",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Wazzup",
    category: "WhatsApp API",
    color: "from-emerald-500 to-teal-600",
    icon: <MessageSquare className="w-5 h-5 text-white" />,
  },
  {
    name: "Pipedrive",
    category: "Sales Automation",
    color: "from-green-600 to-emerald-700",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4z" fill="#000" />
      </svg>
    ),
  },
];

const outerRingNodes: OrbitNode[] = [
  {
    name: "Marg ERP",
    category: "Billing & GST",
    color: "from-amber-500 to-orange-600",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 17V7l5 5 5-5v10" />
      </svg>
    ),
  },
  {
    name: "HrOne",
    category: "HRMS Automation",
    color: "from-rose-500 to-pink-600",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      </svg>
    ),
  },
  {
    name: "Freshworks",
    category: "Omnichannel Desk",
    color: "from-cyan-500 to-blue-600",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V18h-2v-1.07A6 6 0 0 1 6.07 12H7a5 5 0 0 0 5 5v-1a4 4 0 0 0-4-4h1a3 3 0 0 1 3 3z" />
      </svg>
    ),
  },
  {
    name: "MyOperator",
    category: "Cloud Telephony",
    color: "from-violet-500 to-purple-600",
    icon: <PhoneCall className="w-5 h-5 text-white" />,
  },
  {
    name: "Taskopad",
    category: "Task Tracking",
    color: "from-indigo-500 to-cyan-600",
    icon: <CheckSquare className="w-5 h-5 text-white" />,
  },
];

export const OrbitSystem: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={`orbit-container relative flex items-center justify-center select-none ${className}`}
      aria-label="Concentric automation orbit of integrated platforms"
    >
      {/* Central Ambient Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Ripple Rings expanding outwards from the central nucleus */}
      <div className="absolute w-44 h-44 rounded-full border border-indigo-500/25 animate-ripple-1 pointer-events-none" />
      <div className="absolute w-44 h-44 rounded-full border border-cyan-500/20 animate-ripple-2 pointer-events-none" />
      <div className="absolute w-44 h-44 rounded-full border border-violet-500/20 animate-ripple-3 pointer-events-none" />

      {/* Outer Orbit Track Ring (Radius: 210px) */}
      <div className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-slate-300/40 dark:border-white/10 pointer-events-none" />

      {/* Outer Orbit Rotating Wrapper (Counter-Clockwise, 28s) */}
      <div className="absolute w-[420px] h-[420px] rounded-full animate-orbit-ccw pointer-events-none">
        {outerRingNodes.map((node, idx) => {
          const total = outerRingNodes.length;
          const angle = (idx * 360) / total;
          return (
            <div
              key={node.name}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(210px) rotate(-${angle}deg)`,
              }}
            >
              {/* Counter-rotate icon wrapper so node remains upright */}
              <div className="animate-counter-rotate-ccw pointer-events-auto">
                <div className="relative group/node flex flex-col items-center">
                  <div
                    className={`w-11 h-11 rounded-2xl p-2.5 flex items-center justify-center shadow-lg bg-gradient-to-tr ${node.color} border border-white/20 transition-transform duration-300 hover:scale-125 cursor-pointer`}
                    title={`${node.name} — ${node.category}`}
                  >
                    {node.icon}
                  </div>
                  <span className="absolute -bottom-6 px-2 py-0.5 rounded-md bg-slate-900/90 dark:bg-slate-950/95 text-white text-[10px] font-mono whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-sm">
                    {node.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inner Orbit Track Ring (Radius: 130px) */}
      <div className="absolute w-[260px] h-[260px] rounded-full border border-slate-300/60 dark:border-white/15 pointer-events-none" />

      {/* Inner Orbit Rotating Wrapper (Clockwise, 38s) */}
      <div className="absolute w-[260px] h-[260px] rounded-full animate-orbit-cw pointer-events-none">
        {innerRingNodes.map((node, idx) => {
          const total = innerRingNodes.length;
          const angle = (idx * 360) / total;
          return (
            <div
              key={node.name}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(130px) rotate(-${angle}deg)`,
              }}
            >
              {/* Counter-rotate icon wrapper so node remains upright */}
              <div className="animate-counter-rotate-cw pointer-events-auto">
                <div className="relative group/node flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-2xl p-2 flex items-center justify-center shadow-md bg-gradient-to-tr ${node.color} border border-white/20 transition-transform duration-300 hover:scale-125 cursor-pointer`}
                    title={`${node.name} — ${node.category}`}
                  >
                    {node.icon}
                  </div>
                  <span className="absolute -bottom-6 px-2 py-0.5 rounded-md bg-slate-900/90 dark:bg-slate-950/95 text-white text-[10px] font-mono whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-sm">
                    {node.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Central Nucleus: IncarnetiX Brand Hub */}
      <div className="relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 p-0.5 shadow-glow-lg animate-float">
        <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center p-2 text-center border border-white/20">
          <img src={logo} alt="IncarnetiX Nucleus" className="w-8 h-8 object-contain mb-1" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">
            IncarnetiX
          </span>
          <div className="flex items-center gap-1 text-[8px] font-mono text-cyan-300">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Sync Core</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitSystem;

