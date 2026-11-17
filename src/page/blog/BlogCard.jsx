import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { User, MessageSquare, Folder } from "lucide-react";
import { Loader } from "../../components/ui/Loader";
import { preloadPage } from "../../util/preload";

/**
 * BlogCard Component
 * Displays a single blog article matching the Flacio reference design:
 * - Full-width featured image with date ribbon badge in top-left
 * - Meta information (Author, Comments count, Category link)
 * - Heading title (in serif heading font)
 * - Excerpt text
 * - "READ MORE" button with smooth hover animation
 *
 * @param {Object} props
 * @param {Object} props.article - The article data object from src/data/blog.js
 */
export const BlogCard = memo(function BlogCard({ article }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!article) return null;

  return (
    <article className="w-full pb-10 sm:pb-14 md:pb-16 mb-10 sm:mb-14 md:mb-16 border-b border-brand-border last:border-b-0 last:pb-0 last:mb-0">
      {/* ================= 1. FEATURED IMAGE WITH DATE BADGE ================= */}
      <div className="relative w-full overflow-hidden bg-[#f4f4f4] mb-6 sm:mb-7 group min-h-55">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f4f4f4] z-10">
            <Loader size="sm" animation="ring" color="muted" />
          </div>
        )}
        <Link
          to={article.url}
          onMouseEnter={() => preloadPage(article.url)}
          className="block overflow-hidden"
        >
          <img
            src={article.image}
            alt={article.alt || article.title}
            width={850}
            height={480}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-auto max-h-125 sm:max-h-140 md:max-h-155 object-cover transition-all duration-700 ease-out group-hover:scale-102 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        {/* Date Ribbon Badge (top-left flush with folded corner underneath) */}
        {article.date && (
          <div className="absolute top-4 sm:top-5 left-0 z-10 pointer-events-none select-none">
            <div className="bg-[#282828] text-white text-[11.5px] sm:text-xs font-sans px-3.5 sm:px-4 py-1.5 sm:py-2 font-normal tracking-wide shadow-sm">
              {article.date}
            </div>
            {/* Ribbon notch folded corner */}
            <div
              className="w-0 h-0 border-t-[5px] sm:border-t-[6px] border-t-[#181818] border-l-[5px] sm:border-l-[6px] border-l-transparent"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {/* ================= 2. META ROW (Author / Comments / Category) ================= */}
      <div className="flex items-center flex-wrap gap-x-3.5 sm:gap-x-4 gap-y-1.5 text-xs sm:text-[13px] font-sans text-brand-muted mb-3 sm:mb-3.5">
        {/* Author */}
        <div className="inline-flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 stroke-[1.8] text-brand-muted shrink-0" />
          <span>By: {article.author}</span>
        </div>

        <span className="text-[#d0d0d0] select-none" aria-hidden="true">
          /
        </span>

        {/* Comments */}
        <div className="inline-flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 stroke-[1.8] text-brand-muted shrink-0" />
          <span>
            {article.comments} {article.comments === 1 ? "comment" : "comments"}
          </span>
        </div>

        <span className="text-[#d0d0d0] select-none" aria-hidden="true">
          /
        </span>

        {/* Category */}
        <div className="inline-flex items-center gap-1.5">
          <Folder className="w-3.5 h-3.5 stroke-[1.8] text-brand-muted shrink-0" />
          <Link
            to={article.categoryUrl || `/blog?category=${article.category}`}
            onMouseEnter={() => preloadPage(article.categoryUrl || `/blog?category=${article.category}`)}
            className="hover:text-brand-green transition-colors"
          >
            {article.categoryTitle || article.category}
          </Link>
        </div>
      </div>

      {/* ================= 3. TITLE ================= */}
      <h2 className="font-heading font-normal text-2xl sm:text-3xl md:text-[32px] lg:text-[34px] text-brand-dark leading-snug sm:leading-tight tracking-tight mb-3 sm:mb-3.5">
        <Link
          to={article.url}
          onMouseEnter={() => preloadPage(article.url)}
          className="hover:text-brand-green transition-colors"
        >
          {article.title}
        </Link>
      </h2>

      {/* ================= 4. EXCERPT ================= */}
      <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#707070] leading-[1.75] sm:leading-[1.8] mb-6 sm:mb-7">
        {article.excerpt}
      </p>

      {/* ================= 5. READ MORE BUTTON ================= */}
      <div>
        <Link
          to={article.url}
          onMouseEnter={() => preloadPage(article.url)}
          className="relative inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 text-xs font-semibold tracking-[0.18em] uppercase text-white bg-brand-green overflow-hidden group transition-colors duration-300 shadow-xs cursor-pointer select-none"
        >
          {/* Smooth bottom-to-top filling background */}
          <span
            className="absolute inset-0 bg-[#19321f] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none"
            aria-hidden="true"
          />
          {/* Label */}
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            READ MORE
          </span>
        </Link>
      </div>
    </article>
  );
});

export default BlogCard;
