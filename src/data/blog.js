/**
 * Blog Data Store (single file)
 * Merges the list/sidebar data and the detail-page data in one place.
 * Edit an article ONCE in `rawArticles` - url, category fields, comment count,
 * prev/next links, related posts, tags and sidebar are all derived from it.
 */

// =========================================================================
// IMAGE IMPORTS - change ONLY these paths to match your project folder
// =========================================================================
import blog1 from "../assets/images/blog-1.webp";
import blog2 from "../assets/images/blog-2.webp";
import blog3 from "../assets/images/blog-3.webp";
import blog4 from "../assets/images/blog-4.webp";
import blog5 from "../assets/images/blog-5.webp";
import blog6 from "../assets/images/blog-6.webp";
import blogBreadcrumbBg from "../assets/images/bg-breadcrumb.webp";

const BASE_URL = "https://wpbingo-flacio.myshopify.com";

// =========================================================================
// 1. CATEGORIES
// =========================================================================
export const blogCategories = [
  {
    id: "fashion",
    title: "Fashion",
    name: "Fashion",
    slug: "fashion",
    url: "/blog?category=fashion",
  },
  {
    id: "life-style",
    title: "Life Style",
    name: "Life Style",
    slug: "life-style",
    url: "/blog?category=life-style",
  },
  {
    id: "news",
    title: "News",
    name: "News",
    slug: "news",
    url: "/blog?category=news",
  },
  {
    id: "shorts",
    title: "Shorts",
    name: "Shorts",
    slug: "shorts",
    url: "/blog?category=shorts",
  },
];

export const allBlogCategories = [
  {
    id: "all",
    title: "All",
    name: "All",
    slug: "all",
    url: "/blog?category=all",
  },
  ...blogCategories,
];

// Header background image of the blog list page
export const blogBreadcrumbImage = blogBreadcrumbBg;

// Product collections shown in the article-detail sidebar "Categories"
export const productCollections = [
  { title: "Air Purifying", url: "/collections/air-purifying" },
  { title: "Ceramic Pots", url: "/collections/ceramic-pots" },
  { title: "Herb Seeds", url: "/collections/herb-seeds" },
  { title: "Indoor Plants", url: "/collections/indoor-plants" },
  { title: "Low Maintenance", url: "/collections/frontpage" },
  { title: "Plant Bundle", url: "/collections/plant-bundle" },
];

// Handles "lifestyle" <-> "life-style", case-insensitive, title or slug
export function normalizeCategorySlug(rawSlug) {
  if (!rawSlug) return "fashion";
  const clean = String(rawSlug).toLowerCase().trim();
  if (clean === "lifestyle") return "life-style";
  const found = blogCategories.find(
    (c) =>
      c.slug === clean ||
      c.slug.replace(/-/g, "") === clean.replace(/-/g, "") ||
      c.title.toLowerCase() === clean,
  );
  return found ? found.slug : clean;
}

// =========================================================================
// 2. HEADER OPTIONS & PAGE CONFIG (derived)
// =========================================================================
export const BLOG_HEADER_OPTIONS = blogCategories.map((item) => ({
  id: item.slug,
  label: item.title,
  value: item.slug,
  path: item.url,
}));

export const BLOG_PAGE_CONFIG = {
  title: "Blogs",
  defaultCategory: "fashion",
  options: BLOG_HEADER_OPTIONS,
};

// =========================================================================
// 3. SHARED ARTICLE CONTENT (same lorem text on every article right now)
//    To give one article its own text, add `content: {...}` in rawArticles.
// =========================================================================
export const DEFAULT_ARTICLE_CONTENT = {
  paragraphs: [
    "Quisque elementum nibh at dolor pellentesque, a eleifend libero pharetra. Mauris neque felis, volutpat nec ullamcorper eget, sagittis vel enim. Nam sit amet ante egestas, gravida tellus vitae, semper eros. Nullam mattis mi at metus egestas, in porttitor lectus sodales. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate laborum vero voluptatum.",
    "Lorem quasi aliquid maiores iusto suscipit perspiciatis a aspernatur et fuga repudiandae deleniti excepturi nesciunt animi reprehenderit similique sit. ipsum dolor sit amet, consectetur adipisicing elit. Qui at laborum nulla quae quibusdam molestias earum suscipit dolorum debitis hic sint asperiores maxime deserunt neque explicabo molestiae autem totam illum?",
  ],
  quote: {
    text: "Maecenas semper aliquam massa. Praesent pharetra sem vitae nisi eleifend molestie. Aliquam molestie scelerisque ultricies. Suspendisse potenti. Phasellus interdum risus at mi ullamcorper lobortis. In et metus aliquet, suscipit leo.",
    author: "ROBERT SMITH",
  },
  closing:
    "Donec sed tincidunt lacus. Duis vehicula aliquam vestibulum. Aenean at mollis mi. Cras ac urna sed nisi auctor venenatis ut id sapien. Vivamus commodo lacus lorem, a tristique sapien tempus non. Donec fringilla cursus porttitor. Morbi quis massa id mi pellentesque placerat. Nam scelerisque sit amet diam id blandit. Nullam ultrices ligula at ligula tincidunt, sit amet aliquet mi pellentesque. Aenean eget fermentum risus. Aenean eu ultricies nulla, id bibendum libero. Vestibulum dui augue, malesuada nec tellus vel, egestas condimentum ipsum. Vestibulum ut.",
};

const DEFAULT_EXCERPT =
  "Quisque elementum nibh at dolor pellentesque, a eleifend libero pharetra. Mauris neque felis, volutpat nec...";

// =========================================================================
// 4. ARTICLES - ONLY PLACE TO EDIT POSTS
//    Order = newest first (same as Shopify).
// =========================================================================
const rawArticles = [
  {
    id: 1,
    title: "Tips On How To Select The Right Tree",
    slug: "tips-on-how-to-select-the-right-tree",
    category: "fashion",
    image: blog3,
    tags: ["Baber", "Baby Needs", "Cosmetic", "Organic"],
    commentList: [],
  },
  {
    id: 2,
    title: "The Best Tree Care Tips For You",
    slug: "the-best-tree-care-tips-for-you",
    category: "life-style",
    image: blog4,
    tags: [
      "Baber",
      "Baby Needs",
      "Beauty",
      "Cosmetic",
      "New",
      "Organic",
      "Simple",
    ],
    commentList: [],
  },
  {
    id: 3,
    title: "The Best Plant For You?",
    slug: "the-best-plant-for-you",
    category: "shorts",
    image: blog5,
    tags: ["Beauty", "Cosmetic", "Simple"],
    commentList: [],
  },
  {
    id: 4,
    title: "Traveling Solo Is Awesome",
    slug: "traveling-solo-is-awesome",
    category: "news",
    image: blog6,
    tags: ["Baber", "Beauty", "Hot", "Simple"],
    commentList: [
      {
        author: "wer",
        date: "2025-10-11T01:36:34Z",
        dateText: "October 11, 2025",
        message: "wefgv",
      },
      {
        author: "ya",
        date: "2025-10-09T07:12:13Z",
        dateText: "October 9, 2025",
        message: "edwee",
      },
    ],
  },
  {
    id: 5,
    title: "Indoor Plants Are Good For Health.",
    slug: "indoor-plants-are-good-for-health",
    category: "news",
    image: blog2,
    tags: ["Baber", "Baby Needs", "Cosmetic", "Hot", "Organic", "Simple"],
    commentList: [
      {
        author: "Kaushal vora",
        date: "2025-09-25T15:38:00Z",
        dateText: "September 25, 2025",
        message: "i m happy to buy this product",
      },
      {
        author: "name",
        date: "2025-09-09T02:42:55Z",
        dateText: "September 9, 2025",
        message: "heloo is askjbcmmessage",
      },
      {
        author: "xvcxv",
        date: "2025-08-01T06:38:53Z",
        dateText: "August 1, 2025",
        message: "xcvxc",
      },
      {
        author: "xvcxv",
        date: "2025-08-01T06:38:52Z",
        dateText: "August 1, 2025",
        message: "xcvxc",
      },
    ],
  },
  {
    id: 6,
    title: "What Is The Best Plant For You?",
    slug: "what-is-the-best-plant-for-you",
    category: "news",
    image: blog1,
    tags: [
      "Baber",
      "Baby Needs",
      "Beauty",
      "Cosmetic",
      "Hot",
      "New",
      "Organic",
      "Simple",
    ],
    commentList: [
      {
        author: "xczxz",
        date: "2025-09-05T06:27:47Z",
        dateText: "September 5, 2025",
        message: "cvxcv",
      },
    ],
  },
];

const tagSlug = (tag) => tag.toLowerCase().replace(/\s+/g, "-");

// Build the final article objects (all repeated fields are derived here)
export const blogArticles = rawArticles.map((a) => {
  const cat = blogCategories.find((c) => c.slug === a.category) || {
    title: a.category,
    url: `/blog?category=${a.category}`,
  };
  const comments = Array.isArray(a.commentList) ? a.commentList : [];
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    url: `/blogs/${a.category}/${a.slug}`,
    fullUrl: `${BASE_URL}/blogs/${a.category}/${a.slug}`,
    image: a.image,
    alt: a.title,
    date: "September 30, 2024",
    isoDate: "2024-09-30",
    author: "Tung Hoang",
    category: a.category,
    categoryTitle: cat.title,
    categorySlug: cat.url, // kept for backward compatibility (it is a URL path)
    categoryUrl: cat.url,
    excerpt: a.excerpt || DEFAULT_EXCERPT,
    tags: a.tags || [],
    comments: comments.length, // number (same as before)
    commentList: comments, // full comment objects for detail page
    content: a.content || DEFAULT_ARTICLE_CONTENT,
  };
});

// Alias for backwards compatibility
export const relatedPosts = blogArticles;

// =========================================================================
// 5. BLOG TAGS (derived from articles - per category)
// =========================================================================
export const blogTags = blogCategories.reduce((acc, cat) => {
  const tags = new Set();
  blogArticles
    .filter((a) => a.category === cat.slug)
    .forEach((a) => a.tags.forEach((t) => tags.add(t)));
  acc[cat.slug] = [...tags].sort();
  return acc;
}, {});
blogTags.lifestyle = blogTags["life-style"]; // alias

// =========================================================================
// 6. HELPERS
// =========================================================================

// Sidebar data for a category (list page + detail page)
export function getBlogSidebar(categorySlug) {
  const normalized = normalizeCategorySlug(categorySlug);
  const category =
    blogCategories.find((item) => item.slug === normalized) ||
    blogCategories[0];

  return {
    categories: blogCategories.map((item) => ({
      ...item,
      active: item.slug === normalized,
    })),
    productCollections,
    activeCategory: category,
    relatedPosts: blogArticles.filter(
      (post) => post.category === category.slug,
    ),
    tags: (blogTags[category.slug] || []).map((tag) => ({
      title: tag,
      slug: tagSlug(tag),
      url: `/blogs/${category.slug}/tagged/${tagSlug(tag)}`,
    })),
  };
}

// One article by slug, full URL, or "/blogs/news/slug"
export function getBlogPost(slug) {
  if (!slug) return null;
  const clean = String(slug).replace(/\/+$/, "").split("/").pop();
  return blogArticles.find((p) => p.slug === clean) || null;
}
export const getBlogBySlug = getBlogPost;

// Articles by category (slug, title, or "all")
export function getBlogsByCategory(category) {
  if (!category || String(category).toLowerCase() === "all")
    return blogArticles;
  const normalized = normalizeCategorySlug(category);
  return blogArticles.filter((a) => a.category === normalized);
}
export const getPostsByCategory = getBlogsByCategory;

// Articles by tag (optionally limited to one category)
export function getPostsByTag(categorySlug, tag) {
  const wanted = String(tag).toLowerCase().replace(/-/g, " ");
  const normalized = categorySlug ? normalizeCategorySlug(categorySlug) : null;
  return blogArticles.filter(
    (p) =>
      (!normalized || p.category === normalized) &&
      p.tags.some((t) => t.toLowerCase() === wanted),
  );
}

// Previous / next article inside the same category (Shopify style:
// "previous" = older, "next" = newer)
export function getPrevNext(slug) {
  const post = getBlogPost(slug);
  if (!post) return { prev: null, next: null };
  const list = blogArticles.filter((a) => a.category === post.category);
  const i = list.findIndex((a) => a.id === post.id);
  return { prev: list[i + 1] || null, next: list[i - 1] || null };
}

// Everything the /blog/:slug detail page needs in one call
export function getBlogDetail(slug) {
  const post = getBlogPost(slug);
  if (!post) return null;
  return {
    ...post,
    ...getPrevNext(post.slug),
    sidebar: getBlogSidebar(post.category),
  };
}

// =========================================================================
// 7. DEFAULT EXPORT
// =========================================================================
export default {
  categories: blogCategories,
  allCategories: allBlogCategories,
  productCollections,
  breadcrumbImage: blogBreadcrumbBg,
  options: BLOG_HEADER_OPTIONS,
  config: BLOG_PAGE_CONFIG,
  articles: blogArticles,
  relatedPosts,
  blogTags,
  getBlogSidebar,
  getBlogPost,
  getBlogBySlug,
  getBlogsByCategory,
  getPostsByCategory,
  getPostsByTag,
  getPrevNext,
  getBlogDetail,
  normalizeCategorySlug,
};
