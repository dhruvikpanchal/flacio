import { ABOUT_SECTION4_DATA } from "../../data/about";
import { MotionDiv } from "../../components/motion/MotionDiv";

/**
 * AboutSection4 Component (Section 4)
 * Botanical 3-image gallery showcase.
 *
 * Requirements:
 * 1. Uses about-2_540x.webp, about-3_540x.webp, and about-4_540x.webp.
 * 2. Tablet and desktop have the same staggered layout (center image shifted down)
 *    with generous spacing on desktop and decreased spacing on tablet.
 *    On mobile, images are arranged cleanly one by one (stacked vertically).
 * 3. Each image has a smooth top-to-bottom hover motion via MotionDiv (direction="vertical").
 * 4. Fully responsive across mobile, tablet, and desktop.
 */
export function AboutSection4({
  data = ABOUT_SECTION4_DATA,
  className = "",
}) {
  return (
    <section
      aria-label="About Flacio botanical gallery"
      className={`section-reveal-scale w-full bg-white pt-2 sm:pt-4 md:pt-6 pb-16 sm:pb-24 md:pb-32 lg:pb-40 ${className}`}
    >
      <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
        {/* 
          Grid layout:
          - Mobile (<640px): 1 column (one-by-one stacked layout with gap-6 sm:gap-8)
          - Tablet (640px - 1024px): 3 columns with decreased gap (gap-4 sm:gap-5 md:gap-6)
          - Desktop (>=1024px): 3 columns with expanded spacing (lg:gap-8 xl:gap-12)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 items-start">
          {data.map((item) => (
            <div
              key={item.id}
              className={`w-full flex justify-center ${
                item.isShifted
                  ? "sm:mt-8 md:mt-14 lg:mt-20 xl:mt-24"
                  : "mt-0"
              }`}
            >
              <MotionDiv
                direction="vertical"
                distance={14}
                duration={460}
                className="w-full max-w-110 sm:max-w-none cursor-pointer"
                title={item.alt}
              >
                <div className="w-full overflow-hidden bg-[#f7f7f7]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={540}
                    height={600}
                    className="w-full h-auto object-cover block select-none"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </MotionDiv>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Section4 = AboutSection4;
export default AboutSection4;
