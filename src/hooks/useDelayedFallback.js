import { useState, useEffect } from "react";

/**
 * Hook to delay showing fallback to prevent flashing on fast loads (<delay ms),
 * and ensure it stays visible once shown.
 */
export function useDelayedFallback(delay = 150, minDuration = 300) {
  const [show, setShow] = useState(() => delay <= 0);

  useEffect(() => {
    if (delay <= 0) return undefined;

    let minTimer = null;
    const showTimer = setTimeout(() => {
      setShow(true);
      if (minDuration > 0) {
        minTimer = setTimeout(() => {
          // Keep active through minDuration window if needed
        }, minDuration);
      }
    }, delay);

    return () => {
      clearTimeout(showTimer);
      if (minTimer) clearTimeout(minTimer);
    };
  }, [delay, minDuration]);

  return delay <= 0 || show;
}

export default useDelayedFallback;
