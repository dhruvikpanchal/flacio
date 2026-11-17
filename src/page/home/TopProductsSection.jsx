import { memo, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Check } from "lucide-react";
import {
  ProductCard,
  QuickView,
} from "../../components/ui/ProductCard";
import { MOCK_PRODUCTS } from "../../mock/data";
import { addToCart as addToCartAction } from "../../redux/features/cartSlice";
import { toggleWishlist as toggleWishlistAction } from "../../redux/features/wishlistSlice";
import { addToCompare as addToCompareAction } from "../../redux/features/compareSlice";

/**
 * TopProductsSection (Section 4 in Home Page)
 *
 * Implements:
 * - 2-option switcher: "Top Rating" / "Best Selling" (one active at a time)
 * - Typography matches reference: serif font with italicized second word ("Top Rating / Best Selling")
 * - 8 product cards in a responsive grid:
 *   - Desktop: 4 columns in 1 row (2 rows total for 8 items)
 *   - Tablet: 2 to 3 columns
 *   - Mobile: 1 to 2 columns
 * - Uses ProductCard.jsx for card design with ratings, swatches, hover buttons, badges, QuickView, Compare.
 * - Sourced dynamically from mock folder data (MOCK_PRODUCTS).
 * - Circular "View more →" button centered at the bottom linking to /product.
 */
export const TopProductsSection = memo(function TopProductsSection() {
  const dispatch = useDispatch();

  // Active tab: "top-rating" | "best-selling"
  const [activeTab, setActiveTab] = useState("top-rating");

  // Redux Wishlist & Compare state
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const compareItems = useSelector((state) => state.compare?.items || []);

  // Modals & toast state
  const [quickProduct, setQuickProduct] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  }, []);

  // Top Rating product sequence matching reference screenshots 1 & 2:
  // Row 1: tiger-aloe, ruby-rubber-tree, peace-lily, philippine-evergreen
  // Row 2: the-beginner-set, pink-dragon-tree, palm, spider-plant
  const topRatingOrder = useMemo(
    () => [
      "tiger-aloe",
      "ruby-rubber-tree",
      "peace-lily",
      "philippine-evergreen",
      "the-beginner-set",
      "pink-dragon-tree",
      "palm",
      "spider-plant",
    ],
    []
  );

  // Best Selling product sequence
  const bestSellingOrder = useMemo(
    () => [
      "umbrella-tree",
      "jade-succulent",
      "ruby-rubber-tree",
      "tiger-aloe",
      "palm",
      "peace-lily",
      "the-beginner-set",
      "spider-plant",
    ],
    []
  );

  // Filter and format products based on the active tab
  const displayedProducts = useMemo(() => {
    const orderList = activeTab === "top-rating" ? topRatingOrder : bestSellingOrder;

    const orderedItems = orderList
      .map((handle) => MOCK_PRODUCTS.find((p) => p.handle === handle))
      .filter(Boolean);

    // Format products specifically for ProductCard
    return orderedItems.map((p) => {
      const imagesList =
        p.imageUrls && p.imageUrls.length > 0
          ? p.imageUrls.map((url) => ({ src: url }))
          : p.image
          ? [{ src: p.image }]
          : [{ src: "" }];

      return {
        ...p,
        title: p.title || p.name,
        price: p.price,
        comparePrice: p.comparePrice || p.compareAtPrice,
        images: imagesList,
        colors: p.colors || [],
        sizes: p.sizes || [],
        rating: p.rating || 0,
        reviewCount: p.reviewCount || 0,
        inStock: p.inStock !== false,
        preOrder: Boolean(p.preOrder),
        variantId: p.variantId || 1,
        extraVariants: p.colors?.length > 2 ? 1 : 0,
        url: `/collections/all/products/${p.handle}`,
      };
    });
  }, [activeTab, topRatingOrder, bestSellingOrder]);

  // Cart action handler (dispatches to Redux)
  const handleAddToCart = useCallback(
    (p, quantity = 1, color = null) => {
      dispatch(
        addToCartAction({
          id: p.id || p.handle,
          numericId: p.numericId,
          handle: p.handle,
          title: p.title,
          price: p.price,
          compareAtPrice: p.comparePrice,
          image: p.images?.[0]?.src || p.image,
          selectedColor: color,
          quantity,
        })
      );
      showToast(`Added "${p.title}" to cart`);
    },
    [dispatch, showToast]
  );

  // Wishlist toggle handler (dispatches to Redux)
  const handleToggleWishlist = useCallback(
    (p) => {
      const isWishlisted = wishlistItems.some(
        (w) =>
          (w.handle && p.handle && String(w.handle) === String(p.handle)) ||
          (w.id !== undefined && p.handle && String(w.id) === String(p.handle)) ||
          (w.id !== undefined && p.id !== undefined && String(w.id) === String(p.id)) ||
          (w.handle && p.id !== undefined && String(w.handle) === String(p.id))
      );
      dispatch(
        toggleWishlistAction({
          id: p.id || p.handle,
          handle: p.handle,
          title: p.title,
          price: p.price,
          comparePrice: p.comparePrice,
          image: p.images?.[0]?.src || p.image || (typeof p.images?.[0] === "string" ? p.images[0] : "") || "",
          inStock: p.inStock !== false,
        })
      );
      showToast(
        isWishlisted
          ? `Removed "${p.title}" from wishlist`
          : `Added "${p.title}" to wishlist`
      );
    },
    [wishlistItems, dispatch, showToast]
  );

  // Compare handler
  const handleToggleCompare = useCallback(
    (p) => {
      dispatch(addToCompareAction(p));
    },
    [dispatch]
  );

  return (
    <section className="section-reveal w-full bg-white py-14 sm:py-18 md:py-24 font-sans border-t border-neutral-100">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= 2-OPTION SWITCHER HEADER ================= */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mb-10 sm:mb-14">
          <button
            type="button"
            onClick={() => setActiveTab("top-rating")}
            className={`font-heading text-2xl sm:text-3xl md:text-4xl transition-colors cursor-pointer select-none ${
              activeTab === "top-rating"
                ? "text-[#1c1c1c] font-normal"
                : "text-neutral-400 hover:text-neutral-700 font-normal"
            }`}
          >
            Top <span className="italic font-normal">Rating</span>
          </button>

          <span className="text-neutral-300 font-light text-2xl sm:text-3xl select-none">
            /
          </span>

          <button
            type="button"
            onClick={() => setActiveTab("best-selling")}
            className={`font-heading text-2xl sm:text-3xl md:text-4xl transition-colors cursor-pointer select-none ${
              activeTab === "best-selling"
                ? "text-[#1c1c1c] font-normal"
                : "text-neutral-400 hover:text-neutral-700 font-normal"
            }`}
          >
            Best <span className="italic font-normal">Selling</span>
          </button>
        </div>

        {/* ================= 8 PRODUCT CARDS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-16 animate-in fade-in duration-300">
          {displayedProducts.map((p) => (
            <ProductCard
              key={p.handle}
              product={p}
              collection="all"
              wishlisted={wishlistItems.some(
                (w) =>
                  (w.handle && p.handle && String(w.handle) === String(p.handle)) ||
                  (w.id !== undefined && p.handle && String(w.id) === String(p.handle)) ||
                  (w.id !== undefined && p.id !== undefined && String(w.id) === String(p.id)) ||
                  (w.handle && p.id !== undefined && String(w.handle) === String(p.id))
              )}
              compared={compareItems.some(
                (c) => c.handle === p.handle || c.id === p.handle || c.id === p.id
              )}
              onWishlist={handleToggleWishlist}
              onCompare={handleToggleCompare}
              onQuickView={setQuickProduct}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* ================= CIRCULAR VIEW MORE BUTTON ================= */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link
            to="/product"
            className="group w-22 h-22 sm:w-24 sm:h-24 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-xs font-sans text-neutral-800 hover:text-black hover:scale-105 transition-all duration-300 text-center p-3 select-none"
          >
            <span className="leading-tight">
              View more{" "}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* ================= QUICK VIEW MODAL ================= */}
      {quickProduct && (
        <QuickView
          product={quickProduct}
          onClose={() => setQuickProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* ================= NOTIFICATION TOAST ================= */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1c1c] text-white text-xs sm:text-sm px-4 py-3 rounded-none shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </section>
  );
});

export default TopProductsSection;

