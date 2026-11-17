import { memo, useState, useMemo } from "react";
import { Star, ChevronDown, Check, MessageSquare } from "lucide-react";
import { ProductReviewForm } from "../../../components/form/ProductReviewForm";
import { TABS, DESCRIPTION_HTML } from "../../../mock/data/products-id.data";

const TAB_KEYS = [
  { id: "description", label: "Description" },
  { id: "review", label: "Review" },
  { id: "shipping", label: "Shipping" },
  { id: "return", label: "Return" },
];

/**
 * ProductDetailSection2 Component
 *
 * Implements Section 2 of the Product Details page:
 * - Desktop: 4 options in one centered row (Description, Review, Shipping, Return)
 *   with large serif typography, active underline, and responsive tab content.
 * - Tablet & Mobile: Accordion interface where only ONE item is open at a time;
 *   opening another option automatically collapses the previously opened item.
 * - Sourced from products-id.data.js (TABS, SHIPPING_INFO, DESCRIPTION_HTML, product.reviews).
 */
export const ProductDetailSection2 = memo(function ProductDetailSection2({
  product,
}) {
  // Desktop active tab: "description" | "review" | "shipping" | "return"
  const [activeTab, setActiveTab] = useState("description");

  // Tablet & Mobile accordion active index: 0 | 1 | 2 | 3 | null (only ONE open at a time)
  const [activeAccordion, setActiveAccordion] = useState(0);

  // Review Form & Reviews State
  const initialReviews = useMemo(
    () => product?.reviews?.items || [],
    [product]
  );
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState("");

  // Handle Accordion Toggle (strictly enforce single-open behavior)
  const handleAccordionToggle = (index) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  // Submit Review Handler
  const handleAddReview = (newReview) => {
    const formattedReview = {
      ...newReview,
      date: new Date().toISOString().split("T")[0],
    };

    setReviewsList((prev) => [formattedReview, ...prev]);
    setIsReviewFormOpen(false);
    setReviewSuccessMsg("Thank you! Your review has been submitted successfully.");
    setTimeout(() => setReviewSuccessMsg(""), 4500);
  };

  // Shipping paragraphs from data
  const shippingData = useMemo(() => {
    if (product?.shipping?.details) return product.shipping.details;
    return TABS?.shipping || [
      "For orders placed before 7am AEDT, we endeavour to process the same business day. Orders placed after 11am AEDT will be processed the next business day.",
      "During sale events and new collection launches, there may be a slightly longer processing time.",
      "All Auguste orders are hand-picked and packed with love from Byron Bay, Australie.",
    ];
  }, [product]);

  // Return rules from data
  const returnData = useMemo(() => {
    if (product?.shipping?.returnPolicy) {
      return {
        intro: product.shipping.returnPolicy,
        rules: TABS?.return?.rules || [],
      };
    }
    return (
      TABS?.return || {
        intro:
          "You can choose between a refund or a credit note on full priced items.",
        rules: [
          "Item(s) must be returned in their original condition and packaging: unworn, unwashed and with all tags attached.",
          "Earrings cannot be returned due to health and safety reasons.",
          "Return shipping methods and associated costs are the responsibility of the customer.",
          "Sale items can not be refunded for change of mind.",
        ],
      }
    );
  }, [product]);

  // Description HTML or Structured fallback
  const descriptionContent = useMemo(() => {
    return product?.description || DESCRIPTION_HTML;
  }, [product]);

  /* ------------------------------------------------------------------ *
   * Render Tab Content Helpers
   * ------------------------------------------------------------------ */

  // 1. Description View
  const renderDescriptionContent = () => (
    <div className="text-neutral-600 text-sm sm:text-[15px] leading-relaxed space-y-4 font-sans max-w-4xl mx-auto text-left">
      <div
        className="[&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ul]:space-y-1.5 [&_li]:text-neutral-600"
        dangerouslySetInnerHTML={{ __html: descriptionContent }}
      />
    </div>
  );

  // 2. Review View
  const renderReviewContent = () => {
    const totalCount = reviewsList.length;
    const avgRating =
      totalCount > 0
        ? (
            reviewsList.reduce((acc, r) => acc + (r.rating || 5), 0) /
            totalCount
          ).toFixed(1)
        : 0;

    return (
      <div className="max-w-4xl mx-auto text-left font-sans">
        <h3 className="font-heading text-2xl sm:text-3xl text-[#1c1c1c] text-center font-normal mb-8">
          Customer Reviews
        </h3>

        {/* Review Summary Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 px-6 sm:px-10 bg-[#fafafa] border border-neutral-100 rounded-none mb-8">
          {/* Star rating summary */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= (totalCount > 0 ? Math.round(avgRating) : 0)
                      ? "fill-amber-400 text-amber-400"
                      : "text-neutral-300 stroke-[1.5]"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-neutral-600">
              {totalCount > 0
                ? `Based on ${totalCount} review${totalCount > 1 ? "s" : ""}`
                : "Be the first to write a review"}
            </span>
          </div>

          <div className="hidden sm:block h-8 w-px bg-neutral-200" />

          {/* Write a review trigger button */}
          <button
            type="button"
            onClick={() => setIsReviewFormOpen((open) => !open)}
            className="w-full sm:w-auto bg-[#1c1c1c] hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-medium px-8 py-3 transition-colors cursor-pointer select-none rounded-none shadow-xs"
          >
            {isReviewFormOpen ? "Cancel Review" : "Write a review"}
          </button>
        </div>

        {/* Success Alert Message */}
        {reviewSuccessMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 rounded-none">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{reviewSuccessMsg}</span>
          </div>
        )}

        {/* Collapsible Write a Review Form (Moved to components/form) */}
        {isReviewFormOpen && (
          <ProductReviewForm
            onSubmitReview={handleAddReview}
            onCancel={() => setIsReviewFormOpen(false)}
            productTitle={product?.title}
          />
        )}

        {/* Existing Reviews List */}
        {totalCount > 0 ? (
          <div className="divide-y divide-neutral-100">
            {reviewsList.map((item, idx) => (
              <div key={idx} className="py-6 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= (item.rating || 5)
                            ? "fill-amber-400 text-amber-400"
                            : "text-neutral-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400">
                    {item.date || "Recently"}
                  </span>
                </div>
                <div className="font-semibold text-sm text-neutral-900">
                  {item.title || item.author}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.body}
                </p>
                <div className="text-xs text-neutral-400 font-medium">
                  By {item.author}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-neutral-400 text-sm">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>
    );
  };

  // 3. Shipping View
  const renderShippingContent = () => (
    <div className="text-neutral-600 text-sm sm:text-[15px] leading-relaxed space-y-4 font-sans max-w-4xl mx-auto text-left">
      {shippingData.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );

  // 4. Return View
  const renderReturnContent = () => (
    <div className="text-neutral-600 text-sm sm:text-[15px] leading-relaxed space-y-4 font-sans max-w-4xl mx-auto text-left">
      {returnData.intro && <p>{returnData.intro}</p>}
      {returnData.rules && returnData.rules.length > 0 && (
        <ul className="list-disc pl-5 space-y-2 text-neutral-600">
          {returnData.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      )}
    </div>
  );

  // Content selector dispatcher
  const renderContentById = (id) => {
    switch (id) {
      case "description":
        return renderDescriptionContent();
      case "review":
        return renderReviewContent();
      case "shipping":
        return renderShippingContent();
      case "return":
        return renderReturnContent();
      default:
        return null;
    }
  };

  return (
    <section className="section-reveal-scale w-full bg-white border-t border-neutral-100 py-12 sm:py-16 md:py-20 font-sans">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            DESKTOP VIEW (md and up): 4 options in 1 centered row with active underline
           ========================================================================= */}
        <div className="hidden md:block">
          {/* Tab Navigation Header */}
          <div
            className="flex items-center justify-center gap-8 lg:gap-14 xl:gap-16 border-b border-neutral-100 pb-2 mb-10 lg:mb-12"
            role="tablist"
            aria-label="Product details tabs"
          >
            {TAB_KEYS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tab-panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-heading text-2xl lg:text-3xl font-normal transition-all duration-200 cursor-pointer select-none pb-2 relative ${
                    isActive
                      ? "text-[#1c1c1c] border-b-2 border-[#1c1c1c] -mb-2.5 font-medium"
                      : "text-neutral-400 hover:text-neutral-700"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Panel */}
          <div
            role="tabpanel"
            id={`tab-panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="animate-in fade-in duration-200"
          >
            {renderContentById(activeTab)}
          </div>
        </div>

        {/* =========================================================================
            TABLET & MOBILE VIEW (< md): Accordion with single-open enforcement
            Only ONE item can be open at any time; clicking another auto-closes the old.
           ========================================================================= */}
        <div className="block md:hidden divide-y divide-neutral-200 border-y border-neutral-200">
          {TAB_KEYS.map((tab, idx) => {
            const isOpen = activeAccordion === idx;
            return (
              <div key={tab.id} className="py-2">
                {/* Accordion Header Button */}
                <button
                  type="button"
                  onClick={() => handleAccordionToggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between py-4 text-left cursor-pointer select-none group"
                >
                  <span
                    className={`font-heading text-xl sm:text-2xl font-normal transition-colors duration-200 ${
                      isOpen
                        ? "text-[#1c1c1c] font-medium"
                        : "text-neutral-700 group-hover:text-black"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 text-black bg-neutral-100"
                        : "text-neutral-400 group-hover:text-neutral-700"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 stroke-[1.75]" />
                  </div>
                </button>

                {/* Accordion Body Content */}
                {isOpen && (
                  <div className="pb-6 pt-2 animate-in fade-in duration-200 overflow-hidden">
                    {renderContentById(tab.id)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default ProductDetailSection2;

