import { memo } from "react";
import { Link } from "react-router-dom";
import { MotionDiv } from "../../components/motion/MotionDiv";
import bannerShop1 from "../../assets/images/banner-shop-1.webp";
import bannerShop2 from "../../assets/images/banner-shop-2.webp";

/**
 * Product Page Section 2 Promo Banners Data
 */
const PRODUCT_PROMO_BANNERS = [
  {
    id: 1,
    title: "Style for Every Occasion",
    subtitle: "From Casual to Formal, We've Got You Covered",
    buttonText: "View All",
    buttonLink: "/product",
    image: bannerShop1,
    alt: "Style for Every Occasion - Potted plant styling",
  },
  {
    id: 2,
    title: "Get the Look You Want",
    subtitle: "Shop Our Collection for Your Dream Wardrobe",
    buttonText: "View All",
    buttonLink: "/product",
    image: bannerShop2,
    alt: "Get the Look You Want - Lush green foliage banner",
  },
];

/**
 * ProductPromoBanners Component (Section 2)
 *
 * Requirements:
 * 1. Image has smooth left-right hover sway via MotionDiv.
 * 2. Button hover in brand green color (hover:bg-brand-green hover:border-brand-green).
 * 3. Responsive: 2 divs in one row on desktop and tablet (md:grid-cols-2), 1 div per row on mobile (grid-cols-1).
 */
export const ProductPromoBanners = memo(function ProductPromoBanners() {
  return (
    <section
      aria-label="Product featured promotions"
      className="section-reveal-scale w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
        {PRODUCT_PROMO_BANNERS.map((banner) => (
          <div
            key={banner.id}
            className="group relative w-full aspect-video sm:aspect-1.75/1 md:aspect-auto md:h-70 lg:h-80 xl:h-85 min-h-47.5 overflow-hidden bg-[#f5f5f5]"
          >
            {/* MotionDiv for smooth left-right hover sway */}
            <div className="absolute inset-0 overflow-hidden">
              <MotionDiv
                direction="horizontal"
                distance={14}
                duration={480}
                fullWidth
                fullHeight
                className="w-full h-full"
              >
                <img
                  src={banner.image}
                  alt={banner.alt}
                  width={720}
                  height={410}
                  loading="lazy"
                  decoding="async"
                  className="w-[calc(100%+36px)] min-w-[calc(100%+36px)] h-full min-h-full max-w-none object-cover object-center -ml-4.5 transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </MotionDiv>
            </div>

            {/* Subtle contrast overlay */}
            <div
              className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500 z-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Text & Button Overlay (Centered) */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
              {/* Title (Serif Heading) */}
              <h2 className="font-heading text-white text-[22px] sm:text-[26px] md:text-[27px] lg:text-[32px] font-normal leading-tight tracking-tight drop-shadow-sm select-none">
                {banner.title}
              </h2>

              {/* Subtitle */}
              <p className="font-sans text-white/95 text-[12px] sm:text-[13px] md:text-[13.5px] font-normal tracking-normal mt-1.5 sm:mt-2 max-w-md drop-shadow-xs select-none">
                {banner.subtitle}
              </p>

              {/* Button with brand green hover effect */}
              <div className="mt-4 sm:mt-5 md:mt-6">
                <Link
                  to={banner.buttonLink}
                  className="inline-block border border-white text-white text-[11px] sm:text-[11.5px] font-medium tracking-[0.2em] uppercase px-6 sm:px-8 py-2.5 sm:py-3 transition-all duration-300 hover:bg-brand-green hover:border-brand-green hover:text-white backdrop-blur-[1px] shadow-xs hover:shadow-md cursor-pointer select-none"
                >
                  {banner.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default ProductPromoBanners;

