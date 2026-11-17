/**
 * Portfolio Data Store - High Performance & Fully Optimized
 *
 * Designed for frictionless functional programming (`.map()`, `.filter()`, etc.)
 * - Safe tag resolution with auto-generated fallbacks
 * - Pre-computed display strings (`formattedTags`, `tagLabels`, `tagIds`) to prevent re-computations in render loops
 * - O(1) Map lookups for slug, ID, and category filtering (`getPortfolioItem`, `getItemsByTag`)
 * - Backward-compatible with all existing components (`Portfolio.jsx`, `PortfolioCard.jsx`)
 */

// =========================================================================
// 1. IMAGE IMPORTS
// =========================================================================
import booksThatOpenKnowledgeImg from "../assets/images/booksThatOpenKnowledgeImg.webp";
import redesginConceptImg from "../assets/images/redesginConceptImg.webp";
import webDesignDevelopmentImg from "../assets/images/webDesignDevelopmentImg.webp";
import organicDrinkingWaterImg from "../assets/images/organicDrinkingWaterImg.webp";
import musicEvent2022Img from "../assets/images/musicEvent2022Img.webp";
import wineGiftBoxImg from "../assets/images/wineGiftBoxImg.webp";
import cardMockupDesignImg from "../assets/images/cardMockupDesignImg.webp";
import mobileAppDesignImg from "../assets/images/mobileAppDesignImg.webp";

// =========================================================================
// 2. BASE CONFIGURATION
// =========================================================================
const SITE_BASE = "https://wpbingo-flacio.myshopify.com";
export const PORTFOLIO_BASE_PATH = "/portfolio";
export const SHOPIFY_PORTFOLIO_PATH = "/blogs/portfolio";

// =========================================================================
// 3. TAGS & CATEGORIES (Used for filter bars & chips)
// =========================================================================
export const portfolioTags = Object.freeze([
  { id: "baber", label: "Baber" },
  { id: "baby-needs", label: "Baby Needs" },
  { id: "beauty", label: "Beauty" },
  { id: "cosmetic", label: "Cosmetic" },
  { id: "hot", label: "Hot" },
  { id: "new", label: "New" },
  { id: "organic", label: "Organic" },
  { id: "simple", label: "Simple" },
]);

// Fast O(1) lookup dictionary for tag objects
const tagById = Object.freeze(
  Object.fromEntries(portfolioTags.map((t) => [t.id, t]))
);

// Fallback helper to safely resolve any custom tag ID without undefined errors
const resolveTag = (tagId) => {
  if (tagById[tagId]) return tagById[tagId];
  const autoLabel = String(tagId)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return { id: tagId, label: autoLabel };
};

// =========================================================================
// 4. SHARED DETAIL CONTENT & PRODUCTS
// =========================================================================
export const DEFAULT_PORTFOLIO_BODY = Object.freeze([
  "Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Aenean commodo ligula eget dolor. Nulla facilisi. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.",
  "Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Etiam rhoncus. Nunc interdum lacus sit amet orci. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.",
]);

export const portfolioProducts = Object.freeze(
  Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    title: "Example Product Title",
    label: "20% off",
    price: "$19.99",
    comparePrice: "$29.99",
    url: "/admin/products",
  }))
);

// =========================================================================
// 5. RAW DATA SOURCE (Single Source of Truth)
// =========================================================================
const rawItems = Object.freeze([
  {
    id: 1,
    slug: "books-that-open-knowledge",
    title: "Books that open knowledge",
    image: booksThatOpenKnowledgeImg,
    tags: ["baby-needs", "cosmetic", "new"],
  },
  {
    id: 2,
    slug: "redesgin-concept",
    title: "Redesgin Concept",
    image: redesginConceptImg,
    tags: ["baber", "hot", "organic", "simple"],
    comments: [
      {
        author: "hell",
        date: "2025-09-30T05:54:51Z",
        dateText: "September 30, 2025",
        message: "sdfsd",
      },
    ],
  },
  {
    id: 3,
    slug: "web-design-development",
    title: "Web Design Development",
    image: webDesignDevelopmentImg,
    tags: ["beauty", "hot", "new", "simple"],
  },
  {
    id: 4,
    slug: "organic-drinking-water-for-you",
    title: "Organic drinking water for you",
    image: organicDrinkingWaterImg,
    tags: ["beauty", "cosmetic", "hot", "organic"],
  },
  {
    id: 5,
    slug: "music-event-2022",
    title: "Music event 2022",
    image: musicEvent2022Img,
    tags: ["baber", "hot", "simple"],
    comments: [
      {
        author: "xvdf",
        date: "2025-09-13T02:58:00Z",
        dateText: "September 13, 2025",
        message: "vxcv",
      },
    ],
  },
  {
    id: 6,
    slug: "wine-gift-box-every-day",
    title: "Wine gift box every day",
    image: wineGiftBoxImg,
    tags: ["baber", "baby-needs", "beauty", "simple"],
  },
  {
    id: 7,
    slug: "card-mockup-design",
    title: "Card Mockup Design",
    image: cardMockupDesignImg,
    tags: ["beauty", "hot", "new"],
  },
  {
    id: 8,
    slug: "mobile-app-design",
    title: "Mobile app design",
    image: mobileAppDesignImg,
    tags: ["baby-needs", "beauty", "simple"],
  },
]);

// =========================================================================
// 6. DERIVED & OPTIMIZED PORTFOLIO ITEMS
// Pre-calculates computed fields for zero overhead when mapping in components
// =========================================================================
export const portfolioItems = Object.freeze(
  rawItems.map((r) => {
    const rawTagIds = Array.isArray(r.tags) ? r.tags : [];
    const richTags = rawTagIds.map((tagId) => {
      const tagMeta = resolveTag(tagId);
      return {
        ...tagMeta,
        url: `${PORTFOLIO_BASE_PATH}?tag=${tagId}`,
      };
    });

    const tagLabels = richTags.map((t) => t.label);
    const formattedTags = tagLabels.join(", ");
    const commentsList = Array.isArray(r.comments) ? r.comments : [];

    return Object.freeze({
      // Primary Identifiers
      id: r.id,
      slug: r.slug,
      title: r.title,
      alt: r.alt || r.title,

      // Routing & Links
      url: `${PORTFOLIO_BASE_PATH}/${r.slug}`,
      link: `${SITE_BASE}${SHOPIFY_PORTFOLIO_PATH}/${r.slug}`,
      internalUrl: `${PORTFOLIO_BASE_PATH}/${r.slug}`,
      externalLink: `${SITE_BASE}${SHOPIFY_PORTFOLIO_PATH}/${r.slug}`,

      // Media Dimensions
      image: r.image,
      width: 1440,
      height: 900,
      aspectRatio: "aspect-4/3.5",

      // Tags & Categorization
      tags: Object.freeze(richTags),
      tagIds: Object.freeze(rawTagIds),
      tagLabels: Object.freeze(tagLabels),
      formattedTags,

      // Detail Page Metadata
      client: r.client || "Tung Hoang",
      year: r.year || 2024,
      body: r.body || DEFAULT_PORTFOLIO_BODY,
      comments: Object.freeze(commentsList),
      commentCount: commentsList.length,

      // Convenient tag checker method
      hasTag: (targetTagId) =>
        targetTagId === "all" || rawTagIds.includes(targetTagId),
    });
  })
);

// =========================================================================
// 7. HIGH SPEED INDEXED MAPS (O(1) Access)
// =========================================================================
const itemBySlug = new Map(portfolioItems.map((item) => [item.slug, item]));
const itemById = new Map(portfolioItems.map((item) => [item.id, item]));

// Pre-grouped cache for tag filters
const itemsByTagCache = new Map();
itemsByTagCache.set("all", portfolioItems);
portfolioTags.forEach((tag) => {
  itemsByTagCache.set(
    tag.id,
    portfolioItems.filter((item) => item.tagIds.includes(tag.id))
  );
});

// =========================================================================
// 8. OPTIMIZED QUERY HELPERS
// =========================================================================

/**
 * Filter items by tag ID. Instant O(1) cached lookup.
 * @param {string} [tagId="all"] - Tag ID or "all"
 * @returns {Array} List of portfolio items
 */
export const getItemsByTag = (tagId = "all") => {
  if (!tagId || tagId === "all") return portfolioItems;
  return (
    itemsByTagCache.get(tagId) ||
    portfolioItems.filter((item) => item.hasTag(tagId))
  );
};

/**
 * Find a portfolio item by slug or path in O(1) time.
 * @param {string} slug - Item slug, e.g. "books-that-open-knowledge"
 * @returns {Object|null}
 */
export const getPortfolioItem = (slug) => {
  if (!slug) return null;
  const clean = String(slug).replace(/\/+$/, "").split("/").pop();
  return itemBySlug.get(clean) || null;
};
export const getPortfolioBySlug = getPortfolioItem; // Convenient alias

/**
 * Find a portfolio item by numeric ID in O(1) time.
 * @param {number|string} id - Item ID
 * @returns {Object|null}
 */
export const getPortfolioById = (id) => itemById.get(Number(id)) || null;

/**
 * Retrieve previous and next items relative to current slug.
 * @param {string} slug - Current item slug
 * @returns {{ prev: Object|null, next: Object|null }}
 */
export const getPrevNext = (slug) => {
  const index = portfolioItems.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: portfolioItems[index + 1] || null,
    next: portfolioItems[index - 1] || null,
  };
};

/**
 * Retrieve related portfolio items excluding the current item.
 * @param {string} slug - Current item slug
 * @param {number} [count=4] - Maximum number of items
 * @returns {Array}
 */
export const getRelatedItems = (slug, count = 4) =>
  portfolioItems.filter((p) => p.slug !== slug).slice(0, count);

/**
 * Retrieve complete data bundle for a portfolio detail view in a single call.
 * @param {string} slug - Item slug
 * @returns {Object|null}
 */
export const getPortfolioDetail = (slug) => {
  const item = getPortfolioItem(slug);
  if (!item) return null;
  return {
    ...item,
    ...getPrevNext(item.slug),
    related: getRelatedItems(item.slug),
    products: portfolioProducts,
  };
};

// =========================================================================
// 9. DEFAULT EXPORT
// =========================================================================
export default portfolioItems;
