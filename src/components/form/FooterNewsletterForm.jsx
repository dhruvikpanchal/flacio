import { memo, useState } from "react";
import { Loader } from "../ui/Loader";

/**
 * FooterNewsletterForm
 * Footer newsletter subscription form.
 * Ensures unique IDs per instance (desktop vs mobile), explicit label, standard autocomplete, and clean submit state.
 */
export const FooterNewsletterForm = memo(function FooterNewsletterForm({
  idPrefix = "footer-newsletter",
  onSubscribe,
  className = "",
}) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubscribe?.(email.trim());
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 4000);
    }, 600);
  };

  const inputId = `${idPrefix}-email`;

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        Email address for newsletter
      </label>
      <div className="relative flex items-center border-b border-white focus-within:border-white transition-colors">
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address..."
          aria-label="Email address for newsletter"
          className="w-full bg-transparent py-2 pr-9 text-[13px] md:text-[14px] text-white placeholder:text-white/80 outline-none font-sans"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="Submit newsletter subscription"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors p-1 cursor-pointer"
        >
          {isSubmitting ? (
            <Loader size="xs" color="white" />
          ) : (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          )}
        </button>
      </div>
      {isSuccess && (
        <p className="text-xs text-white/90 pt-1.5 font-medium animate-in fade-in">
          Thank you for subscribing!
        </p>
      )}
    </form>
  );
});

export default FooterNewsletterForm;

