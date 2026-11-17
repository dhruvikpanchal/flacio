import { memo } from "react";
import { Link } from "react-router-dom";

/**
 * Step-1: Section-1 Component for Blog Detail (Blog-ID) Page
 * Includes:
 * 1. Breadcrumbs navigation: Home / Shorts (underlined) / The Best Plant For You?
 * 2. High-resolution Featured/Hero Image (natural wide container, rounded-none)
 */
export const BlogDetailSection1 = memo(function BlogDetailSection1({ post }) {
  if (!post) return null;

  const categoryName = post.categoryTitle || post.category || "Shorts";
  const categoryLink = post.categoryUrl || `/blog?category=${post.category}`;

  return (
    <section
      aria-label="Blog Header and Featured Image"
      className="section-reveal-scale w-full bg-white"
    >
      {/* ================= BREADCRUMBS ================= */}
      <div className="w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center text-xs sm:text-[13px] font-sans text-[#767676]"
        >
          <Link
            to="/"
            className="hover:text-brand-dark transition-colors duration-200"
          >
            Home
          </Link>
          <span className="mx-2 text-[#999999]">/</span>

          <Link
            to={categoryLink}
            className="underline underline-offset-4 decoration-[#767676] hover:decoration-brand-dark hover:text-brand-dark capitalize transition-colors duration-200"
          >
            {categoryName}
          </Link>
          <span className="mx-2 text-[#999999]">/</span>

          <span className="text-[#767676] truncate select-none">
            {post.title}
          </span>
        </nav>
      </div>

      {/* ================= FEATURED HERO IMAGE ================= */}
      <div className="w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <div className="w-full overflow-hidden rounded-none bg-[#f4f4f4] aspect-video sm:aspect-[2.1/1] max-h-160">
          <img
            src={post.image}
            alt={post.title}
            width={1360}
            height={640}
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
});

export default BlogDetailSection1;
