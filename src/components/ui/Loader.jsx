import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { useDelayedFallback } from "../../hooks/useDelayedFallback";

/**
 * Size configuration for spinners and loaders
 */
const SIZES = {
  xs: { icon: "w-3.5 h-3.5", dot: "w-1.5 h-1.5", text: "text-xs", num: 14 },
  sm: { icon: "w-4 h-4", dot: "w-2 h-2", text: "text-xs", num: 18 },
  md: { icon: "w-6 h-6", dot: "w-2.5 h-2.5", text: "text-sm", num: 24 },
  lg: { icon: "w-9 h-9", dot: "w-3 h-3", text: "text-base", num: 36 },
  xl: { icon: "w-12 h-12", dot: "w-4 h-4", text: "text-lg", num: 48 },
};

/**
 * Color variants mapped to the theme
 */
const COLORS = {
  current: "text-current",
  primary: "text-[#282828] dark:text-neutral-100",
  green: "text-[#224229]",
  white: "text-white",
  muted: "text-[#828787]",
};

/**
 * SectionLoader Component
 * Specifically designed for route/page transitions between persistent Header and Footer.
 * Not fullscreen, solid white, fills main area (min-h-[60vh]).
 * Delayed by 150ms to prevent flashing on fast page transitions.
 */
export function SectionLoader({
  text = "Loading...",
  className = "",
  delay = 150,
  minDuration = 300,
  ...props
}) {
  const show = useDelayedFallback(delay, minDuration);

  if (!show) {
    return <div className="min-h-[60vh] w-full bg-white" aria-hidden="true" />;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className={cn(
        "flex flex-col items-center justify-center min-h-[60vh] w-full bg-white select-none border-0 outline-none",
        className
      )}
      {...props}
    >
      <div
        className="w-9 h-9 border-[3px] border-[#e2e8f0] border-t-brand-green rounded-full animate-spin will-change-transform shrink-0"
        aria-hidden="true"
      />
      {text && (
        <span className="mt-3.5 text-sm font-sans font-medium text-brand-dark tracking-wide">
          {text}
        </span>
      )}
    </div>
  );
}

/**
 * Primary Reusable Loader Component
 *
 * @param {string} variant - "inline" | "center" | "overlay" | "fullscreen"
 * @param {string} animation - "spinner" | "dots" | "ring" | "pulse"
 * @param {string|number} size - "xs" | "sm" | "md" | "lg" | "xl" or pixel number
 * @param {string} color - "current" | "primary" | "green" | "white" | "muted"
 * @param {string} text - Optional loading caption
 * @param {string} textPosition - "bottom" | "right"
 * @param {string} className - Additional CSS classes
 * @param {string} label - Accessibility screen-reader label
 * @param {React.ReactNode} icon - Custom icon override (e.g. from lucide-react)
 * @param {Object} style - Custom inline styles merged cleanly into fallbackStyles
 */
export function Loader({
  variant = "inline",
  animation = "spinner",
  size = "md",
  color = "current",
  text,
  textPosition = "bottom",
  className = "",
  label = "Loading...",
  icon: CustomIcon,
  children,
  style,
  ...props
}) {
  const sizeConfig = typeof size === "string" && SIZES[size] ? SIZES[size] : SIZES.md;
  const colorClass = COLORS[color] || COLORS.current;

  // Custom icon pixel size if passed as number or string
  const customIconSize = typeof size === "number" ? size : sizeConfig.num;

  // Wrapper layout based on variant (removed backdrop-blur and transition-all for maximum GPU render performance)
  const variantStyles = {
    inline: "inline-flex items-center gap-2",
    center: "flex flex-col items-center justify-center p-6 w-full",
    overlay:
      "absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/75",
    fullscreen:
      "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white",
  };

  const isRowLayout = textPosition === "right" && variant !== "fullscreen";

  // Render the animated element based on animation type
  const renderVisual = () => {
    if (CustomIcon) {
      return (
        <CustomIcon
          size={customIconSize}
          className={cn("animate-spin will-change-transform shrink-0", colorClass)}
          aria-hidden="true"
        />
      );
    }

    switch (animation) {
      case "dots":
        return (
          <div
            className="flex items-center gap-1.5 shrink-0"
            aria-hidden="true"
          >
            <span
              className={cn(
                "rounded-full bg-current animate-bounce shrink-0",
                sizeConfig.dot,
                colorClass
              )}
              style={{ animationDelay: "0ms", animationDuration: "900ms" }}
            />
            <span
              className={cn(
                "rounded-full bg-current animate-bounce shrink-0",
                sizeConfig.dot,
                colorClass
              )}
              style={{ animationDelay: "180ms", animationDuration: "900ms" }}
            />
            <span
              className={cn(
                "rounded-full bg-current animate-bounce shrink-0",
                sizeConfig.dot,
                colorClass
              )}
              style={{ animationDelay: "360ms", animationDuration: "900ms" }}
            />
          </div>
        );

      case "ring":
        return (
          <svg
            className={cn("animate-spin will-change-transform shrink-0", sizeConfig.icon, colorClass)}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={typeof size === "number" ? { width: size, height: size } : undefined}
          >
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-80"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        );

      case "pulse":
        return (
          <div
            className={cn(
              "relative flex items-center justify-center shrink-0",
              sizeConfig.icon,
              colorClass
            )}
            style={typeof size === "number" ? { width: size, height: size } : undefined}
            aria-hidden="true"
          >
            <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-25 animate-ping" />
            <span className="relative inline-flex rounded-full h-2/3 w-2/3 bg-current opacity-90" />
          </div>
        );

      case "spinner":
      default:
        return (
          <Loader2
            size={customIconSize}
            style={color === "green" ? { color: "#224229" } : undefined}
            className={cn("animate-spin will-change-transform shrink-0", colorClass)}
            aria-hidden="true"
          />
        );
    }
  };

  // Explicitly separate style prop and merge safely into fallbackStyles without {...props} overwriting it
  const fallbackStyles =
    variant === "fullscreen"
      ? {
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          border: "none",
          outline: "none",
          ...style,
        }
      : { border: "none", outline: "none", ...style };

  const displayText = text || children;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      style={fallbackStyles}
      className={cn(
        variantStyles[variant] || variantStyles.inline,
        "border-0 outline-none",
        isRowLayout ? "flex-row" : "flex-col",
        className
      )}
      {...props}
    >
      {renderVisual()}

      {displayText ? (
        <span
          style={{ border: "none", outline: "none", background: "transparent" }}
          className={cn(
            "font-sans font-medium tracking-wide select-none text-brand-dark border-0 outline-none",
            sizeConfig.text,
            isRowLayout ? "ml-1.5" : "mt-2.5"
          )}
        >
          {displayText}
        </span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </div>
  );
}

/**
 * Fullscreen Page Loader
 */
export function PageLoader({
  text = "Loading page...",
  color = "green",
  size = "lg",
  animation = "spinner",
  className = "",
  style,
  ...props
}) {
  return (
    <Loader
      variant="fullscreen"
      animation={animation}
      size={size}
      color={color}
      text={text}
      style={style}
      className={cn("z-50 bg-white", className)}
      {...props}
    />
  );
}

/**
 * Convenient Container / Card Overlay Loader
 */
export function OverlayLoader({
  text,
  color = "primary",
  size = "md",
  animation = "spinner",
  className = "",
  style,
  ...props
}) {
  return (
    <Loader
      variant="overlay"
      animation={animation}
      size={size}
      color={color}
      text={text}
      style={style}
      className={className}
      {...props}
    />
  );
}

/**
 * Convenient Inline Button Loader
 */
export function ButtonLoader({
  size = "sm",
  color = "current",
  text,
  className = "",
  style,
  ...props
}) {
  return (
    <Loader
      variant="inline"
      animation="spinner"
      size={size}
      color={color}
      text={text}
      textPosition="right"
      style={style}
      className={cn("pointer-events-none", className)}
      {...props}
    />
  );
}

// Attach sub-components for flexible dot-notation usage
Loader.Page = PageLoader;
Loader.Overlay = OverlayLoader;
Loader.Button = ButtonLoader;
Loader.Section = SectionLoader;

export default Loader;
