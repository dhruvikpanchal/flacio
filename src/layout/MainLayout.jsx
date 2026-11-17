import { Suspense, memo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { ScrollToTop } from "../components/common/ScrollToTop";
import { GlobalCompare } from "../components/common/GlobalCompare";
import { SectionLoader } from "../components/ui/Loader";
import { useSectionReveal } from "../hooks/useSectionReveal";

// Ensure Header and Footer are wrapped with React.memo so they never re-render on page navigation
const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

/**
 * MainLayout Component
 * 
 * Persistent layout wrapper:
 * - Header and Footer stay permanently on screen and NEVER re-render or reload on page change.
 * - Only the main section between them suspends with SectionLoader during route loading.
 * - 150ms fade-in transition on new page content.
 */
export function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const headerVariant = isHomePage ? "auto" : "solid";

  // Auto-activates scroll reveal animations across all pages & dynamically loaded sections
  useSectionReveal();

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-dark font-sans antialiased pb-20 lg:pb-0 overflow-x-hidden w-full">
      {/* ================= PERSISTENT FIXED HEADER ================= */}
      <MemoizedHeader variant={headerVariant} />

      {/* ================= MAIN CONTENT AREA ================= */}
      <main
        className={`flex-1 w-full min-h-[70vh] pt-20 md:pt-22 ${
          isHomePage ? "lg:pt-0" : ""
        }`}
      >
        <Suspense fallback={<SectionLoader />}>
          <div key={location.pathname} className="page-fade-in w-full">
            <Outlet />
          </div>
        </Suspense>
      </main>

      {/* ================= PERSISTENT FOOTER ================= */}
      <MemoizedFooter />

      {/* ================= FLOATING SCROLL TO TOP & COMPARE ================= */}
      <ScrollToTop />
      <GlobalCompare />
    </div>
  );
}

export default MainLayout;
