import { useState, useEffect, useCallback, memo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { BlogSidebar } from "./BlogSidebar";
import { BlogCard } from "./BlogCard";
import {
  BLOG_HEADER_OPTIONS,
  BLOG_PAGE_CONFIG,
  normalizeCategorySlug,
  getBlogsByCategory,
} from "../../data/blog";

/**
 * Blog Page Component
 *
 * Requirements:
 * 1. Reads category from URL (e.g. /blogs/fashion, /blogs/shorts, /blogs/news) or query params.
 * 2. Highlights active category option in top PageHeader and sidebar.
 * 3. Shows BlogSidebar on desktop left side.
 * 4. On tablet and mobile, provides a dedicated "Filter & Categories" button with Lucide icon
 *    that smoothly opens an off-canvas drawer.
 * 5. Main content container displays the responsive list of blog article cards for the current category.
 */
export const Blog = memo(function Blog() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Find active category from URL or fallback to default configured category (fashion)
  const queryCategory = searchParams.get("category");
  const rawCategory =
    category || queryCategory || BLOG_PAGE_CONFIG?.defaultCategory || "fashion";
  const activeCategory = normalizeCategorySlug(rawCategory);

  // Retrieve articles for the active category directly
  const categoryArticles = getBlogsByCategory(activeCategory);

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Close mobile drawer on ESC key and prevent body scroll when open
  useEffect(() => {
    if (!isMobileDrawerOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isMobileDrawerOpen]);

  // Ensure the URL always displays /blog?category=fashion by default if no category is in the URL
  useEffect(() => {
    if (!category && !queryCategory) {
      navigate(
        `/blog?category=${BLOG_PAGE_CONFIG?.defaultCategory || "fashion"}`,
        {
          replace: true,
        },
      );
    }
  }, [category, queryCategory, navigate]);

  const handleCategorySelect = useCallback(
    (slug) => {
      const normalized = normalizeCategorySlug(slug);
      navigate(`/blog?category=${normalized}`);
      setIsMobileDrawerOpen(false);
    },
    [navigate],
  );

  return (
    <div className="w-full bg-white min-h-[calc(100vh-280px)]">
      {/* ================= 1. TOP SECTION: PAGE HEADER ================= */}
      <PageHeader
        title="Blogs"
        options={BLOG_HEADER_OPTIONS}
        activeOption={activeCategory}
        onOptionClick={() => {
          setIsMobileDrawerOpen(false);
        }}
      />

      {/* ================= 2. MAIN BLOG CONTENT & SIDEBAR ================= */}
      <section
        aria-label="Blog Content Area"
        className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 md:py-16"
      >
        {/* Mobile & Tablet Toggle Button */}
        <div className="lg:hidden mb-6 flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            aria-label="Open Blog Filter and Categories"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-[13px] font-sans font-medium tracking-wide uppercase text-brand-dark bg-white border border-brand-border hover:border-brand-dark transition-all duration-200 cursor-pointer shadow-xs select-none"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-dark stroke-2" />
            <span>Filter & Categories</span>
          </button>

          <span className="text-xs sm:text-[13px] font-sans text-brand-muted uppercase tracking-wider">
            Category:{" "}
            <strong className="text-brand-dark font-medium capitalize">
              {activeCategory.replace(/-/g, " ")}
            </strong>
          </span>
        </div>

        {/* Desktop 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Left: Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3.5 2xl:col-span-3 sticky top-28">
            <div className="section-reveal-slide-left w-full">
              <BlogSidebar
                activeCategory={activeCategory}
                onSelectCategory={handleCategorySelect}
              />
            </div>
          </div>

          {/* Right: Main Content Area */}
          <div className="section-reveal-up reveal-delay-100 lg:col-span-8 xl:col-span-8.5 2xl:col-span-9">
            <div className="w-full">
              {categoryArticles && categoryArticles.length > 0 ? (
                <div className="flex flex-col">
                  {categoryArticles.map((article) => (
                    <BlogCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="py-16 sm:py-20 text-center border border-dashed border-brand-border bg-[#fafafa]/50">
                  <p className="font-sans text-sm sm:text-base text-brand-muted select-none">
                    No articles found for category{" "}
                    <strong className="text-brand-dark capitalize">
                      {activeCategory.replace(/-/g, " ")}
                    </strong>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. MOBILE & TABLET SLIDE-OVER DRAWER ================= */}
      {isMobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Filter and Categories Sidebar"
        >
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Drawer content container */}
          <div className="relative w-full max-w-80 sm:max-w-90 bg-white h-full overflow-y-auto shadow-2xl p-6 z-10 flex flex-col transition-transform duration-300 ease-out">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-brand-border">
              <h3 className="font-heading text-xl text-brand-dark">
                Categories & Filter
              </h3>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                aria-label="Close sidebar"
                className="p-1 text-brand-dark hover:text-brand-green transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-2" />
              </button>
            </div>

            {/* Sidebar Component */}
            <BlogSidebar
              activeCategory={activeCategory}
              onSelectCategory={handleCategorySelect}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default Blog;
