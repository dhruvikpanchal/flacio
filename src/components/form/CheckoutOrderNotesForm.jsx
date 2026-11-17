import { memo } from "react";

/**
 * CheckoutOrderNotesForm
 * Accessible special instructions / order notes form field.
 */
export const CheckoutOrderNotesForm = memo(function CheckoutOrderNotesForm({
  value = "",
  onChange,
  id = "special-instructions",
  label = "Special instructions for seller",
  placeholder = "How can we help you?",
  className = "",
}) {
  return (
    <div className={`pt-4 w-full ${className}`}>
      <label
        htmlFor={id}
        className="block text-xs sm:text-sm text-neutral-800 font-normal mb-2.5"
      >
        {label}
      </label>
      <textarea
        id={id}
        name="specialInstructions"
        rows={5}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="w-full border border-neutral-200 p-4 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors rounded-none resize-y min-h-35"
      />
    </div>
  );
});

export default CheckoutOrderNotesForm;

