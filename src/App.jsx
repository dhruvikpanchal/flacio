import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { ScrollToTopOnNavigate } from "./components/common/ScrollToTopOnNavigate";

function App() {
  useEffect(() => {
    let timeoutId;
    // Wait for two requestAnimationFrames (after DOM paint is ready)
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        const bootLoader = document.getElementById("boot-loader");
        if (!bootLoader) return;
        bootLoader.style.transition = "opacity 200ms ease-out";
        bootLoader.style.opacity = "0";
        timeoutId = setTimeout(() => {
          bootLoader.remove();
        }, 200);
      });

      return () => cancelAnimationFrame(raf2);
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTopOnNavigate />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
