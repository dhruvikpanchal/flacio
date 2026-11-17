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

/**
 * ProductDetailSection3
 *
 * Implements Section 3 ("Related Products") on the Product Details page:
 * - Header: "Related Products" in serif heading font with the decorative dark green bar.
 * - Responsive Carousel:
 *   - Desktop: 4 products visible in one row
 *   - Tablet: 2 to 3 products visible
 *   - Mobile: 1 to 2 products visible with touch swiping
 * - Floating circular navigation arrows (< and >) on left/right edges matching the reference.
 * - Integrates with `ProductCard.jsx` for cards, hover actions, ratings, swatches,
 *   Quick View modal, Compare modal, Wishlist, and Redux cart sync.
 * - Populated dynamically from mock data (`MOCK_PRODUCTS`).
 */
export const ProductDetailSection3 = memo(function ProductDetailSection3({
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

  // Filter and prioritize related products from MOCK_PRODUCTS
  const relatedProducts = useMemo(() => {
    const currentHandle = product?.handle;
    // Exclude current product
    const otherProducts = MOCK_PRODUCTS.filter((p) => p.handle !== currentHandle);

    // Preferred order to match user screenshot: tiger-aloe, ruby-rubber-tree, palm, jade-succulent
    const preferredOrder = [
      "tiger-aloe",
      "ruby-rubber-tree",
      "palm",
      "jade-succulent",
      "the-beginner-set",
      "spider-plant",
      "philippine-evergreen",
      "peace-lily",
      "pink-dragon-tree",
    ];

    const sorted = [...otherProducts].sort((a, b) => {
      const idxA = preferredOrder.indexOf(a.handle);
      const idxB = preferredOrder.indexOf(b.handle);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });

    // Adapt products for ProductCard format
    return sorted.map((p) => {
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
        variantId: p.variantId || 1,
        extraVariants: p.colors?.length > 2 ? 1 : 0,
        url: `/collections/all/products/${p.handle}`,
      };
    });
  }, [product]);

  // Cart action handler (also dispatches to Redux store)
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

  // Wishlist toggle handler (also dispatches to Redux store)
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
            Related Products
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
              {relatedProducts.map((p) => (
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

export default ProductDetailSection3;
