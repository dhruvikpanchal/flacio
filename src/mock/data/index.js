import {
  RAW_PRODUCTS_DATA,
  RAW_FEATURED_DATA,
  resolveMockImageUrl,
  TABS,
  SHIPPING_INFO,
  BUY_MORE_OFFER,
  SHORT_DESCRIPTION,
  DESCRIPTION_HTML,
  getProductByHandle,
  getProductById,
  getVariantById,
} from "./products.data";
import { RAW_COLLECTIONS_DATA } from "./collections.data";

// Pre-compute inverted index (product handle -> collections)
const PRODUCT_COLLECTIONS_MAP = new Map();
RAW_COLLECTIONS_DATA.forEach((col) => {
  col.products.forEach((handle) => {
    const list = PRODUCT_COLLECTIONS_MAP.get(handle) || [];
    list.push(col.handle);
    PRODUCT_COLLECTIONS_MAP.set(handle, list);
  });
});

const formatPrice = (n) => `$${Number(n || 0).toFixed(2)}`;

const discountPercent = (p) =>
  p?.comparePrice && p.comparePrice > p.price
    ? Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100)
    : 0;

/**
 * Enriched Mock Products as a real backend would deliver them over REST/JSON.
 */
export const MOCK_PRODUCTS = RAW_PRODUCTS_DATA.map((raw) => {
  const imgsList = raw.images || [];
  const mainImg = imgsList[0] ? resolveMockImageUrl(imgsList[0], 540) : "";
  const secondImg = imgsList[1]
    ? resolveMockImageUrl(imgsList[1], 540)
    : mainImg;
  const imageUrls = imgsList.map((i) => resolveMockImageUrl(i, 540));
  const fullImageUrls = imgsList.map((i) => resolveMockImageUrl(i, null));
  const discount = discountPercent(raw);
  const collections = PRODUCT_COLLECTIONS_MAP.get(raw.handle) || [];

  return {
    ...raw,
    id: raw.handle,
    numericId: raw.id,
    name: raw.title,
    image: mainImg,
    mainImage: mainImg,
    secondaryImage: secondImg,
    hoverImage: secondImg,
    imageUrls,
    fullImageUrls,
    formattedPrice: formatPrice(raw.price),
    formattedComparePrice: raw.comparePrice
      ? formatPrice(raw.comparePrice)
      : null,
    discountPercent: discount,
    url: `/collections/all/products/${raw.handle}`,
    canAddToCart: raw.inStock && !raw.isGroup && !!raw.variantId,
    reviewText: raw.reviewCount ? `${raw.reviewCount} reviews` : "No reviews",
    collections,
    shortDescription: raw.shortDescription || SHORT_DESCRIPTION,
    description: raw.shortDescription || SHORT_DESCRIPTION,
    descriptionHtml: raw.description || DESCRIPTION_HTML,
  };
});

export const MOCK_COLLECTIONS = RAW_COLLECTIONS_DATA.map((c) => ({
  ...c,
  id: c.handle,
  url: `/collections/${c.handle}`,
}));

export const MOCK_ALL_COLLECTION = {
  id: "all",
  handle: "all",
  title: "All Products",
  count: MOCK_PRODUCTS.length,
  url: "/collections/all",
};

export const MOCK_FEATURED = RAW_FEATURED_DATA;

export {
  RAW_PRODUCTS_DATA,
  RAW_COLLECTIONS_DATA,
  RAW_FEATURED_DATA,
  resolveMockImageUrl,
  TABS,
  SHIPPING_INFO,
  BUY_MORE_OFFER,
  SHORT_DESCRIPTION,
  DESCRIPTION_HTML,
  getProductByHandle,
  getProductById,
  getVariantById,
};
