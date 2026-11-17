import { memo } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_ARTICLE_CONTENT } from "../../../data/blog";

/**
 * Step-3: Section-2 Main Content Container Component
 * Matches design in Image 2 & Image 3:
 * 1. Centered Category Boxed Badge (Shorts)
 * 2. Centered Article Title (font-heading)
 * 3. Centered Author & Date Meta
 * 4. Centered subtle divider line
 * 5. Body Paragraphs (justified/left-aligned)
 * 6. Pull Quote with left vertical border & author (Robert Smith)
 * 7. Concluding Paragraph
 * 8. Bottom Tags List
 */
export const BlogDetailContent = memo(function BlogDetailContent({
  post,
  comments = [],
}) {
  if (!post) return null;

  const content = post.content || DEFAULT_ARTICLE_CONTENT;
  const paragraphs = content.paragraphs || DEFAULT_ARTICLE_CONTENT.paragraphs;
  const quote = content.quote || DEFAULT_ARTICLE_CONTENT.quote;
  const closing = content.closing || DEFAULT_ARTICLE_CONTENT.closing;
  const tags =
    post.tags && post.tags.length > 0 ? post.tags : ["Beauty", "Cosmetic", "Simple"];

  return (
    <article className="section-reveal-up w-full flex-1 min-w-0 font-sans">
      {/* ================= 1. POST HEADER (CENTERED AS SHOWN IN IMAGE 2) ================= */}
      <header className="text-center mb-8 sm:mb-10">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-4 py-1 border border-[#1c1c1c] text-[#1c1c1c] text-[11px] sm:text-xs font-sans uppercase tracking-widest font-normal rounded-none">
            {post.categoryTitle || post.category || "Shorts"}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1c1c1c] leading-[1.2] mb-3 tracking-tight">
          {post.title}
        </h1>

        {/* Author & Date Meta */}
        <div className="text-xs sm:text-[13px] font-sans text-[#767676] mb-5">
          <span>By </span>
          <span className="text-[#1c1c1c] font-normal">{post.author || "Tung Hoang"}</span>
          <span> on </span>
          <span>{post.date || "Sep 30, 2024"}</span>
        </div>

        {/* Centered subtle divider line from Image 2 */}
        <div className="w-16 h-px bg-[#d5d5d5] mx-auto" />
      </header>

      {/* ================= 2. ARTICLE BODY PARAGRAPHS ================= */}
      <div className="text-[14.5px] sm:text-[15px] leading-[1.8] text-[#555555] font-sans space-y-5 mb-8">
        {paragraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {/* ================= 3. BLOCKQUOTE / PULL QUOTE ================= */}
      {quote && (
        <blockquote className="border-l-[2px] border-[#1c1c1c] pl-6 sm:pl-8 my-8 sm:my-10">
          <p className="text-[14.5px] sm:text-[15.5px] leading-[1.8] text-[#333333] font-sans mb-3">
            {quote.text}
          </p>
          {quote.author && (
            <cite className="font-heading text-xs sm:text-[13px] font-normal uppercase tracking-widest text-[#1c1c1c] not-italic block mt-4">
              {quote.author}
            </cite>
          )}
        </blockquote>
      )}

      {/* ================= 4. CLOSING PARAGRAPH ================= */}
      {closing && (
        <div className="text-[14.5px] sm:text-[15px] leading-[1.8] text-[#555555] font-sans mb-8">
          <p>{closing}</p>
        </div>
      )}

      {/* ================= 5. ARTICLE TAGS ================= */}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2 pb-10">
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/blog?tag=${tag.toLowerCase()}`}
              className="inline-block border border-[#e5e5e5] px-4 py-2 text-xs font-sans text-[#555555] hover:border-[#1c1c1c] hover:text-[#1c1c1c] transition-colors bg-white rounded-none"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {/* ================= 6. COMMENTS LIST (IF ANY) ================= */}
      {comments.length > 0 && (
        <div className="pt-8 pb-4 border-t border-[#eeeeee]">
          <h3 className="font-heading text-xl text-[#1c1c1c] mb-6">
            Comments ({comments.length})
          </h3>
          <div className="space-y-4">
            {comments.map((c, i) => (
              <div key={i} className="bg-[#fafafa] p-4 sm:p-5 rounded-none border border-[#eeeeee]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading font-medium text-sm text-[#1c1c1c]">
                    {c.author}
                  </span>
                  <span className="text-xs text-[#888888] font-sans">
                    {c.dateText || "Recently"}
                  </span>
                </div>
                <p className="text-sm text-[#555555] font-sans leading-relaxed">
                  {c.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
});

export default BlogDetailContent;
