import { memo, useEffect, useId, useRef } from "react";
import { DECORATE_PLANTS_SECTION_DATA } from "../../data/home";
import plantImageSrc from "../../assets/images/policy-image-1.webp";

/**
 * Plant & Animated Orbiting Rings Constants
 * Sized and tuned for a bold, high-resolution visual presence.
 */
const IMG_W = 960;
const IMG_H = 816;
const VIEWBOX = "-80 40 1080 760";
const CX = 450;
const CY = 445;
const FRONT_FROM_Y = 440;

const RINGS_CONFIG = [
  {
    rx: 480,
    ry: 245,
    base: -28,
    from: { rot: -6, sx: 1, sy: 1 },
    to: { rot: 7, sx: 1.02, sy: 0.9 },
    period: 8,
  },
  {
    rx: 465,
    ry: 220,
    base: -22,
    from: { rot: 5, sx: 1, sy: 0.92 },
    to: { rot: -8, sx: 0.98, sy: 1.08 },
    period: 11,
  },
];

const lerp = (a, b, k) => a + (b - a) * k;

function ringTransform(ring, t, speed = 1) {
  // Smooth ease-in-out ping-pong loop without jumps
  const k = 0.5 - 0.5 * Math.cos((2 * Math.PI * t * speed) / (ring.period * 1000));
  const rot = lerp(ring.from.rot, ring.to.rot, k);
  const sx = lerp(ring.from.sx, ring.to.sx, k);
  const sy = lerp(ring.from.sy, ring.to.sy, k);
  return `rotate(${(ring.base + rot).toFixed(3)} ${CX} ${CY}) translate(${CX} ${CY}) scale(${sx.toFixed(
    4
  )} ${sy.toFixed(4)}) translate(${-CX} ${-CY})`;
}

/**
 * DecoratePlantsSection Component (Section 2)
 *
 * Optimized single-file component:
 * - Left column: "Decorate your home with plants" heading, description, and 3 white policy feature cards
 * - Right column: Direct potted plant image with larger dimensions and surrounding animated orbital rings
 * - Self-contained, responsive, and performance-optimized with requestAnimationFrame
 */
export const DecoratePlantsSection = memo(function DecoratePlantsSection({ className = "" }) {
  const {
    titleLine1 = "Decorate your",
    titleLine2Prefix = "home ",
    titleLine2Italic = "with plants",
    description = "Praesent egestas tristique nibh. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Fusce convallis metus id felis luctus adipiscing. Integer tincidunt. Etiam imperdiet imperdiet orci",
    features = [],
  } = DECORATE_PLANTS_SECTION_DATA || {};

  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ringsId = `ring-set-${uid}`;
  const clipId = `ring-front-${uid}`;
  const ringRefs = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const apply = (t) => {
      RINGS_CONFIG.forEach((ring, i) => {
        const el = ringRefs.current[i];
        if (el) el.setAttribute("transform", ringTransform(ring, t, 1));
      });
    };

    let raf = 0;
    let start = null;
    const tick = (now) => {
      if (start === null) start = now;
      apply(now - start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      aria-label="Decorate your home with plants"
      className={`w-full bg-[#f9f4ef] py-14 sm:py-16 md:py-20 lg:py-24 overflow-hidden relative ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ================= LEFT COLUMN ================= */}
          <div className="section-reveal-slide-left lg:col-span-6 xl:col-span-6 z-20">
            {/* Heading */}
            <h2 className="font-heading text-[#1f2024] font-normal text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] xl:text-[54px] leading-[1.12] tracking-tight">
              {titleLine1}
              <br />
              {titleLine2Prefix}
              <span className="italic font-normal">{titleLine2Italic}</span>
            </h2>

            {/* Description */}
            <p className="font-sans text-[#767676] text-xs sm:text-sm md:text-[15px] leading-relaxed mt-4 sm:mt-5 max-w-xl">
              {description}
            </p>

            {/* 3 Policy / Feature Cards */}
            <div className="space-y-3.5 sm:space-y-4 mt-6 sm:mt-8 md:mt-10 max-w-md sm:max-w-lg">
              {features.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-xs px-5 py-3.5 sm:px-6 sm:py-4 flex items-center gap-4 sm:gap-5 transition-transform duration-300 hover:shadow-sm"
                >
                  {/* Policy circle icon */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center">
                    <img
                      src={item.icon}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Text content */}
                  <div>
                    <h3 className="font-heading text-[#1f2024] font-normal text-base sm:text-[17px] leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-[13px] text-[#767676] mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Enlarged Plant & Animated Orbiting Rings) ================= */}
          <div className="section-reveal-scale reveal-delay-200 lg:col-span-6 xl:col-span-6 relative flex items-center justify-center min-h-95 sm:min-h-115 md:min-h-130 lg:min-h-145">
            <div className="w-full flex items-center justify-center max-w-140 sm:max-w-165 md:max-w-190 lg:max-w-215 xl:max-w-235 lg:scale-105 xl:scale-110 transition-transform duration-300">
              <svg
                viewBox={VIEWBOX}
                role="img"
                aria-label="Decorate your home with plants potted indoor plant"
                className="w-full h-auto block overflow-visible select-none drop-shadow-sm"
              >
                <defs>
                  <g id={ringsId}>
                    {RINGS_CONFIG.map((ring, i) => (
                      <g
                        key={i}
                        ref={(el) => {
                          ringRefs.current[i] = el;
                        }}
                        transform={ringTransform(ring, 0, 1)}
                      >
                        <ellipse
                          cx={CX}
                          cy={CY}
                          rx={ring.rx}
                          ry={ring.ry}
                          fill="none"
                          stroke="#4f6b5a"
                          strokeWidth={1.8}
                          vectorEffect="non-scaling-stroke"
                        />
                      </g>
                    ))}
                  </g>
                  <clipPath id={clipId}>
                    <rect x="-150" y={FRONT_FROM_Y} width="1300" height="700" />
                  </clipPath>
                </defs>

                {/* 1. Orbiting rings behind the plant leaves */}
                <use href={`#${ringsId}`} />

                {/* 2. Direct plant image with enlarged dimensions */}
                <image
                  href={plantImageSrc}
                  x="0"
                  y="10"
                  width={IMG_W}
                  height={IMG_H}
                  preserveAspectRatio="xMidYMid meet"
                />

                {/* 3. Lower part of the rings passing in front of the pot */}
                <g clipPath={`url(#${clipId})`}>
                  <use href={`#${ringsId}`} />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export const Section2 = DecoratePlantsSection;
export default DecoratePlantsSection;
