import { ABOUT_SECTION5_DATA } from "../../data/about";
import { MotionDiv } from "../../components/motion/MotionDiv";

/**
 * AboutSection5 Component (Section 5)
 * "Here's How It Works" policy and ordering process section.
 *
 * Requirements:
 * 1. Uses policy-8.svg, policy-9.svg, policy-10.svg, and policy-11.svg.
 * 2. Fully responsive for mobile (stacked), tablet (2x2 grid), and desktop (4-column row).
 * 3. All info stored in and retrieved from src/data/about.js.
 * 4. Image hover animation moves left-right using MotionDiv.jsx.
 */
export function AboutSection5({
  data = ABOUT_SECTION5_DATA,
  className = "",
}) {
  const { titlePrefix, titleItalic, steps = [] } = data || {};

  return (
    <section
      aria-label="Here's How It Works"
      className={`section-reveal w-full bg-[#faf7f2] py-14 sm:py-16 md:py-20 lg:py-24 xl:py-28 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <h2 className="font-heading font-normal text-brand-dark text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[42px] leading-[1.25] tracking-tight mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <span>{titlePrefix}</span>
          <span className="italic font-normal">{titleItalic}</span>
        </h2>

        {/* Responsive Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-8 lg:gap-10 xl:gap-12 items-start justify-items-center">
          {steps.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center w-full max-w-65 group"
            >
              {/* MotionDiv: horizontal sway on hover (slides left -> slides right -> returns to center) */}
              <MotionDiv
                direction="horizontal"
                distance={14}
                duration={450}
                className="cursor-pointer mb-4 sm:mb-5 md:mb-6 p-2 rounded-full transition-transform"
                title={item.title}
              >
                <img
                  src={item.icon}
                  alt={item.alt || item.title}
                  width={82}
                  height={82}
                  className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-[82px] lg:h-[82px] object-contain select-none pointer-events-none"
                  loading="lazy"
                  decoding="async"
                />
              </MotionDiv>

              {/* Step Title */}
              <h3 className="font-heading font-normal text-brand-dark text-base sm:text-[17px] md:text-[18px] leading-snug">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Section5 = AboutSection5;
export default AboutSection5;
