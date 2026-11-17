import { memo, useState } from "react";

/**
 * ProductQuestionForm
 * "Ask a Question" or "Ask an Expert" form component.
 * Ensures complete WCAG and Chrome compliance with explicit labels, names, IDs, and autocompletes.
 */
export const ProductQuestionForm = memo(function ProductQuestionForm({
  onSubmitQuestion,
  productTitle = "this product",
  onCancel,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    onSubmitQuestion?.({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="w-full">
      <h3 className="font-heading text-xl text-neutral-900 mb-3 font-normal">
        Ask a Question
      </h3>
      <p className="text-xs text-neutral-500 mb-4">
        Have a question about {productTitle}? Send us a message and our botanists
        will reply within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="ask-question-name" className="sr-only">
            Your Name
          </label>
          <input
            id="ask-question-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            aria-label="Your Name"
            className="w-full border border-neutral-300 p-2.5 text-sm outline-none focus:border-black rounded-none"
          />
        </div>

        <div>
          <label htmlFor="ask-question-email" className="sr-only">
            Your Email
          </label>
          <input
            id="ask-question-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            aria-label="Your Email"
            className="w-full border border-neutral-300 p-2.5 text-sm outline-none focus:border-black rounded-none"
          />
        </div>

        <div>
          <label htmlFor="ask-question-message" className="sr-only">
            What would you like to know?
          </label>
          <textarea
            id="ask-question-message"
            name="message"
            autoComplete="off"
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What would you like to know?"
            aria-label="What would you like to know?"
            className="w-full border border-neutral-300 p-2.5 text-sm outline-none focus:border-black rounded-none"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="submit"
            className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider py-3 transition-colors rounded-none font-medium cursor-pointer"
          >
            Send Message
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-3 border border-neutral-300 hover:border-black text-xs uppercase tracking-wider transition-colors rounded-none text-neutral-700 cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
});

export default ProductQuestionForm;

