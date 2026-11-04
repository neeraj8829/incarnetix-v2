import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import { isReducedMotion, MOTION_CONFIG } from "@/lib/motion-config";

interface NavItem {
  name: string;
  id: string;
}

interface CircularMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  items: NavItem[];
  origin?: { x: number; y: number };
}

export const CircularMobileMenu: React.FC<CircularMobileMenuProps> = ({
  isOpen,
  onClose,
  onSelect,
  items,
  origin = { x: 320, y: 32 },
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const reducedMotion = isReducedMotion();

  // Lock body scroll while open & trap focus
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const originX = origin.x || (typeof window !== "undefined" ? window.innerWidth - 40 : 320);
  const originY = origin.y || 32;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { clipPath: `circle(0px at ${originX}px ${originY}px)`, opacity: 0.95 }
          }
          animate={
            reducedMotion
              ? { opacity: 1 }
              : { clipPath: `circle(150% at ${originX}px ${originY}px)`, opacity: 1 }
          }
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { clipPath: `circle(0px at ${originX}px ${originY}px)`, opacity: 0.95 }
          }
          transition={{
            duration: 0.45,
            ease: MOTION_CONFIG.easings.easeOut,
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-white/95 dark:bg-slate-950/98 backdrop-blur-2xl p-6 lg:hidden text-foreground overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <img src={logo} alt="IncarnetiX Tech" className="w-8 h-8 object-contain" />
              <span className="font-heading font-bold text-lg text-foreground">IncarnetiX</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Staggered Navigation Links */}
          <div className="py-8 flex flex-col gap-2">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + index * MOTION_CONFIG.staggers.menuLink,
                  ease: MOTION_CONFIG.easings.easeOut,
                }}
                className="flex items-center justify-between px-5 py-3.5 rounded-2xl text-lg font-medium text-foreground hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-left group"
              >
                <span>{item.name}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </div>

          {/* Bottom Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="pt-6 border-t border-slate-200 dark:border-white/10 space-y-4"
          >
            <button
              type="button"
              onClick={() => onSelect("contact")}
              className="w-full py-4 px-6 rounded-full text-center text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 shadow-glow"
            >
              Book Consultation
            </button>
            <div className="text-center text-xs text-muted-foreground font-mono">
              hey@incarnetix.com · +91-9773880816 · New Delhi, India
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CircularMobileMenu;

