// ============================================================
// Product data collected from wpbingo-flacio.myshopify.com
// Prices are in USD (dollars). Shopify raw cents = price * 100.
// ============================================================

const STORE_URL = "https://wpbingo-flacio.myshopify.com";
const CDN = "https://wpbingo-flacio.myshopify.com/cdn/shop/files/";
const img = (name, v) => `${CDN}${name}?v=${v}`;

// ---------- Shared content (same on all 10 product pages) ----------
const SHORT_DESCRIPTION =
  "Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum";

const DESCRIPTION_HTML = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
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

const SHIPPING_INFO = {
  returnPolicy:
    "We will gladly accept returns for any reason within 30 days of receipt of delivery.",
  availability: "Ships anywhere in the United States",
  processingTime:
    "Allow 3-4 business days processing time for your order to ship.",
};

const TABS = {
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

const BUY_MORE_OFFER = {
  quantity: 5,
  discountPercent: 10,
  text: "Buy More Save More!",
};

// ---------- Products ----------
const products = [
  // ------------------------------------------------------------
  // 1) A Philippine (Upsell)
  // ------------------------------------------------------------
  {
    id: 8813966262530,
    title: "A Philippine (Upsell)",
    handle: "philippine-evergreen",
    url: `${STORE_URL}/products/philippine-evergreen`,
    vendor: "wpbingo",
    type: "",
    tags: [],
    collection: { title: "Ceramic Pots", handle: "ceramic-pots" },
    createdAt: "2024-09-30T04:27:05-04:00",
    publishedAt: "2024-09-30T04:27:01-04:00",
    available: true,
    currency: "USD",
    price: 80.0,
    priceMin: 80.0,
    priceMax: 85.0,
    priceVaries: true,
    compareAtPrice: null,
    onSale: false,
    options: ["Color"],
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
        image: img("10-5.jpg", 1727684825),
      },
      {
        id: 45534162026754,
        title: "Floral",
        option1: "Floral",
        sku: null,
        price: 85.0,
        compareAtPrice: null,
        available: true,
        image: img("10-2.jpg", 1727684825),
      },
    ],
    images: [
      img("10-2.jpg", 1727684825),
      img("10-5.jpg", 1727684825),
      img("10-8.jpg", 1727684825),
    ],
    // 16-frame 360° view
    images360: Array.from({ length: 16 }, (_, i) =>
      img(`360-${i + 1}.jpg`, i === 11 || i === 12 ? 1728275237 : 1728275238),
    ),
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
    title: "Bought Together",
    handle: "spider-plant",
    url: `${STORE_URL}/products/spider-plant`,
    vendor: "Lulu Store",
    type: "",
    tags: [],
    collection: { title: "Ceramic Pots", handle: "ceramic-pots" },
    createdAt: "2024-09-30T04:27:20-04:00",
    publishedAt: "2024-09-30T04:27:17-04:00",
    available: true,
    currency: "USD",
    price: 51.0,
    priceMin: 51.0,
    priceMax: 52.0,
    priceVaries: true,
    compareAtPrice: null,
    onSale: false,
    options: ["Color"],
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
        image: img("15-5.jpg", 1727684840),
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
    images: [img("12-4.jpg", 1727684840), img("15-5.jpg", 1727684840)],
    images360: [],
    video: null,
    model3d: null,
    reviews: { average: 0, count: 0, items: [] },
    // "Frequently Bought Together" bundle
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
          variants: [
            { id: 45531370946818, title: "Pink / 30cm", price: 130.0 },
            { id: 45534175166722, title: "Pink / 50cm", price: 130.0 },
            { id: 45534175199490, title: "Pink / 60cm", price: 130.0 },
            { id: 45531370979586, title: "Orange / 30cm", price: 138.0 },
            { id: 45534175232258, title: "Orange / 50cm", price: 130.0 },
            { id: 45534175265026, title: "Orange / 60cm", price: 130.0 },
            { id: 45531371012354, title: "Black / 30cm", price: 137.0 },
            { id: 45534175297794, title: "Black / 50cm", price: 130.0 },
            { id: 45534175330562, title: "Black / 60cm", price: 130.0 },
          ],
        },
      ],
    },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 3) Jade Succulent (grouped product)
  // ------------------------------------------------------------
  {
    id: 8813965967618,
    title: "Jade Succulent",
    handle: "jade-succulent",
    url: `${STORE_URL}/products/jade-succulent`,
    vendor: "Akaza Store",
    type: "",
    tags: [],
    collection: { title: "Ceramic Pots", handle: "ceramic-pots" },
    createdAt: "2024-09-30T04:26:49-04:00",
    publishedAt: "2024-09-30T04:26:44-04:00",
    available: true,
    currency: "USD",
    price: 50.0,
    priceMin: 50.0,
    priceMax: 70.0,
    priceVaries: true,
    compareAtPrice: 70.0,
    onSale: true,
    discountLabel: "-28%",
    options: ["Color"],
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
        image: img("1_7d889b7e-e9b3-48c1-8e8d-a696e8d84f7d.jpg", 1727684809),
      },
      {
        id: 45531370193154,
        title: "Red",
        option1: "Red",
        sku: "",
        price: 60.0,
        compareAtPrice: 70.0,
        available: true,
        image: img("2.jpg", 1727684809),
      },
      {
        id: 45531370225922,
        title: "Black",
        option1: "Black",
        sku: "",
        price: 70.0,
        compareAtPrice: 70.0,
        available: true,
        image: img("3.jpg", 1727684809),
      },
    ],
    images: [
      img("1_7d889b7e-e9b3-48c1-8e8d-a696e8d84f7d.jpg", 1727684809),
      img("2.jpg", 1727684809),
      img("3.jpg", 1727684809),
    ],
    images360: [],
    video: null,
    model3d: null,
    // Group (bundle) product – sold as these two products
    groupProducts: [
      {
        id: 8813966459138,
        title: "Tiger Aloe",
        handle: "tiger-aloe",
        variants: [
          { id: 45531371077890, title: "Black", price: 153.0 },
          { id: 45531371110658, title: "Pink", price: 152.0 },
          { id: 45531371143426, title: "Blue", price: 150.0 },
        ],
      },
      {
        id: 8813966164226,
        title: "Peace Lily",
        handle: "peace-lily",
        variants: [
          { id: 45531370389762, title: "Black", price: 60.0 },
          { id: 45531370422530, title: "White", price: 68.0 },
          { id: 45531370455298, title: "Pink", price: 61.0 },
        ],
      },
    ],
    reviews: {
      average: 2.0,
      count: 4,
      items: [
        {
          author: "xcxz",
          rating: 2,
          date: "2025-08-28",
          title: "",
          body: "dds",
        },
        {
          author: "sdf",
          rating: 1,
          date: "2025-08-28",
          title: "sdf",
          body: "sdfsd",
        },
        {
          author: "hello",
          rating: 2,
          date: "2025-08-28",
          title: "helo how are you",
          body: "ksfbv",
        },
        {
          author: "d.",
          rating: 3,
          date: "2025-08-27",
          title: "hello",
          body: "how are you you okkkk",
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
    title: "Palm",
    handle: "palm",
    url: `${STORE_URL}/products/palm`,
    vendor: "Akatsuki Store",
    type: "",
    tags: [],
    collection: { title: "Ceramic Pots", handle: "ceramic-pots" },
    createdAt: "2024-09-30T04:26:55-04:00",
    publishedAt: "2024-09-30T04:26:50-04:00",
    available: true,
    currency: "USD",
    price: 50.0,
    priceMin: 50.0,
    priceMax: 55.0,
    priceVaries: true,
    compareAtPrice: null,
    onSale: false,
    options: ["Color"],
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45531370324226,
        title: "White",
        option1: "White",
        sku: "",
        price: 50.0,
        compareAtPrice: null,
        available: true,
        image: img("4_e38424b6-c524-41ed-9909-c9060fd972c1.jpg", 1727684815),
      },
      {
        id: 45531370356994,
        title: "Blue",
        option1: "Blue",
        sku: "",
        price: 55.0,
        compareAtPrice: null,
        available: true,
        image: img("5.jpg", 1727684815),
      },
    ],
    images: [
      img("4_e38424b6-c524-41ed-9909-c9060fd972c1.jpg", 1727684815),
      img("5.jpg", 1727684815),
      img("6.jpg", 1727684815),
    ],
    images360: [],
    video: {
      id: 34351484895490,
      durationMs: 9020,
      poster: img(
        "preview_images/789164a81fab4f9ba51d8961f18d7d06.thumbnail.0000000000.jpg",
        1728274214,
      ),
      sources: [
        {
          format: "mp4",
          width: 852,
          height: 480,
          url: `${STORE_URL}/cdn/shop/videos/c/vp/789164a81fab4f9ba51d8961f18d7d06/789164a81fab4f9ba51d8961f18d7d06.SD-480p-1.2Mbps-35914703.mp4?v=0`,
        },
        {
          format: "mp4",
          width: 1280,
          height: 720,
          url: `${STORE_URL}/cdn/shop/videos/c/vp/789164a81fab4f9ba51d8961f18d7d06/789164a81fab4f9ba51d8961f18d7d06.HD-720p-3.0Mbps-35914703.mp4?v=0`,
        },
        {
          format: "mp4",
          width: 1920,
          height: 1080,
          url: `${STORE_URL}/cdn/shop/videos/c/vp/789164a81fab4f9ba51d8961f18d7d06/789164a81fab4f9ba51d8961f18d7d06.HD-1080p-4.8Mbps-35914703.mp4?v=0`,
        },
        {
          format: "m3u8",
          width: 1920,
          height: 1080,
          url: `${STORE_URL}/cdn/shop/videos/c/vp/789164a81fab4f9ba51d8961f18d7d06/789164a81fab4f9ba51d8961f18d7d06.m3u8?v=0`,
        },
      ],
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
    title: "Peace Lily",
    handle: "peace-lily",
    url: `${STORE_URL}/products/peace-lily`,
    vendor: "Akatsuki Store",
    type: "",
    tags: [],
    collection: { title: "Air Purifying", handle: "air-purifying" },
    createdAt: "2024-09-30T04:26:59-04:00",
    publishedAt: "2024-09-30T04:26:55-04:00",
    available: true,
    currency: "USD",
    price: 60.0,
    priceMin: 60.0,
    priceMax: 68.0,
    priceVaries: true,
    compareAtPrice: 90.0,
    onSale: true,
    discountLabel: "-33%",
    options: ["Color"],
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45531370389762,
        title: "Black",
        option1: "Black",
        sku: "D111 - 11",
        price: 60.0,
        compareAtPrice: 90.0,
        available: true,
        inventoryManagement: "shopify",
        image: img("10-3.jpg", 1727684820),
      },
      {
        id: 45531370422530,
        title: "White",
        option1: "White",
        sku: "D111 - 15",
        price: 68.0,
        compareAtPrice: 90.0,
        available: true,
        inventoryManagement: "shopify",
        image: img("1.jpg", 1727684820),
      },
      {
        id: 45531370455298,
        title: "Pink",
        option1: "Pink",
        sku: "D111 - 19",
        price: 61.0,
        compareAtPrice: 90.0,
        available: true,
        inventoryManagement: "shopify",
        image: img("4.jpg", 1727684820),
      },
    ],
    images: [
      img("1.jpg", 1727684820),
      img("4.jpg", 1727684820),
      img("10-3.jpg", 1727684820),
    ],
    images360: [],
    video: null,
    model3d: {
      id: 34351492792578,
      poster: img("preview_images/3d.jpg", 1728274566),
      sources: [
        {
          format: "glb",
          mimeType: "model/gltf-binary",
          url: `${STORE_URL}/cdn/shop/3d/models/o/4a1a6c3d0691e8d5/3d.glb?v=0`,
        },
        {
          format: "usdz",
          mimeType: "model/vnd.usdz+zip",
          url: `${STORE_URL}/cdn/shop/3d/models/o/d577a6af323d6576/3d.usdz?v=0`,
        },
      ],
    },
    stockLeft: 90,
    pickup: {
      store: "Akaze store",
      readyIn: "Usually ready in 24 hours",
      address: "548 North Blackstone Avenue, Fresno CA 93701, United States",
      phone: "+10123555444",
    },
    reviews: {
      average: 5.0,
      count: 2,
      items: [
        {
          author: "Aqeel Chaudhary",
          rating: 5,
          date: "2024-12-17",
          title: "Nice products",
          body: "High recomended",
          photo:
            "https://review-images.judgeme.com/flacio-plants-shopify-theme-os-2-0/1734430734__151144_main__original.jpeg",
        },
        {
          author: "Test",
          rating: 5,
          date: "2024-12-15",
          title: "Test",
          body: "this is for just test....",
          photo:
            "https://review-images.judgeme.com/flacio-plants-shopify-theme-os-2-0/1734264661__beautiful-outdoor-nature-landscape-with-__original.jpg",
        },
      ],
    },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 6) Pink Dragon Tree  (OUT OF STOCK)
  // ------------------------------------------------------------
  {
    id: 8813966295298,
    title: "Pink Dragon Tree",
    handle: "pink-dragon-tree",
    url: `${STORE_URL}/products/pink-dragon-tree`,
    vendor: "wpbingo",
    type: "",
    tags: [],
    collection: { title: "Air Purifying", handle: "air-purifying" },
    createdAt: "2024-09-30T04:27:10-04:00",
    publishedAt: "2024-09-30T04:27:06-04:00",
    available: false,
    currency: "USD",
    price: 80.0,
    priceMin: 80.0,
    priceMax: 80.0,
    priceVaries: false,
    compareAtPrice: 100.0,
    onSale: true,
    discountLabel: "-20%", // calculated: (100-80)/100 (page shows "Out of stock" badge instead)
    options: ["Color"],
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45534172119298,
        title: "Striped",
        option1: "Striped",
        sku: "",
        price: 80.0,
        compareAtPrice: 100.0,
        available: false,
        inventoryManagement: "shopify",
        image: img("8.jpg", 1727684830),
      },
      {
        id: 45534181523714,
        title: "Plaid",
        option1: "Plaid",
        sku: "",
        price: 80.0,
        compareAtPrice: 100.0,
        available: false,
        inventoryManagement: "shopify",
        image: img("9.jpg", 1727684830),
      },
    ],
    images: [
      img("7.jpg", 1727684830),
      img("8.jpg", 1727684830),
      img("9.jpg", 1727684830),
    ],
    images360: [],
    video: null,
    model3d: null,
    backInStockNotify: true, // "Notify me when available" form is shown
    reviews: { average: 0, count: 0, items: [] },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 7) Ruby Rubber Tree
  // ------------------------------------------------------------
  {
    id: 8813966360834,
    title: "Ruby Rubber Tree",
    handle: "ruby-rubber-tree",
    url: `${STORE_URL}/products/ruby-rubber-tree`,
    vendor: "SE Store",
    type: "",
    tags: [],
    collection: { title: "Air Purifying", handle: "air-purifying" },
    createdAt: "2024-09-30T04:27:16-04:00",
    publishedAt: "2024-09-30T04:27:11-04:00",
    available: true,
    currency: "USD",
    price: 51.0,
    priceMin: 51.0,
    priceMax: 59.0,
    priceVaries: true,
    compareAtPrice: 90.0,
    onSale: true,
    discountLabel: "-43%",
    options: ["Color"],
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45531370717442,
        title: "Black",
        option1: "Black",
        sku: "D111 - 56",
        price: 52.0,
        compareAtPrice: 90.0,
        available: true,
        image: img("10-6.jpg", 1727684836),
      },
      {
        id: 45531370750210,
        title: "Pink",
        option1: "Pink",
        sku: "D111 - 60",
        price: 51.0,
        compareAtPrice: 90.0,
        available: true,
        image: img("14.jpg", 1727684836),
      },
      {
        id: 45531370782978,
        title: "Blue",
        option1: "Blue",
        sku: "D111 - 64",
        price: 59.0,
        compareAtPrice: 90.0,
        available: true,
        image: img("16-1.jpg", 1727684836),
      },
    ],
    images: [
      img("10-6.jpg", 1727684836),
      img("14.jpg", 1727684836),
      img("16-1.jpg", 1727684836),
    ],
    images360: [],
    video: null,
    model3d: null,
    reviews: { average: 0, count: 0, items: [] },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 8) The Beginner Set (2 options: Color x Size)
  // ------------------------------------------------------------
  {
    id: 8813966426370,
    title: "The Beginner Set",
    handle: "the-beginner-set",
    url: `${STORE_URL}/products/the-beginner-set`,
    vendor: "Akaza Store",
    type: "",
    tags: [],
    collection: { title: "Air Purifying", handle: "air-purifying" },
    createdAt: "2024-09-30T04:27:25-04:00",
    publishedAt: "2024-09-30T04:27:21-04:00",
    available: true,
    currency: "USD",
    price: 130.0,
    priceMin: 130.0,
    priceMax: 138.0,
    priceVaries: true,
    compareAtPrice: null,
    onSale: false,
    options: ["Color", "Size"],
    shortDescription: SHORT_DESCRIPTION,
    description: DESCRIPTION_HTML,
    variants: [
      {
        id: 45531370946818,
        title: "Pink / 30cm",
        option1: "Pink",
        option2: "30cm",
        sku: "D111 - 66",
        price: 130.0,
        compareAtPrice: null,
        available: true,
        image: img("16-1_5f1bbfe2-f7bc-4b45-a536-57fd4bd03363.jpg", 1727684845),
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
        image: img("16-1_5f1bbfe2-f7bc-4b45-a536-57fd4bd03363.jpg", 1727684845),
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
        image: img("16-1_5f1bbfe2-f7bc-4b45-a536-57fd4bd03363.jpg", 1727684845),
      },
      {
        id: 45531370979586,
        title: "Orange / 30cm",
        option1: "Orange",
        option2: "30cm",
        sku: "D111 - 70",
        price: 138.0,
        compareAtPrice: null,
        available: true,
        image: img("14-6.jpg", 1727684845),
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
        image: img("14-6.jpg", 1727684845),
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
        image: img("14-6.jpg", 1727684845),
      },
      {
        id: 45531371012354,
        title: "Black / 30cm",
        option1: "Black",
        option2: "30cm",
        sku: "D111 - 74",
        price: 137.0,
        compareAtPrice: null,
        available: true,
        image: img("14-3.jpg", 1727684845),
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
        image: img("14-3.jpg", 1727684845),
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
        image: img("14-3.jpg", 1727684845),
      },
    ],
    images: [
      img("14-3.jpg", 1727684845),
      img("14-6.jpg", 1727684845),
      img("16-1_5f1bbfe2-f7bc-4b45-a536-57fd4bd03363.jpg", 1727684845),
    ],
    images360: [],
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
    title: "Tiger Aloe",
    handle: "tiger-aloe",
    url: `${STORE_URL}/products/tiger-aloe`,
    vendor: "wpbingo",
    type: "",
    tags: [],
    collection: { title: "Air Purifying", handle: "air-purifying" },
    createdAt: "2024-09-30T04:27:30-04:00",
    publishedAt: "2024-09-30T04:27:26-04:00",
    available: true,
    currency: "USD",
    price: 150.0,
    priceMin: 150.0,
    priceMax: 153.0,
    priceVaries: true,
    compareAtPrice: null,
    onSale: false,
    options: ["Color"],
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
        image: img("11-8.jpg", 1727684850),
      },
      {
        id: 45531371110658,
        title: "Pink",
        option1: "Pink",
        sku: "D111 - 39",
        price: 152.0,
        compareAtPrice: null,
        available: true,
        image: img("11-7.jpg", 1727684850),
      },
      {
        id: 45531371143426,
        title: "Blue",
        option1: "Blue",
        sku: "D111 - 43",
        price: 150.0,
        compareAtPrice: null,
        available: true,
        image: img("10-9.jpg", 1727684850),
      },
    ],
    images: [
      img("10-9.jpg", 1727684850),
      img("11-7.jpg", 1727684850),
      img("11-8.jpg", 1727684850),
    ],
    images360: [],
    video: null,
    model3d: null,
    reviews: { average: 0, count: 0, items: [] },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },

  // ------------------------------------------------------------
  // 10) Umbrella Tree  (PRE-ORDER)
  // ------------------------------------------------------------
  {
    id: 8813966491906,
    title: "Umbrella Tree",
    handle: "umbrella-tree",
    url: `${STORE_URL}/products/umbrella-tree`,
    vendor: "wpbingo",
    type: "",
    tags: [],
    collection: { title: "Air Purifying", handle: "air-purifying" },
    createdAt: "2024-09-30T04:27:36-04:00",
    publishedAt: "2024-09-30T04:27:31-04:00",
    available: true,
    currency: "USD",
    price: 62.0,
    priceMin: 62.0,
    priceMax: 62.0,
    priceVaries: false,
    compareAtPrice: 90.0,
    onSale: true,
    discountLabel: "-31%",
    preOrder: true, // button text is "Pre-order" instead of "Add to Cart"
    options: ["Color"],
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
        inventoryManagement: "shopify",
        image: img("14-9.jpg", 1727684856),
      },
      {
        id: 45534181949698,
        title: "Floral",
        option1: "Floral",
        sku: null,
        price: 62.0,
        compareAtPrice: 90.0,
        available: true,
        inventoryManagement: "shopify",
        image: img("16-7.jpg", 1727684856),
      },
    ],
    images: [
      img("14-9.jpg", 1727684856),
      img("16-4.jpg", 1727684856),
      img("16-7.jpg", 1727684856),
    ],
    images360: [],
    video: null,
    model3d: null,
    reviews: { average: 0, count: 0, items: [] },
    shipping: SHIPPING_INFO,
    buyMore: BUY_MORE_OFFER,
  },
];

// ---------- Helpers ----------
const getProductByHandle = (handle) =>
  products.find((p) => p.handle === handle);
const getProductById = (id) => products.find((p) => p.id === id);
const getVariantById = (variantId) => {
  for (const p of products) {
    const v = p.variants.find((x) => x.id === variantId);
    if (v) return { product: p, variant: v };
  }
  return null;
};

// ---------- Exports ----------
export {
  products,
  TABS,
  SHIPPING_INFO,
  BUY_MORE_OFFER,
  SHORT_DESCRIPTION,
  DESCRIPTION_HTML,
  getProductByHandle,
  getProductById,
  getVariantById,
};
export default products;
