/**
 * Route page chunk preloading dictionary
 * Calls the same dynamic import() on hover so the bundle chunk is already cached
 * before the user clicks, making page changes feel instant.
 */
const pagePreloaders = {
  "/": () => import("../page/home/Home"),
  "/about": () => import("../page/about/About"),
  "/contact": () => import("../page/contact/Contact"),
  "/faqs": () => import("../page/faqs/Faqs"),
  "/faqs-2": () => import("../page/faqs/Faqs2"),
  "/wishlist": () => import("../page/wishlist/Wishlist"),
  "/portfolio": () => import("../page/portfolio/Portfolio"),
  "/product": () => import("../page/product/ProductPage"),
  "/checkout": () => import("../page/checkout/Checkout"),
  "/cart": () => import("../page/checkout/Checkout"),
  "/blog": () => import("../page/blog/Blog"),
  "/blogs": () => import("../page/blog/Blog"),
  "/404": () => import("../page/404/NotFound"),
};

export function preloadPage(path) {
  if (!path) return;
  const cleanPath = path.split("?")[0].replace(/\/+$/, "") || "/";
  const loader = pagePreloaders[cleanPath];
  if (loader) {
    loader();
  } else if (cleanPath.startsWith("/blogs/") || cleanPath.startsWith("/blog/")) {
    pagePreloaders["/blog"]?.();
  } else if (cleanPath.startsWith("/collections/") || cleanPath.startsWith("/product/")) {
    pagePreloaders["/product"]?.();
  }
}

export default preloadPage;
