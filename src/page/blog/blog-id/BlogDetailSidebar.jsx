import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { productCollections, blogArticles } from "../../../data/blog";
import { BlogSearchForm } from "../../../components/form/BlogSearchForm";

/**
 * Inner Sidebar Content - Shared between desktop sidebar & mobile drawer
 */
function SidebarInnerContent({ currentArticle, onSearch, onCloseDrawer }) {

  // Find related articles (same category or recent)
  const relatedArticles = blogArticles
    .filter((a) => a.id === currentArticle?.id || a.category === currentArticle?.category)
    .slice(0, 3);

  // Fallback to all if empty
  const displayArticles =
    relatedArticles.length > 0 ? relatedArticles : blogArticles.slice(0, 3);

  // Article tags (prefer current post tags)
  const tags =
    currentArticle?.tags && currentArticle.tags.length > 0
      ? currentArticle.tags
      : ["Beauty", "Cosmetic", "Simple"];

  return (
    <div className="w-full font-sans space-y-8 sm:space-y-10">
      {/* ================= 1. SEARCH BAR (MOVED TO COMPONENTS/FORM) ================= */}
      <div>
        <BlogSearchForm
          id="blog-detail-search-input"
          onSearch={(q) => onSearch?.(q)}
        />
      </div>

      {/* ================= 2. CATEGORIES ================= */}
      <div>
        <h3 className="font-heading font-normal text-xl text-[#1c1c1c] mb-4 sm:mb-5 tracking-tight">
          Categories
        </h3>
        <ul className="space-y-3.5 text-[14px]">
          {productCollections.map((col) => (
            <li key={col.title}>
              <Link
                to={col.url}
                onClick={onCloseDrawer}
                className="group flex items-center gap-2 text-[#555555] hover:text-brand-green transition-colors duration-200"
              >
                <ChevronRight className="w-3.5 h-3.5 text-[#767676] transition-transform duration-200 group-hover:text-brand-green group-hover:translate-x-0.5 shrink-0" />
                <span className="group-hover:underline">{col.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ================= 3. RELATED ARTICLES ================= */}
      <div>
        <h3 className="font-heading font-normal text-xl text-[#1c1c1c] mb-4 sm:mb-5 tracking-tight">
          Related Articles
        </h3>
        <div className="space-y-5">
          {displayArticles.map((article) => (
            <article key={article.id} className="flex items-start gap-3.5 group">
              {/* Thumbnail */}
              <Link
                to={article.url}
                onClick={onCloseDrawer}
                className="w-20 h-20 shrink-0 bg-[#f4f4f4] overflow-hidden rounded-none block"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full min-h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </Link>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#767676] block mb-1">
                  {article.categoryTitle || article.category}
                </span>
                <Link
                  to={article.url}
                  onClick={onCloseDrawer}
                  className="font-sans text-[13.5px] font-normal leading-snug text-[#1c1c1c] hover:text-brand-green transition-colors line-clamp-2 block mb-1"
                >
                  {article.title}
                </Link>
                <span className="text-xs font-sans text-[#767676] block">
                  {article.comments} {article.comments === 1 ? "comment" : "comments"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ================= 4. ARTICLES TAGS ================= */}
      <div>
        <h3 className="font-heading font-normal text-xl text-[#1c1c1c] mb-4 sm:mb-5 tracking-tight">
          Articles Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/blog?tag=${tag.toLowerCase()}`}
              onClick={onCloseDrawer}
              className="inline-block border border-[#e5e5e5] px-4 py-2 text-xs font-sans text-[#555555] hover:border-[#1c1c1c] hover:text-[#1c1c1c] transition-colors bg-white rounded-none"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Step-2: Section-2 Sidebar Component
 * - Directly shown on Desktop (hidden lg:block)
 * - On Mobile & Tablet: rendered via trigger button + off-canvas slide-over drawer
 */
export const BlogDetailSidebar = memo(function BlogDetailSidebar({ currentArticle }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Close drawer on ESC and prevent background body scrolling
  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  const handleClose = () => setIsDrawerOpen(false);

  return (
    <>
      {/* ================= MOBILE / TABLET TRIGGER BUTTON ================= */}
      <div className="lg:hidden w-full mb-6 flex items-center justify-between pb-4 border-b border-[#eeeeee]">
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="inline-flex items-center gap-2.5 px-4 py-2 border border-[#1c1c1c] text-[#1c1c1c] text-xs uppercase tracking-wider font-sans font-medium hover:bg-[#1c1c1c] hover:text-white transition-colors cursor-pointer select-none"
          aria-label="Open Blog Sidebar and Categories"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Sidebar & Categories</span>
        </button>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        aria-label="Blog Detail Desktop Sidebar"
        className="hidden lg:block w-70 xl:w-75 shrink-0 sticky top-28 self-start"
      >
        <div className="section-reveal-slide-left w-full">
          <SidebarInnerContent
            currentArticle={currentArticle}
            onCloseDrawer={handleClose}
          />
        </div>
      </aside>

      {/* ================= MOBILE / TABLET OFF-CANVAS DRAWER ================= */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-full max-w-80 sm:max-w-90 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-out">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#eeeeee]">
              <span className="font-heading text-lg font-normal text-[#1c1c1c]">
                Blog Navigation
              </span>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close sidebar"
                className="p-1.5 text-[#555555] hover:text-[#1c1c1c] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 flacio-scrollbar">
              <SidebarInnerContent
                currentArticle={currentArticle}
                onCloseDrawer={handleClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default BlogDetailSidebar;
