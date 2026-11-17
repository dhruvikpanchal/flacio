import { ABOUT_BRAND_LOGOS } from "../../data/about";
import { MotionDiv } from "../motion/MotionDiv";

/**
 * BrandLogos Component (Section 6 / Common Brand Logos Section)
 * Renders partner and press brand logos using the reusable MotionDiv wrapper.
 * Reusable across multiple pages (About, Home, Press, etc.)
 * Fully responsive for mobile, tablet, and desktop.
 */
export function BrandLogos({
  items = ABOUT_BRAND_LOGOS,
  className = "",
}) {
  return (
    <section
      aria-label="Featured Brands and Press"
      className={`section-reveal-scale w-full bg-white py-10 sm:py-12 md:py-16 lg:py-20 border-b border-brand-border/40 ${className}`}
    >
      <div className="max-w-350 mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 items-center justify-items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {items.map((brand) => (
            <MotionDiv
              key={brand.id}
              distance={14}
              duration={420}
              className="w-full py-4 px-2"
              title={brand.name}
            >
              <img
                src={brand.image}
                alt={brand.name}
                width={brand.width || 180}
                height={brand.height || 60}
                loading="lazy"
                decoding="async"
                className={`${brand.imgClass} w-auto object-contain transition-opacity duration-300 hover:opacity-85`}
              />
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandLogos;
