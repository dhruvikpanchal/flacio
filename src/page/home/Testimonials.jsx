import { memo } from "react";
import { Testimonials as CommonTestimonials } from "../../components/common/Testimonials";
import { TESTIMONIAL_BG_IMAGE } from "../../data/common";

/**
 * Home Page Testimonials (Section 4)
 * Uses the common Testimonials component with the botanical background artwork banner.
 */
export const Testimonials = memo(function Testimonials({ className = "" }) {
  return (
    <CommonTestimonials
      variant="banner"
      bgImage={TESTIMONIAL_BG_IMAGE}
      className={className}
    />
  );
});

export const Section4 = Testimonials;
export default Testimonials;
