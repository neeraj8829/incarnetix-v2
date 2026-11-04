import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Mail, Lock, Eye, Database } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/sections/Footer";

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | IncarnetiX Tech Pvt. Ltd.";
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
            <Shield className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
            Data Governance & Privacy
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mt-1 mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: February 2025 · IncarnetiX Tech Pvt. Ltd. (New Delhi, India)
          </p>
        </div>

        {/* Content */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 space-y-6 text-sm text-foreground/90 leading-relaxed">
          <p>
            At <strong className="text-foreground">IncarnetiX Tech Pvt. Ltd.</strong>, we are committed to transparent data practices and upholding the privacy rights of all visitors, clients, and partners. This Privacy Policy details how we collect, process, and safeguard your personal and enterprise information across our business automation platform.
          </p>

          <h2 className="text-xl font-bold font-heading text-foreground pt-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>1. Information We Collect</span>
          </h2>
          <p className="text-muted-foreground">
            When registering an inquiry or requesting an automation consultation, you may provide your full name, work email address, telephone number, and company requirements. We also monitor aggregate IP information and browser metrics to gauge user demand across India and international regions, assisting in infrastructure optimization.
          </p>
          <p className="text-muted-foreground">
            Cookies are utilized to store browsing preferences, maintain user sessions, and record interaction history so that subsequent visits provide a more efficient experience. You may configure or disable cookies through your web browser preferences at any time.
          </p>

          <h2 className="text-xl font-bold font-heading text-foreground pt-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>2. Payment and Financial Security</span>
          </h2>
          <p className="text-muted-foreground">
            If you make a commercial transaction or retainer payment to IncarnetiX Tech, your name, billing address, and transaction metadata are securely logged for tax compliance. Credit card, debit card, and banking credentials are never directly stored on our web servers. Our verified payment processor is <strong className="text-foreground">Easebuzz</strong>, whose stringent security standards and privacy practices can be inspected at Easebuzz.in.
          </p>

          <h2 className="text-xl font-bold font-heading text-foreground pt-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>3. Sharing of Information with Third Parties</span>
          </h2>
          <p className="text-muted-foreground">
            We strictly do not sell, rent, or trade your personal information to third-party advertisers. Information is only disclosed if mandated by a competent court order under Indian law, to enforce regulatory compliance, or to protect our platform against unauthorized intrusion or malicious misuse.
          </p>

          <h2 className="text-xl font-bold font-heading text-foreground pt-4">
            4. Protection of Young Users
          </h2>
          <p className="text-muted-foreground">
            Protecting the privacy of children and young individuals is critical. Our website and enterprise automation tools are strictly tailored for business professionals and are not targeted at anyone under the age of 15. In instances where junior developers or apprentices under 15 interact with our educational materials, the same stringent protections apply.
          </p>

          <h2 className="text-xl font-bold font-heading text-foreground pt-4">
            5. Future Policy Revisions
          </h2>
          <p className="text-muted-foreground">
            From time to time, as new automation capabilities, cloud integrations, and regulatory updates emerge, we may adjust our privacy practices. Any material changes will be announced on this page. We encourage periodic review of this policy.
          </p>

          <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">
              Questions or comments regarding this Privacy Policy?
            </span>
            <a
              href="mailto:hey@incarnetix.com?subject=Privacy Policy Query"
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

export default PrivacyPolicy;
