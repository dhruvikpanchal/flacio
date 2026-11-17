import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SELECTOR =
  ".section-reveal, .section-reveal-up, .section-reveal-scale, .section-reveal-slide-left, .section-reveal-slide-right";

/**
 * useSectionReveal
 * 
 * High-performance, GPU-accelerated IntersectionObserver hook for scroll reveals.
 * Features:
 * - Multi-device safe (mobile, tablet, desktop): positive bottom root margin so sections start animating smoothly as they approach the viewport.
 * - Prevents sticking/delay on initial view: checks rects immediately on mount.
 * - Auto-observes dynamic elements via MutationObserver (e.g. tabs, accordions, or lazy loaded chunks).
 * - Reduced motion safe: immediately marks all revealed if user requests reduced motion.
 */
export function useSectionReveal() {
  const location = useLocation();

  useEffect(() => {
    // Check for SSR or lack of IntersectionObserver support
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        el.classList.add("is-revealed");
      });
      return undefined;
    }

    // Check for user's reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        el.classList.add("is-revealed");
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        // Trigger 60px before entering viewport for a smooth, lag-free glide on all screens
        rootMargin: "0px 0px 60px 0px",
        threshold: 0.01,
      }
    );

    const observeUnrevealed = () => {
      const elements = document.querySelectorAll(SELECTOR);
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((el) => {
        if (el.classList.contains("is-revealed")) return;

        // If element is already in or near the viewport, reveal it immediately
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportHeight + 60 && rect.bottom >= 0) {
          el.classList.add("is-revealed");
        } else {
          observer.observe(el);
        }
      });
    };

    // Run immediately for currently rendered elements
    observeUnrevealed();

    // Staggered delays to catch React.lazy and Suspense chunk mounts
    const t1 = setTimeout(observeUnrevealed, 50);
    const t2 = setTimeout(observeUnrevealed, 150);
    const t3 = setTimeout(observeUnrevealed, 350);

    // Watch for dynamically rendered child components (tabs, accordions, lazy chunks)
    const mutationObserver = new MutationObserver(() => {
      observeUnrevealed();
    });

    if (document.body) {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style", "hidden"],
      });
    }

    window.addEventListener("resize", observeUnrevealed, { passive: true });
    window.addEventListener("orientationchange", observeUnrevealed, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", observeUnrevealed);
      window.removeEventListener("orientationchange", observeUnrevealed);
    };
  }, [location.pathname, location.search]);
}

export default useSectionReveal;

