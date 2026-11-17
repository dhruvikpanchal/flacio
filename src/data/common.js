import testimonialUser1 from "../assets/images/test-1.webp";
import testimonialBg from "../assets/images/bg-1.webp";
import brand1 from "../assets/icons/brand-1.webp";
import brand2 from "../assets/icons/brand-2.webp";
import brand3 from "../assets/icons/brand-3.webp";
import brand4 from "../assets/icons/brand-4.webp";

/**
 * Common Data Store
 * Shared data used across multiple pages (Home, About, etc.)
 */

// Shared Testimonials Data
export const COMMON_TESTIMONIALS = [
  {
    id: 1,
    rating: 4, // 4 active stars and 1 muted star matching design
    totalStars: 5,
    quote:
      "“ Very happy with flacio; plants arrived in excellent condition, were healthy looking with lots of new growth and are thriving! ”",
    author: "Ann Smith",
    avatar: testimonialUser1,
  },
];

export const TESTIMONIAL_BG_IMAGE = testimonialBg;

// Shared Brand Logos Data
export const COMMON_BRAND_LOGOS = [
  {
    id: 1,
    name: "Architectural Digest",
    image: brand1,
    imgClass: "h-9 sm:h-10 md:h-12 lg:h-14 max-w-35 sm:max-w-40",
  },
  {
    id: 2,
    name: "Gardenista",
    image: brand2,
    imgClass: "h-4 sm:h-4.5 md:h-5 lg:h-6 max-w-37.5 sm:max-w-45",
  },
  {
    id: 3,
    name: "Apartment Therapy",
    image: brand3,
    imgClass: "h-8 sm:h-9 md:h-10 lg:h-12 max-w-40 sm:max-w-47.5",
  },
  {
    id: 4,
    name: "Good Housekeeping",
    image: brand4,
    imgClass: "h-7 sm:h-8 md:h-9 lg:h-11 max-w-37.5 sm:max-w-45",
  },
];

export default {
  testimonials: COMMON_TESTIMONIALS,
  testimonialBg: TESTIMONIAL_BG_IMAGE,
  brands: COMMON_BRAND_LOGOS,
};
