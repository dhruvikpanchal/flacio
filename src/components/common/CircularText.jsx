import { useId } from "react";

/**
 * CircularText
 * Reusable UI component that renders text along a circular path with infinite clockwise rotation.
 * Fully configurable with props for text, size, speed, colors, and center content.
 *
 * @param {string} text - The text to display in the circle (default: "DISCOVER OUR FAVORITES • ")
 * @param {number|string} size - Overall width/height of the badge in pixels or CSS units (default: 140)
 * @param {number} radius - Radius of the text path within the 200x200 viewBox (default: 68)
 * @param {number} speed - Seconds per full 360deg rotation (default: 18)
 * @param {string} color - Text color (default: "#224229" brand green)
 * @param {string} fontSize - Font size in SVG units (default: "13px")
 * @param {string} fontWeight - Font weight (default: "600")
 * @param {string} letterSpacing - Letter spacing (default: "0.22em")
 * @param {string} direction - "clockwise" | "counter-clockwise" (default: "clockwise")
 * @param {boolean} pauseOnHover - Pause rotation when hovered (default: false)
 * @param {React.ReactNode} centerContent - Optional icon or element to render in the center
 * @param {string} className - Optional wrapper class name
 * @param {React.CSSProperties} style - Optional wrapper inline styles
 */
export function CircularText({
  text = "DISCOVER OUR FAVORITES",
  size = null,
  radius = 65,
  speed = 18,
  color = "#224229",
  fontSize = "12.5px",
  fontWeight = "700",
  letterSpacing = "0.2em",
  direction = "clockwise",
  pauseOnHover = false,
  centerContent = null,
  className = "",
  style = {},
  ...props
}) {
  const pathId = useId().replace(/:/g, "_");
  const viewBoxSize = 200;
  const center = viewBoxSize / 2;

  // Clockwise circular path:
  // Starts at top center (center, center - radius) and draws a clockwise circle
  const pathD = `M ${center}, ${center} m 0, -${radius} a ${radius},${radius} 0 1,1 0,${2 * radius} a ${radius},${radius} 0 1,1 0,-${2 * radius}`;

  // Circumference for even distribution
  const circumference = 2 * Math.PI * radius;

  // Guarantee clean spacing between the last word and first word in the circular loop.
  // Standard trailing whitespace is collapsed by SVG parsers, so we append non-breaking spaces (\u00A0\u00A0).
  const processedText = (text || "DISCOVER OUR FAVORITES").trimEnd() + "\u00A0\u00A0";

  // Rotation animation names
  const isClockwise = direction === "clockwise";
  const animationName = isClockwise
    ? "circularTextSpin"
    : "circularTextSpinReverse";

  // If size is provided as a number or string, apply it inline.
  // Otherwise, default to 135px if no Tailwind width/height class is provided in className.
  const hasInlineSize = size !== null && size !== undefined && size !== "auto";
  const defaultSizeClass =
    !hasInlineSize && !className.includes("w-") && !className.includes("h-")
      ? "w-[135px] h-[135px]"
      : "";

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${defaultSizeClass} ${className}`}
      style={{
        ...(hasInlineSize
          ? {
              width: typeof size === "number" ? `${size}px` : size,
              height: typeof size === "number" ? `${size}px` : size,
            }
          : {}),
        ...style,
      }}
      aria-label={text}
      role="img"
      {...props}
    >
      <style>{`
        @keyframes circularTextSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes circularTextSpinReverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>

      {/* Rotating container with GPU acceleration and explicit center origin */}
      <div
        className="force-animate w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          animationName,
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: pauseOnHover ? "paused" : "running",
          transformOrigin: "50% 50%",
          WebkitTransformOrigin: "50% 50%",
          willChange: "transform",
        }}
      >
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="w-full h-full overflow-visible block"
        >
          <defs>
            <path id={pathId} d={pathD} fill="none" />
          </defs>

          <text
            fill={color}
            xmlSpace="preserve"
            style={{
              fontSize,
              fontWeight,
              letterSpacing,
              fontFamily: "var(--font-sans, 'Poppins', sans-serif)",
              textTransform: "uppercase",
            }}
          >
            <textPath
              href={`#${pathId}`}
              startOffset="0%"
              textLength={circumference}
              lengthAdjust="spacing"
            >
              {processedText}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Optional center content (icon, dot, arrow) - does NOT rotate with text */}
      {centerContent && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          {centerContent}
        </div>
      )}
    </div>
  );
}

export default CircularText;
