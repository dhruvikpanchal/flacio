import { ABOUT_SECTION2_DATA } from "../../data/about";
import { MotionDiv } from "../../components/motion/MotionDiv";

/**
 * AboutSection2 Component (Section 2)
 * Features about-1.webp as the background artwork (spiral notebook & desk)
 * with policy-image-1.webp positioned towards the lower side of the background image,
 * slightly overlapping the bottom edge matching the design reference.
 * Includes the smooth left-right-center hover sway animation using MotionDiv.
 * Fully responsive for mobile, tablet, and desktop.
 */
export function AboutSection2({
  data = ABOUT_SECTION2_DATA,
  className = "",
}) {
  const { bgImage, plantImage, altBg, altPlant } = data;

  return (
    <section
      aria-label="About Flacio workspace and plant showcase"
      className={`section-reveal-scale w-full bg-white pt-6 sm:pt-10 md:pt-14 pb-12 sm:pb-16 md:pb-22 lg:pb-28 ${className}`}
    >
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full rounded-md sm:rounded-lg">
          {/* Base Background Image: Spiral notebook clipboard with snake plants */}
          <img
            src={bgImage}
            alt={altBg}
            width={1440}
            height={500}
            className="w-full h-auto object-cover select-none block rounded-md sm:rounded-lg shadow-xs"
            loading="lazy"
            decoding="async"
          />

          {/* Foreground Plant: Lowered down towards the bottom side of the bg image */}
          <div className="absolute inset-x-0 bottom-0 translate-y-[18%] sm:translate-y-[15%] md:translate-y-[12%] lg:translate-y-[10%] flex items-end justify-center pointer-events-none z-10">
            <MotionDiv
              distance={16}
              duration={460}
              className="pointer-events-auto cursor-pointer"
              title="Botanical indoor potted plant"
            >
              <img
                src={plantImage}
                alt={altPlant}
                width={410}
                height={490}
                className="w-38.75 sm:w-55 md:w-72.5 lg:w-90 xl:w-102.5 h-auto object-contain drop-shadow-xl select-none"
                loading="lazy"
                decoding="async"
              />
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Section2 = AboutSection2;
export default AboutSection2;
