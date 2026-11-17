import { memo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

/**
 * PortfolioCommentForm
 * Clean, accessible comment form for portfolio detail items.
 * Solves all Chrome form/field/autocomplete/label warnings.
 */
export const PortfolioCommentForm = memo(function PortfolioCommentForm({
  onSubmitComment,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    onSubmitComment?.({
      author: name.trim(),
      email: email.trim(),
      message: message.trim(),
      dateText: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    });

    setName("");
    setEmail("");
    setMessage("");
    setError("");
    setFeedback("Thank you! Your comment has been posted.");
    setTimeout(() => setFeedback(""), 4000);
  };

  return (
    <div className="text-center w-full">
      <h4 className="font-heading text-2xl sm:text-3xl text-neutral-900 font-normal mb-8">
        Leave a comment
      </h4>

      {feedback && (
        <div className="mb-6 inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2.5 text-xs font-medium border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 text-xs text-red-600 font-medium bg-red-50 p-2.5 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Name & Email Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="portfolio-comment-name" className="sr-only">
              Name
            </label>
            <input
              id="portfolio-comment-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              aria-label="Your Name"
              className="w-full bg-[#f7f7f7] border-0 p-3.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 rounded-none"
            />
          </div>
          <div>
            <label htmlFor="portfolio-comment-email" className="sr-only">
              Email
            </label>
            <input
              id="portfolio-comment-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              aria-label="Your Email"
              className="w-full bg-[#f7f7f7] border-0 p-3.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 rounded-none"
            />
          </div>
        </div>

        {/* Message Textarea */}
        <div>
          <label htmlFor="portfolio-comment-message" className="sr-only">
            Message
          </label>
          <textarea
            id="portfolio-comment-message"
            name="message"
            rows={6}
            autoComplete="off"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            aria-label="Your Message"
            className="w-full bg-[#f7f7f7] border-0 p-3.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 rounded-none resize-y min-h-35"
          />
        </div>

        {/* Centered Submit Button */}
        <div className="pt-3 sm:pt-4 text-center">
          <button
            type="submit"
            className="w-full sm:w-auto inline-block border border-black bg-white hover:bg-black text-black hover:text-white px-8 py-3.5 text-xs uppercase tracking-widest font-medium transition-all duration-200 cursor-pointer shadow-xs active:scale-98"
          >
            POST COMMENT
          </button>
        </div>
      </form>
    </div>
  );
});

export default PortfolioCommentForm;
