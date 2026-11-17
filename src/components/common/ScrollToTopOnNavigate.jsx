import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Route change scroll restoration component.
 * Must be mounted inside <BrowserRouter>.
 * Automatically resets window scroll to the top instantly on navigation.
 */
export function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

export default ScrollToTopOnNavigate;
