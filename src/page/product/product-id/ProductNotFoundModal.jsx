import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowRight, X } from "lucide-react";

/**
 * ProductNotFoundModal Component
 *
 * Triggered when a user enters an invalid or random product name in the URL.
 * Displays a warning that the item does not exist and offers a direct way
 * back to the product catalog.
 */
export const ProductNotFoundModal = memo(function ProductNotFoundModal({
  isOpen,
  invalidHandle = "",
  onClose,
}) {
  const navigate = useNavigate();

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGoToProducts = () => {
    onClose?.();
    navigate("/product");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="warning-modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-white border border-[#eeeeee] shadow-2xl p-6 sm:p-8 rounded-none z-10 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 text-[#888888] hover:text-[#1c1c1c] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon Badge */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
          <AlertTriangle className="w-7 h-7 stroke-[1.75]" />
        </div>

        {/* Warning Title */}
        <h3
          id="warning-modal-title"
          className="font-heading text-2xl text-[#1c1c1c] font-normal mb-2 tracking-tight"
        >
          Item Not Found
        </h3>

        {/* Warning Message */}
        <p className="text-sm text-[#666666] leading-relaxed mb-6 font-sans">
          There is no any item in website matching{" "}
          <span className="font-semibold text-[#1c1c1c]">
            "{invalidHandle || "this URL"}"
          </span>
          . Please explore our store catalog to find your desired plants and pots.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleGoToProducts}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1c1c1c] hover:bg-brand-green text-white text-xs uppercase tracking-widest px-6 py-3.5 transition-colors font-medium font-sans cursor-pointer select-none"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto border border-[#d5d5d5] hover:border-[#1c1c1c] text-[#555555] hover:text-[#1c1c1c] text-xs uppercase tracking-widest px-5 py-3.5 transition-colors font-medium font-sans cursor-pointer select-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductNotFoundModal;

