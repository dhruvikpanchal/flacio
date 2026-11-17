import { memo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../components/ui/carousel";
import { COMMUNITY_SECTION_DATA } from "../../data/home";

/**
 * CommunitySlider Component (Section 8)
 * Built with shadcn UI Carousel (embla-carousel)
 */
export const CommunitySlider = memo(function CommunitySlider({ className = "" }) {
  const { tag, subtitle, slides } = COMMUNITY_SECTION_DATA;

  return (
    <section
      aria-label="Community Plant Styling"
      className={`section-reveal w-full bg-white py-10 sm:py-14 md:py-16 lg:py-20 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="font-heading italic font-normal text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] text-[#1f2024] tracking-tight">
            {tag}
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-[15px] text-brand-muted mt-1.5 sm:mt-2">
            {subtitle}
          </p>
        </div>

        {/* shadcn Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
          }}
          className="w-full"
        >
          {/* Outer Flex Container: Left Arrow | Margin | Carousel Content | Margin | Right Arrow */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-full">
            {/* Left Arrow Button (fixed on left side, same height as image, small width, margin to images) */}
            <CarouselPrevious />

            {/* Carousel Content Area */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <CarouselContent>
                {slides.map((slide) => (
                  <CarouselItem
                    key={slide.id}
                    className="basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="group relative overflow-hidden aspect-square cursor-pointer select-none">
                      {/* Image with smooth zoom effect */}
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        width={270}
                        height={270}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Smooth black shade coming from center to end like square */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                        <div className="w-full h-full bg-black/25 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out origin-center" />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>

            {/* Right Arrow Button (fixed on right side, same height as image, small width, margin to images) */}
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
});

export const Section8 = CommunitySlider;
export default CommunitySlider;
