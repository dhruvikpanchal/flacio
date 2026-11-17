import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./Icons";

/**
 * Global ScrollToTop Button
 * - Appears with smooth fade-in after user scrolls down (> 250px)
 * - Fixed position: bottom-20 on mobile (to clear bottom nav) and lg:bottom-8 on desktop
 * - Smoothly scrolls to top on click
 * - Responsive, accessible, and styled with theme tokens
 */
export function ScrollToTop({ threshold = 250 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`fixed right-6 z-40 w-10 h-10 bg-white border border-brand-dark text-brand-dark hover:bg-brand-green hover:text-white hover:border-brand-green flex items-center justify-center shadow-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 ${
        isVisible
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none translate-y-4"
      } bottom-20 lg:bottom-8`}
    >
      <ArrowUpIcon className="w-4 h-4" />
    </button>
  );
}

export default ScrollToTop;
