import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

import { HERO_SLIDES } from "../../util/imagePath";

export const HeroSlider = memo(function HeroSlider({ onNavigate }) {
  const navigate = useNavigate();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHeroNavigate = () => {
    if (onNavigate) {
      onNavigate("PRODUCT");
    } else {
      navigate("/product");
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        loop={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full"
      >
        {HERO_SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full">
            {/* 1. Mobile & Tablet Layout (< lg): Image on top, content below matching design reference */}
            <div className="flex lg:hidden flex-col bg-white">
              {/* Top: Clean Slide Image */}
              <div className="relative w-full aspect-16/10 md:aspect-video md:max-h-115 overflow-hidden bg-neutral-100">
                <img
                  src={slide.image}
                  alt={`${slide.titleMain} ${slide.titleItalic}`}
                  className="w-full h-full object-cover object-center"
                  width={1200}
                  height={750}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding={index === 0 ? "sync" : "async"}
                />
              </div>

              {/* Bottom: White Content Section */}
              <div className="w-full px-5 pt-7 pb-2 sm:px-8 sm:pt-9 sm:pb-4 md:px-12 md:pt-10 md:pb-5 text-center text-brand-dark max-w-xl mx-auto flex flex-col items-center">
                <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] font-medium text-neutral-500 mb-2 sm:mb-2.5">
                  {slide.subtitle}
                </p>

                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] text-[#222222] mb-3 sm:mb-4">
                  {slide.titleMain}{" "}
                  <span className="italic font-normal">
                    {slide.titleItalic}
                  </span>
                </h2>

                <p className="font-sans text-xs sm:text-sm md:text-base text-neutral-500 font-light leading-relaxed max-w-xs sm:max-w-md md:max-w-lg mx-auto mb-6 sm:mb-7">
                  {slide.description}
                </p>

                {/* Vertically Stacked Action Buttons */}
                <div className="flex flex-col gap-2.5 sm:gap-3 w-full max-w-65 sm:max-w-70">
                  <button
                    type="button"
                    onClick={handleHeroNavigate}
                    className="w-full py-3.5 sm:py-4 px-6 bg-[#2b2b2b] text-white hover:bg-brand-green transition-colors duration-300 font-sans text-xs sm:text-sm font-medium tracking-wider uppercase cursor-pointer text-center"
                  >
                    {slide.primaryBtn.text}
                  </button>
                  <button
                    type="button"
                    onClick={handleHeroNavigate}
                    className="w-full py-3.5 sm:py-4 px-6 bg-[#2b2b2b] text-white hover:bg-brand-green transition-colors duration-300 font-sans text-xs sm:text-sm font-medium tracking-wider uppercase cursor-pointer text-center"
                  >
                    {slide.secondaryBtn.text}
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Desktop Layout (lg+): Full-bleed overlay layout */}
            <div className="hidden lg:flex relative min-h-205 lg:min-h-225 items-center justify-center overflow-hidden pb-40 lg:pb-52">
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={`${slide.titleMain} ${slide.titleItalic}`}
                  className="w-full h-full object-cover object-center"
                  width={1920}
                  height={900}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding={index === 0 ? "sync" : "async"}
                />
                {/* Contrast overlay */}
                <div className="absolute inset-0 bg-black/15" />
              </div>

              {/* Slide Content */}
              <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white pt-28 lg:pt-32">
                <p className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-white/90 mb-4 animate-fadeIn">
                  {slide.subtitle}
                </p>

                <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.1] text-white mb-6 drop-shadow-sm">
                  {slide.titleMain}{" "}
                  <span className="italic font-normal">
                    {slide.titleItalic}
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto font-light leading-relaxed mb-10">
                  {slide.description}
                </p>

                <div className="flex flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleHeroNavigate}
                    className="min-w-40 px-8 py-3.5 bg-white text-brand-dark hover:bg-brand-green hover:text-white transition-all duration-300 font-sans text-xs sm:text-sm font-medium tracking-wider uppercase shadow-md cursor-pointer"
                  >
                    {slide.primaryBtn.text}
                  </button>
                  <button
                    type="button"
                    onClick={handleHeroNavigate}
                    className="min-w-40 px-8 py-3.5 bg-white text-brand-dark hover:bg-brand-green hover:text-white transition-all duration-300 font-sans text-xs sm:text-sm font-medium tracking-wider uppercase shadow-md cursor-pointer"
                  >
                    {slide.secondaryBtn.text}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Vertical Pagination Dots on the right for Desktop only */}
      <div className="hidden lg:flex flex-col items-center gap-3 absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20">
        {HERO_SLIDES.map((_, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={index}
              onClick={() => swiperInstance?.slideToLoop(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="relative flex items-center justify-center w-6 h-6 focus:outline-none transition-all duration-300 cursor-pointer"
            >
              {isActive ? (
                <>
                  <span className="absolute inset-0 rounded-full border border-white/90 scale-100 transition-transform duration-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                </>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 hover:bg-white transition-all duration-200" />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile & Tablet Horizontal Pagination Dots matching design reference */}
      <div className="flex lg:hidden items-center justify-center gap-3 pt-4 pb-8 sm:pb-10 bg-white">
        {HERO_SLIDES.map((_, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={index}
              onClick={() => swiperInstance?.slideToLoop(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="p-1.5 -m-1.5 flex items-center justify-center focus:outline-none cursor-pointer"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-2.5 h-2.5 bg-[#2b2b2b]"
                    : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default HeroSlider;
