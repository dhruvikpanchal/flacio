export const NAVIGATION_DATA = {
  home: {
    title: "HOME",
    id: "home",
    path: "/",
    hasMegaMenu: false,
    hasDropdown: false,
    items: [
      { label: "Home 1 - Minimal Plants", path: "/", isDefault: true },
      { label: "Home 2 - Modern Boutique", path: "/home-2" },
      { label: "Home 3 - Furniture & Decor", path: "/home-3" },
      { label: "Home 4 - Clean Showcase", path: "/home-4" },
      { label: "Home 5 - Collection Grid", path: "/home-5" },
      { label: "Home 6 - Botanical Studio", path: "/home-6" },
    ],
  },
  product: {
    title: "PRODUCT",
    id: "product",
    path: "/product",
    hasMegaMenu: false,
    hasDropdown: false,
  },
  blog: {
    title: "BLOG",
    id: "blog",
    path: "/blog?category=fashion",
    hasMegaMenu: false,
    hasDropdown: false,
    columns: [
      {
        title: "Layout & Post",
        items: [
          { label: "Blog Standard", path: "/blog" },
          { label: "Blog Grid", path: "/blog/grid" },
          { label: "Blog Grid Mix", path: "/blog/grid-mix" },
          { label: "List", path: "/blog/list" },
          { label: "Post Sidebar", path: "/blog/post-sidebar" },
          { label: "Post One Column", path: "/blog/post-one-column" },
          { label: "Post Prallax Image", path: "/blog/post-parallax" },
          { label: "Post Sticky", path: "/blog/post-sticky" },
          { label: "Post Simple Title", path: "/blog/post-simple-title" },
        ],
      },
    ],
    posts: [
      {
        image: "/images/menu-blog-1.jpg",
        category: "NEWS",
        title: "Traveling Solo Is Awesome",
        path: "/blog/traveling-solo-is-awesome",
      },
      {
        image: "/images/menu-blog-2.jpg",
        category: "NEWS",
        title: "Indoor Plants Are Good For Health.",
        path: "/blog/indoor-plants-are-good-for-health",
      },
    ],
  },
  featured: {
    title: "FEATURED",
    id: "featured",
    hasMegaMenu: true,
    columns: [
      {
        title: "Page",
        items: [
          { label: "About Us", path: "/about" },
          { label: "Contact Us", path: "/contact" },
          { label: "Faqs", path: "/faqs" },
          { label: "Faqs 2", path: "/faqs-2" },
          { label: "Wishlist", path: "/wishlist" },
          { label: "404 Error", path: "/404" },
        ],
      },
      {
        title: "Portfolio",
        items: [
          { label: "2 Columns", path: "/portfolio/2-columns" },
          { label: "3 Columns", path: "/portfolio/3-columns" },
          { label: "4 Columns", path: "/portfolio/4-columns" },
          {
            label: "Masonry Layout",
            badge: "New",
            badgeColor: "new",
            path: "/portfolio/masonry",
          },
        ],
      },
    ],
  },
};
