/**
 * products.js
 * Store Data Hub:
 * - Static UI configuration & swatches are sourced from ./productStatic.js
 * - Backend Mock Data is sourced from ../mock/data
 * - API simulation is in ../mock/api
 * - Service layer is in ../services/productService.js
 * - TanStack query & useEffect hooks are in ../services/queries/productQueries.js
 */

import {
  MOCK_PRODUCTS,
  MOCK_COLLECTIONS,
  MOCK_ALL_COLLECTION,
  MOCK_FEATURED,
  resolveMockImageUrl,
  TABS,
  SHIPPING_INFO,
  BUY_MORE_OFFER,
  DESCRIPTION_HTML,
  getProductByHandle,
  getProductById,
  getVariantById,
} from "../mock/data";

import {
  CONFIG,
  COLOR_HEX_MAP,
  getColorHex,
  SHORT_DESCRIPTION,
  FILTERS,
  SORT_OPTIONS,
  VIEW_OPTIONS,
  formatPrice,
  productUrl,
  collectionUrl,
  discountPercent,
} from "./productStatic";

// Re-export all static configurations & helpers
export {
  CONFIG,
  COLOR_HEX_MAP,
  getColorHex,
  SHORT_DESCRIPTION,
  DESCRIPTION_HTML,
  SHIPPING_INFO,
  TABS,
  BUY_MORE_OFFER,
  FILTERS,
  SORT_OPTIONS,
  VIEW_OPTIONS,
  formatPrice,
  productUrl,
  collectionUrl,
  discountPercent,
  getProductByHandle,
  getProductById,
  getVariantById,
};

/* ------------------------------------------------------------------ *
 * IMAGE URL BUILDER HELPERS
 * ------------------------------------------------------------------ */
export function imageUrl(image, width = 540) {
  return resolveMockImageUrl(image, width);
}

export const previewUrl = (p) =>
  p?.preview ? `${CONFIG.cdnBase}${p.preview.path}?v=${p.preview.v}` : null;

/* ------------------------------------------------------------------ *
 * MASTER PRODUCTS & COLLECTIONS (from mock/data)
 * ------------------------------------------------------------------ */
export const PRODUCTS = Object.freeze(MOCK_PRODUCTS);
export const COLLECTIONS = Object.freeze(MOCK_COLLECTIONS);
export const ALL_COLLECTION = Object.freeze(MOCK_ALL_COLLECTION);

export const COLLECTION_TABS = Object.freeze([
  ALL_COLLECTION,
  ...COLLECTIONS.filter((c) => !c.hidden),
]);

export const FEATURED = MOCK_FEATURED;

/* ------------------------------------------------------------------ *
 * INTERNAL O(1) LOOKUP MAPS
 * ------------------------------------------------------------------ */
const PRODUCT_MAP = new Map(PRODUCTS.map((p) => [p.handle, p]));
const COLLECTION_MAP = new Map(COLLECTIONS.map((c) => [c.handle, c]));

/* ------------------------------------------------------------------ *
 * DATA ACCESS HELPERS
 * ------------------------------------------------------------------ */
export const getProducts = () => PRODUCTS;
export const getProduct = (handleOrId) => PRODUCT_MAP.get(handleOrId) || null;

export const getCollections = ({ includeHidden = false } = {}) =>
  COLLECTIONS.filter((c) => includeHidden || !c.hidden);

export const getCollection = (handle) =>
  handle === "all" ? ALL_COLLECTION : COLLECTION_MAP.get(handle) || null;

export function getCollectionProducts(handle = "all") {
  if (handle === "all") return PRODUCTS;
  const col = COLLECTION_MAP.get(handle);
  if (!col) return [];
  return col.products.map(getProduct).filter(Boolean);
}

export const getProductCollections = (productHandle) => {
  const prod = getProduct(productHandle);
  if (!prod || !prod.collections) return [];
  return prod.collections.map((h) => COLLECTION_MAP.get(h)).filter(Boolean);
};

export const getFeaturedProducts = () =>
  FEATURED.map((f) => {
    const p = getProduct(f.handle);
    if (!p) return null;
    return {
      ...p,
      price: f.price,
      comparePrice: f.comparePrice,
      formattedPrice: formatPrice(f.price),
      formattedComparePrice: f.comparePrice
        ? formatPrice(f.comparePrice)
        : null,
    };
  }).filter(Boolean);

export const getFilters = () => FILTERS;
export const getSortOptions = () => SORT_OPTIONS;

export function getColorCounts(list = PRODUCTS) {
  const counts = new Map();
  for (const p of list) {
    for (const c of p.colors || []) {
      counts.set(c, (counts.get(c) || 0) + 1);
    }
  }
  return Array.from(counts.entries()).map(([value, count]) => ({
    id: `color-dyn-${value.toLowerCase()}`,
    value,
    hex: getColorHex(value),
    count,
  }));
}

/* ------------------------------------------------------------------ *
 * HIGH-PERFORMANCE SORT & FILTER ALGORITHMS
 * ------------------------------------------------------------------ */
export function sortProducts(list, sortBy = "title-ascending") {
  if (!list || !list.length) return [];
  const arr = [...list];

  switch (sortBy) {
    case "title-ascending":
      return arr.sort((a, b) => a.title.localeCompare(b.title));
    case "title-descending":
      return arr.sort((a, b) => b.title.localeCompare(a.title));
    case "price-ascending":
      return arr.sort((a, b) => a.price - b.price);
    case "price-descending":
      return arr.sort((a, b) => b.price - a.price);
    case "rating-descending":
      return arr.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
      );
    case "best-selling":
      return arr.sort(
        (a, b) => b.reviewCount - a.reviewCount || b.rating - a.rating,
      );
    case "discount-descending":
      return arr.sort(
        (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0),
      );
    case "manual":
    case "most-relevant":
    default:
      return arr;
  }
}

export function filterProducts(list = PRODUCTS, opts = {}) {
  if (!list || !list.length) return [];
  const {
    inStock,
    minPrice,
    maxPrice,
    colors,
    sizes,
    onSale,
    query,
    collection,
    minRating,
  } = opts;

  const normalizedQuery = query?.trim().toLowerCase();
  const colorSet = colors?.length ? new Set(colors) : null;
  const sizeSet = sizes?.length ? new Set(sizes) : null;
  const colObj =
    collection && collection !== "all" ? COLLECTION_MAP.get(collection) : null;

  return list.filter((p) => {
    if (inStock === true && !p.inStock) return false;
    if (inStock === false && p.inStock) return false;
    if (minPrice != null && p.price < minPrice) return false;
    if (maxPrice != null && p.price > maxPrice) return false;
    if (minRating != null && p.rating < minRating) return false;
    if (onSale && !p.comparePrice) return false;
    if (colorSet && !p.colors.some((c) => colorSet.has(c))) return false;
    if (sizeSet && !p.sizes.some((s) => sizeSet.has(s))) return false;
    if (colObj && !colObj.products.includes(p.handle)) return false;
    if (
      normalizedQuery &&
      !p.title.toLowerCase().includes(normalizedQuery) &&
      !p.handle.toLowerCase().includes(normalizedQuery)
    ) {
      return false;
    }
    return true;
  });
}

export function getCollectionPage(
  handle = "all",
  { sortBy = "title-ascending", filters = {} } = {},
) {
  const collectionProducts = getCollectionProducts(handle);
  const items = sortProducts(
    filterProducts(collectionProducts, filters),
    sortBy,
  );
  return {
    collection: getCollection(handle),
    products: items,
    total: items.length,
    viewedText: `You've viewed ${items.length} of ${items.length} products`,
  };
}

export function getProductCard(
  handleOrProduct,
  collection = "all",
  width = 540,
) {
  const p =
    typeof handleOrProduct === "object" && handleOrProduct !== null
      ? handleOrProduct
      : getProduct(handleOrProduct);

  if (!p) return null;

  return {
    ...p,
    url: productUrl(p.handle, collection),
    mainImage: p.image || (p.images?.[0] ? imageUrl(p.images[0], width) : ""),
    images:
      p.imageUrls || (p.images ? p.images.map((i) => imageUrl(i, width)) : []),
  };
}

export const getCollectionCards = (handle = "all", opts = {}) => {
  const { products } = getCollectionPage(handle, opts);
  return products.map((p) => getProductCard(p, handle));
};

export default PRODUCTS;
