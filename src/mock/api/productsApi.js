import {
  MOCK_PRODUCTS,
  MOCK_COLLECTIONS,
  MOCK_ALL_COLLECTION,
  MOCK_FEATURED,
} from "../data";

/**
 * Simulates real backend network latency (defaults to 200ms)
 */
const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulated Backend REST API for Products
 * Simulates endpoints:
 * - GET /api/products
 * - GET /api/products/:handle
 * - GET /api/collections
 * - GET /api/collections/:handle
 * - GET /api/products/featured
 */

/**
 * GET /api/products
 * Supports query params:
 * collection, sortBy, inStock, minPrice, maxPrice, colors, sizes, query, page, limit
 */
export async function getProductsApi(params = {}) {
  await delay(180);

  const {
    collection = "all",
    sortBy = "title-ascending",
    inStock,
    minPrice,
    maxPrice,
    colors = [],
    sizes = [],
    query,
  } = params;

  let filtered = [...MOCK_PRODUCTS];

  // 1. Filter by collection
  if (collection && collection !== "all") {
    filtered = filtered.filter((p) => p.collections?.includes(collection));
  }

  // 2. Filter by stock status
  if (inStock === true) {
    filtered = filtered.filter((p) => p.inStock === true);
  } else if (inStock === false) {
    filtered = filtered.filter((p) => p.inStock === false);
  }

  // 3. Filter by price range
  if (minPrice != null) {
    filtered = filtered.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice != null) {
    filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  }

  // 4. Filter by colors
  if (colors && colors.length > 0) {
    const colorSet = new Set(colors);
    filtered = filtered.filter((p) => p.colors?.some((c) => colorSet.has(c)));
  }

  // 5. Filter by sizes
  if (sizes && sizes.length > 0) {
    const sizeSet = new Set(sizes);
    filtered = filtered.filter((p) => p.sizes?.some((s) => sizeSet.has(s)));
  }

  // 6. Search query
  if (query && query.trim()) {
    const q = query.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.handle?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q),
    );
  }

  // 7. Sort
  switch (sortBy) {
    case "title-ascending":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-descending":
      filtered.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "price-ascending":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-descending":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating-descending":
      filtered.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
      );
      break;
    case "best-selling":
      filtered.sort(
        (a, b) => b.reviewCount - a.reviewCount || b.rating - a.rating,
      );
      break;
    case "discount-descending":
      filtered.sort(
        (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0),
      );
      break;
    default:
      break;
  }

  return {
    status: 200,
    success: true,
    data: filtered,
    total: filtered.length,
    meta: {
      collection,
      sortBy,
      count: filtered.length,
    },
  };
}

/**
 * GET /api/products/:handle
 */
export async function getProductByHandleApi(handle) {
  await delay(120);

  const product = MOCK_PRODUCTS.find((p) => p.handle === handle || p.id === handle);

  if (!product) {
    return {
      status: 404,
      success: false,
      message: `Product with handle "${handle}" not found`,
      data: null,
    };
  }

  return {
    status: 200,
    success: true,
    data: product,
  };
}

/**
 * GET /api/collections
 */
export async function getCollectionsApi({ includeHidden = false } = {}) {
  await delay(120);

  const list = [
    MOCK_ALL_COLLECTION,
    ...MOCK_COLLECTIONS.filter((c) => includeHidden || !c.hidden),
  ];

  return {
    status: 200,
    success: true,
    data: list,
  };
}

/**
 * GET /api/products/featured
 */
export async function getFeaturedProductsApi() {
  await delay(120);

  const featured = MOCK_FEATURED.map((item) => {
    const prod = MOCK_PRODUCTS.find((p) => p.handle === item.handle);
    if (!prod) return null;
    return {
      ...prod,
      price: item.price,
      comparePrice: item.comparePrice,
      formattedPrice: `$${Number(item.price).toFixed(2)}`,
      formattedComparePrice: item.comparePrice
        ? `$${Number(item.comparePrice).toFixed(2)}`
        : null,
    };
  }).filter(Boolean);

  return {
    status: 200,
    success: true,
    data: featured,
  };
}

