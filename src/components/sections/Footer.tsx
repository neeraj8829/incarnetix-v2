import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { smoothScrollTo } from "@/lib/scroll-utils";
import logo from "@/assets/logo.png";

// Custom X (Twitter) Icon
const XIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    smoothScrollTo("top", 0, 1.4);
  };

  const scrollToSection = (id: string) => {
    smoothScrollTo(id, 80, 1.35);
  };

  const servicesLinks = [
    "Business Automation",
    "Process Automation",
    "Digital Transformation",
    "Custom Software Development",
    "AI Tools Integration",
    "Software Implementation",
    "Software Migration",
    "Software Training",
    "Software Support",
  ];

  const companyLinks = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Solutions & Integrations", id: "integrations" },
    { name: "How We Work", id: "process" },
    { name: "Why IncarnetiX", id: "why-us" },
    { name: "Careers", id: "careers" },
    { name: "FAQ", id: "faq" },
    { name: "Contact Us", id: "contact" },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/incarnetix-tech/", icon: Linkedin },
    { name: "X (Twitter)", href: "https://x.com/incarnetix_tech", icon: XIcon },
    { name: "Instagram", href: "https://www.instagram.com/incarnetix.tech/", icon: Instagram },
    { name: "Facebook", href: "https://www.facebook.com/incarnetix.tech/", icon: Facebook },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center">
                <img src={logo} alt="IncarnetiX Tech Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                IncarnetiX <span className="text-gradient-indigo">Tech</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The incarnation of complete business automation. We unite isolated ERPs, CRMs, HRMS, and AI tools into a synchronized, high-velocity operational ecosystem.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>New Delhi, India · Rohini Sector 17</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <a href="mailto:hey@incarnetix.com" className="hover:text-white transition-colors">
                  hey@incarnetix.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+919773880816" className="hover:text-white transition-colors">
                  +91-9773880816
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-200"
                    aria-label={`Follow IncarnetiX on ${soc.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: 9 Services */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              {servicesLinks.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => scrollToSection("services")}
                    className="text-left hover:text-white transition-colors py-0.5"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              {companyLinks.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="text-left hover:text-white transition-colors py-0.5"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Policies */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Governance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy/terms" className="hover:text-white transition-colors block py-0.5">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy/policy" className="hover:text-white transition-colors block py-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors block py-0.5">
                  Security Architecture
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors block py-0.5">
                  Enterprise SLA
                </a>
              </li>
            </ul>

            <div className="mt-6 p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-400">
              <span className="text-white font-medium block mb-1">New Delhi, India</span>
              Serving enterprise clients across India and globally with unified business automation.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} IncarnetiX Tech Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>One Platform, Complete Business Automation</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

