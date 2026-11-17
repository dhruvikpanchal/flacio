import { memo, useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  Zap,
  Check,
  X,
  Gift,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Pencil,
} from "lucide-react";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../redux/features/cartSlice";
import { CheckoutOrderNotesForm } from "../../components/form/CheckoutOrderNotesForm";
import { CheckoutDeliveryForm } from "../../components/form/CheckoutDeliveryForm";
import { CheckoutCouponForm } from "../../components/form/CheckoutCouponForm";

const formatPrice = (n) => `$${Number(n || 0).toFixed(2)}`;
const FREE_SHIPPING_THRESHOLD = 100.0;

export const Checkout = memo(function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart?.items || []);

  // Form states
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponFeedback, setCouponFeedback] = useState("");
  const [hasGiftWrap, setHasGiftWrap] = useState(false);

  // Shipping estimate states
  const [selectedCountry, setSelectedCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [shippingEstimateMsg, setShippingEstimateMsg] = useState("");

  // Checkout modal states: null | "processing" | "success"
  const [checkoutModal, setCheckoutModal] = useState(null);
  const [orderSummarySnapshot, setOrderSummarySnapshot] = useState(null);
  const [autoCloseCountdown, setAutoCloseCountdown] = useState(6);

  // Calculations
  const rawSubtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
  }, [cartItems]);

  const giftWrapCost = hasGiftWrap ? 5.0 : 0;
  const subtotal = Math.max(0, rawSubtotal + giftWrapCost - discountAmount);
  const isFreeShipping = rawSubtotal >= FREE_SHIPPING_THRESHOLD;
  const freeShippingProgress = Math.min(
    100,
    Math.round((rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);

  // Handle Coupon Application
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const code = couponCode.trim().toUpperCase();
    if (code === "FLACIO10" || code === "PLANT10") {
      const discount = rawSubtotal * 0.1;
      setDiscountAmount(discount);
      setCouponFeedback(`Coupon "${code}" applied! Saved ${formatPrice(discount)}.`);
    } else if (code === "FREESHIP") {
      setDiscountAmount(15);
      setCouponFeedback(`Coupon "${code}" applied! $15.00 discount added.`);
    } else {
      setDiscountAmount(0);
      setCouponFeedback("Invalid or expired coupon code.");
    }
  };

  // Handle Shipping Estimate
  const handleEstimateShipping = (e) => {
    e.preventDefault();
    if (!zipCode.trim()) {
      setShippingEstimateMsg("Please enter a valid zip or postal code.");
      return;
    }
    setShippingEstimateMsg(
      isFreeShipping
        ? `Free standard shipping to ${selectedCountry} (${zipCode})!`
        : `Standard shipping to ${selectedCountry} (${zipCode}): $10.00`
    );
  };

  // Handle Checkout Click
  const handleCheckoutSubmit = () => {
    if (!agreeTerms) {
      setTermsError(true);
      return;
    }
    setTermsError(false);

    // Save snapshot of order for the success modal
    const orderNumber = `FLA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSummarySnapshot({
      orderNumber,
      totalItems: cartItems.reduce((acc, i) => acc + (Number(i.quantity) || 1), 0),
      finalTotal: subtotal,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });

    // Step 1: Brief processing modal
    setCheckoutModal("processing");

    // Step 2: Transition to success animation after 1.4s
    setTimeout(() => {
      setCheckoutModal("success");
      // Clear Redux Cart so cart becomes 0
      dispatch(clearCart());
      setAutoCloseCountdown(6);
    }, 1400);
  };

  // Auto-close countdown timer for success modal
  useEffect(() => {
    if (checkoutModal !== "success") return undefined;

    const interval = setInterval(() => {
      setAutoCloseCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCheckoutModal(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [checkoutModal]);

  const handleHardCloseModal = useCallback(() => {
    setCheckoutModal(null);
  }, []);

  const handleRestartPurchase = useCallback(() => {
    setCheckoutModal(null);
    navigate("/product");
  }, [navigate]);

  return (
    <div className="w-full bg-white font-sans min-h-[calc(100vh-280px)] py-10 sm:py-14 md:py-18">
      <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= PAGE TITLE ================= */}
        <div className="section-reveal-up text-center mb-10 sm:mb-14">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-[42px] font-normal text-[#1f2024] tracking-tight">
            Shopping Cart
          </h1>
        </div>

        {/* ================= EMPTY CART VIEW ================= */}
        {cartItems.length === 0 && !checkoutModal ? (
          <div className="max-w-xl mx-auto text-center py-16 sm:py-24 border border-neutral-100 bg-[#fafafa] p-8 sm:p-12">
            <div className="w-18 h-18 rounded-full bg-white shadow-xs mx-auto flex items-center justify-center text-neutral-400 mb-5">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl text-[#1f2024] mb-2 font-normal">
              Your shopping cart is currently empty
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mb-8 leading-relaxed">
              Explore our botanical collection of air-purifying, pet-friendly, and indoor plants to find the perfect match for your space.
            </p>
            <Link
              to="/product"
              className="inline-flex items-center gap-2 bg-[#1f2024] hover:bg-brand-green text-white text-xs uppercase tracking-widest font-medium py-3.5 px-8 transition-colors duration-200"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* ================= MAIN 2-COLUMN CHECKOUT / CART LAYOUT ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
            {/* ================= LEFT COLUMN: CART TABLE & INSTRUCTIONS ================= */}
            <div className="section-reveal-slide-left lg:col-span-7 xl:col-span-8 space-y-8">
              {/* Product Table */}
              <div className="border border-neutral-200 overflow-x-auto bg-white">
                <table className="w-full text-left border-collapse min-w-145 sm:min-w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 text-xs text-neutral-800 font-normal bg-white">
                      <th className="py-4 px-4 sm:px-6 w-[45%] font-normal border-r border-neutral-200">
                        Product
                      </th>
                      <th className="py-4 px-4 text-center w-[25%] font-normal border-r border-neutral-200">
                        Quantity
                      </th>
                      <th className="py-4 px-4 text-center w-[20%] font-normal border-r border-neutral-200">
                        Total
                      </th>
                      <th className="py-4 px-4 text-center w-[10%] font-normal"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {cartItems.map((item) => {
                      const itemImg = item.image || item.images?.[0]?.src || item.images?.[0] || "";
                      const itemPrice = Number(item.price) || 0;
                      const itemQty = Number(item.quantity) || 1;
                      const lineTotal = itemPrice * itemQty;
                      const itemUrl = `/products/${item.handle || item.id}`;

                      return (
                        <tr key={item.id || item.handle} className="hover:bg-neutral-50/30 transition-colors">
                          {/* Product Thumbnail & Title */}
                          <td className="py-5 px-4 sm:px-6 border-r border-neutral-200">
                            <div className="flex items-center gap-4">
                              <Link
                                to={itemUrl}
                                className="w-20 h-24 sm:w-22 sm:h-26 bg-[#f8f8f8] shrink-0 overflow-hidden border border-neutral-100 flex items-center justify-center"
                              >
                                {itemImg ? (
                                  <img
                                    src={itemImg}
                                    alt={item.title}
                                    width={88}
                                    height={104}
                                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                ) : (
                                  <span className="text-[10px] text-neutral-400">No image</span>
                                )}
                              </Link>
                              <div className="min-w-0">
                                <Link
                                  to={itemUrl}
                                  className="font-sans text-xs text-neutral-600 hover:text-black uppercase tracking-wider block transition-colors leading-tight"
                                >
                                  {item.title}
                                </Link>
                                <p className="text-[11px] text-neutral-500 mt-1">
                                  Color: {item.color || item.selectedColor || "Black"}
                                </p>
                                <p className="text-xs sm:text-[13px] text-neutral-900 font-medium mt-1">
                                  {formatPrice(itemPrice)}
                                </p>
                                <button
                                  type="button"
                                  aria-label={`Edit ${item.title}`}
                                  className="mt-1 text-neutral-400 hover:text-neutral-800 transition-colors block cursor-pointer"
                                >
                                  <Pencil className="w-3.5 h-3.5 stroke-[1.75]" />
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* Quantity Stepper with Vertical Dividers */}
                          <td className="py-5 px-4 text-center border-r border-neutral-200">
                            <div className="inline-flex items-center border border-neutral-300 bg-white">
                              <button
                                type="button"
                                onClick={() => dispatch(decreaseQuantity(item.id || item.handle))}
                                className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-black border-r border-neutral-300 transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-9 text-xs font-normal text-neutral-900 text-center select-none border-r border-neutral-300">
                                {itemQty}
                              </span>
                              <button
                                type="button"
                                onClick={() => dispatch(increaseQuantity(item.id || item.handle))}
                                className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </td>

                          {/* Line Total */}
                          <td className="py-5 px-4 text-center border-r border-neutral-200 font-sans text-xs sm:text-sm text-neutral-800 font-normal">
                            {formatPrice(lineTotal)}
                          </td>

                          {/* Delete Item */}
                          <td className="py-5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => dispatch(removeFromCart(item.id || item.handle))}
                              className="text-neutral-500 hover:text-red-600 transition-colors p-1.5 cursor-pointer inline-flex items-center justify-center"
                              title="Remove item"
                              aria-label={`Remove ${item.title}`}
                            >
                              <Trash2 className="w-4 h-4 stroke-[1.25]" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Add Gift Wrap Button Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-neutral-700">
                  <Gift className="w-4 h-4 text-neutral-800 stroke-[1.5]" />
                  <span>Add gift wrap Only</span>
                </div>
                <button
                  type="button"
                  onClick={() => setHasGiftWrap((prev) => !prev)}
                  className={`text-xs px-4 py-1.5 border transition-all duration-200 font-normal cursor-pointer ${
                    hasGiftWrap
                      ? "bg-black border-black text-white"
                      : "bg-white border-neutral-800 text-neutral-900 hover:bg-neutral-900 hover:text-white"
                  }`}
                >
                  {hasGiftWrap ? "Gift Wrap Added ($5.00)" : "Add A Gift Wrap"}
                </button>
              </div>

              {/* Special Instructions for Seller (Moved to components/form) */}
              <CheckoutOrderNotesForm
                value={specialInstructions}
                onChange={setSpecialInstructions}
              />
            </div>

            {/* ================= RIGHT COLUMN: SHIPPING, COUPON & SUMMARY ================= */}
            <div className="section-reveal-slide-right reveal-delay-200 lg:col-span-5 xl:col-span-4 space-y-6">
              {/* 1. Free Shipping Progress Box */}
              <div className="bg-[#f7f5f0] p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1.5">
                  <Zap className="w-3.5 h-3.5 text-neutral-800 fill-neutral-800" />
                  <span>Free shipping on orders {formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
                </div>
                <p className="text-xs text-neutral-600 mb-3.5 leading-snug">
                  {isFreeShipping
                    ? "Congratulations , you've got free shipping!"
                    : `Add ${formatPrice(freeShippingRemaining)} more to get free shipping!`}
                </p>
                <div className="w-full h-1 bg-neutral-200 overflow-hidden">
                  <div
                    className="h-full bg-[#00a651] transition-all duration-500 ease-out"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* 2. Shipping Estimates & Checkout Card */}
              <div className="bg-[#f7f5f0] p-6 sm:p-7 space-y-5">
                {/* Get shipping estimates (Moved to components/form) */}
                <CheckoutDeliveryForm
                  selectedCountry={selectedCountry}
                  onCountryChange={setSelectedCountry}
                  zipCode={zipCode}
                  onZipCodeChange={setZipCode}
                  onEstimate={handleEstimateShipping}
                  estimateMsg={shippingEstimateMsg}
                />

                {/* Coupon Code Section (Moved to components/form) */}
                <CheckoutCouponForm
                  couponCode={couponCode}
                  onCouponCodeChange={setCouponCode}
                  onApply={handleApplyCoupon}
                  couponFeedback={couponFeedback}
                  isDiscountApplied={discountAmount > 0}
                />

                {/* Subtotal & Summary */}
                <div className="pt-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-neutral-900">
                      Subtotal: {formatPrice(subtotal)}
                    </span>
                  </div>
                  {hasGiftWrap && (
                    <div className="flex items-center justify-between text-xs text-neutral-600">
                      <span>Gift Wrap:</span>
                      <span>{formatPrice(giftWrapCost)}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-xs text-emerald-700 font-medium">
                      <span>Discount:</span>
                      <span>- {formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <p className="text-[11px] text-neutral-500 italic">
                    Taxes and shipping calculated at checkout
                  </p>

                  <p className="text-[11.5px] text-neutral-500 leading-relaxed pt-2">
                    All charges are billed in <strong className="text-neutral-700 font-semibold">USD</strong>. While the content of your cart is currently displayed in , the checkout will use <strong className="text-neutral-700 font-semibold">USD</strong> at the most current exchange rate.
                  </p>

                  {/* Terms and Conditions Checkbox */}
                  <div className="pt-2">
                    <label htmlFor="checkout-terms-checkbox" className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        id="checkout-terms-checkbox"
                        name="agreeTerms"
                        type="checkbox"
                        autoComplete="off"
                        checked={agreeTerms}
                        onChange={(e) => {
                          setAgreeTerms(e.target.checked);
                          if (e.target.checked) setTermsError(false);
                        }}
                        aria-label="I agree with the terms and conditions"
                        className="mt-0.5 w-4 h-4 rounded-none accent-neutral-800 cursor-pointer"
                      />
                      <span className="text-xs text-neutral-700 leading-snug">
                        I agree with the{" "}
                        <span className="underline hover:text-black">terms and conditions</span>
                      </span>
                    </label>
                    {termsError && (
                      <p className="text-xs text-red-600 mt-1.5 font-medium animate-pulse">
                        Please agree with the terms and conditions before checking out.
                      </p>
                    )}
                  </div>

                  {/* CHECK OUT Button */}
                  <button
                    type="button"
                    onClick={handleCheckoutSubmit}
                    className="w-full mt-4 bg-[#717171] hover:bg-[#1f2024] text-white text-xs uppercase tracking-widest font-semibold py-3.5 px-6 transition-all duration-300 shadow-xs active:scale-[0.99] cursor-pointer"
                  >
                    CHECK OUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= CHECKOUT / PURCHASE SUCCESS ANIMATED MODAL ================= */}
      {checkoutModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={checkoutModal === "success" ? handleHardCloseModal : undefined}
        >
          <div
            className="relative w-full max-w-lg bg-white shadow-2xl p-6 sm:p-8 md:p-10 text-center overflow-hidden transform transition-all duration-300 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hard Close 'X' Button in Top Right */}
            <button
              type="button"
              onClick={handleHardCloseModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-2" />
            </button>

            {/* PHASE 1: PROCESSING STATE */}
            {checkoutModal === "processing" && (
              <div className="py-10 flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 border-4 border-neutral-200 border-t-brand-green rounded-full animate-spin" />
                <h3 className="font-heading text-xl text-[#1f2024] font-normal">
                  Securing Your Purchase...
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs">
                  Connecting to secure payment gateway and verifying your order details.
                </p>
              </div>
            )}

            {/* PHASE 2: CONGRATULATIONS & SUCCESSFUL PURCHASE */}
            {checkoutModal === "success" && (
              <div className="space-y-6">
                {/* Celebratory Checkmark Icon Animation */}
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-emerald-100/70 animate-ping opacity-60" />
                  <div className="relative w-18 h-18 rounded-full bg-brand-green text-white flex items-center justify-center shadow-lg">
                    <Check className="w-9 h-9 stroke-[2.5] animate-in zoom-in duration-300" />
                  </div>
                </div>

                {/* Heading */}
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-green mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Payment Confirmed</span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl text-[#1f2024] font-normal leading-tight">
                    Congratulations!
                    <br />
                    <span className="italic font-normal">Purchase Successful</span>
                  </h2>
                </div>

                {/* Order Details Card */}
                {orderSummarySnapshot && (
                  <div className="bg-[#f9f8f5] border border-neutral-200/80 p-4 sm:p-5 text-left text-xs space-y-2">
                    <div className="flex justify-between items-center text-neutral-600">
                      <span>Order Number:</span>
                      <strong className="text-neutral-900 font-mono font-bold">
                        {orderSummarySnapshot.orderNumber}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-neutral-600">
                      <span>Total Items:</span>
                      <strong className="text-neutral-900 font-medium">
                        {orderSummarySnapshot.totalItems} botanical item{orderSummarySnapshot.totalItems === 1 ? "" : "s"}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-neutral-600">
                      <span>Amount Paid:</span>
                      <strong className="text-brand-green text-sm font-semibold">
                        {formatPrice(orderSummarySnapshot.finalTotal)}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-neutral-600 border-t border-neutral-200/60 pt-2 text-[11px]">
                      <span className="flex items-center gap-1 text-emerald-700">
                        <ShieldCheck className="w-3.5 h-3.5" /> Guaranteed Delivery
                      </span>
                      <span className="text-neutral-500">{orderSummarySnapshot.date}</span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto">
                  Your cart has been processed and reset to 0. A confirmation receipt and tracking updates have been sent to your email.
                </p>

                {/* Action Buttons: Re-start Purchase */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleRestartPurchase}
                    className="w-full bg-[#1f2024] hover:bg-brand-green text-white text-xs uppercase tracking-widest font-semibold py-3.5 px-6 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Start A New Purchase</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                    <span>Auto-closing in {autoCloseCountdown}s</span>
                    <button
                      type="button"
                      onClick={handleHardCloseModal}
                      className="text-neutral-500 hover:text-neutral-800 underline uppercase tracking-wider cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default Checkout;

