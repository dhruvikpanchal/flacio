import { memo } from "react";
import { PageHeaderTitle } from "../../components/common/PageHeaderTitle";
import { FAQ_SECTIONS_DATA } from "../../data/faq";

const BREADCRUMBS = [
  { label: "Home", path: "/" },
  { label: "Faqs" },
];

/**
 * Faqs Page Component
 *
 * Requirements:
 * 1. Uses the reusable PageHeaderTitle component.
 * 2. Reads data from src/data/faq.js.
 * 3. Responsive 2-column layout on desktop/tablet, stacked 1-column on mobile.
 */
export const Faqs = memo(function Faqs() {
  return (
    <div className="w-full bg-white">
      {/* Reusable Header Title with Breadcrumbs */}
      <PageHeaderTitle
        title="Faqs"
        breadcrumbs={BREADCRUMBS}
      />

      {/* Main FAQ Content Section */}
      <section
        aria-label="Frequently Asked Questions"
        className="section-reveal w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Responsive 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 xl:gap-x-24 gap-y-12 sm:gap-y-14 md:gap-y-16 items-start">
            {FAQ_SECTIONS_DATA.map((section) => (
              <div key={section.id} className="w-full flex flex-col">
                {/* Category Heading (e.g. "01. The order") */}
                <h2 className="font-heading font-normal text-brand-dark text-2xl sm:text-[26px] md:text-[28px] lg:text-[32px] leading-tight mb-6 sm:mb-7 md:mb-8">
                  {section.categoryTitle}
                </h2>

                {/* Q&A Items */}
                <div className="flex flex-col">
                  {section.questions.map((item) => (
                    <article key={item.id} className="mb-6 sm:mb-7 md:mb-8 last:mb-0">
                      {/* Question */}
                      <h3 className="font-sans font-semibold text-brand-dark text-[14px] sm:text-[14.5px] md:text-[15px] leading-snug mb-2 sm:mb-2.5">
                        {item.question}
                      </h3>

                      {/* Answer */}
                      <p className="font-sans font-normal text-brand-muted text-[13px] sm:text-[13.5px] md:text-[14px] leading-[1.75] sm:leading-[1.8]">
                        {item.answer}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

export default Faqs;
