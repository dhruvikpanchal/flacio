import { memo } from "react";

/**
 * CheckoutDeliveryForm
 * Shipping estimates calculator form for checkout & cart pages.
 */
export const CheckoutDeliveryForm = memo(function CheckoutDeliveryForm({
  selectedCountry = "",
  onCountryChange,
  zipCode = "",
  onZipCodeChange,
  onEstimate,
  estimateMsg = "",
  className = "",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onEstimate?.();
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 w-full ${className}`}>
      <h3 className="text-xs sm:text-sm font-normal text-neutral-800">
        Get shipping estimates
      </h3>
      <div>
        <label htmlFor="shipping-country" className="sr-only">
          Country
        </label>
        <select
          id="shipping-country"
          name="country"
          autoComplete="country-name"
          aria-label="Shipping country"
          value={selectedCountry}
          onChange={(e) => onCountryChange?.(e.target.value)}
          className="w-full bg-white border border-neutral-200 py-2.5 px-3 text-xs text-neutral-700 focus:outline-none rounded-none cursor-pointer"
        >
          <option value="">---</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Australia">Australia</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
        </select>
      </div>

      <div>
        <label htmlFor="shipping-zip" className="sr-only">
          Zip Code
        </label>
        <input
          id="shipping-zip"
          name="zipCode"
          type="text"
          autoComplete="postal-code"
          value={zipCode}
          onChange={(e) => onZipCodeChange?.(e.target.value)}
          placeholder="Zip Code"
          aria-label="Shipping Zip Code"
          className="w-full bg-white border border-neutral-200 py-2.5 px-3 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none rounded-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#2b2b2b] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold py-3 transition-colors duration-200 cursor-pointer"
      >
        ESTIMATE
      </button>

      {estimateMsg && (
        <p className="text-xs text-neutral-700 pt-0.5 leading-snug font-medium">
          {estimateMsg}
        </p>
      )}
    </form>
  );
});

export default CheckoutDeliveryForm;

