import { memo } from "react";

/**
 * SectionReveal Component
 * Declarative wrapper for scroll reveals with 3 distinct varieties:
 * - variant="up" (default): Elegant botanical rise (translateY)
 * - variant="scale": Soft optical zoom (scale + translateY)
 * - variant="slide-left": Slide in from left
 * - variant="slide-right": Slide in from right
 */
export const SectionReveal = memo(function SectionReveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Component = "section",
  ...props
}) {
  const variantClass =
    variant === "scale"
      ? "section-reveal-scale"
      : variant === "slide-left"
      ? "section-reveal-slide-left"
      : variant === "slide-right"
      ? "section-reveal-slide-right"
      : "section-reveal-up";

  const delayClass =
    delay === 100
      ? "reveal-delay-100"
      : delay === 200
      ? "reveal-delay-200"
      : delay === 300
      ? "reveal-delay-300"
      : delay === 400
      ? "reveal-delay-400"
      : delay === 500
      ? "reveal-delay-500"
      : "";

  return (
    <Component
      className={`${variantClass} ${delayClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
});

export default SectionReveal;

