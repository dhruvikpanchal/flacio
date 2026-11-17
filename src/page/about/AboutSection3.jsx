import { ABOUT_SECTION3_DATA } from "../../data/about";

/**
 * AboutSection3 Component (Section 3)
 * "Flacio Photosynthesis Stories" narrative section.
 * Displays subtitle, serif heading with italicized accent, 
 * signature diamond divider, and descriptive story text.
 * 
 * Fully responsive across mobile, tablet, and desktop screens.
 */
export function AboutSection3({
  data = ABOUT_SECTION3_DATA,
  className = "",
}) {
  const {
    subtitle,
    titleLine1,
    titleLine2Prefix,
    titleLine2Italic,
    description,
  } = data;

  return (
    <section
      aria-label="Flacio Photosynthesis Stories"
      className={`section-reveal w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="max-w-240 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtitle / Tagline */}
        {subtitle && (
          <p className="font-sans font-medium text-[11px] sm:text-xs md:text-[13px] tracking-[0.2em] sm:tracking-[0.25em] text-brand-muted uppercase mb-3 sm:mb-4 md:mb-5">
            {subtitle}
          </p>
        )}

        {/* Main Heading */}
        <h2 className="font-heading font-normal text-brand-dark text-2xl sm:text-3xl md:text-4xl lg:text-[45px] leading-[1.28] sm:leading-[1.22] tracking-tight">
          <span className="block">{titleLine1}</span>
          <span className="block mt-0.5 sm:mt-1">
            {titleLine2Prefix}
            <span className="italic font-normal">{titleLine2Italic}</span>
          </span>
        </h2>

        {/* Decorative Diamond Divider */}
        <div
          className="flex items-center justify-center my-6 sm:my-7 md:my-8 gap-3.5 w-36 sm:w-44 mx-auto"
          aria-hidden="true"
        >
          <div className="flex-1 h-px bg-[#dfdfdf]" />
          <div className="w-2.5 h-2.5 rotate-45 bg-brand-green shrink-0" />
          <div className="flex-1 h-px bg-[#dfdfdf]" />
        </div>

        {/* Story Description */}
        {description && (
          <p className="font-sans font-normal text-brand-muted text-[13px] sm:text-[14px] md:text-[15px] leading-[1.75] sm:leading-[1.85] max-w-205 mx-auto">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

export const Section3 = AboutSection3;
export default AboutSection3;
