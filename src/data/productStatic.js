/**
 * productStatic.js
 * Page static UI configurations, options, swatches, and static labels.
 * These are frontend presentation constants that do not come dynamically from a product DB.
 */

/* ------------------------------------------------------------------ *
 * 1. UI CONFIGURATION
 * ------------------------------------------------------------------ */
export const CONFIG = {
  cdnBase: "https://wpbingo-flacio.myshopify.com/cdn/shop/files/",
  currency: "$",
  imageRatio: 118.75, // padding-top % used by the cards
  gridColumns: 3,
};

/* ------------------------------------------------------------------ *
 * 2. URL & FORMATTING HELPERS
 * ------------------------------------------------------------------ */
export const formatPrice = (n) =>
  `${CONFIG.currency}${Number(n || 0).toFixed(2)}`;

export const productUrl = (handle, collection = null) =>
  collection && collection !== "all"
    ? `/collections/${collection}/products/${handle}`
    : `/collections/all/products/${handle}`;

export const collectionUrl = (handle) => `/collections/${handle}`;

export const discountPercent = (p) =>
  p?.comparePrice && p.comparePrice > p.price
    ? Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100)
    : 0;

/* ------------------------------------------------------------------ *
 * 3. COLOR SWATCHES & HEX PALETTE
 * ------------------------------------------------------------------ */
export const COLOR_HEX_MAP = {
  Black: "#222222",
  Blue: "#3b82f6",
  Floral: "#e879f9",
  Geometric: "#6366f1",
  Grey: "#9ca3af",
  Orange: "#f97316",
  Pink: "#ec4899",
  Plaid: "#d97706",
  Red: "#ef4444",
  Striped: "#64748b",
  White: "#ffffff",
};

export const getColorHex = (name) => COLOR_HEX_MAP[name] || "#a1a1aa";

export const SHORT_DESCRIPTION =
  "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum";

/* ------------------------------------------------------------------ *
 * 4. STATIC FILTER OPTIONS (Pre-defined facets for UI sidebar)
 * ------------------------------------------------------------------ */
export const FILTERS = {
  availability: [
    { id: "stock-in", value: "1", label: "In stock", count: 9 },
    { id: "stock-out", value: "0", label: "Out of stock", count: 1 },
  ],
  price: { min: 0, max: 153 },
  size: [
    { id: "size-30cm", value: "30cm", label: "30cm", count: 1 },
    { id: "size-50cm", value: "50cm", label: "50cm", count: 1 },
    { id: "size-60cm", value: "60cm", label: "60cm", count: 1 },
  ],
  color: [
    { id: "color-black", value: "Black", hex: COLOR_HEX_MAP.Black, count: 5 },
    { id: "color-blue", value: "Blue", hex: COLOR_HEX_MAP.Blue, count: 3 },
    {
      id: "color-floral",
      value: "Floral",
      hex: COLOR_HEX_MAP.Floral,
      count: 2,
    },
    {
      id: "color-geometric",
      value: "Geometric",
      hex: COLOR_HEX_MAP.Geometric,
      count: 1,
    },
    { id: "color-grey", value: "Grey", hex: COLOR_HEX_MAP.Grey, count: 1 },
    {
      id: "color-orange",
      value: "Orange",
      hex: COLOR_HEX_MAP.Orange,
      count: 1,
    },
    { id: "color-pink", value: "Pink", hex: COLOR_HEX_MAP.Pink, count: 5 },
    { id: "color-plaid", value: "Plaid", hex: COLOR_HEX_MAP.Plaid, count: 2 },
    { id: "color-red", value: "Red", hex: COLOR_HEX_MAP.Red, count: 2 },
    {
      id: "color-striped",
      value: "Striped",
      hex: COLOR_HEX_MAP.Striped,
      count: 1,
    },
    { id: "color-white", value: "White", hex: COLOR_HEX_MAP.White, count: 2 },
  ],
};

/* ------------------------------------------------------------------ *
 * 5. SORT & VIEW OPTIONS
 * ------------------------------------------------------------------ */
export const SORT_OPTIONS = [
  { id: "sort-manual", value: "manual", label: "Featured" },
  { id: "sort-relevant", value: "most-relevant", label: "Most relevant" },
  { id: "sort-best-selling", value: "best-selling", label: "Best selling" },
  {
    id: "sort-title-asc",
    value: "title-ascending",
    label: "Alphabetically, A-Z",
  },
  {
    id: "sort-title-desc",
    value: "title-descending",
    label: "Alphabetically, Z-A",
  },
  {
    id: "sort-price-asc",
    value: "price-ascending",
    label: "Price, low to high",
  },
  {
    id: "sort-price-desc",
    value: "price-descending",
    label: "Price, high to low",
  },
  {
    id: "sort-rating-desc",
    value: "rating-descending",
    label: "Highest rated",
  },
  {
    id: "sort-discount-desc",
    value: "discount-descending",
    label: "Biggest discount",
  },
];

export const VIEW_OPTIONS = ["list", "grid-2", "grid-3", "grid-4"];

