import { memo, useState } from "react";
import { Star } from "lucide-react";

/**
 * ProductReviewForm
 * Reusable, accessible product review form.
 * Ensures complete WCAG and Chrome compliance (labels, names, IDs, autocompletes, explicit button types).
 */
export const ProductReviewForm = memo(function ProductReviewForm({
  onSubmitReview,
  onCancel,
  productTitle = "",
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !email.trim() || !body.trim()) {
      setError("Please fill in all required fields (Name, Email, and Review Body).");
      return;
    }

    onSubmitReview?.({
      author: author.trim(),
      email: email.trim(),
      title: title.trim() || "Verified Buyer Review",
      body: body.trim(),
      rating,
    });

    setAuthor("");
    setEmail("");
    setTitle("");
    setBody("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 p-6 sm:p-8 bg-white border border-neutral-200 rounded-none shadow-xs space-y-4 animate-in fade-in duration-200 w-full"
    >
      <h4 className="font-heading text-lg sm:text-xl text-neutral-900 font-normal">
        Write a Review {productTitle ? `for ${productTitle}` : ""}
      </h4>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {error}
        </div>
      )}

      {/* Interactive Rating */}
      <div>
        <label
          htmlFor="review-rating-group"
          className="block text-xs uppercase tracking-wider text-neutral-600 mb-1.5 font-medium"
        >
          Rating
        </label>
        <div id="review-rating-group" className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="p-1 cursor-pointer transition-transform hover:scale-110"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              <Star
                className={`w-5 h-5 ${
                  star <= (hoverRating || rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-neutral-300 stroke-[1.5]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Author Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="review-author"
            className="block text-xs uppercase tracking-wider text-neutral-600 mb-1.5 font-medium"
          >
            Your Name *
          </label>
          <input
            id="review-author"
            name="author"
            type="text"
            autoComplete="name"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g. Tung Hoang"
            aria-label="Your Name"
            className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-black rounded-none transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="review-email"
            className="block text-xs uppercase tracking-wider text-neutral-600 mb-1.5 font-medium"
          >
            Your Email *
          </label>
          <input
            id="review-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. user@example.com"
            aria-label="Your Email"
            className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-black rounded-none transition-colors"
          />
        </div>
      </div>

      {/* Review Title */}
      <div>
        <label
          htmlFor="review-title"
          className="block text-xs uppercase tracking-wider text-neutral-600 mb-1.5 font-medium"
        >
          Review Title
        </label>
        <input
          id="review-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your review a title"
          aria-label="Review Title"
          className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-black rounded-none transition-colors"
        />
      </div>

      {/* Review Body */}
      <div>
        <label
          htmlFor="review-body"
          className="block text-xs uppercase tracking-wider text-neutral-600 mb-1.5 font-medium"
        >
          Body of Review *
        </label>
        <textarea
          id="review-body"
          name="body"
          autoComplete="off"
          required
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your comments here..."
          aria-label="Body of Review"
          className="w-full border border-neutral-300 p-3.5 text-sm text-neutral-900 outline-none focus:border-black rounded-none transition-colors"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="bg-[#1c1c1c] hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-medium px-8 py-3 transition-colors cursor-pointer rounded-none"
        >
          Submit Review
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-neutral-300 text-neutral-700 hover:text-black hover:border-black text-xs uppercase tracking-wider font-medium px-6 py-3 transition-colors cursor-pointer rounded-none"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
});

export default ProductReviewForm;

