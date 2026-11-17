import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { PROMO_BANNERS } from "../../util/imagePath";

export const PromoBanners = memo(function PromoBanners({ onNavigate }) {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    if (onNavigate) {
      onNavigate("PRODUCT");
    } else {
      navigate("/product");
    }
  };
  return (
    <section className="section-reveal-scale relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 md:mt-8 lg:-mt-32 xl:-mt-40 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
      {/* 
        Responsive Layout:
        - Mobile (<768px): 1 column (grid-cols-1) stacked vertically one below one, with natural aspect ratios
        - Tablet (768px - 1024px): 3 columns (md:grid-cols-3) with proportional scaled-down sizing
        - Desktop (>1024px): 3 columns (lg:grid-cols-3) with equal height and spacious luxury feel
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-3 lg:gap-6 xl:gap-7.5">
        {PROMO_BANNERS.map((banner) => {
          const isCenter = banner.align === "center";

          return (
            <div
              key={banner.id}
              onClick={handleBannerClick}
              className={`group relative overflow-hidden ${banner.mobileAspect} md:aspect-[1.48/1] lg:aspect-1.5/1 ${banner.bgClass} shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-brand-border/40`}
            >
              {/* Image Layer */}
              {banner.id === 1 && (
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    width={380}
                    height={250}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[85%_center] md:object-[90%_center] lg:object-right transform transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                </div>
              )}

              {banner.id === 2 && (
                <div className="absolute inset-0 overflow-hidden">
                  {/* Potted plant centered with seamless #f8f8f8 background on mobile, tablet, and desktop */}
                  <div className="w-full h-full flex flex-col items-center justify-start pt-3 sm:pt-4 md:pt-1.5 lg:pt-3 xl:pt-4">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      width={380}
                      height={250}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[64%] sm:max-h-[68%] md:max-h-[58%] lg:max-h-[66%] xl:max-h-[70%] max-w-[85%] object-contain transform transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  </div>
                </div>
              )}

              {banner.id === 3 && (
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    width={380}
                    height={250}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-right transform transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                </div>
              )}

              {/* Text Content Overlay */}
              <div
                className={`absolute inset-0 pointer-events-none p-5 sm:p-6 md:p-3 lg:p-7 xl:p-9 flex flex-col justify-end z-10 ${
                  isCenter ? "items-center text-center" : "items-start text-left"
                }`}
              >
                <h3 className="font-heading text-xl sm:text-2xl md:text-[15px] lg:text-[22px] xl:text-[27px] text-brand-dark font-normal mb-1 sm:mb-1.5 md:mb-0.5 leading-tight tracking-tight">
                  {banner.titlePrefix}{" "}
                  <span className="italic font-normal">{banner.titleItalic}</span>
                </h3>
                <span className="inline-block font-sans text-xs sm:text-[13px] md:text-[10px] lg:text-xs xl:text-[13px] font-medium text-brand-dark border-b border-brand-dark pb-0.5 group-hover:text-brand-green group-hover:border-brand-green transition-colors">
                  {banner.linkText || "Shop Now"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default PromoBanners;
