import { memo } from "react";

/**
 * CheckoutCouponForm
 * Promo & coupon code form field for cart and checkout.
 */
export const CheckoutCouponForm = memo(function CheckoutCouponForm({
  couponCode = "",
  onCouponCodeChange,
  onApply,
  couponFeedback = "",
  isDiscountApplied = false,
  className = "",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onApply?.();
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-1.5 pt-1 w-full ${className}`}>
      <h4 className="text-xs sm:text-sm font-normal text-neutral-800">Coupon</h4>
      <p className="text-[11px] text-neutral-500 leading-tight">
        * Discount will be calculated and applied at checkout
      </p>
      <div className="flex gap-2 pt-1">
        <div className="flex-1">
          <label htmlFor="checkout-coupon-code" className="sr-only">
            Coupon code
          </label>
          <input
            id="checkout-coupon-code"
            name="couponCode"
            type="text"
            autoComplete="off"
            value={couponCode}
            onChange={(e) => onCouponCodeChange?.(e.target.value)}
            placeholder="Coupon code"
            aria-label="Coupon code"
            className="w-full bg-white border border-neutral-200 py-2.5 px-3 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none rounded-none uppercase"
          />
        </div>
        <button
          type="submit"
          className="bg-[#2b2b2b] hover:bg-black text-white text-xs uppercase tracking-wider font-semibold px-4 py-2.5 transition-colors cursor-pointer shrink-0"
        >
          Apply
        </button>
      </div>
      {couponFeedback && (
        <p
          className={`text-xs mt-1 font-medium ${
            isDiscountApplied ? "text-emerald-700" : "text-neutral-600"
          }`}
        >
          {couponFeedback}
        </p>
      )}
    </form>
  );
});

export default CheckoutCouponForm;

