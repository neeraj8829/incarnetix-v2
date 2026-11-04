import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Phone, User, MessageSquare, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { sendContactEmail } from "@/services/emailService";
import { ContactFormData } from "@/types/email";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    service: "Free Business Automation Consultation",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      await sendContactEmail(formData);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "Free Business Automation Consultation",
          message: "",
        });
      }, 2500);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Failed to submit consultation inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-foreground dark:text-white rounded-3xl shadow-glow">
        <DialogHeader className="text-center sm:text-center pb-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Sparkles className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold font-heading text-foreground dark:text-white">
            Schedule a Free Consultation
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto leading-relaxed">
            Discuss your company's workflows with an IncarnetiX automation architect.
          </p>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-foreground dark:text-white">Inquiry Received</h4>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              Our New Delhi engineering office will review your request and reach out shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                name="name"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-sm text-foreground dark:text-white placeholder:text-muted-foreground focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                name="email"
                required
                placeholder="Work email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-sm text-foreground dark:text-white placeholder:text-muted-foreground focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number (e.g. +91 9773880816)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-sm text-foreground dark:text-white placeholder:text-muted-foreground focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
              <textarea
                name="message"
                required
                rows={3}
                placeholder="Briefly describe what you want to automate..."
                value={formData.message}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-sm text-foreground dark:text-white placeholder:text-muted-foreground focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-glow disabled:opacity-50 transition-all duration-200"
            >
              {isSubmitting ? "Submitting..." : "Send Free Consultation Request"}
            </button>

            <p className="text-[11px] text-center text-muted-foreground">
              No sales spam. We only contact you regarding your automation architecture.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;
