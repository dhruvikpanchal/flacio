import { memo, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogPost, blogArticles } from "../../../data/blog";
import { BlogDetailSection1 } from "./BlogDetailSection1";
import { BlogDetailSidebar } from "./BlogDetailSidebar";
import { BlogDetailContent } from "./BlogDetailContent";
import { BlogCommentForm } from "../../../components/form/BlogCommentForm";

/**
 * Main Blog-ID (Article Detail) Page Component
 *
 * Implements the requested multi-step structure:
 * - Step-1: BlogDetailSection1 (Breadcrumbs + Hero Image)
 * - Step-2: BlogDetailSidebar (Desktop Sidebar + Mobile/Tablet Drawer)
 * - Step-3: BlogDetailContent (Title, Meta, Content, Quote, Tags)
 * - Step-4: BlogCommentForm (Form in form/ folder)
 */
export const BlogId = memo(function BlogId() {
  const { slug, id } = useParams();

  // Find the requested article or default to article 3 ("the-best-plant-for-you")
  const article = useMemo(() => {
    if (slug) {
      const found = getBlogPost(slug);
      if (found) return found;
    }
    if (id) {
      const byId = blogArticles.find(
        (a) => String(a.id) === String(id) || a.slug === id,
      );
      if (byId) return byId;
    }
    // Default fallback to "The Best Plant For You?" (Article #3 from screenshots)
    return (
      blogArticles.find((a) => a.slug === "the-best-plant-for-you") ||
      blogArticles[0]
    );
  }, [slug, id]);

  const [comments, setComments] = useState(article?.commentList || []);

  const handleAddComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div className="w-full bg-white min-h-[calc(100vh-280px)] pb-16 sm:pb-24">
      {/* ================= STEP-1: SECTION-1 (BREADCRUMB & HERO IMAGE) ================= */}
      <BlogDetailSection1 post={article} />

      {/* ================= SECTION-2: 2-COLUMN LAYOUT ================= */}
      <div className="w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16">
          {/* STEP-2: SECTION-2 SIDEBAR (Direct on Desktop, Modal Drawer on Mobile/Tablet) */}
          <BlogDetailSidebar currentArticle={article} />

          {/* RIGHT COLUMN: MAIN CONTENT CONTAINER + FORM */}
          <div className="flex-1 min-w-0 w-full">
            {/* STEP-3: SECTION-2 MAIN CONTAINER */}
            <BlogDetailContent post={article} comments={comments} />

            {/* STEP-4: SECTION-3 COMMENT FORM (IN FORM/ FOLDER) */}
            <BlogCommentForm
              postTitle={article?.title}
              onSubmitComment={handleAddComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default BlogId;
