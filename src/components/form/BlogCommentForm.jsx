import { memo, useState } from "react";

/**
 * Step-4: Section-3 Comment Form Component
 * Matches design in Image 3 & Image 4:
 * 1. "Leave a comment" centered heading
 * 2. 2-column Name & Email inputs with light grey background (#f5f5f5)
 * 3. Full-width Message textarea with light grey background (#f5f5f5)
 * 4. Centered "POST COMMENT" outlined button with hover transition
 */
export const BlogCommentForm = memo(function BlogCommentForm({
  onSubmitComment,
  postTitle = "this article",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.error || status.success) {
      setStatus({ submitting: false, success: false, error: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim()) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please enter your name.",
      });
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please enter a valid email address.",
      });
      return;
    }
    if (!formData.message.trim()) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please enter your message.",
      });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    // Simulate backend submission delay
    setTimeout(() => {
      onSubmitComment?.({
        author: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        date: new Date().toISOString(),
        dateText: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });

      setStatus({
        submitting: false,
        success: true,
        error: null,
      });

      setFormData({ name: "", email: "", message: "" });
    }, 400);
  };

  return (
    <section
      aria-label="Leave a comment section"
      className="w-full pt-10 sm:pt-14 font-sans"
    >
      <div className="w-full">
        {/* ================= HEADING (CENTERED AS SHOWN IN IMAGE 4) ================= */}
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-[34px] text-[#1c1c1c] font-normal mb-8 sm:mb-10 text-center tracking-tight">
          Leave a comment
        </h2>

        {/* ================= STATUS NOTIFICATIONS ================= */}
        {status.success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-none text-center">
            Thank you! Your comment on {postTitle} has been submitted
            successfully.
          </div>
        )}

        {status.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-none text-center">
            {status.error}
          </div>
        )}

        {/* ================= COMMENT FORM ================= */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 sm:space-y-5"
        >
          {/* Top Row: Name and Email side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="comment-name" className="sr-only">
                Name
              </label>
              <input
                id="comment-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full bg-[#f5f5f5] border border-transparent focus:border-[#1c1c1c] px-4 py-3.5 text-sm text-[#222222] placeholder:text-[#888888] outline-none transition-colors duration-200 rounded-none"
              />
            </div>

            <div>
              <label htmlFor="comment-email" className="sr-only">
                Email
              </label>
              <input
                id="comment-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-[#f5f5f5] border border-transparent focus:border-[#1c1c1c] px-4 py-3.5 text-sm text-[#222222] placeholder:text-[#888888] outline-none transition-colors duration-200 rounded-none"
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="comment-message" className="sr-only">
              Message
            </label>
            <textarea
              id="comment-message"
              name="message"
              rows={6}
              autoComplete="off"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full bg-[#f5f5f5] border border-transparent focus:border-[#1c1c1c] p-4 text-sm text-[#222222] placeholder:text-[#888888] outline-none transition-colors duration-200 resize-y rounded-none min-h-42.5"
            />
          </div>

          {/* Centered Submit Button */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={status.submitting}
              className="inline-block border border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white px-9 sm:px-12 py-3.5 text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 select-none rounded-none"
            >
              {status.submitting ? "POSTING..." : "POST COMMENT"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
});

export default BlogCommentForm;
