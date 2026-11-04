import React from "react";

/* 1. Business Automation: Multi-node circular pipeline with animated packets */
export const BusinessAutomationVisual: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-28 flex items-center justify-center overflow-hidden rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 my-3">
    <svg className="w-48 h-20" viewBox="0 0 192 80" fill="none">
      <defs>
        <linearGradient id="baGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {/* Connector lines */}
      <path
        d="M 28 40 H 164"
        stroke="url(#baGrad)"
        strokeWidth="2"
        strokeDasharray="4 4"
        className={isHovered ? "animate-pulse" : ""}
      />
      <circle cx="28" cy="40" r="14" fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" strokeWidth="2" />
      <circle cx="28" cy="40" r="5" fill="#6366f1" />
      
      <circle cx="96" cy="40" r="18" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="2" />
      <circle cx="96" cy="40" r="7" fill="#06b6d4" />

      <circle cx="164" cy="40" r="14" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
      <circle cx="164" cy="40" r="5" fill="#8b5cf6" />

      {/* Moving packet */}
      <circle
        cx={isHovered ? "164" : "96"}
        cy="40"
        r="4"
        fill="#ffffff"
        style={{ transition: "cx 0.8s ease-in-out" }}
      />
    </svg>
    <span className="absolute bottom-1.5 right-2 font-mono text-[9px] uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
      Auto-Sync Active
    </span>
  </div>
);

/* 2. Process Automation: Approval queue with instant automated stamp */
export const ProcessAutomationVisual: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-24 flex items-center justify-between px-4 overflow-hidden rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 my-3 font-mono text-[11px]">
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between text-muted-foreground">
        <span>INBOUND_TASK</span>
        <span className="text-emerald-500 dark:text-emerald-400 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          {isHovered ? "DISPATCHED" : "QUEUED"}
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-700"
          style={{ width: isHovered ? "100%" : "65%" }}
        />
      </div>
      <div className="flex justify-between text-[9px] text-muted-foreground">
        <span>Routing: Auto-Approved</span>
        <span>Latency: 8ms</span>
      </div>
    </div>
  </div>
);

/* 3. Digital Transformation: Cloud migration beam */
export const DigitalTransformationVisual: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-24 flex items-center justify-center overflow-hidden rounded-xl bg-violet-500/5 dark:bg-violet-500/10 border border-violet-500/20 my-3">
    <div className="flex items-center gap-3">
      <div className="px-2.5 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-[10px] font-mono text-muted-foreground">
        Legacy Data
      </div>
      <div className="flex items-center text-violet-500 dark:text-violet-400">
        <span className="text-xs">──►</span>
      </div>
      <div className="px-2.5 py-1.5 rounded-lg bg-violet-500/20 border border-violet-500/40 text-[10px] font-mono text-violet-600 dark:text-violet-300 font-semibold shadow-sm">
        Cloud Ecosystem
      </div>
    </div>
    <div
      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent transition-opacity"
      style={{ opacity: isHovered ? 1 : 0.4 }}
    />
  </div>
);

/* 4. Custom Software: Live code terminal */
export const CustomSoftwareVisual: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-28 p-3 overflow-hidden rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 my-3 shadow-inner">
    <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-800">
      <div className="w-2 h-2 rounded-full bg-rose-500/80" />
      <div className="w-2 h-2 rounded-full bg-amber-500/80" />
      <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
      <span className="text-[9px] text-slate-500 ml-1">app.engine.ts</span>
    </div>
    <div className="text-indigo-400">
      const <span className="text-cyan-300">pipeline</span> = new Orchestrator();
    </div>
    <div className="text-emerald-400">
      await pipeline.sync({`{ realtime: true }`});
    </div>
    <div className="text-slate-500 mt-1 flex items-center gap-1">
      <span className="text-emerald-400">✓</span> Built in 0.42s {isHovered && <span className="text-indigo-400">· Hot Reloaded</span>}
    </div>
  </div>
);

/* 5. AI Tools: Synaptic neural graph */
export const AIToolsVisual: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-28 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-500/30 my-3">
    <svg className="w-44 h-20" viewBox="0 0 176 80" fill="none">
      <circle cx="28" cy="24" r="8" fill="#8b5cf6" fillOpacity="0.3" stroke="#8b5cf6" strokeWidth="1.5" />
      <circle cx="28" cy="56" r="8" fill="#8b5cf6" fillOpacity="0.3" stroke="#8b5cf6" strokeWidth="1.5" />
      <circle cx="88" cy="40" r="14" fill="#6366f1" fillOpacity="0.4" stroke="#6366f1" strokeWidth="2" className={isHovered ? "animate-pulse" : ""} />
      <circle cx="148" cy="24" r="8" fill="#06b6d4" fillOpacity="0.3" stroke="#06b6d4" strokeWidth="1.5" />
      <circle cx="148" cy="56" r="8" fill="#06b6d4" fillOpacity="0.3" stroke="#06b6d4" strokeWidth="1.5" />

      <line x1="36" y1="24" x2="74" y2="40" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="36" y1="56" x2="74" y2="40" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="102" y1="40" x2="140" y2="24" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="102" y1="40" x2="140" y2="56" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.6" />
    </svg>
    <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[9px] text-purple-600 dark:text-purple-400">
      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
      LLM Agent Active
    </div>
  </div>
);

/* 6. Software Implementation: Precision deployment dial */
export const SoftwareImplementationVisual: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-24 flex items-center justify-around px-4 overflow-hidden rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 my-3 font-mono">
    <div className="text-center">
      <div className="text-[10px] text-muted-foreground uppercase">Configuration</div>
      <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Verified</div>
    </div>
    <div className="h-8 w-px bg-slate-300 dark:bg-white/10" />
    <div className="text-center">
      <div className="text-[10px] text-muted-foreground uppercase">Cutover Target</div>
      <div className="text-sm font-bold text-foreground">Turnkey Live</div>
    </div>
    <div className="h-8 w-px bg-slate-300 dark:bg-white/10" />
    <div className="text-center">
      <div className="text-[10px] text-muted-foreground uppercase">Rollback State</div>
      <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400">Armed (0s)</div>
    </div>
  </div>
);

/* 7. Software Migration: Zero data loss pipeline */
export const SoftwareMigrationVisual: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-24 flex items-center justify-between px-4 overflow-hidden rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 my-3 font-mono text-[10px]">
    <div className="p-2 rounded bg-slate-200/80 dark:bg-slate-800 text-center">
      <div className="text-muted-foreground">Source DB</div>
      <div className="font-semibold text-foreground">100k Rows</div>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-indigo-600 dark:text-indigo-400 font-bold">100% Intact</span>
      <span className="text-muted-foreground">────────►</span>
    </div>
    <div className="p-2 rounded bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-center border border-indigo-500/30 font-semibold">
      <div>Target DB</div>
      <div>100k Rows</div>
    </div>
  </div>
);

/* 8. Software Training: Interactive team mastery badge */
export const SoftwareTrainingVisual: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-24 flex items-center justify-around px-3 overflow-hidden rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 my-3 font-mono text-[11px]">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
        99%
      </div>
      <div>
        <div className="text-foreground font-semibold">Team Adoption</div>
        <div className="text-[9px] text-muted-foreground">Role SOPs & Video Guides</div>
      </div>
    </div>
  </div>
);

/* 9. Software Support: 24/7 heartbeat ECG graph */
export const SoftwareSupportVisual: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => (
  <div className="relative w-full h-24 flex items-center justify-center overflow-hidden rounded-xl bg-slate-900 border border-slate-800 my-3 px-3">
    <svg className="w-full h-12" viewBox="0 0 240 48" fill="none">
      <path
        d="M 0 24 L 60 24 L 75 10 L 90 38 L 105 20 L 120 28 L 135 24 L 240 24"
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
        className={isHovered ? "animate-pulse" : ""}
      />
    </svg>
    <div className="absolute top-1.5 right-2 font-mono text-[9px] text-emerald-400 flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
      24/7 Active Monitoring
    </div>
  </div>
);

