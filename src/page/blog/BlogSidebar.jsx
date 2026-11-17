import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getBlogSidebar } from "../../data/blog";
import { BlogSearchForm } from "../../components/form/BlogSearchForm";

/**
 * BlogSidebar Component
 *
 * Requirements:
 * 1. Uses data from src/data/blog.js.
 * 2. Displays Search bar, Categories (with active indicator matching URL), Related Posts, and Tags.
 * 3. Tag buttons feature a smooth bottom-to-top background filling animation on hover.
 * 4. Responsive layout suitable for both desktop sidebar and mobile/tablet drawer.
 *
 * @param {Object} props
 * @param {string} props.activeCategory - Current category slug (e.g. "fashion", "shorts")
 * @param {(categorySlug: string) => void} [props.onSelectCategory] - Optional category select handler
 * @param {(tag: string) => void} [props.onSelectTag] - Optional tag click handler
 * @param {string} [props.className] - Optional extra class names
 */
export function BlogSidebar({
  activeCategory = "fashion",
  onSelectCategory,
  onSelectTag,
  className = "",
}) {
  const sidebarData = getBlogSidebar(activeCategory);

  return (
    <aside
      aria-label="Blog Sidebar"
      className={`w-full font-sans ${className}`}
    >
      {/* ================= 1. SEARCH BLOG INPUT (MOVED TO COMPONENTS/FORM) ================= */}
      <BlogSearchForm
        id="blog-sidebar-search-input"
        className="mb-8 sm:mb-10"
        onSearch={(q) => {
          if (q) alert(`Search blogs for: "${q}"`);
        }}
      />

      {/* ================= 2. CATEGORIES ================= */}
      <div className="mb-8 sm:mb-10">
        <h3 className="font-heading font-normal text-xl sm:text-[22px] text-brand-dark mb-4 sm:mb-5 tracking-tight">
          Categories
        </h3>
        <ul className="space-y-3 sm:space-y-3.5 text-sm sm:text-[14.5px]">
          {sidebarData.categories.map((cat) => {
            const isActive = cat.slug === activeCategory;
            return (
              <li key={cat.slug}>
                <Link
                  to={cat.url}
                  onClick={() => onSelectCategory?.(cat.slug)}
                  className={`group flex items-center gap-2 transition-colors duration-200 ${
                    isActive
                      ? "text-brand-dark font-medium"
                      : "text-[#666666] hover:text-brand-green"
                  }`}
                >
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                      isActive
                        ? "text-brand-dark stroke-[2.5]"
                        : "text-[#888888] group-hover:text-brand-green group-hover:translate-x-0.5"
                    }`}
                  />
                  <span className={isActive ? "text-brand-dark font-semibold" : ""}>
                    {cat.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ================= 3. RELATED POSTS ================= */}
      <div className="mb-8 sm:mb-10">
        <h3 className="font-heading font-normal text-xl sm:text-[22px] text-brand-dark mb-4 sm:mb-5 tracking-tight">
          Related Posts
        </h3>

        {sidebarData.relatedPosts.length > 0 ? (
          <div className="space-y-5">
            {sidebarData.relatedPosts.map((post) => (
              <article key={post.id} className="flex items-start gap-4 group">
                {/* Thumbnail Image */}
                <Link
                  to={post.url}
                  className="w-20 h-20 shrink-0 bg-[#f4f4f4] overflow-hidden block"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full min-h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-brand-muted block mb-1">
                    {post.categoryTitle || post.category}
                  </span>
                  <Link
                    to={post.url}
                    className="font-sans text-[13.5px] sm:text-[14px] font-normal leading-snug text-brand-dark hover:text-brand-green transition-colors line-clamp-2 block mb-1"
                  >
                    {post.title}
                  </Link>
                  <span className="text-xs font-sans text-[#888888] block">
                    {post.comments} {post.comments === 1 ? "comment" : "comments"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-brand-muted font-sans">
            No related posts in this category yet.
          </p>
        )}
      </div>

      {/* ================= 4. TAGS (With bottom-to-top smooth hover animation) ================= */}
      <div>
        <h3 className="font-heading font-normal text-xl sm:text-[22px] text-brand-dark mb-4 sm:mb-5 tracking-tight">
          Tags
        </h3>

        {sidebarData.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {sidebarData.tags.map((tag, idx) => (
              <button
                key={tag.slug || idx}
                type="button"
                onClick={() => onSelectTag?.(tag.title)}
                className="relative inline-flex items-center justify-center px-4 py-2 text-[13px] font-sans text-[#555555] border border-brand-border overflow-hidden group transition-colors duration-300 bg-white cursor-pointer select-none"
              >
                {/* Smooth bottom-to-top filling background */}
                <span
                  className="absolute inset-0 bg-brand-green translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none"
                  aria-hidden="true"
                />
                {/* Text smoothly transitioning to white on hover */}
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  {tag.title}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-brand-muted font-sans">
            No tags available.
          </p>
        )}
      </div>
    </aside>
  );
}

export default BlogSidebar;
