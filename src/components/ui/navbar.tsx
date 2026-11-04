import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CircularMobileMenu } from "@/components/ui/circular-mobile-menu";
import { CircularFillButton } from "@/components/ui/circular-button";
import { smoothScrollTo } from "@/lib/scroll-utils";
import logo from "@/assets/logo.png";

const servicesList = [
  { title: "Business Automation", desc: "End-to-end intelligent workflows" },
  { title: "Process Automation", desc: "Eliminate repetitive manual bottlenecks" },
  { title: "Digital Transformation", desc: "Modernize infrastructure and tooling" },
  { title: "Custom Software Development", desc: "Purpose-built enterprise solutions" },
  { title: "AI Tools Integration", desc: "LLMs, predictive agents & bots" },
  { title: "Software Implementation", desc: "Fast, calibrated deployment" },
  { title: "Software Migration", desc: "Zero downtime data & stack shifts" },
  { title: "Software Training", desc: "Team upskilling & process adoption" },
  { title: "Software Support", desc: "24/7 mission-critical uptime care" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hamburgerCoords, setHamburgerCoords] = useState<{ x: number; y: number }>({ x: 320, y: 32 });
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScroll / totalHeight) * 100);
      }

      if (isHome) {
        const sections = ["home", "services", "integrations", "process", "why-us", "careers", "faq", "contact"];
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);

    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }

    smoothScrollTo(id, 80, 1.35);
  };

  return (
    <>
      {/* Scroll Progress Bar at the very top (Hardware Accelerated) */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 z-50 origin-left scroll-driven-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-card"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between" aria-label="Main Navigation">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center group-hover:border-indigo-500/50 transition-colors shadow-sm">
                <img
                  src={logo}
                  alt="IncarnetiX Tech Logo"
                  className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
                  width="32"
                  height="32"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-foreground flex items-center gap-1.5">
                  IncarnetiX <span className="text-gradient-indigo">Tech</span>
                </span>
                <span className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase -mt-1 hidden sm:block">
                  Business Automation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              <button
                type="button"
                onClick={() => scrollToSection("home")}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === "home" && isHome
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                Home
              </button>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => scrollToSection("services")}
                  aria-expanded={isServicesOpen}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeSection === "services" && isHome
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  Services
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {isServicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[520px]">
                    <div className="rounded-2xl p-4 shadow-2xl border border-slate-200 dark:border-white/10 grid grid-cols-2 gap-2 bg-white dark:bg-slate-950/95">
                      {servicesList.map((srv) => (
                        <button
                          key={srv.title}
                          type="button"
                          onClick={() => scrollToSection("services")}
                          className="p-2.5 text-left rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-500/30 border border-transparent transition-all group"
                        >
                          <div className="font-heading text-xs font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                            {srv.title}
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                            {srv.desc}
                          </p>
                        </button>
                      ))}
                      <div className="col-span-2 pt-2 mt-1 border-t border-slate-100 dark:border-white/10 flex items-center justify-between px-2 text-xs">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                          Unified Architecture
                        </span>
                        <button
                          type="button"
                          onClick={() => scrollToSection("contact")}
                          className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1"
                        >
                          Consult an Architect →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => scrollToSection("integrations")}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === "integrations" && isHome
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                Solutions
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("process")}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === "process" && isHome
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                How We Work
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("why-us")}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === "why-us" && isHome
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                Why IncarnetiX
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("careers")}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === "careers" && isHome
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                Careers
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("faq")}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === "faq" && isHome
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                FAQ
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === "contact" && isHome
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                Contact
              </button>
            </div>

            {/* Right CTAs and Theme Toggle */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              <CircularFillButton
                variant="primary"
                onClick={() => scrollToSection("contact")}
                className="hidden sm:inline-flex py-2 px-4 text-xs font-semibold"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </CircularFillButton>

              {/* Mobile Menu Toggle Button */}
              <button
                ref={hamburgerBtnRef}
                type="button"
                onClick={() => {
                  if (hamburgerBtnRef.current) {
                    const rect = hamburgerBtnRef.current.getBoundingClientRect();
                    setHamburgerCoords({
                      x: rect.left + rect.width / 2,
                      y: rect.top + rect.height / 2,
                    });
                  }
                  setIsMobileMenuOpen(true);
                }}
                className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Signature Circular Mobile Menu with Focus Trap & Body Lock */}
      <CircularMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelect={scrollToSection}
        origin={hamburgerCoords}
        items={[
          { name: "Home", id: "home" },
          { name: "Services", id: "services" },
          { name: "Solutions", id: "integrations" },
          { name: "How We Work", id: "process" },
          { name: "Why IncarnetiX", id: "why-us" },
          { name: "Careers", id: "careers" },
          { name: "FAQ", id: "faq" },
          { name: "Contact", id: "contact" },
        ]}
      />
    </>
  );
};

export default Navbar;
