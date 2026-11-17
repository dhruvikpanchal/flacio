import { getMockImageUrl } from "../images";

const STORE_URL = "https://wpbingo-flacio.myshopify.com";
const CDN_BASE = "https://wpbingo-flacio.myshopify.com/cdn/shop/files/";

const img = (file, v) => ({ file, v });
const imgs = (v, ...files) => files.map((f) => img(f, v));

/**
 * Resolves an image item { file, v }, string key, or object to an image URL.
 * Prioritizes local mock image assets in src/mock/images, falling back to CDN.
 */
export function resolveMockImageUrl(imageItem, width = 540) {
  if (!imageItem) return "";
  if (typeof imageItem === "string") {
    // If it's already a full HTTP URL or data URL
    if (imageItem.startsWith("http") || imageItem.startsWith("data:")) {
      return imageItem;
    }
    const cleanKey = imageItem.replace(/\.(jpg|jpeg|webp|png)$/i, "");
    return getMockImageUrl(cleanKey, `${CDN_BASE}${cleanKey}_${width || 540}x.jpg`);
  }
  if (imageItem.url) return imageItem.url;

  const fileKey = String(imageItem.file || "").replace(/\.(jpg|jpeg|webp|png)$/i, "");
  const suffix = width ? `_${width}x` : "";
  const cdnFallback = `${CDN_BASE}${fileKey}${suffix}.jpg?v=${imageItem.v || 1727684825}`;

  return getMockImageUrl(fileKey, cdnFallback);
}

// =========================================================================
// SHARED CONTENT CONSTANTS
// =========================================================================
export const SHORT_DESCRIPTION =
  "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum";

export const DESCRIPTION_HTML = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
<p>Don’t ever play yourself. The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion! The other day the grass was brown, now it’s green because I ain’t give up. Never surrender</p>
<ul>
<li>Claritas est etiam processus dynamicus.</li>
<li>Qui sequitur mutationem consuetudium lectorum.</li>
<li>Claritas est etiam processus dynamicus.</li>
<li>Qui sequitur mutationem consuetudium lectorum.</li>
<li>Claritas est etiam processus dynamicus.</li>
<li>Qui sequitur mutationem consuetudium lectorum.</li>
</ul>
<p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release.</p>`;

export const SHIPPING_INFO = {
  returnPolicy:
    "We will gladly accept returns for any reason within 30 days of receipt of delivery.",
  availability: "Ships anywhere in the United States",
  processingTime:
    "Allow 3-4 business days processing time for your order to ship.",
};

export const TABS = {
  shipping: [
    "For orders placed before 7am AEDT, we endeavour to process the same business day. Orders placed after 11am AEDT will be processed the next business day.",
    "During sale events and new collection launches, there may be a slighly longer processing time.",
    "All Auguste orders are hand-picked and packed with love from Byron Bay, Australie.",
  ],
  return: {
    intro:
      "You can choose between a refund or a credit note on full priced items.",
    rules: [
      "Item(s) must be returned in their original condition and packaging: unworn, unwashed and with all tags attached.",
      "Earrings cannot be returned due to health and safety reasons.",
      "Return shipping methods and associated costs are the responsibility of the customer.",
      "Sale items can not be refunded for change of mind.",
    ],
  },
};

export const BUY_MORE_OFFER = {
  quantity: 5,
  discountPercent: 10,
  text: "Buy More Save More!",
};

// =========================================================================
// MASTER RAW PRODUCTS DATA
// Merged and optimized version containing all catalog & product-id detail fields
// =========================================================================
export const RAW_PRODUCTS_DATA = [
  // ------------------------------------------------------------
  // 1) A Philippine (Upsell)
  // ------------------------------------------------------------
  {
    id: 8813966262530,
    numericId: 8813966262530,
    handle: "philippine-evergreen",
    title: "A Philippine (Upsell)",
    url: `${STORE_URL}/products/philippine-evergreen`,
    vendor: "wpbingo",
    type: "",
    tags: [],
    collection: { title: "Ceramic Pots", handle: "ceramic-pots" },
    price: 80.0,
    priceMin: 80.0,
    priceMax: 85.0,
    priceVaries: true,
    comparePrice: null,
    compareAtPrice: null,
    onSale: false,
    badge: null,
    inStock: true,
    available: true,
    variantId: 45534161142018,
    reviewId: 8813966262530,
    rating: 0,
    reviewCount: 0,
    options: ["Color"],
    colors: ["Plaid", "Floral"],
    sizes: [],
    isGroup: false,
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45534161142018,
        title: "Plaid",
        option1: "Plaid",
        sku: null,
        price: 80.0,
        compareAtPrice: null,
        available: true,
        image: img("10-5", 1727684825),
      },
      {
        id: 45534162026754,
        title: "Floral",
        option1: "Floral",
        sku: null,
        price: 85.0,
        compareAtPrice: null,
        available: true,
        image: img("10-2", 1727684825),
      },
    ],
    images: imgs(1727684825, "10-2", "10-5", "10-8"),
    frames360: Array.from({ length: 16 }, (_, i) =>
      img(
        `360-${i + 1}`,
        i + 1 === 12 || i + 1 === 13 ? 1728275237 : 1728275238,
      ),
    ),
    preview: null,
    video: null,
    model3d: null,
    reviews: { average: 0, count: 0, items: [] },
    boughtWith: { title: "Tiger Aloe", handle: "tiger-aloe", price: 150.0 },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 2) Bought Together
  // ------------------------------------------------------------
  {
    id: 8813966393602,
    numericId: 8813966393602,
    handle: "spider-plant",
    title: "Bought Together",
    url: `${STORE_URL}/products/spider-plant`,
    vendor: "Lulu Store",
    type: "",
    tags: [],
    collection: { title: "Ceramic Pots", handle: "ceramic-pots" },
    price: 52.0,
    priceMin: 51.0,
    priceMax: 52.0,
    priceVaries: true,
    comparePrice: null,
    compareAtPrice: null,
    onSale: false,
    badge: null,
    inStock: true,
    available: true,
    variantId: 45531370848514,
    reviewId: 8813966393602,
    rating: 0,
    reviewCount: 0,
    options: ["Color"],
    colors: ["Red", "Grey"],
    sizes: [],
    isGroup: false,
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45531370848514,
        title: "Red",
        option1: "Red",
        sku: "D111 - 89",
        price: 52.0,
        compareAtPrice: null,
        available: true,
        image: img("15-5", 1727684840),
      },
      {
        id: 45531370881282,
        title: "Grey",
        option1: "Grey",
        sku: "D111 - 93",
        price: 51.0,
        compareAtPrice: null,
        available: true,
        image: null,
      },
    ],
    images: imgs(1727684840, "12-4", "15-5"),
    frames360: [],
    preview: null,
    video: null,
    model3d: null,
    reviews: { average: 0, count: 0, items: [] },
    frequentlyBoughtTogether: {
      bundleTotal: 182.0,
      items: [
        {
          id: 8813966393602,
          title: "Bought Together (this product)",
          handle: "spider-plant",
          price: 52.0,
        },
        {
          id: 8813966426370,
          title: "The Beginner Set",
          handle: "the-beginner-set",
          price: 130.0,
        },
      ],
    },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 3) Jade Succulent
  // ------------------------------------------------------------
  {
    id: 8813965967618,
    numericId: 8813965967618,
    handle: "jade-succulent",
    title: "Jade Succulent",
    url: `${STORE_URL}/products/jade-succulent`,
    vendor: "Akaza Store",
    type: "",
    tags: [],
    collection: { title: "Ceramic Pots", handle: "ceramic-pots" },
    price: 50.0,
    priceMin: 50.0,
    priceMax: 70.0,
    priceVaries: true,
    comparePrice: 70.0,
    compareAtPrice: 70.0,
    onSale: true,
    badge: "-28%",
    discountLabel: "-28%",
    inStock: true,
    available: true,
    variantId: null, // Group product
    reviewId: 8813965967618,
    rating: 2,
    reviewCount: 4,
    options: ["Color"],
    colors: ["Pink", "Red"],
    extraVariants: 1,
    sizes: [],
    isGroup: true,
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45531370160386,
        title: "Pink",
        option1: "Pink",
        sku: "",
        price: 50.0,
        compareAtPrice: 70.0,
        available: true,
        image: img("1_7d889b7e-e9b3-48c1-8e8d-a696e8d84f7d", 1727684809),
      },
      {
        id: 45531370193154,
        title: "Red",
        option1: "Red",
        sku: "",
        price: 70.0,
        compareAtPrice: null,
        available: true,
        image: img("2", 1727684809),
      },
      {
        id: 45531370225922,
        title: "Black",
        option1: "Black",
        sku: "",
        price: 50.0,
        compareAtPrice: 70.0,
        available: true,
        image: img("3", 1727684809),
      },
    ],
    images: imgs(
      1727684809,
      "1_7d889b7e-e9b3-48c1-8e8d-a696e8d84f7d",
      "2",
      "3",
    ),
    frames360: [],
    preview: null,
    video: null,
    model3d: null,
    reviews: {
      average: 2,
      count: 4,
      items: [
        {
          author: "Kaushal vora",
          date: "2025-08-01",
          rating: 1,
          title: "nice",
          body: "nice product",
        },
        {
          author: "Kaushal vora",
          date: "2025-08-01",
          rating: 1,
          title: "very nice",
          body: "very nice plant",
        },
        {
          author: "Kaushal vora",
          date: "2025-08-01",
          rating: 1,
          title: "nice product",
          body: "nice product",
        },
        {
          author: "Kaushal vora",
          date: "2025-08-01",
          rating: 5,
          title: "hi",
          body: "this is good",
        },
      ],
    },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 4) Palm
  // ------------------------------------------------------------
  {
    id: 8813966033154,
    numericId: 8813966033154,
    handle: "palm",
    title: "Palm",
    url: `${STORE_URL}/products/palm`,
    vendor: "Akaza Store",
    type: "",
    tags: [],
    collection: { title: "Ceramic Pots", handle: "ceramic-pots" },
    price: 50.0,
    priceMin: 50.0,
    priceMax: 50.0,
    priceVaries: false,
    comparePrice: null,
    compareAtPrice: null,
    onSale: false,
    badge: null,
    inStock: true,
    available: true,
    variantId: 45531370324226,
    reviewId: 8813966033154,
    rating: 0,
    reviewCount: 0,
    options: ["Color"],
    colors: ["White", "Blue"],
    sizes: [],
    isGroup: false,
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45531370324226,
        title: "White",
        option1: "White",
        sku: "D111 - 10",
        price: 50.0,
        compareAtPrice: null,
        available: true,
        image: img("4_e38424b6-c524-41ed-9909-c9060fd972c1", 1727684815),
      },
      {
        id: 45531370356994,
        title: "Blue",
        option1: "Blue",
        sku: "D111 - 11",
        price: 50.0,
        compareAtPrice: null,
        available: true,
        image: img("5", 1727684815),
      },
    ],
    images: imgs(
      1727684815,
      "4_e38424b6-c524-41ed-9909-c9060fd972c1",
      "5",
      "6",
    ),
    frames360: [],
    preview: {
      path: "preview_images/789164a81fab4f9ba51d8961f18d7d06.thumbnail.0000000000.jpg",
      v: 1728274214,
    },
    video: {
      thumbnail:
        "preview_images/789164a81fab4f9ba51d8961f18d7d06.thumbnail.0000000000.jpg",
    },
    model3d: null,
    reviews: { average: 0, count: 0, items: [] },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 5) Peace Lily
  // ------------------------------------------------------------
  {
    id: 8813966164226,
    numericId: 8813966164226,
    handle: "peace-lily",
    title: "Peace Lily",
    url: `${STORE_URL}/products/peace-lily`,
    vendor: "Lulu Store",
    type: "",
    tags: [],
    collection: { title: "Air Purifying", handle: "air-purifying" },
    price: 60.0,
    priceMin: 60.0,
    priceMax: 60.0,
    priceVaries: false,
    comparePrice: 90.0,
    compareAtPrice: 90.0,
    onSale: true,
    badge: "-33%",
    discountLabel: "-33%",
    inStock: true,
    available: true,
    variantId: 45531370389762,
    reviewId: 8813966164226,
    rating: 5,
    reviewCount: 2,
    options: ["Color"],
    colors: ["Black", "White"],
    extraVariants: 1,
    sizes: [],
    isGroup: false,
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45531370389762,
        title: "Black",
        option1: "Black",
        sku: "D111 - 10",
        price: 60.0,
        compareAtPrice: 90.0,
        available: true,
        image: img("1", 1727684820),
      },
      {
        id: 45531370422530,
        title: "White",
        option1: "White",
        sku: "D111 - 11",
        price: 60.0,
        compareAtPrice: 90.0,
        available: true,
        image: img("4", 1727684820),
      },
      {
        id: 45534164156674,
        title: "Floral",
        option1: "Floral",
        sku: null,
        price: 60.0,
        compareAtPrice: 90.0,
        available: true,
        image: img("10-3", 1727684820),
      },
    ],
    images: imgs(1727684820, "1", "4", "10-3"),
    frames360: [],
    preview: { path: "preview_images/3d.jpg", v: 1728274566 },
    model3d: { preview: "preview_images/3d.jpg" },
    video: null,
    reviews: {
      average: 5,
      count: 2,
      items: [
        {
          author: "Kaushal vora",
          date: "2025-08-01",
          rating: 5,
          title: "nice",
          body: "nice",
        },
        {
          author: "Kaushal vora",
          date: "2025-08-01",
          rating: 5,
          title: "good",
          body: "good plant",
        },
      ],
    },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 6) Pink Dragon Tree
  // ------------------------------------------------------------
  {
    id: 8813966295298,
    numericId: 8813966295298,
    handle: "pink-dragon-tree",
    title: "Pink Dragon Tree",
    url: `${STORE_URL}/products/pink-dragon-tree`,
    vendor: "Akaza Store",
    type: "",
    tags: [],
    collection: { title: "Indoor Plants", handle: "indoor-plants" },
    price: 80.0,
    priceMin: 80.0,
    priceMax: 80.0,
    priceVaries: false,
    comparePrice: 100.0,
    compareAtPrice: 100.0,
    onSale: true,
    badge: "Out of stock",
    inStock: false,
    available: false,
    variantId: null,
    reviewId: 8813966295298,
    rating: 0,
    reviewCount: 0,
    options: ["Color"],
    colors: ["Striped", "Plaid"],
    sizes: [],
    isGroup: false,
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45534165696770,
        title: "Striped",
        option1: "Striped",
        sku: null,
        price: 80.0,
        compareAtPrice: 100.0,
        available: false,
        image: img("7", 1727684830),
      },
      {
        id: 45534166253826,
        title: "Plaid",
        option1: "Plaid",
        sku: null,
        price: 80.0,
        compareAtPrice: 100.0,
        available: false,
        image: img("8", 1727684830),
      },
    ],
    images: imgs(1727684830, "7", "8", "9"),
    frames360: [],
    preview: null,
    video: null,
    model3d: null,
    reviews: { average: 0, count: 0, items: [] },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 7) Ruby Rubber Tree
  // ------------------------------------------------------------
  {
    id: 8813966360834,
    numericId: 8813966360834,
    handle: "ruby-rubber-tree",
    title: "Ruby Rubber Tree",
    url: `${STORE_URL}/products/ruby-rubber-tree`,
    vendor: "wpbingo",
    type: "",
    tags: [],
    collection: { title: "Air Purifying", handle: "air-purifying" },
    price: 52.0,
    priceMin: 52.0,
    priceMax: 52.0,
    priceVaries: false,
    comparePrice: 90.0,
    compareAtPrice: 90.0,
    onSale: true,
    badge: "-43%",
    discountLabel: "-43%",
    inStock: true,
    available: true,
    variantId: 45531370717442,
    reviewId: 8813966360834,
    rating: 0,
    reviewCount: 0,
    options: ["Color"],
    colors: ["Black", "Pink"],
    extraVariants: 1,
    sizes: [],
    isGroup: false,
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45531370717442,
        title: "Black",
        option1: "Black",
        sku: "D111 - 10",
        price: 52.0,
        compareAtPrice: 90.0,
        available: true,
        image: img("10-6", 1727684836),
      },
      {
        id: 45531370750210,
        title: "Pink",
        option1: "Pink",
        sku: "D111 - 11",
        price: 52.0,
        compareAtPrice: 90.0,
        available: true,
        image: img("14", 1727684836),
      },
      {
        id: 45534173823234,
        title: "Floral",
        option1: "Floral",
        sku: null,
        price: 52.0,
        compareAtPrice: 90.0,
        available: true,
        image: img("16-1", 1727684836),
      },
    ],
    images: imgs(1727684836, "10-6", "14", "16-1"),
    frames360: [],
    preview: null,
    video: null,
    model3d: null,
    reviews: { average: 0, count: 0, items: [] },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 8) The Beginner Set
  // ------------------------------------------------------------
  {
    id: 8813966426370,
    numericId: 8813966426370,
    handle: "the-beginner-set",
    title: "The Beginner Set",
    url: `${STORE_URL}/products/the-beginner-set`,
    vendor: "wpbingo",
    type: "",
    tags: [],
    collection: { title: "Air Purifying", handle: "air-purifying" },
    price: 130.0,
    priceMin: 130.0,
    priceMax: 138.0,
    priceVaries: true,
    comparePrice: null,
    compareAtPrice: null,
    onSale: false,
    badge: null,
    inStock: true,
    available: true,
    variantId: 45531370946818,
    reviewId: 8813966426370,
    rating: 0,
    reviewCount: 0,
    options: ["Color", "Size"],
    colors: ["Pink", "Orange", "Black"],
    sizes: ["30cm", "50cm", "60cm"],
    extraVariants: 1,
    isGroup: false,
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45531370946818,
        title: "Pink / 30cm",
        option1: "Pink",
        option2: "30cm",
        sku: "D111 - 10",
        price: 130.0,
        compareAtPrice: null,
        available: true,
        image: img("14-3", 1727684845),
      },
      {
        id: 45534175166722,
        title: "Pink / 50cm",
        option1: "Pink",
        option2: "50cm",
        sku: null,
        price: 130.0,
        compareAtPrice: null,
        available: true,
        image: img("14-3", 1727684845),
      },
      {
        id: 45534175199490,
        title: "Pink / 60cm",
        option1: "Pink",
        option2: "60cm",
        sku: null,
        price: 130.0,
        compareAtPrice: null,
        available: true,
        image: img("14-3", 1727684845),
      },
      {
        id: 45531370979586,
        title: "Orange / 30cm",
        option1: "Orange",
        option2: "30cm",
        sku: "D111 - 11",
        price: 138.0,
        compareAtPrice: null,
        available: true,
        image: img("14-6", 1727684845),
      },
      {
        id: 45534175232258,
        title: "Orange / 50cm",
        option1: "Orange",
        option2: "50cm",
        sku: null,
        price: 130.0,
        compareAtPrice: null,
        available: true,
        image: img("14-6", 1727684845),
      },
      {
        id: 45534175265026,
        title: "Orange / 60cm",
        option1: "Orange",
        option2: "60cm",
        sku: null,
        price: 130.0,
        compareAtPrice: null,
        available: true,
        image: img("14-6", 1727684845),
      },
      {
        id: 45531371012354,
        title: "Black / 30cm",
        option1: "Black",
        option2: "30cm",
        sku: "D111 - 12",
        price: 137.0,
        compareAtPrice: null,
        available: true,
        image: img("16-1_5f1bbfe2-f7bc-4b45-a536-57fd4bd03363", 1727684845),
      },
      {
        id: 45534175297794,
        title: "Black / 50cm",
        option1: "Black",
        option2: "50cm",
        sku: null,
        price: 130.0,
        compareAtPrice: null,
        available: true,
        image: img("16-1_5f1bbfe2-f7bc-4b45-a536-57fd4bd03363", 1727684845),
      },
      {
        id: 45534175330562,
        title: "Black / 60cm",
        option1: "Black",
        option2: "60cm",
        sku: null,
        price: 130.0,
        compareAtPrice: null,
        available: true,
        image: img("16-1_5f1bbfe2-f7bc-4b45-a536-57fd4bd03363", 1727684845),
      },
    ],
    images: imgs(
      1727684845,
      "14-3",
      "14-6",
      "16-1_5f1bbfe2-f7bc-4b45-a536-57fd4bd03363",
    ),
    frames360: [],
    preview: null,
    video: null,
    model3d: null,
    reviews: { average: 0, count: 0, items: [] },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 9) Tiger Aloe
  // ------------------------------------------------------------
  {
    id: 8813966459138,
    numericId: 8813966459138,
    handle: "tiger-aloe",
    title: "Tiger Aloe",
    url: `${STORE_URL}/products/tiger-aloe`,
    vendor: "wpbingo",
    type: "",
    tags: [],
    collection: { title: "Air Purifying", handle: "air-purifying" },
    price: 153.0,
    priceMin: 150.0,
    priceMax: 153.0,
    priceVaries: true,
    comparePrice: null,
    compareAtPrice: null,
    onSale: false,
    badge: null,
    inStock: true,
    available: true,
    variantId: 45531371077890,
    reviewId: 8813966459138,
    rating: 0,
    reviewCount: 0,
    options: ["Color"],
    colors: ["Black", "Pink", "Blue"],
    extraVariants: 1,
    sizes: [],
    isGroup: false,
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45531371077890,
        title: "Black",
        option1: "Black",
        sku: "D111 - 35",
        price: 153.0,
        compareAtPrice: null,
        available: true,
        image: img("11-8", 1727684850),
      },
      {
        id: 45531371110658,
        title: "Pink",
        option1: "Pink",
        sku: "D111 - 39",
        price: 152.0,
        compareAtPrice: null,
        available: true,
        image: img("11-7", 1727684850),
      },
      {
        id: 45531371143426,
        title: "Blue",
        option1: "Blue",
        sku: "D111 - 43",
        price: 150.0,
        compareAtPrice: null,
        available: true,
        image: img("10-9", 1727684850),
      },
    ],
    images: imgs(1727684850, "10-9", "11-7", "11-8"),
    frames360: [],
    preview: null,
    video: null,
    model3d: null,
    reviews: { average: 0, count: 0, items: [] },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 10) Umbrella Tree (PRE-ORDER)
  // ------------------------------------------------------------
  {
    id: 8813966491906,
    numericId: 8813966491906,
    handle: "umbrella-tree",
    title: "Umbrella Tree",
    url: `${STORE_URL}/products/umbrella-tree`,
    vendor: "wpbingo",
    type: "",
    tags: [],
    collection: { title: "Air Purifying", handle: "air-purifying" },
    price: 62.0,
    priceMin: 62.0,
    priceMax: 62.0,
    priceVaries: false,
    comparePrice: 90.0,
    compareAtPrice: 90.0,
    onSale: true,
    badge: "-31%",
    discountLabel: "-31%",
    preOrder: true,
    inStock: true,
    available: true,
    variantId: 45534178017538,
    reviewId: 8813966491906,
    rating: 0,
    reviewCount: 0,
    options: ["Color"],
    colors: ["Geometric", "Floral"],
    sizes: [],
    isGroup: false,
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45534178017538,
        title: "Geometric",
        option1: "Geometric",
        sku: null,
        price: 62.0,
        compareAtPrice: 90.0,
        available: true,
        image: img("14-9", 1727684856),
      },
      {
        id: 45534181949698,
        title: "Floral",
        option1: "Floral",
        sku: null,
        price: 62.0,
        compareAtPrice: 90.0,
        available: true,
        image: img("16-7", 1727684856),
      },
    ],
    images: imgs(1727684856, "14-9", "16-4", "16-7"),
    frames360: [],
    preview: null,
    video: null,
    model3d: null,
    reviews: { average: 0, count: 0, items: [] },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },
];

export const RAW_FEATURED_DATA = [
  { handle: "tiger-aloe", price: 150, comparePrice: null },
  { handle: "the-beginner-set", price: 130, comparePrice: null },
  { handle: "ruby-rubber-tree", price: 51, comparePrice: 90 },
];

// =========================================================================
// LOOKUP HELPERS
// =========================================================================
export const getProductByHandle = (handle) =>
  RAW_PRODUCTS_DATA.find((p) => p.handle === handle);

export const getProductById = (id) =>
  RAW_PRODUCTS_DATA.find((p) => p.id === id || p.numericId === id || p.handle === id);

export const getVariantById = (variantId) => {
  for (const p of RAW_PRODUCTS_DATA) {
    const v = p.variants?.find((x) => x.id === variantId);
    if (v) return { product: p, variant: v };
  }
  return null;
};

export default {
  products: RAW_PRODUCTS_DATA,
  featured: RAW_FEATURED_DATA,
  TABS,
  SHIPPING_INFO,
  BUY_MORE_OFFER,
  SHORT_DESCRIPTION,
  DESCRIPTION_HTML,
  getProductByHandle,
  getProductById,
  getVariantById,
  resolveMockImageUrl,
};
