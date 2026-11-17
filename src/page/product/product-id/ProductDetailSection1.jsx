import { memo, useState, useMemo, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProductQuestionForm } from "../../../components/form/ProductQuestionForm";
import {
  Eye,
  Flame,
  CheckCircle2,
  Minus,
  Plus,
  Heart,
  GitCompare,
  HelpCircle,
  Package,
  Share2,
  Truck,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { addToCart } from "../../../redux/features/cartSlice";
import { toggleWishlist } from "../../../redux/features/wishlistSlice";
import { addToCompare as addToCompareAction } from "../../../redux/features/compareSlice";
import { resolveMockImageUrl } from "../../../mock/data/products.data";
import variableColorIcon from "../../../assets/icons/Variable-Color.avif";

const SWATCH_STYLES = {
  Black: { backgroundColor: "#111111" },
  Blue: { backgroundColor: "#2f6fed" },
  Grey: { backgroundColor: "#808080" },
  Orange: { backgroundColor: "#ff8c00" },
  Pink: { backgroundColor: "#ffc0cb" },
  Red: { backgroundColor: "#ee2222" },
  White: { backgroundColor: "#ffffff" },
  Plaid: {
    backgroundImage:
      "repeating-linear-gradient(0deg,#c33 0 3px,transparent 3px 6px),repeating-linear-gradient(90deg,#369 0 3px,#eee 3px 6px)",
  },
  Floral: {
    backgroundImage:
      "radial-gradient(circle at 30% 30%,#f7a 0 25%,transparent 26%),radial-gradient(circle at 70% 70%,#fc6 0 25%,transparent 26%),#cfe8c8",
  },
  Geometric: {
    backgroundImage: "conic-gradient(#234 0 25%,#eee 0 50%,#234 0 75%,#eee 0)",
  },
  Striped: {
    backgroundImage: "repeating-linear-gradient(45deg,#333 0 4px,#eee 4px 8px)",
  },
};

/**
 * ProductDetailSection1
 *
 * Implements Section 1 of the Product Details page:
 * - Top Breadcrumbs (Home / Category / Product Name)
 * - Responsive 2-column layout on Desktop, 2 rows (stacked) on Tablet & Mobile
 * - Gallery with side thumbnails that switch the main image, navigation arrows,
 *   sale badge, and a Full View Lightbox Modal with zoom controls
 * - Rich product information: title, dynamic pricing, viewer counter, sales velocity,
 *   stock status, description, color swatches with active selection, quantity counter,
 *   pre-order / add-to-cart, wishlist integration, terms acceptance, Buy It Now,
 *   quick action buttons, delivery estimate box, and Guaranteed Checkout card
 *   featuring Variable-Color.avif.
 */
export const ProductDetailSection1 = memo(function ProductDetailSection1({
  product,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux Wishlist state to show filled heart if already in wishlist
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const isWishlisted = useMemo(
    () =>
      wishlistItems.some(
        (item) =>
          (item.handle &&
            product?.handle &&
            String(item.handle) === String(product.handle)) ||
          (item.id !== undefined &&
            product?.handle &&
            String(item.id) === String(product.handle)) ||
          (item.id !== undefined &&
            product?.id !== undefined &&
            String(item.id) === String(product.id)) ||
          (item.handle &&
            product?.id !== undefined &&
            String(item.handle) === String(product.id)),
      ),
    [wishlistItems, product],
  );

  // Normalise product images
  const images = useMemo(() => {
    if (!product) return [];
    if (product.fullImageUrls && product.fullImageUrls.length > 0) {
      return product.fullImageUrls;
    }
    if (product.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls;
    }
    if (product.images && product.images.length > 0) {
      return product.images.map((img) => resolveMockImageUrl(img, 900));
    }
    if (product.image) {
      return [resolveMockImageUrl(product.image, 900)];
    }
    return [];
  }, [product]);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Variant & purchase state
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || product?.variants?.[0]?.title || "Geometric",
  );
  const [quantity, setQuantity] = useState(1);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  // Modals & notifications
  const [copiedShare, setCopiedShare] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // "shipping" | "question" | "compare" | null
  const [addedToast, setAddedToast] = useState("");

  // Handle color swatch selection & sync active image if variant has associated image
  const handleSelectColor = useCallback(
    (color) => {
      setSelectedColor(color);
      // If variant has an image, switch gallery to it
      if (product?.variants) {
        const variantIndex = product.variants.findIndex(
          (v) => (v.title || v.option1) === color,
        );
        if (variantIndex !== -1 && images[variantIndex]) {
          setActiveImageIndex(variantIndex);
        }
      }
    },
    [product, images],
  );

  // Next / Prev image navigation
  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Lightbox keyboard controls, full view class, and body scroll locking
  useEffect(() => {
    if (!isLightboxOpen && !activeModal) return;
    document.body.style.overflow = "hidden";
    if (isLightboxOpen) {
      document.body.classList.add("product-fullview-open");
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) setIsLightboxOpen(false);
        if (activeModal) setActiveModal(null);
      }
      if (isLightboxOpen) {
        if (e.key === "ArrowLeft") handlePrevImage();
        if (e.key === "ArrowRight") handleNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("product-fullview-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, activeModal, handlePrevImage, handleNextImage]);

  // Pricing calculations
  const price = product?.price || 62.0;
  const compareAtPrice =
    product?.compareAtPrice || product?.comparePrice || 90.0;
  const hasDiscount = compareAtPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  // Add to cart handler
  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id || product.handle,
        numericId: product.numericId,
        handle: product.handle,
        title: product.title || product.name,
        price,
        compareAtPrice,
        image: images[0],
        selectedColor,
        quantity,
      }),
    );
    setAddedToast(`Added ${quantity} "${product.title}" to cart`);
    setTimeout(() => setAddedToast(""), 3500);
  };

  // Wishlist toggle handler
  const handleToggleWishlist = () => {
    if (!product) return;
    dispatch(
      toggleWishlist({
        id: product.id || product.handle,
        handle: product.handle,
        title: product.title || product.name,
        price,
        comparePrice: compareAtPrice,
        image:
          images[0] || product.image || (product.images?.[0]?.src ?? "") || "",
        inStock: product.inStock !== false,
      }),
    );
    setAddedToast(
      isWishlisted
        ? `Removed "${product.title || product.name}" from wishlist`
        : `Added "${product.title || product.name}" to wishlist`,
    );
    setTimeout(() => setAddedToast(""), 3500);
  };

  // Buy It Now handler
  const handleBuyItNow = () => {
    if (!agreeTerms) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    handleAddToCart();
    navigate("/checkout");
  };

  // Share handler
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const categoryTitle = product?.category || "Air Purifying";
  const categorySlug = categoryTitle.toLowerCase().replace(/\s+/g, "-");
  const isPreOrder = Boolean(product?.preOrder);

  return (
    <section className="w-full bg-white pb-16 pt-4 sm:pt-6 font-sans">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= BREADCRUMBS ================= */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[13px] text-neutral-500 mb-6 sm:mb-8"
        >
          <Link
            to="/"
            className="hover:text-black transition-colors underline-offset-4 hover:underline"
          >
            Home
          </Link>
          <span className="text-neutral-400">/</span>
          <Link
            to={`/collections/${categorySlug}`}
            className="text-neutral-700 underline underline-offset-4 decoration-neutral-400 hover:text-black hover:decoration-black transition-colors"
          >
            {categoryTitle}
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="text-neutral-800 font-medium truncate">
            {product?.title || "Umbrella Tree"}
          </span>
        </nav>

        {/* ================= MAIN 2-COLUMN (DESKTOP) / 2-ROW (TABLET & MOBILE) GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* ---------------- LEFT: MEDIA GALLERY ---------------- */}
          <div className="section-reveal-slide-left flex flex-col-reverse lg:flex-row gap-3 sm:gap-4 w-full">
            {/* Side Thumbnails Column */}
            {images.length > 1 && (
              <div
                className="flex flex-row lg:flex-col gap-2.5 sm:gap-3 shrink-0 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0"
                role="tablist"
                aria-label="Product thumbnails"
              >
                {images.map((imgSrc, idx) => {
                  const isSelected = idx === activeImageIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={`View image ${idx + 1}`}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-20 sm:w-20 sm:h-24 md:w-22 md:h-26 shrink-0 bg-[#f7f7f7] border transition-all duration-200 cursor-pointer overflow-hidden ${
                        isSelected
                          ? "border-black shadow-xs ring-1 ring-black"
                          : "border-neutral-200 hover:border-neutral-400 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt={`${product?.title || "Product"} thumbnail ${idx + 1}`}
                        width={88}
                        height={104}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Main Stage Image Display */}
            <div className="relative flex-1 bg-[#f9f9f9] border border-neutral-100 overflow-hidden group select-none">
              {/* Sale Discount Badge */}
              {hasDiscount && (
                <div className="absolute top-3 right-3 z-10 bg-[#cf2e2e] text-white text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-none shadow-xs uppercase">
                  - {discountPercent}%
                </div>
              )}

              {/* Full View Lightbox Trigger Button */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Open image in fullscreen view"
                className="absolute top-3 right-3 z-10 bg-white/95 hover:bg-white text-neutral-800 p-2.5 rounded-full shadow-md border border-neutral-200/80 transition-all duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"
                style={hasDiscount ? { right: "4.75rem" } : undefined}
                title="Full View"
              >
                <Maximize2 className="w-4 h-4 stroke-2" />
              </button>

              {/* Main Image with Smooth Fade */}
              <div className="relative w-full aspect-4/5 sm:aspect-square lg:aspect-4/5 max-h-160 flex items-center justify-center bg-neutral-50 overflow-hidden">
                <img
                  src={images[activeImageIndex] || images[0]}
                  alt={product?.title || "Product main view"}
                  width={640}
                  height={800}
                  className="w-full h-full object-cover object-center transition-opacity duration-300 cursor-zoom-in"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onClick={() => setIsLightboxOpen(true)}
                />
              </div>

              {/* Navigation Arrows on Main Image */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 hover:bg-white text-neutral-800 rounded-full shadow-md border border-neutral-200/60 flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer opacity-90 hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-2" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 hover:bg-white text-neutral-800 rounded-full shadow-md border border-neutral-200/60 flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer opacity-90 hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5 stroke-2" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ---------------- RIGHT: PRODUCT INFO & PURCHASE CONTROLS ---------------- */}
          <div className="section-reveal-slide-right reveal-delay-100 flex flex-col w-full text-left">
            {/* Product Title */}
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#1c1c1c] font-normal tracking-tight leading-snug mb-3">
              {product?.title || "Umbrella Tree"}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-4">
              {hasDiscount && (
                <span className="text-neutral-400 line-through text-lg sm:text-xl font-normal">
                  ${Number(compareAtPrice).toFixed(2)}
                </span>
              )}
              <span className="text-xl sm:text-2xl font-semibold text-[#1c1c1c]">
                ${Number(price).toFixed(2)}
              </span>
            </div>

            <div className="w-full border-b border-neutral-200/80 mb-5" />

            {/* Real-time Visitor Counter */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-600 mb-2.5">
              <Eye className="w-4 h-4 text-neutral-700 stroke-[1.75]" />
              <span>
                <strong className="font-semibold text-neutral-900">
                  {product?.viewersCount || 34}
                </strong>{" "}
                people are viewing this right now
              </span>
            </div>

            {/* Sales Velocity Flame */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium mb-2.5">
              <Flame className="w-4 h-4 text-red-500 fill-red-500 stroke-[1.5]" />
              <span>
                <strong className="text-neutral-900">
                  {product?.salesCount || 35} sold
                </strong>{" "}
                in last {product?.salesHours || 19} hours
              </span>
            </div>

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-xs sm:text-sm mb-5">
              {product?.inStock !== false ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-2" />
                  <span className="font-medium text-emerald-700">In stock</span>
                </>
              ) : (
                <span className="font-medium text-rose-600">Out of stock</span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
              {product?.shortDescription ||
                "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum"}
            </p>

            {/* Color Swatches */}
            {product?.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="text-xs sm:text-sm text-neutral-700 mb-2.5">
                  Color:{" "}
                  <span className="font-semibold text-neutral-900">
                    {selectedColor}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((colorName) => {
                    const isSelected = selectedColor === colorName;
                    const customStyle = SWATCH_STYLES[colorName] || {
                      backgroundColor: "#cccccc",
                    };
                    return (
                      <button
                        key={colorName}
                        type="button"
                        onClick={() => handleSelectColor(colorName)}
                        title={colorName}
                        aria-label={`Select color ${colorName}`}
                        className={`relative w-8 h-8 rounded-full border border-neutral-300 transition-all duration-150 cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? "ring-2 ring-black ring-offset-2 scale-105"
                            : "hover:scale-105"
                        }`}
                        style={customStyle}
                      >
                        {isSelected && (
                          <span className="sr-only">Selected</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity & Pre-Order / Add To Cart Row */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 mb-4">
              {/* Quantity Counter */}
              <div className="flex items-center justify-between border border-neutral-300 bg-white h-12 px-3 w-32 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  className="p-1 text-neutral-600 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-medium text-sm text-neutral-900 select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="p-1 text-neutral-600 hover:text-black cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Pre-Order / Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product?.inStock === false}
                className="flex-1 h-12 bg-[#555555] hover:bg-[#1c1c1c] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white text-xs sm:text-sm uppercase tracking-wider font-medium px-6 transition-colors duration-200 cursor-pointer select-none flex items-center justify-center rounded-none shadow-xs"
              >
                {isPreOrder ? "Pre-Order" : "Add to Cart"}
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={handleToggleWishlist}
                aria-label="Add to wishlist"
                title="Wishlist"
                className={`w-12 h-12 border border-neutral-300 hover:border-black flex items-center justify-center transition-colors cursor-pointer shrink-0 rounded-none ${
                  isWishlisted
                    ? "bg-neutral-50 text-red-500 border-red-300"
                    : "text-neutral-700"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted
                      ? "fill-red-500 stroke-red-500"
                      : "stroke-[1.75]"
                  }`}
                />
              </button>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="mb-4">
              <label
                htmlFor="product-agree-terms"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-600 cursor-pointer select-none"
              >
                <input
                  id="product-agree-terms"
                  name="agreeTerms"
                  type="checkbox"
                  autoComplete="off"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (e.target.checked) setTermsError(false);
                  }}
                  aria-label="I agree with the terms and conditions"
                  className="w-4 h-4 rounded-none border-neutral-300 text-neutral-900 focus:ring-0 cursor-pointer accent-black"
                />
                <span>
                  I agree with the{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveModal("terms");
                    }}
                    className="underline underline-offset-2 hover:text-black text-neutral-800 font-medium"
                  >
                    terms and conditions
                  </button>
                </span>
              </label>
              {termsError && (
                <p className="text-xs text-red-500 mt-1 pl-6">
                  Please agree with the terms and conditions before buying.
                </p>
              )}
            </div>

            {/* Buy It Now Button */}
            <button
              type="button"
              onClick={handleBuyItNow}
              className="w-full h-12 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white text-xs sm:text-sm uppercase tracking-wider font-medium transition-colors duration-200 cursor-pointer select-none rounded-none mb-6 shadow-xs"
            >
              Buy It Now
            </button>

            {/* Quick Actions Row */}
            <div className="flex items-center justify-between sm:justify-start sm:gap-6 py-3 border-y border-neutral-100 text-xs sm:text-[13px] text-neutral-600 mb-6">
              <button
                type="button"
                onClick={() => {
                  if (product) {
                    dispatch(
                      addToCompareAction({
                        id: product.id || product.handle,
                        handle: product.handle,
                        title: product.title || product.name,
                        price,
                        comparePrice: compareAtPrice,
                        image: images[0],
                        images,
                        colors: product.colors || [],
                        sizes: product.sizes || [],
                        rating: 5,
                        inStock: true,
                        url: `/products/${product.handle}`,
                      }),
                    );
                  }
                }}
                className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Compare</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("question")}
                className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Question</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("shipping")}
                className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
              >
                <Package className="w-3.5 h-3.5" />
                <span>Shipping info</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedShare ? "Link Copied!" : "Share"}</span>
              </button>
            </div>

            {/* Delivery Estimate Box */}
            <div className="flex items-start gap-3 p-4 border border-neutral-200/90 bg-white rounded-none mb-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <Truck className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
              <div>
                Order in the next{" "}
                <span className="font-semibold text-neutral-900">
                  11 hours 46 minutes
                </span>{" "}
                to get it between{" "}
                <u className="font-medium underline-offset-2">
                  Tuesday, Nov 10
                </u>{" "}
                and{" "}
                <u className="font-medium underline-offset-2">
                  Saturday, Nov 14
                </u>
              </div>
            </div>

            {/* Guaranteed Checkout Card with Variable-Color.avif */}
            <div className="bg-[#f7f7f7] border border-neutral-100 p-5 sm:p-6 text-center rounded-none">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-800 mb-3.5">
                Guaranteed Checkout
              </h4>
              <div className="flex justify-center items-center">
                <img
                  src={variableColorIcon}
                  alt="Guaranteed Checkout - Visa, Mastercard, American Express, Stripe, Shopify Secure"
                  width={280}
                  height={32}
                  className="max-h-7 sm:max-h-8 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FULL VIEW LIGHTBOX (MATCHING REFERENCE: SIDE IMAGES, CENTER SELECTED IMAGE, 3 BOTTOM BUTTONS, NO HEADER/FOOTER) ================= */}
      {isLightboxOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-999999 bg-white flex flex-col lg:flex-row items-stretch justify-between animate-in fade-in duration-200 overflow-hidden select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Product full view"
            style={{ zIndex: 999999 }}
          >
            {/* Top-Right Floating Close Button */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close full view"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-11 h-11 rounded-full bg-white text-neutral-800 shadow-md border border-neutral-200/80 flex items-center justify-center transition-all hover:bg-neutral-50 hover:scale-105 active:scale-95 cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5 text-neutral-800 stroke-2" />
            </button>

            {/* Left Side Images Gallery (Side thumbnails) */}
            {images.length > 1 && (
              <aside
                className="w-full lg:w-28 xl:w-32 shrink-0 border-b lg:border-b-0 lg:border-r border-neutral-100 bg-[#fbfbfb] p-3 sm:p-4 lg:p-5 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto z-20"
                aria-label="Full view side images"
              >
                {images.map((thumbSrc, idx) => {
                  const isSelected = idx === activeImageIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`Select image ${idx + 1}`}
                      className={`relative w-16 h-20 sm:w-20 sm:h-24 lg:w-full lg:h-28 shrink-0 bg-white border transition-all duration-200 cursor-pointer overflow-hidden ${
                        isSelected
                          ? "border-black ring-1 ring-black shadow-xs"
                          : "border-neutral-200 opacity-60 hover:opacity-100 hover:border-neutral-400"
                      }`}
                    >
                      <img
                        src={thumbSrc}
                        alt={`${product?.title || "Product"} side view ${idx + 1}`}
                        width={96}
                        height={112}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  );
                })}
              </aside>
            )}

            {/* Center Main Selected Image with 3 Bottom Floating Circular Buttons */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden bg-white">
              {/* Main Selected Image in Center */}
              <div className="relative flex-1 flex items-center justify-center w-full max-h-[72vh] sm:max-h-[76vh] lg:max-h-[82vh]">
                <img
                  src={images[activeImageIndex] || images[0]}
                  alt={product?.title || "Product full view main"}
                  width={800}
                  height={800}
                  className="max-h-full max-w-full object-contain mx-auto transition-transform duration-300"
                  decoding="async"
                />
              </div>

              {/* 3 Circular Action Buttons Centered Under Image (Matches Reference Screenshot) */}
              <div className="flex items-center justify-center gap-3.5 mt-4 sm:mt-6 z-20">
                {/* Left Arrow Button */}
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                  title="Previous"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-neutral-800 shadow-md hover:shadow-lg border border-neutral-200/90 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-800 stroke-2" />
                </button>

                {/* Close Button in Center */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close full view"
                  title="Close"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-neutral-800 shadow-md hover:shadow-lg border border-neutral-200/90 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <X className="w-5 h-5 text-neutral-800 stroke-2" />
                </button>

                {/* Right Arrow Button */}
                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next image"
                  title="Next"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-neutral-800 shadow-md hover:shadow-lg border border-neutral-200/90 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 text-neutral-800 stroke-2" />
                </button>
              </div>
            </main>
          </div>,
          document.body,
        )}

      {/* ================= QUICK ACTION MODALS ================= */}
      {activeModal &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            style={{ zIndex: 99999 }}
          >
            <div className="relative w-full max-w-md bg-white p-6 sm:p-8 rounded-none border border-neutral-200 shadow-xl">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {activeModal === "shipping" && (
                <div>
                  <h3 className="font-heading text-xl text-neutral-900 mb-3 font-normal">
                    Shipping & Delivery
                  </h3>
                  <div className="text-sm text-neutral-600 space-y-2.5">
                    <p>
                      • Free standard delivery on all plant orders over $75.
                    </p>
                    <p>• Estimated shipping timeframe: 3–5 business days.</p>
                    <p>
                      • Carefully packaged in eco-friendly protective plant
                      cartons.
                    </p>
                    <p>• 30-day healthy plant guarantee or free replacement.</p>
                  </div>
                </div>
              )}

              {activeModal === "question" && (
                <ProductQuestionForm
                  productTitle={product?.title || "this product"}
                  onSubmitQuestion={() => {
                    setActiveModal(null);
                    setAddedToast("Your question has been sent!");
                    setTimeout(() => setAddedToast(""), 3500);
                  }}
                  onCancel={() => setActiveModal(null)}
                />
              )}

              {activeModal === "compare" && (
                <div>
                  <h3 className="font-heading text-xl text-neutral-900 mb-3 font-normal">
                    Compare Product
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    <strong>{product?.title}</strong> is categorized under{" "}
                    <strong>{categoryTitle}</strong>. It requires
                    medium-to-bright indirect light and moderate watering.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider py-2.5 transition-colors rounded-none font-medium"
                  >
                    Done
                  </button>
                </div>
              )}

              {activeModal === "terms" && (
                <div>
                  <h3 className="font-heading text-xl text-neutral-900 mb-3 font-normal">
                    Terms & Conditions
                  </h3>
                  <div className="text-xs text-neutral-600 max-h-56 overflow-y-auto space-y-2 pr-2">
                    <p>
                      All live plant purchases are backed by our 30-day health
                      guarantee. Plants must be inspected upon arrival. In the
                      rare event of transit shock or damage, photographic proof
                      should be submitted within 48 hours for immediate
                      replacement.
                    </p>
                    <p>
                      Pre-orders are billed at checkout and shipped promptly as
                      seasonal nursery stock matures.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAgreeTerms(true);
                      setTermsError(false);
                      setActiveModal(null);
                    }}
                    className="w-full mt-4 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider py-2.5 transition-colors rounded-none font-medium"
                  >
                    Accept Terms
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}

      {/* ================= NOTIFICATION TOAST ================= */}
      {addedToast &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed bottom-6 right-6 z-99999 bg-neutral-900 text-white text-xs sm:text-sm px-4 py-3 rounded-none shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200"
            style={{ zIndex: 99999 }}
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{addedToast}</span>
          </div>,
          document.body,
        )}
    </section>
  );
});

export default ProductDetailSection1;
