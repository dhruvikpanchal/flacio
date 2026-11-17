import { useState } from "react";
import { Loader } from "../ui/Loader";

/**
 * ContactForm Component
 * Section 3 for the Contact page.
 *
 * Requirements:
 * 1. Responsive across mobile (1-col stacked), tablet, and desktop (side-by-side Name & Email).
 * 2. Self-contained (no external data file; all text, labels, and state defined locally).
 * 3. Matches reference image:
 *    - Title: "Send Us Your Questions!" (serif heading)
 *    - Subtitle: "We'll get back to you within two days."
 *    - Inputs for Name and Email with right-aligned red asterisk indicator.
 *    - Full-width Message textarea.
 *    - Centered dark "SUBMIT" button with brand green hover transition.
 */
export function ContactForm({ className = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission handling
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 600);
  };

  return (
    <section
      aria-label="Send Us Your Questions"
      className={`section-reveal-scale w-full bg-white py-14 sm:py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Text */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="font-heading font-normal text-brand-dark text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight tracking-tight">
            Send Us Your Questions!
          </h2>
          <p className="font-sans font-normal text-brand-muted text-xs sm:text-sm md:text-[14.5px] mt-2 sm:mt-2.5">
            We&apos;ll get back to you within two days.
          </p>
        </div>

        {/* Feedback Alert if submitted */}
        {submitted && (
          <div
            role="status"
            className="mb-6 p-4 bg-[#f0f7f2] border border-[#a8d5b5] text-brand-green text-center text-sm font-sans"
          >
            Thank you! Your message has been sent successfully. We will be in touch soon.
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Top row: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-7 mb-5 sm:mb-6">
            {/* Name Field */}
            <div className="flex flex-col">
              <label
                htmlFor="contact-name"
                className="font-sans text-xs sm:text-[13px] md:text-sm text-brand-dark mb-1.5 sm:mb-2 select-none"
              >
                Name
              </label>
              <div className="relative w-full">
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-11 sm:h-12 pl-3.5 pr-8 text-sm font-sans text-brand-dark bg-white border border-[#c5c5c5] focus:border-brand-dark focus:outline-none transition-colors"
                />
                <span
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#ff2d2d] font-bold text-sm pointer-events-none select-none"
                  aria-hidden="true"
                >
                  *
                </span>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label
                htmlFor="contact-email"
                className="font-sans text-xs sm:text-[13px] md:text-sm text-brand-dark mb-1.5 sm:mb-2 select-none"
              >
                Email
              </label>
              <div className="relative w-full">
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-11 sm:h-12 pl-3.5 pr-8 text-sm font-sans text-brand-dark bg-white border border-[#c5c5c5] focus:border-brand-dark focus:outline-none transition-colors"
                />
                <span
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#ff2d2d] font-bold text-sm pointer-events-none select-none"
                  aria-hidden="true"
                >
                  *
                </span>
              </div>
            </div>
          </div>

          {/* Bottom row: Message Field */}
          <div className="flex flex-col mb-7 sm:mb-8 md:mb-10">
            <label
              htmlFor="contact-message"
              className="font-sans text-xs sm:text-[13px] md:text-sm text-brand-dark mb-1.5 sm:mb-2 select-none"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={8}
              autoComplete="off"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full min-h-42.5 sm:min-h-47.5 md:min-h-52.5 p-3.5 sm:p-4 text-sm font-sans text-brand-dark bg-white border border-[#c5c5c5] focus:border-brand-dark focus:outline-none transition-colors resize-y"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center bg-[#282828] hover:bg-brand-green active:bg-[#1a3420] text-white font-sans text-xs sm:text-[12.5px] font-semibold tracking-[0.2em] uppercase px-11 sm:px-14 py-3 sm:py-3.5 transition-colors duration-300 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none min-w-42.5"
            >
              {loading ? (
                <Loader
                  size="xs"
                  color="white"
                  text="SENDING..."
                  textPosition="right"
                />
              ) : (
                "SUBMIT"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
