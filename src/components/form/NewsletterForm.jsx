import { useState } from "react";
import { Loader } from "../ui/Loader";

/**
 * NewsletterForm Component (Section 7 on Home Page)
 * Self-contained newsletter section:
 * - Lavender/mauve background (#eae6ec)
 * - Serif heading with italic accent: "Sign Up To Our Newsletter"
 * - Subtitle description
 * - Email input and submit button with local validation and submission handling
 */
export function NewsletterForm({ onSubscribe, className = "" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setErrorMessage("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Simulate API submission
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      if (onSubscribe) {
        onSubscribe(trimmed);
      }
    }, 400);
  };

  return (
    <section
      aria-label="Newsletter Subscription"
      className={`section-reveal-scale w-full bg-[#eae6ec] py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading: "Sign Up To Our Newsletter" */}
        <h2 className="font-heading text-[#1f2024] font-normal text-3xl sm:text-4xl md:text-[42px] lg:text-[44px] leading-tight tracking-tight">
          Sign Up To <span className="italic font-normal">Our Newsletter</span>
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-sm md:text-[15px] text-[#767676] max-w-2xl mx-auto mt-2.5 sm:mt-3 leading-relaxed">
          Stay up to date on the latest news with our carefully curated newsletters.
        </p>

        {/* Form Container */}
        <div className="mt-7 sm:mt-9 md:mt-11 w-full max-w-xl md:max-w-2xl mx-auto">
          {status === "success" ? (
            <div className="bg-white p-4 sm:p-5 shadow-xs text-center border-l-4 border-brand-green animate-fadeIn">
              <p className="font-sans text-sm sm:text-base text-[#1f2024] font-medium">
                Thank you for subscribing to our newsletter!
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-2 text-xs text-brand-muted hover:text-brand-green underline underline-offset-2 transition-colors cursor-pointer"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-stretch w-full shadow-xs bg-white"
              noValidate
            >
              <div className="relative flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Email adress..."
                  aria-label="Email address for newsletter"
                  className="w-full h-full bg-white text-[#1f2024] placeholder-[#949494] px-4 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-[15px] outline-none border-none focus:ring-1 focus:ring-black/10 transition-shadow"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="shrink-0 bg-[#282828] hover:bg-brand-green active:bg-[#1a3420] text-white font-sans text-xs sm:text-[13px] md:text-sm font-medium tracking-wide px-4 sm:px-9 py-3.5 sm:py-4 transition-colors duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none min-w-24 sm:min-w-32.5 flex items-center justify-center"
              >
                {status === "loading" ? (
                  <Loader
                    size="xs"
                    color="white"
                    text="Submitting..."
                    textPosition="right"
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-2 text-xs sm:text-[13px] text-red-600 font-sans text-center">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default NewsletterForm;
