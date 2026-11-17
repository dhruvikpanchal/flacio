import { memo } from "react";
import { HOME_POLICY_DATA } from "../../data/home";
import { MotionDiv } from "../../components/motion/MotionDiv";

/**
 * PolicyFeatures Component (Section 9)
 * Renders home store policies directly via map from HOME_POLICY_DATA
 * Uses MotionDiv for smooth left-to-right hover sway only on icons.
 * Responsive for Mobile, Tablet, and Desktop.
 */
export const PolicyFeatures = memo(function PolicyFeatures({ onNavigate, className = "" }) {
  return (
    <section
      aria-label="Store Policies and Features"
      className={`section-reveal-scale w-full bg-white border-t border-b border-brand-border py-8 sm:py-10 md:py-12 lg:py-14 my-4 sm:my-6 md:my-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 md:gap-7 lg:gap-6 xl:gap-8 items-center">
          {HOME_POLICY_DATA.map((item) => {
            const isComponent = typeof item.icon !== "string";
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.isEmail && item.emailLink) {
                    window.location.href = item.emailLink;
                  } else if (onNavigate) {
                    onNavigate("POLICY", item.id);
                  }
                }}
                className="group flex items-center gap-3.5 sm:gap-4 md:gap-4.5 p-2 sm:p-2.5 rounded-lg cursor-pointer select-none"
                aria-label={item.ariaLabel}
              >
                {/* Icon Container with MotionDiv: left-to-right sway hover only on icons */}
                <div className="w-11 h-11 shrink-0 flex items-center justify-center">
                  <MotionDiv
                    direction="horizontal"
                    distance={10}
                    duration={420}
                    className="w-full h-full flex items-center justify-center"
                    title={item.title}
                  >
                    {isComponent ? (
                      <Icon className="w-10 h-10 text-brand-muted stroke-[1.25] group-hover:text-brand-green transition-colors" />
                    ) : (
                      <img
                        src={item.icon}
                        alt={item.title}
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                        className="w-10 h-10 object-contain"
                      />
                    )}
                  </MotionDiv>
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center min-w-0">
                  <h3 className="font-heading text-[#1f2024] font-normal text-[17px] sm:text-[18px] md:text-[18.5px] leading-snug tracking-normal transition-colors duration-200 group-hover:text-brand-green">
                    {item.title}
                  </h3>
                  <div className="mt-0.5 sm:mt-1">
                    {item.isEmail ? (
                      <a
                        href={item.emailLink || `mailto:${item.description}`}
                        className="font-sans text-[13px] sm:text-[14px] text-brand-muted hover:text-brand-green hover:underline underline-offset-2 transition-colors duration-200"
                      >
                        {item.description}
                      </a>
                    ) : (
                      <p className="font-sans text-[13px] sm:text-[14px] text-brand-muted leading-normal">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export const Section9 = PolicyFeatures;
export default PolicyFeatures;
