import { memo, useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { PortfolioCommentForm } from "../../../components/form/PortfolioCommentForm";

export const PortfolioComments = memo(function PortfolioComments({
  initialComments = [],
}) {
  const [comments, setComments] = useState(initialComments);

  const handleAddComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const commentCount = comments.length;

  return (
    <div className="pt-12 sm:pt-16 pb-12 border-b border-neutral-100 max-w-3xl mx-auto">
      {/* ================= COMMENT COUNT HEADING ================= */}
      <div className="text-center mb-8 sm:mb-10">
        <h3 className="font-heading text-2xl sm:text-3xl text-neutral-900 font-normal">
          {commentCount} comment{commentCount === 1 ? "" : "s"}
        </h3>
      </div>

      {/* ================= COMMENTS LIST ================= */}
      {comments.length > 0 ? (
        <div className="space-y-6 mb-12 sm:mb-16">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="pb-6 border-b border-neutral-100 text-left space-y-2 animate-in fade-in"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-800">
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 stroke-2" />
                  <span>{comment.author}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-neutral-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{comment.dateText || "Recent"}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-5">
                {comment.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xs text-neutral-400 mb-12 italic">
          No comments yet. Be the first to leave a comment on this project!
        </p>
      )}

      {/* ================= LEAVE A COMMENT SECTION (MOVED TO COMPONENTS/FORM) ================= */}
      <PortfolioCommentForm onSubmitComment={handleAddComment} />
    </div>
  );
});

export default PortfolioComments;
