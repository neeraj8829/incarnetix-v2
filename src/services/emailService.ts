import emailjs from "@emailjs/browser";
import { ContactFormData, EmailJSResponse, EmailTemplateParams } from "@/types/email";

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_aq8ndoj",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_1euq6h9",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "g7VSggQz_vV-1ALbt",
  toEmail: import.meta.env.VITE_TO_EMAIL || "hey@incarnetix.com",
};

export const initializeEmailJS = () => {
  try {
    if (EMAILJS_CONFIG.publicKey) {
      emailjs.init(EMAILJS_CONFIG.publicKey);
    }
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
  }
};

export const sendContactEmail = async (formData: ContactFormData): Promise<EmailJSResponse> => {
  try {
    const templateParams: EmailTemplateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || "Not provided",
      message: formData.message,
      service: formData.service || "General Inquiry",
      to_email: EMAILJS_CONFIG.toEmail,
      timestamp: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    return {
      status: response.status,
      text: response.text,
    };
  } catch (error: any) {
    console.error("Failed to send email:", error);
    throw new Error(error?.text || error?.message || "Failed to send message. Please contact hey@incarnetix.com directly.");
  }
};

