import { memo, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ProductDetailSection1 } from "./ProductDetailSection1";
import { ProductDetailSection2 } from "./ProductDetailSection2";
import { ProductDetailSection3 } from "./ProductDetailSection3";
import { ProductDetailSection4 } from "./ProductDetailSection4";
import { ProductNotFoundModal } from "./ProductNotFoundModal";
import { getProductByHandle, RAW_PRODUCTS_DATA } from "../../../mock/data/products.data";
import { MOCK_PRODUCTS } from "../../../mock/data";

/**
 * ProductId Page
 *
 * Primary container for product details.
 * - Extracts `handle` from URL parameters (e.g. /product-id/:handle, /product/:handle, /products/:handle)
 * - Defaults to "umbrella-tree" if accessed without a specific handle (/product-id)
 * - If an invalid product name is entered in the URL, triggers the warning modal
 *   informing the user that no item exists on the website.
 * - Renders ProductDetailSection1 with complete product info.
 */
export const ProductId = memo(function ProductId() {
  const { handle, slug } = useParams();
  const location = useLocation();

  // Determine active handle: from params or pathname or default to umbrella-tree
  const effectiveHandle = useMemo(() => {
    if (handle) return handle;
    if (slug) return slug;

    // Check if path has a handle after /product-id/
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length > 1 && (parts[0] === "product-id" || parts[0] === "product" || parts[0] === "products")) {
      return parts[1];
    }
    return "umbrella-tree";
  }, [handle, slug, location.pathname]);

  // Lookup product in mock data (both enriched MOCK_PRODUCTS and RAW_PRODUCTS_DATA)
  const product = useMemo(() => {
    if (!effectiveHandle) return null;
    const enriched = MOCK_PRODUCTS.find((p) => p.handle === effectiveHandle || p.id === effectiveHandle);
    if (enriched) return enriched;
    const raw = getProductByHandle(effectiveHandle) || RAW_PRODUCTS_DATA.find((p) => p.handle === effectiveHandle);
    return raw || null;
  }, [effectiveHandle]);

  // Control Warning Modal for invalid product lookups without cascading re-renders
  const [dismissedNotFound, setDismissedNotFound] = useState(false);
  const isNotFoundModalOpen = Boolean(!product && effectiveHandle && !dismissedNotFound);

  // Fallback product so page doesn't crash underneath modal
  const fallbackProduct = useMemo(
    () => MOCK_PRODUCTS.find((p) => p.handle === "umbrella-tree") || RAW_PRODUCTS_DATA[0],
    []
  );

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Section 1 Product Details */}
      <ProductDetailSection1 product={product || fallbackProduct} />

      {/* Section 2 Tabs & Accordion (Description, Review, Shipping, Return) */}
      <ProductDetailSection2 product={product || fallbackProduct} />

      {/* Section 3 Related Products Carousel */}
      <ProductDetailSection3 product={product || fallbackProduct} />

      {/* Section 4 Recently Viewed Products */}
      <ProductDetailSection4 product={product || fallbackProduct} />

      {/* Warning Modal when invalid product name is entered */}
      <ProductNotFoundModal
        isOpen={isNotFoundModalOpen}
        invalidHandle={effectiveHandle}
        onClose={() => setDismissedNotFound(true)}
      />
    </main>
  );
});

export default ProductId;

