import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";

// Code-split all pages for rapid initial page load & instant chunking
const Home = lazy(() => import("../page/home/Home"));
const About = lazy(() => import("../page/about/About"));
const Contact = lazy(() => import("../page/contact/Contact"));
const Faqs = lazy(() => import("../page/faqs/Faqs"));
const Faqs2 = lazy(() => import("../page/faqs/Faqs2"));
const Wishlist = lazy(() => import("../page/wishlist/Wishlist"));
const Portfolio = lazy(() => import("../page/portfolio/Portfolio"));
const PortfolioId = lazy(() => import("../page/portfolio/portfolio-id/PortfolioId"));
const ProductPage = lazy(() => import("../page/product/ProductPage"));
const ProductId = lazy(() => import("../page/product/product-id/ProductId"));
const Blog = lazy(() => import("../page/blog/Blog"));
const BlogId = lazy(() => import("../page/blog/blog-id/BlogId"));
const Checkout = lazy(() => import("../page/checkout/Checkout"));
const NotFound = lazy(() => import("../page/404/NotFound"));

export function AppRoutes({ onNavigate }) {
  return (
    <Routes>
      {/* ================= SINGLE PARENT LAYOUT ROUTE ================= */}
      {/* Header and Footer stay persistent on screen across all child pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home onNavigate={onNavigate} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/faqs-2" element={<Faqs2 />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* Portfolio routes */}
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:layout" element={<Portfolio />} />
        <Route path="/portfolio-id" element={<PortfolioId />} />
        <Route path="/portfolio-id/:slug" element={<PortfolioId />} />
        <Route path="/portfolio/detail/:slug" element={<PortfolioId />} />
        <Route path="/blogs/portfolio/:slug" element={<PortfolioId />} />

        {/* Product routes */}
        <Route path="/product" element={<ProductPage />} />
        <Route path="/collections/:collection" element={<ProductPage />} />
        <Route path="/product-id" element={<ProductId />} />
        <Route path="/product-id/:handle" element={<ProductId />} />
        <Route path="/product/:handle" element={<ProductId />} />
        <Route path="/products/:handle" element={<ProductId />} />
        <Route path="/collections/:collection/products/:handle" element={<ProductId />} />

        {/* Blog routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:category" element={<Blog />} />
        <Route path="/blog-id" element={<BlogId />} />
        <Route path="/blog/:category/:slug" element={<BlogId />} />
        <Route path="/blogs/:category/:slug" element={<BlogId />} />

        {/* Cart & Checkout */}
        <Route path="/cart" element={<Checkout />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
