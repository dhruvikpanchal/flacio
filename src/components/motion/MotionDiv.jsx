import { useCallback, useRef } from "react";

/**
 * MotionDiv Component
 * A reusable, high-performance motion wrapper designed specifically for the
 * smooth horizontal sway hover effect (slides left -> slides right -> returns smoothly to base position).
 *
 * Optimized:
 * - Uses native Web Animations API directly on DOM ref for 60/120fps hardware-accelerated performance
 * - Causes ZERO React re-renders during animation
 * - Pointer-events isolation prevents mouse jitter / cancellation across all browsers (including Chrome)
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be animated inside
 * @param {string} [props.className] - Optional container classes
 * @param {number} [props.distance=15] - Horizontal swing distance in pixels
 * @param {number} [props.duration=450] - Total animation duration in milliseconds
 */
export function MotionDiv({
  children,
  className = "",
  distance = 15,
  duration = 450,
  direction = "horizontal",
  fullWidth = false,
  fullHeight = false,
  ...rest
}) {
  const targetRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const handleMouseEnter = useCallback(() => {
    const el = targetRef.current;
    if (!el || isAnimatingRef.current) return;

    // Check for native Web Animations API support
    if (typeof el.animate === "function") {
      isAnimatingRef.current = true;

      const isVertical = direction === "vertical";
      const keyframes = isVertical
        ? [
            { transform: "translateY(0px)" },
            { transform: `translateY(-${distance}px)`, offset: 0.3 },
            { transform: `translateY(${distance}px)`, offset: 0.7 },
            { transform: "translateY(0px)", offset: 1.0 },
          ]
        : [
            { transform: "translateX(0px)" },
            { transform: `translateX(-${distance}px)`, offset: 0.3 },
            { transform: `translateX(${distance}px)`, offset: 0.7 },
            { transform: "translateX(0px)", offset: 1.0 },
          ];

      const animation = el.animate(keyframes, {
        duration,
        easing: "ease-in-out",
        fill: "forwards",
      });

      const resetTransform = () => {
        isAnimatingRef.current = false;
        el.style.transform = isVertical ? "translateY(0px)" : "translateX(0px)";
      };

      animation.onfinish = resetTransform;
      animation.oncancel = resetTransform;
    }
  }, [distance, duration, direction]);

  const isFull = fullWidth || className.includes("w-full");
  const isFullHeight = fullHeight || className.includes("h-full");

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className={`relative ${isFull ? "flex w-full" : "inline-flex"} ${isFullHeight ? "h-full" : ""} items-center justify-center cursor-pointer select-none ${className}`}
      {...rest}
    >
      <div
        ref={targetRef}
        style={{
          display: isFull ? "flex" : "inline-flex",
          width: isFull ? "100%" : "auto",
          height: isFullHeight ? "100%" : "auto",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default MotionDiv;
