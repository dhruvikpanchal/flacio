import { memo, useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import {
  ProductCard,
  QuickView,
} from "../../../components/ui/ProductCard";
import { MOCK_PRODUCTS } from "../../../mock/data";
import { addToCart as addToCartAction } from "../../../redux/features/cartSlice";
import { toggleWishlist as toggleWishlistAction } from "../../../redux/features/wishlistSlice";
import { addToCompare as addToCompareAction } from "../../../redux/features/compareSlice";

const RECENTLY_VIEWED_KEY = "flacio_recently_viewed_products";

/**
 * ProductDetailSection4
 *
 * Implements Section 4 ("Recently Viewed Products") on the Product Details page:
 * - Header: "Recently Viewed Products" in serif heading font with the decorative dark green bar.
 * - Dynamic Tracking: Keeps track of products viewed in localStorage.
 * - Seeded Fallback: Seeds with the 4 products from the reference screenshot
 *   (Umbrella Tree, Tiger Aloe, The Beginner Set, Ruby Rubber Tree).
 * - Responsive Carousel:
 *   - Desktop: 4 products visible in one row
 *   - Tablet: 2 to 3 products visible
 *   - Mobile: 1 to 2 products visible with touch swiping
 * - Integrates with `ProductCard.jsx` for cards, hover actions, ratings, swatches,
 *   Quick View modal, Compare modal, Wishlist, and Redux cart sync.
 */
export const ProductDetailSection4 = memo(function ProductDetailSection4({
  product,
}) {
  const dispatch = useDispatch();

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    loop: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((api) => {
    if (!api) return;
    setCanScrollPrev((prev) => {
      const next = api.canScrollPrev();
      return prev !== next ? next : prev;
    });
    setCanScrollNext((prev) => {
      const next = api.canScrollNext();
      return prev !== next ? next : prev;
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  // Wishlist & Compare from Redux store
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const compareItems = useSelector((state) => state.compare?.items || []);

  // QuickView & Toast state
  const [quickProduct, setQuickProduct] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  }, []);

  // Record current product in localStorage
  useEffect(() => {
    if (!product?.handle) return;
    try {
      const stored = JSON.parse(
        localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]"
      );
      const filtered = stored.filter((h) => h !== product.handle);
      const updated = [product.handle, ...filtered].slice(0, 10);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
    } catch {
      // Storage unavailable
    }
  }, [product?.handle]);

  // Retrieve recently viewed products list (seeded with reference products)
  const recentlyViewedProducts = useMemo(() => {
    let storedHandles;
    try {
      storedHandles = JSON.parse(
        localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]"
      );
    } catch {
      storedHandles = [];
    }
    if (!Array.isArray(storedHandles)) storedHandles = [];

    // Default 4 products to match user reference image
    const defaultSeed = [
      "umbrella-tree",
      "tiger-aloe",
      "the-beginner-set",
      "ruby-rubber-tree",
      "palm",
      "jade-succulent",
    ];

    // Combine stored handles with defaultSeed (keeping unique order)
    const combinedHandles = [
      ...new Set([
        product?.handle,
        ...storedHandles,
        ...defaultSeed,
      ].filter(Boolean)),
    ];

    return combinedHandles
      .map((handle) => MOCK_PRODUCTS.find((p) => p.handle === handle))
      .filter(Boolean)
      .map((p) => {
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
  }, [product?.handle]);

  // Cart action handler (dispatches to Redux store)
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

  // Wishlist toggle handler (dispatches to Redux store)
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
    <section className="section-reveal w-full bg-white py-14 sm:py-16 md:py-20 font-sans border-t border-neutral-100">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl text-[#1c1c1c] font-normal tracking-tight">
            Recently Viewed Products
          </h2>
          {/* Decorative Green Line Under Heading */}
          <div className="w-12 h-0.5 bg-brand-green mx-auto mt-3.5" />
        </div>

        {/* ================= RESPONSIVE PRODUCT CAROUSEL ================= */}
        <div className="relative group/carousel">
          {/* Left Arrow Button */}
          {canScrollPrev && (
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous products"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-neutral-800 shadow-md hover:shadow-lg border border-neutral-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-800 stroke-2" />
            </button>
          )}

          {/* Right Arrow Button */}
          {canScrollNext && (
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next products"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-neutral-800 shadow-md hover:shadow-lg border border-neutral-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
            >
              <ChevronRight className="w-5 h-5 text-neutral-800 stroke-2" />
            </button>
          )}

          {/* Carousel Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 sm:-ml-6">
              {recentlyViewedProducts.map((p) => (
                <div
                  key={p.handle}
                  className="min-w-0 shrink-0 grow-0 pl-4 sm:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCard
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
                </div>
              ))}
            </div>
          </div>
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

      {/* ================= TOAST NOTIFICATION ================= */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1c1c] text-white text-xs sm:text-sm px-4 py-3 rounded-none shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </section>
  );
});

export default ProductDetailSection4;
