import { memo } from "react";
import { Star } from "lucide-react";
import { COMMON_TESTIMONIALS, TESTIMONIAL_BG_IMAGE } from "../../data/common";

/**
 * Common Testimonials Component
 * Reusable across Home, About, and other pages.
 */
export const Testimonials = memo(function Testimonials({
  variant = "clean",
  bgImage,
  testimonial,
  className = "",
}) {
  const currentTestimonial = testimonial || COMMON_TESTIMONIALS[0];
  const isBanner = variant === "banner" || Boolean(bgImage);
  const activeBgImage = bgImage || (isBanner ? TESTIMONIAL_BG_IMAGE : null);

  const activeRating = currentTestimonial.rating ?? 4;
  const totalStars = currentTestimonial.totalStars ?? 5;

  return (
    <section
      aria-label="Customer Testimonials"
      className={`section-reveal-scale relative w-full overflow-hidden transition-all duration-300 ${
        isBanner
          ? "bg-[#e5ece2] bg-center bg-cover bg-no-repeat py-14 sm:py-20 md:py-24 lg:py-32 xl:py-36 px-4 sm:px-6 lg:px-8 my-8 sm:my-12 md:my-16 lg:my-20"
          : "bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      } ${className}`}
      style={activeBgImage ? { backgroundImage: `url(${activeBgImage})` } : undefined}
    >
      <div className="relative z-10 max-w-4xl lg:max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Star Rating (4 active green stars, 1 light grey star matching design) */}
        <div
          className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 md:mb-10"
          aria-label={`${activeRating} out of ${totalStars} stars`}
        >
          {[...Array(totalStars)].map((_, i) => {
            const isFilled = i < activeRating;
            return (
              <Star
                key={i}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  isFilled
                    ? "fill-brand-green text-brand-green"
                    : "fill-[#cfd5cd] text-[#cfd5cd]"
                }`}
                aria-hidden="true"
              />
            );
          })}
        </div>

        {/* Testimonial Quote */}
        <blockquote className="w-full">
          <p className="font-heading italic font-normal text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[36px] leading-relaxed md:leading-[1.45] text-brand-green max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4">
            {currentTestimonial.quote}
          </p>
        </blockquote>

        {/* Author Avatar & Name */}
        <div className="flex flex-col items-center justify-center mt-7 sm:mt-9 md:mt-11">
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full overflow-hidden shadow-sm ring-1 ring-brand-green/10">
            <img
              src={currentTestimonial.avatar}
              alt={currentTestimonial.author}
              width={88}
              height={88}
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="mt-3 sm:mt-4 font-sans font-medium text-sm sm:text-base text-[#2d3a2e] tracking-wide">
            {currentTestimonial.author}
          </span>
        </div>
      </div>
    </section>
  );
});

export default Testimonials;
