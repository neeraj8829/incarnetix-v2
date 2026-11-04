import React, { useState, useEffect, useRef } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Building,
  User,
  ExternalLink
} from "lucide-react";
import { sendContactEmail } from "@/services/emailService";
import { ContactFormData } from "@/types/email";

interface ContactProps {
  selectedService?: string;
}

const allServices = [
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

const budgetTiers = [
  { id: "growth", label: "Seed / Growth" },
  { id: "mid", label: "Mid-Market" },
  { id: "enterprise", label: "Enterprise Tier" },
  { id: "evaluating", label: "To Be Determined" },
];

const timelineOptions = [
  { id: "immediate", label: "Immediate (< 1 mo)" },
  { id: "short", label: "1 - 3 Months" },
  { id: "medium", label: "3 - 6 Months" },
  { id: "exploring", label: "Exploring" },
];

export const Contact: React.FC<ContactProps> = ({ selectedService = "" }) => {
  // Step Management: 1, 2, 3
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepDirection, setStepDirection] = useState<"forward" | "backward">("forward");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    services: [selectedService || "Business Automation"],
    budget: "mid",
    timeline: "short",
    message: "",
    projectLink: "",
    consent: false,
    honeypot: "", // anti-spam
  });

  // Validation Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [shakeStep, setShakeStep] = useState(false);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Copy Feedback
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // References for Auto-focus
  const nameInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Restore draft from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("incarnetix_form_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          services: selectedService
            ? Array.from(new Set([selectedService, ...(parsed.services || [])]))
            : parsed.services || ["Business Automation"],
        }));
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [selectedService]);

  // Save draft to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem("incarnetix_form_draft", JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData]);

  const isFirstMount = useRef(true);

  // Auto-focus first field when step changes (skip initial mount to prevent scrolling down on load)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (currentStep === 1) {
      nameInputRef.current?.focus({ preventScroll: true });
    } else if (currentStep === 3) {
      messageInputRef.current?.focus({ preventScroll: true });
    }
  }, [currentStep]);

  // Clipboard copy helper
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Validation rules
  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your full name.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your work email.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Please enter your organization name.";
    }

    if (formData.phone.trim()) {
      const phoneClean = formData.phone.replace(/\D/g, "");
      if (phoneClean.length < 8 || phoneClean.length > 15) {
        newErrors.phone = "Please enter a valid phone number.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (formData.services.length === 0) {
      newErrors.services = "Please select at least one service.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.message.trim()) {
      newErrors.message = "Please describe what you want to automate.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide a little more detail (min 10 characters).";
    }

    if (!formData.consent) {
      newErrors.consent = "Please agree to have our architects contact you.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!validateStep1()) {
        triggerShake();
        return;
      }
      setStepDirection("forward");
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!validateStep2()) {
        triggerShake();
        return;
      }
      setStepDirection("forward");
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    setStepDirection("backward");
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const triggerShake = () => {
    setShakeStep(true);
    setTimeout(() => setShakeStep(false), 500);
  };

  // Toggle service chip in multi-select
  const toggleService = (srv: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(srv);
      if (exists) {
        if (prev.services.length === 1) return prev; // keep at least one
        return { ...prev, services: prev.services.filter((s) => s !== srv) };
      }
      return { ...prev, services: [...prev.services, srv] };
    });
  };

  // Final Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) {
      triggerShake();
      return;
    }

    // Honeypot check for bots
    if (formData.honeypot) {
      console.warn("Spam detected via honeypot");
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const payload: ContactFormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      service: `${formData.services.join(", ")} [Budget: ${formData.budget}, Timeline: ${formData.timeline}]`,
      message: `${formData.message.trim()}\n\nCompany: ${formData.company.trim()}\nStack/Link: ${formData.projectLink.trim() || "N/A"}`,
    };

    try {
      await sendContactEmail(payload);
      setIsSuccess(true);
      sessionStorage.removeItem("incarnetix_form_draft");
    } catch (err: any) {
      console.error("Submission failed:", err);
      setSubmitError(
        err?.message || "Failed to transmit message. Please contact hey@incarnetix.com directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 relative overflow-hidden section-alt border-t border-slate-200 dark:border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="eyebrow mb-3 justify-center">
            <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Consultation & Architecture</span>
          </div>
          <h2 className="text-foreground tracking-tight">
            Let's Automate Your <br />
            <span className="text-gradient-indigo">Business Operations</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 leading-relaxed">
            Eliminate operational bottlenecks, synchronize your multi-software stack, and scale without manual overhead. We review every architectural inquiry within 24 business hours.
          </p>
        </div>

        {/* Split Layout: Left Details (5 cols) & Right Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Interactive Channels & What Happens Next */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Channels Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold font-heading text-foreground">
                  Direct Contact Details
                </h3>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  New Delhi Office
                </span>
              </div>

              <div className="space-y-4">
                {/* Email Tile */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono uppercase text-muted-foreground">General & Technical Inquiries</div>
                      <a href="mailto:hey@incarnetix.com" className="text-sm font-semibold text-foreground hover:text-indigo-600 dark:hover:text-indigo-400 truncate block">
                        hey@incarnetix.com
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("hey@incarnetix.com", "email")}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 text-muted-foreground hover:text-foreground border border-slate-200 dark:border-white/10 shrink-0 transition-colors"
                    aria-label="Copy email address"
                    title="Copy to clipboard"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone Tile */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono uppercase text-muted-foreground">Direct Dial & WhatsApp</div>
                      <a href="tel:+919773880816" className="text-sm font-semibold text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 truncate block">
                        +91-9773880816
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("+919773880816", "phone")}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 text-muted-foreground hover:text-foreground border border-slate-200 dark:border-white/10 shrink-0 transition-colors"
                    aria-label="Copy phone number"
                    title="Copy to clipboard"
                  >
                    {copiedField === "phone" ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location Tile */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono uppercase text-muted-foreground">Headquarters Location</div>
                      <div className="text-sm font-semibold text-foreground truncate">
                        New Delhi, India (Sector 17, Rohini)
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("Sector 17, Rohini, New Delhi 110089, India", "loc")}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 text-muted-foreground hover:text-foreground border border-slate-200 dark:border-white/10 shrink-0 transition-colors"
                    aria-label="Copy location address"
                    title="Copy address"
                  >
                    {copiedField === "loc" ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Toast for Copy Notification */}
              {copiedField && (
                <div className="mt-3 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono text-center animate-in fade-in duration-200">
                  ✓ Copied to clipboard!
                </div>
              )}
            </div>

            {/* "What Happens Next" Mini Timeline */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-card">
              <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>What Happens Next</span>
              </h4>

              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-white/10">
                <div className="relative flex items-start gap-3 pl-1">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm z-10">
                    1
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-foreground">Diagnostic Review</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Our New Delhi systems architect audits your stack & workflow goals within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start gap-3 pl-1">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm z-10">
                    2
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-foreground">Architecture Discovery Call</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      A focused 30-min strategy session to map data dependencies and calculate automation ROI.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start gap-3 pl-1">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm z-10">
                    3
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-foreground">Tailored Proposal & Blueprint</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Receive an end-to-end integration diagram, timeline milestones, and fixed-cost quote.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Step Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className={`rounded-3xl glass-card p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-2xl relative bg-white/95 dark:bg-slate-900/90 ${
                shakeStep ? "animate-bounce" : ""
              }`}
            >
              {/* If Success: Animated Confirmation State */}
              {isSuccess ? (
                <div className="py-12 text-center space-y-6 animate-in fade-in-50 duration-500">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto shadow-glow">
                    <Check className="w-10 h-10 animate-in zoom-in-75 duration-300" />
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                      Inquiry Dispatched Successfully
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground mt-1">
                      Thank You, {formData.name}!
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2 leading-relaxed">
                      We've logged your request for{" "}
                      <strong className="text-foreground">{formData.services.join(", ")}</strong>. Our systems architecture team in New Delhi will review your specs and email you at{" "}
                      <strong className="text-foreground">{formData.email}</strong> within 24 business hours.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 max-w-md mx-auto text-left text-xs font-mono space-y-1.5 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Organization:</span>
                      <span className="text-foreground font-semibold">{formData.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scope:</span>
                      <span className="text-foreground font-semibold">{formData.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Timeline:</span>
                      <span className="text-foreground font-semibold">{formData.timeline}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setCurrentStep(1);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        phone: "",
                        services: ["Business Automation"],
                        budget: "mid",
                        timeline: "short",
                        message: "",
                        projectLink: "",
                        consent: false,
                        honeypot: "",
                      });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-foreground bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                  >
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              ) : (
                /* Multi-step Form Flow */
                <form onSubmit={handleSubmit} noValidate>
                  {/* Step Progress Indicator Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2 text-xs">
                      <span className="font-mono text-muted-foreground">
                        Step {currentStep} of 3
                      </span>
                      <span className="font-heading font-semibold text-foreground">
                        {currentStep === 1 && "Identity & Organization"}
                        {currentStep === 2 && "Scope & Service Selection"}
                        {currentStep === 3 && "Technical Details & Notes"}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-600 transition-all duration-300 rounded-full"
                        style={{ width: `${(currentStep / 3) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Honeypot Spam Trap (Hidden) */}
                  <input
                    type="text"
                    name="_company_fax"
                    value={formData.honeypot}
                    onChange={(e) => setFormData((p) => ({ ...p, honeypot: e.target.value }))}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Server Error Message */}
                  {submitError && (
                    <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* =========================================================
                      STEP 1: Name, Email, Company, Phone
                      ========================================================= */}
                  {currentStep === 1 && (
                    <div className="space-y-4 animate-in fade-in-50 duration-300">
                      {/* Name */}
                      <div>
                        <label htmlFor="step-name" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                          Full Name <span className="text-indigo-600 dark:text-indigo-400">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                          <input
                            ref={nameInputRef}
                            id="step-name"
                            type="text"
                            required
                            autoComplete="name"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData((p) => ({ ...p, name: e.target.value }));
                              if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                            }}
                            placeholder="e.g. Rahul Sharma"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                              errors.name
                                ? "border-rose-500 focus:border-rose-500"
                                : "border-slate-300 dark:border-white/10 focus:border-indigo-500"
                            }`}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Work Email */}
                      <div>
                        <label htmlFor="step-email" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                          Work Email <span className="text-indigo-600 dark:text-indigo-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                          <input
                            id="step-email"
                            type="email"
                            required
                            autoComplete="email"
                            inputMode="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData((p) => ({ ...p, email: e.target.value }));
                              if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                            }}
                            placeholder="rahul@company.com"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                              errors.email
                                ? "border-rose-500 focus:border-rose-500"
                                : "border-slate-300 dark:border-white/10 focus:border-indigo-500"
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Company Name */}
                      <div>
                        <label htmlFor="step-company" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                          Company / Organization <span className="text-indigo-600 dark:text-indigo-400">*</span>
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                          <input
                            id="step-company"
                            type="text"
                            required
                            autoComplete="organization"
                            value={formData.company}
                            onChange={(e) => {
                              setFormData((p) => ({ ...p, company: e.target.value }));
                              if (errors.company) setErrors((p) => ({ ...p, company: "" }));
                            }}
                            placeholder="e.g. Acme Corp India"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                              errors.company
                                ? "border-rose-500 focus:border-rose-500"
                                : "border-slate-300 dark:border-white/10 focus:border-indigo-500"
                            }`}
                          />
                        </div>
                        {errors.company && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.company}</p>
                        )}
                      </div>

                      {/* Phone Number (Optional) */}
                      <div>
                        <label htmlFor="step-phone" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                          Phone / WhatsApp <span className="text-muted-foreground">(Optional)</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                          <input
                            id="step-phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData((p) => ({ ...p, phone: e.target.value }));
                              if (errors.phone) setErrors((p) => ({ ...p, phone: "" }));
                            }}
                            placeholder="+91-9876543210"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                              errors.phone
                                ? "border-rose-500 focus:border-rose-500"
                                : "border-slate-300 dark:border-white/10 focus:border-indigo-500"
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* =========================================================
                      STEP 2: Services Multi-Select Chips & Scope
                      ========================================================= */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in-50 duration-300">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2.5">
                          Select Services of Interest (Multi-Select) <span className="text-indigo-600 dark:text-indigo-400">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {allServices.map((srv) => {
                            const isSelected = formData.services.includes(srv);
                            return (
                              <button
                                key={srv}
                                type="button"
                                onClick={() => toggleService(srv)}
                                className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                                  isSelected
                                    ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                                    : "bg-slate-50 dark:bg-white/5 text-foreground border-slate-200 dark:border-white/10 hover:border-indigo-400/50"
                                }`}
                              >
                                <span>{srv}</span>
                                {isSelected ? (
                                  <Check className="w-3.5 h-3.5 shrink-0" />
                                ) : (
                                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-white/20 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {errors.services && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.services}</p>
                        )}
                      </div>

                      {/* Estimated Scope / Budget Tier */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                          Estimated Budget Tier
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {budgetTiers.map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, budget: b.id }))}
                              className={`py-2 px-2 rounded-xl text-[11px] font-mono text-center border transition-all ${
                                formData.budget === b.id
                                  ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500 font-bold"
                                  : "bg-slate-50 dark:bg-white/5 text-muted-foreground border-slate-200 dark:border-white/10 hover:text-foreground"
                              }`}
                            >
                              {b.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Implementation Timeline */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                          Target Implementation Timeline
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {timelineOptions.map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, timeline: t.id }))}
                              className={`py-2 px-2 rounded-xl text-[11px] font-mono text-center border transition-all ${
                                formData.timeline === t.id
                                  ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500 font-bold"
                                  : "bg-slate-50 dark:bg-white/5 text-muted-foreground border-slate-200 dark:border-white/10 hover:text-foreground"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* =========================================================
                      STEP 3: Message, Stack Link & Consent
                      ========================================================= */}
                  {currentStep === 3 && (
                    <div className="space-y-4 animate-in fade-in-50 duration-300">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label htmlFor="step-message" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            Project Goals & Manual Bottlenecks <span className="text-indigo-600 dark:text-indigo-400">*</span>
                          </label>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {formData.message.length} / 500
                          </span>
                        </div>
                        <textarea
                          ref={messageInputRef}
                          id="step-message"
                          rows={4}
                          maxLength={500}
                          required
                          value={formData.message}
                          onChange={(e) => {
                            setFormData((p) => ({ ...p, message: e.target.value }));
                            if (errors.message) setErrors((p) => ({ ...p, message: "" }));
                          }}
                          placeholder="Tell us about the software you currently run (e.g. Marg, Kommo, Pipedrive, HrOne) and what specific manual processes you want automated..."
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${
                            errors.message
                              ? "border-rose-500 focus:border-rose-500"
                              : "border-slate-300 dark:border-white/10 focus:border-indigo-500"
                          }`}
                        />
                        {errors.message && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>
                        )}
                      </div>

                      {/* Optional Architecture / Stack Link */}
                      <div>
                        <label htmlFor="step-link" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                          Existing Software Link or Notes <span className="text-muted-foreground">(Optional)</span>
                        </label>
                        <input
                          id="step-link"
                          type="text"
                          value={formData.projectLink}
                          onChange={(e) => setFormData((p) => ({ ...p, projectLink: e.target.value }))}
                          placeholder="e.g. Using Marg ERP v9 + WhatsApp Business API"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      {/* Consent Checkbox */}
                      <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={formData.consent}
                            onChange={(e) => {
                              setFormData((p) => ({ ...p, consent: e.target.checked }));
                              if (errors.consent) setErrors((p) => ({ ...p, consent: "" }));
                            }}
                            className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-white/20"
                          />
                          <span className="text-xs text-muted-foreground leading-relaxed">
                            I consent to having an IncarnetiX systems architect review this information and contact me regarding our business automation architecture under NDA.
                          </span>
                        </label>
                        {errors.consent && (
                          <p className="text-[11px] text-rose-500 mt-1 pl-7">{errors.consent}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation & Submit Action Buttons */}
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-4">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-foreground bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                    ) : (
                      <div className="text-xs text-muted-foreground font-mono">
                        Step 1 · Basic Details
                      </div>
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all duration-200"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-glow disabled:opacity-60 transition-all duration-200"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Encrypting & Dispatching...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Transmit Consultation Request</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
