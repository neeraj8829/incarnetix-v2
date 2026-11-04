import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { isReducedMotion } from "@/lib/motion-config";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const doc = document as unknown as {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };

    if (!doc.startViewTransition || isReducedMotion()) {
      toggleTheme();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty("--theme-click-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-click-y", `${y}px`);
    document.documentElement.style.setProperty("--theme-max-radius", `${maxRadius}px`);
    document.documentElement.classList.add("theme-transitioning");

    try {
      const transition = doc.startViewTransition(() => {
        toggleTheme();
      });

      if (transition && transition.finished) {
        transition.finished.finally(() => {
          document.documentElement.classList.remove("theme-transitioning");
        });
      } else {
        setTimeout(() => {
          document.documentElement.classList.remove("theme-transitioning");
        }, 500);
      }
    } catch {
      document.documentElement.classList.remove("theme-transitioning");
      toggleTheme();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-slate-900/80 hover:border-indigo-500/50 hover:shadow-glow transition-all duration-300 text-foreground group",
        className
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 rotate-0 group-hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 -rotate-12 group-hover:rotate-0" />
      )}
    </button>
  );
};

export default ThemeToggle;
