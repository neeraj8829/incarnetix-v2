import React from "react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqsList: FAQItem[] = [
  {
    id: "item-1",
    question: "What does 'One Platform, Complete Business Automation' mean?",
    answer:
      "Instead of forcing your staff to operate in separate software silos where CRM data never touches your ERP or billing system, IncarnetiX integrates all essential applications into a unified ecosystem. Events in one tool automatically trigger actions in the others, creating a single operational truth and cutting manual overhead by up to 99%.",
  },
  {
    id: "item-2",
    question: "Do we have to abandon our current software (e.g., Marg, Pipedrive, Kommo)?",
    answer:
      "No. We prioritize an ecosystem-first integration strategy. We connect your existing tools (such as Marg, Pipedrive, Kommo, HrOne, Wazzup24, Freshworks, and GreytHR) using secure APIs and webhooks. We only replace systems if they are obsolete or failing to scale with your business.",
  },
  {
    id: "item-3",
    question: "How long does a typical automation implementation take?",
    answer:
      "Most core integrations and process automation workflows are mapped, configured, tested, and deployed within 2 to 6 weeks. Our structured 4-step framework (Discover, Design, Build, Adopt) allows us to launch quick wins in the first 10 days while larger architectural modules progress in parallel.",
  },
  {
    id: "item-4",
    question: "How do you guarantee zero downtime during software migration?",
    answer:
      "We build and test all data pipelines and synchronization logic in dedicated staging sandboxes. Data schemas are pre-mapped, verified, and backfilled. When cutover day arrives, historical and transactional data is switched over synchronously with rollback safeguards in place, ensuring uninterrupted business operations.",
  },
  {
    id: "item-5",
    question: "Can IncarnetiX integrate custom AI agents into our workflows?",
    answer:
      "Yes. We build purpose-trained autonomous AI workers tailored to your company's SOPs. These agents handle lead triage on WhatsApp, invoice optical character recognition (OCR), automatic proposal drafting, and real-time CRM updates without manual prompt engineering.",
  },
  {
    id: "item-6",
    question: "What support and maintenance SLAs do you provide after launch?",
    answer:
      "We provide continuous 24/7 technical support, infrastructure monitoring, routine security patching, API version updates, and rapid bug resolution backed by formal enterprise service-level agreements (SLAs).",
  },
];

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="eyebrow mb-3 justify-center">
            <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-foreground tracking-tight">
            Frequently Asked <span className="text-gradient-indigo">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 leading-relaxed">
            Everything you need to know about our business automation platform, integration approach, and onboarding process.
          </p>
        </div>

        {/* Accordion */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-card">
          <Accordion type="single" collapsible className="w-full">
            {faqsList.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-foreground hover:text-indigo-600 dark:hover:text-indigo-400 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom Help Note */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          Still have questions? Reach out directly to our engineering architects at{" "}
          <a href="mailto:hey@incarnetix.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
            hey@incarnetix.com
          </a>{" "}
          or call{" "}
          <a href="tel:+919773880816" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
            +91-9773880816
          </a>
          .
        </div>
      </div>
    </section>
  );
};

export default FAQ;
