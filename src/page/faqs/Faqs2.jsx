import { memo } from "react";
import { faqData } from "../../data/faq";
import { PageHeaderTitle } from "../../components/common/PageHeaderTitle";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/ui/accordion";

const BREADCRUMBS = [{ label: "Home", path: "/" }, { label: "Faqs-2" }];

/**
 * Faqs2 Page Component (Faq-2)
 *
 * Requirements:
 * 1. Uses Shadcn Accordion component in src/components/ui/accordion.jsx (built with react-aria-components).
 * 2. Uses "faqData" from src/data/faq.js.
 * 3. Only one accordion open at a time; opening another automatically closes the previous one.
 * 4. Fully responsive for mobile, tablet, and desktop.
 */
export const Faqs2 = memo(function Faqs2() {
  return (
    <div className="w-full bg-white min-h-[70vh]">
      {/* Reusable Header Title with Breadcrumbs */}
      <PageHeaderTitle
        title="Faqs-2"
        breadcrumbs={BREADCRUMBS}
      />

      <section
        aria-label="Frequently Asked Questions"
        className="section-reveal w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Title: "Frequently Asked Questions." */}
          <h1 className="font-heading font-normal text-brand-dark text-3xl sm:text-4xl md:text-[40px] lg:text-[44px] leading-tight tracking-tight mb-8 sm:mb-10 md:mb-12 text-left">
            Frequently Asked Questions.
          </h1>

          {/* Shadcn Accordion: only one open item at a time */}
          <Accordion
            type="single"
            allowsMultipleExpanded={false}
            className="w-full border-t border-brand-border"
          >
            {faqData.map((item) => (
              <AccordionItem key={item.id} id={`item-${item.id}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
});

export const PageFaqs2 = Faqs2;
export default Faqs2;
