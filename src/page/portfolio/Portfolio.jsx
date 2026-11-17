import { useState, useMemo, useCallback, memo, useEffect } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { Columns2, Columns3, Columns4, LayoutGrid } from "lucide-react";
import { PortfolioCard } from "../../components/ui/PortfolioCard";
import { Loader } from "../../components/ui/Loader";
import { portfolioTags, getItemsByTag } from "../../data/portfolio";

const LAYOUTS = [
  { id: "2-columns", label: "2 Columns", icon: Columns2 },
  { id: "3-columns", label: "3 Columns", icon: Columns3 },
  { id: "4-columns", label: "4 Columns", icon: Columns4 },
  { id: "masonry", label: "Masonry", icon: LayoutGrid },
];

const DEFAULT_DESKTOP_LAYOUT = "2-columns";

/**
 * Portfolio Page Component
 *
 * Implements the Portfolio page according to requirements:
 * - Desktop Sub-Layout Options: Users can switch between 2 Columns, 3 Columns,
 *   4 Columns, and Masonry Layout.
 * - Direct visit fallback: If a user navigates directly to /portfolio, it automatically
 *   opens with the default layout ("2-columns", matching reference screenshot).
 * - Tablet & Mobile: Sub-layout options are hidden; uses a clean, responsive default
 *   layout (1 column on mobile, 2 columns on tablet).
 * - Filter categories from src/data/portfolio.js: All, Baber, Baby Needs, Beauty,
 *   Cosmetic, Hot, New, Organic, Simple with active underline indicator.
 * - Uses PortfolioCard for rich card presentation.
 */
export const Portfolio = memo(function Portfolio() {
  const { layout: paramLayout } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Determine active desktop layout (from URL param, query param, or default)
  const currentLayoutId = useMemo(() => {
    const validIds = LAYOUTS.map((l) => l.id);
    if (paramLayout && validIds.includes(paramLayout)) return paramLayout;
    const queryLayout = searchParams.get("layout");
    if (queryLayout && validIds.includes(queryLayout)) return queryLayout;
    return DEFAULT_DESKTOP_LAYOUT;
  }, [paramLayout, searchParams]);

  const [activeLayout, setActiveLayout] = useState(currentLayoutId);

  useEffect(() => {
    setActiveLayout(currentLayoutId);
  }, [currentLayoutId]);

  // If a portfolio item slug was passed as the :layout param, redirect to portfolio detail
  useEffect(() => {
    const validIds = LAYOUTS.map((l) => l.id);
    if (paramLayout && !validIds.includes(paramLayout)) {
      navigate(`/portfolio-id/${paramLayout}`, { replace: true });
    }
  }, [paramLayout, navigate]);

  // Active category filter tag
  const [activeTag, setActiveTag] = useState("all");
  const [isFiltering, setIsFiltering] = useState(false);

  // Switch layout on desktop
  const handleSelectLayout = useCallback(
    (layoutId) => {
      setActiveLayout(layoutId);
      navigate(`/portfolio/${layoutId}`, { replace: true });
    },
    [navigate]
  );

  // Switch tag filter
  const handleTagChange = useCallback(
    (tagId) => {
      if (tagId === activeTag) return;
      setIsFiltering(true);
      setActiveTag(tagId);
      setTimeout(() => {
        setIsFiltering(false);
      }, 180);
    },
    [activeTag]
  );

  // Filter items based on active tag using instant O(1) cached lookup
  const filteredItems = useMemo(() => {
    return getItemsByTag(activeTag);
  }, [activeTag]);

  // Determine grid classes based on active layout
  const getGridClasses = () => {
    switch (activeLayout) {
      case "2-columns":
        // 1 col on mobile, 2 cols on tablet & desktop
        return "grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-12 sm:gap-y-16";
      case "3-columns":
        // 1 col on mobile, 2 cols on tablet, 3 cols on desktop
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-14";
      case "4-columns":
        // 1 col on mobile, 2 cols on tablet, 4 cols on desktop
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 sm:gap-x-6 gap-y-8 sm:gap-y-12";
      case "masonry":
        // Staggered masonry layout for desktop, responsive grid for smaller screens
        return "columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 [column-fill:_balance]";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14";
    }
  };

  const isMasonry = activeLayout === "masonry";

  return (
    <div className="w-full bg-white min-h-[calc(100vh-280px)] font-sans pb-20 sm:pb-28">
      {/* ================= PAGE HEADER & BREADCRUMB ================= */}
      <section className="pt-8 sm:pt-12 pb-4 text-center">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-neutral-500 mb-5"
          >
            <Link
              to="/"
              className="hover:text-black transition-colors underline-offset-4 hover:underline"
            >
              Home
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-900 font-medium">Portfolio</span>
          </nav>

          {/* Page Title (Matching Screenshot) */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[54px] font-normal text-[#1c1c1c] tracking-tight mb-8">
            Portfolio
          </h1>

          {/* ================= CATEGORY FILTER TABS ================= */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 md:gap-x-9 gap-y-3 select-none text-xs sm:text-[13px] md:text-sm">
            {/* "All" button */}
            <button
              type="button"
              onClick={() => handleTagChange("all")}
              className={`pb-1 transition-all duration-200 cursor-pointer ${
                activeTag === "all"
                  ? "text-[#1c1c1c] font-medium border-b border-[#1c1c1c]"
                  : "text-[#666666] hover:text-[#1c1c1c] border-b border-transparent"
              }`}
            >
              All
            </button>

            {/* Individual tags from portfolio.js */}
            {portfolioTags.map((tag) => {
              const isActive = activeTag === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagChange(tag.id)}
                  className={`pb-1 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-[#1c1c1c] font-medium border-b border-[#1c1c1c]"
                      : "text-[#666666] hover:text-[#1c1c1c] border-b border-transparent"
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>

          {/* ================= DESKTOP SUB-LAYOUT SWITCHER (DESKTOP ONLY) ================= */}
          {/* Hidden on tablet & mobile; desktop users can switch between 2-Cols, 3-Cols, 4-Cols, Masonry */}
          <div className="hidden lg:flex items-center justify-end max-w-360 mx-auto mt-6 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mr-3">
              <span>Layout:</span>
            </div>
            <div
              className="inline-flex items-center bg-[#f7f7f7] p-1 border border-neutral-200/80 rounded-none gap-1"
              role="group"
              aria-label="Portfolio grid layout switcher"
            >
              {LAYOUTS.map((layout) => {
                const IconComponent = layout.icon;
                const isActive = activeLayout === layout.id;
                return (
                  <button
                    key={layout.id}
                    type="button"
                    onClick={() => handleSelectLayout(layout.id)}
                    aria-label={`Switch to ${layout.label} layout`}
                    title={layout.label}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white text-neutral-900 shadow-xs font-semibold"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span className="hidden xl:inline">{layout.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO ITEMS GALLERY ================= */}
      <section
        aria-label="Portfolio projects"
        className="section-reveal-scale max-w-360 mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8"
      >
        {isFiltering ? (
          <div className="py-24 flex justify-center">
            <Loader
              variant="center"
              animation="dots"
              color="green"
              text="Updating projects..."
            />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className={getGridClasses()}>
            {filteredItems.map((item, index) => {
              if (isMasonry) {
                // In masonry mode, stagger heights and prevent break-inside
                const aspectRatios = [
                  "aspect-[4/5]",
                  "aspect-[16/10]",
                  "aspect-square",
                  "aspect-[4/3]",
                ];
                const customRatio = aspectRatios[index % aspectRatios.length];
                return (
                  <div
                    key={item.id}
                    className="mb-8 break-inside-avoid animate-in fade-in duration-300"
                  >
                    <PortfolioCard item={item} aspectRatio={customRatio} />
                  </div>
                );
              }

              // Normal grid mode: assign aspect ratio matching the layout
              const cardRatio =
                activeLayout === "2-columns"
                  ? "aspect-[16/10]"
                  : activeLayout === "4-columns"
                  ? "aspect-[4/3.2]"
                  : "aspect-[4/3.5]";

              return (
                <div
                  key={item.id}
                  className="animate-in fade-in duration-300 flex"
                >
                  <PortfolioCard item={item} aspectRatio={cardRatio} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#fafafa] border border-dashed border-neutral-200 max-w-2xl mx-auto px-6">
            <p className="font-sans text-sm text-neutral-500 mb-4">
              No portfolio projects found in the "{activeTag}" category.
            </p>
            <button
              type="button"
              onClick={() => handleTagChange("all")}
              className="inline-block bg-[#1c1c1c] hover:bg-neutral-800 text-white text-xs uppercase tracking-wider px-6 py-2.5 transition-colors cursor-pointer font-medium"
            >
              View All Projects
            </button>
          </div>
        )}
      </section>
    </div>
  );
});

export default Portfolio;
