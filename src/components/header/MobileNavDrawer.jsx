import { useEffect, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { NAVIGATION_DATA } from "../../data/navigationData";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "../common/Icons";
import { MenuBadge } from "../common/Badge";
import { preloadPage } from "../../util/preload";

export const MobileNavDrawer = memo(function MobileNavDrawer({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleClose = useCallback(() => {
    setActiveCategory(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentCategoryData = activeCategory ? NAVIGATION_DATA[activeCategory] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-nav-title"
      className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-[1px] animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-85 sm:max-w-95 bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideInLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header of Drawer */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
          {activeCategory ? (
            <button
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-dark hover:text-brand-green"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <span id="mobile-nav-title" className="text-xs font-semibold tracking-widest uppercase text-brand-muted">
              Navigation
            </span>
          )}

          {activeCategory && (
            <span className="font-heading text-sm text-[#000000] font-normal tracking-wide uppercase">
              {currentCategoryData?.title}
            </span>
          )}

          <button
            onClick={handleClose}
            aria-label="Close menu"
            className="text-brand-dark hover:text-brand-green transition-colors p-1"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content area: Level 1 (Main Menu) or Level 2 (Sub-Level) */}
        <div className="flex-1 overflow-y-auto flacio-scrollbar">
          {!activeCategory ? (
            /* Level 1: Main Menu List */
            <nav className="divide-y divide-[#f0f0f0]">
              {Object.keys(NAVIGATION_DATA).map((key) => {
                const item = NAVIGATION_DATA[key];
                if (key === "shop") return null;

                // HOME, PRODUCT and BLOG have no dropdown/sub-menu on any device: direct link
                if (key === "home" || key === "blog" || key === "product") {
                  const targetPath =
                    key === "home"
                      ? "/"
                      : key === "blog"
                      ? "/blog?category=fashion"
                      : "/product";
                  return (
                    <Link
                      key={key}
                      to={targetPath}
                      onClick={handleClose}
                      onMouseEnter={() => preloadPage(targetPath)}
                      className="w-full flex items-center justify-between px-6 py-4.5 text-left text-[13px] font-medium tracking-wider uppercase text-brand-dark hover:bg-[#fafafa] hover:text-brand-green transition-colors"
                    >
                      <span>{item.title}</span>
                    </Link>
                  );
                }

                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className="w-full flex items-center justify-between px-6 py-4.5 text-left text-[13px] font-medium tracking-wider uppercase text-brand-dark hover:bg-[#fafafa] hover:text-brand-green transition-colors"
                  >
                    <span>{item.title}</span>
                    <ChevronRightIcon className="w-4 h-4 text-brand-muted" />
                  </button>
                );
              })}
            </nav>
          ) : (
            /* Level 2: Sub-Level View */
            <div className="p-6 space-y-6">
              {/* Promotional Banners if present (Shop) */}
              {currentCategoryData?.banners && (
                <div className="space-y-4">
                  {currentCategoryData.banners.map((b, idx) => (
                    <div
                      key={idx}
                      className="group relative h-45 overflow-hidden bg-[#f5f5f5] flex items-end justify-center pb-4"
                    >
                      <img
                        src={b.image}
                        alt={b.title}
                        width={300}
                        height={180}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      <Link
                        to={b.path}
                        onClick={handleClose}
                        onMouseEnter={() => preloadPage(b.path)}
                        className="relative z-10 bg-white text-brand-dark px-4 py-2 text-[10px] font-semibold tracking-widest uppercase shadow"
                      >
                        {b.buttonText}
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {/* Blog Post cards if blog category */}
              {currentCategoryData?.posts && (
                <div className="space-y-3">
                  {currentCategoryData.posts.map((post, idx) => (
                    <Link
                      key={idx}
                      to={post.path}
                      onClick={handleClose}
                      onMouseEnter={() => preloadPage(post.path)}
                      className="relative block h-25 overflow-hidden bg-neutral-800"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        width={300}
                        height={100}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/45 p-3 flex flex-col justify-end text-white">
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-white/80">
                          {post.category}
                        </span>
                        <div className="font-heading text-xs text-white line-clamp-1">{post.title}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Columns & Links */}
              {currentCategoryData?.columns && (
                <div className="space-y-6">
                  {currentCategoryData.columns.map((col, colIdx) => (
                    <div key={colIdx} className="space-y-2.5">
                      <h4 className="font-heading text-sm text-[#000000] pb-1 border-b border-brand-border">
                        {col.title}
                      </h4>
                      <ul className="space-y-2 pl-1">
                        {col.items.map((subItem, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              to={subItem.path}
                              onClick={handleClose}
                              onMouseEnter={() => preloadPage(subItem.path)}
                              className="flex items-center justify-between text-xs text-brand-muted hover:text-brand-green py-1 transition-colors"
                            >
                              <span>{subItem.label}</span>
                              {subItem.badge && (
                                <MenuBadge type={subItem.badgeColor} label={subItem.badge} />
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Direct Items if Home */}
              {currentCategoryData?.items && (
                <ul className="space-y-3">
                  {currentCategoryData.items.map((it, idx) => (
                    <li key={idx}>
                      <Link
                        to={it.path}
                        onClick={handleClose}
                        onMouseEnter={() => preloadPage(it.path)}
                        className="block text-sm text-brand-dark hover:text-brand-green py-1.5 transition-colors"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer Links */}
        <div className="p-6 border-t border-[#f0f0f0] bg-[#fafafa] flex items-center justify-between text-xs text-brand-muted">
          <span>© Flacio Botanical</span>
          <Link
            to="/contact"
            onClick={handleClose}
            onMouseEnter={() => preloadPage("/contact")}
            className="hover:text-brand-green underline"
          >
            Help & FAQs
          </Link>
        </div>
      </div>
    </div>
  );
});

export default MobileNavDrawer;
