import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowLeft, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/sections/Footer";

export const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms & Conditions | IncarnetiX Tech Pvt. Ltd.";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* Header Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/10 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
            Legal Agreement
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mt-1 mb-3">
            Terms & Conditions
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: February 2025 · IncarnetiX Tech Pvt. Ltd. (New Delhi, India)
          </p>
        </div>

        {/* Content */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 space-y-6 text-sm text-foreground/90 leading-relaxed">
          <p>
            Welcome to <strong className="text-foreground">IncarnetiX Tech</strong>. Your usage of this website and our software automation services is governed by the terms and conditions outlined below. By browsing, accessing, or utilizing our website and consulting services, you agree to comply with and be bound by the following terms, which together with our Privacy Policy govern IncarnetiX Tech's relationship with you.
          </p>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-foreground">Registered Entity:</strong> IncarnetiX Tech Pvt. Ltd.<br />
              <strong className="text-foreground">Headquarters:</strong> New Delhi, India: Sector 17, Rohini, New Delhi 110089.<br />
              <strong className="text-foreground">Inquiries:</strong> hey@incarnetix.com | +91-9773880816
            </div>
          </div>

          <h2 className="text-xl font-bold font-heading text-foreground pt-4">
            1. General Terms of Use
          </h2>
          <p className="text-muted-foreground">
            The content on the pages of this website is provided for your general information and business use only. It is subject to change without notice. This website uses cookies to monitor browsing preferences and improve user interaction. If you permit cookies, technical details such as your location, browser type, and navigation flow may be collected in accordance with our Privacy Policy.
          </p>

          <h2 className="text-xl font-bold font-heading text-foreground pt-4">
            2. Warranties and Disclaimers
          </h2>
          <p className="text-muted-foreground">
            Neither IncarnetiX Tech nor any third parties provide an absolute warranty as to the exact timeliness, performance, completeness, or suitability of the informational content and software tools found on this website for any particular operational purpose. You acknowledge that technical specifications and third-party API capabilities may vary, and we expressly exclude liability for any such variance to the fullest extent permitted by Indian law.
          </p>

          <h2 className="text-xl font-bold font-heading text-foreground pt-4">
            3. Intellectual Property Rights
          </h2>
          <p className="text-muted-foreground">
            This website contains proprietary assets owned by or licensed to IncarnetiX Tech Pvt. Ltd. This material includes, but is not limited to, the software architecture, design, visual styling, brand graphics, and custom code modules. Reproduction is strictly prohibited without prior written consent. All third-party trademarks (such as Marg, Kommo, Pipedrive, Freshworks, HrOne, GreytHR) are the properties of their respective holders and are acknowledged for integration compatibility purposes.
          </p>

          <h2 className="text-xl font-bold font-heading text-foreground pt-4">
            4. External Links & Integrations
          </h2>
          <p className="text-muted-foreground">
            From time to time, this website may include links to external SaaS documentation, partner APIs, or client dashboards. These links are provided for your operational convenience and do not signify endorsement. We assume no responsibility for external content outside of our direct infrastructure.
          </p>

          <h2 className="text-xl font-bold font-heading text-foreground pt-4">
            5. Governing Law and Jurisdiction
          </h2>
          <p className="text-muted-foreground">
            Your use of this website, our software contracts, and any dispute arising from such engagements shall be governed by and construed in accordance with the laws of India, subject to the exclusive jurisdiction of the competent courts in New Delhi.
          </p>

          <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">
              Questions regarding these Terms? Contact our legal team:
            </span>
            <a
              href="mailto:hey@incarnetix.com?subject=Legal Query regarding Terms"
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>hey@incarnetix.com</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
