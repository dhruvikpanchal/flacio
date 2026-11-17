import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { CircularText } from "../../components/common/CircularText";
import { OFFICE_PLANTS_SECTION_DATA } from "../../data/home";

/**
 * OfficePlantsBanner Component (Section 5)
 *
 * Features:
 * - Left column: modern office plant interior banner with rotating CircularText badge at the top-left
 * - Right column: "Plants for offices" serif heading, descriptive text, and dark green "Shop Collection" button
 * - Fully responsive for mobile, tablet, and desktop
 */
export const OfficePlantsBanner = memo(function OfficePlantsBanner({
  onNavigate,
  className = "",
}) {
  const navigate = useNavigate();
  const {
    badgeText = "DISCOVER OUR FAVORITES ",
    titlePrefix = "Plants for ",
    titleItalic = "offices",
    description = "Praesent egestas tristique nibh. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Fusce convallis metus id felis luctus adipiscing. Integer tincidunt. Etiam imperdiet imperdiet orci",
    buttonText = "Shop Collection",
    image,
    imageAlt = "Plants for offices modern interior",
  } = OFFICE_PLANTS_SECTION_DATA || {};

  return (
    <section
      aria-label="Plants for Offices"
      className={`w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-visible ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-14 xl:gap-20 items-center">
          {/* Left Column: Image with Overlapping Circular Text Badge */}
          {/* pt headroom ensures top half of circular badge never clips */}
          <div className="section-reveal-slide-left pt-8 sm:pt-10 md:pt-12 lg:pt-14">
            <div className="relative">
              {/* Rotating Circular Text Badge positioned directly across top edge of photo */}
              <div className="absolute -top-12.5 sm:-top-14.5 md:-top-15.75 lg:-top-17.25 left-8 sm:left-12 md:left-16 lg:left-20 z-20 pointer-events-none">
                <CircularText
                  text={badgeText}
                  className="w-25 h-25 sm:w-28.75 sm:h-28.75 md:w-31.5 md:h-31.5 lg:w-34.5 lg:h-34.5"
                  size={null}
                  radius={65}
                  fontSize="12.5px"
                  fontWeight="700"
                  color="#224229"
                  speed={20}
                  direction="clockwise"
                />
              </div>

              {/* Banner Image Container */}
              <div className="relative w-full overflow-hidden aspect-4/3 sm:aspect-[1.12/1] lg:aspect-[1.06/1] shadow-xs">
                <img
                  src={image}
                  alt={imageAlt}
                  width={600}
                  height={550}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-103"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Text Content & Call-to-Action */}
          <div className="section-reveal-slide-right reveal-delay-200 flex flex-col justify-center items-start lg:pl-4 xl:pl-6">
            {/* Heading: "Plants for offices" */}
            <h2 className="font-heading text-[#1f2024] font-normal text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] xl:text-[56px] leading-[1.14] tracking-tight">
              {titlePrefix}
              <span className="italic font-normal">{titleItalic}</span>
            </h2>

            {/* Description Paragraph */}
            <p className="font-sans text-[#767676] text-sm sm:text-[15px] md:text-base leading-relaxed mt-4 sm:mt-5 md:mt-6 max-w-xl">
              {description}
            </p>

            {/* Call to Action Button */}
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate("PRODUCT");
                else navigate("/product");
              }}
              className="mt-6 sm:mt-8 md:mt-10 inline-flex items-center justify-center bg-brand-green hover:bg-brand-dark active:bg-[#252626] text-white font-sans text-xs sm:text-sm font-medium tracking-wide px-8 sm:px-10 py-3.5 sm:py-4 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer select-none"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export const Section5 = OfficePlantsBanner;
export default OfficePlantsBanner;
