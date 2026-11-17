import { useEffect, useRef, useState, useCallback, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { BagIcon, ChevronDownIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "../common/Icons";
import { Logo } from "../common/Logo";
import { AccountDrawer } from "./AccountDrawer";
import { CartDrawer } from "./CartDrawer";
import { MegaMenuFeatured } from "./MegaMenuFeatured";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { SearchModal } from "./SearchModal";
import { preloadPage } from "../../util/preload";

const NAV_ITEMS = [
  { key: "home", label: "HOME", hasDropdown: false, path: "/" },
  { key: "product", label: "PRODUCT", hasDropdown: false, path: "/product" },
  { key: "blog", label: "BLOG", hasDropdown: false, path: "/blog?category=fashion" },
  { key: "featured", label: "FEATURED", hasDropdown: true },
];

export const Header = memo(function Header({
  variant = "auto", // "auto" | "solid" | "transparent"
  defaultActive = "HOME",
  wishlistCount: propWishlistCount,
  cartCount: propCartCount,
  onCartClick,
  onWishlistClick,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Narrow selectors for Redux state (computed numbers, stable references)
  const reduxWishlistCount = useSelector(
    (state) => state?.wishlist?.items?.length ?? 0
  );
  const reduxCartCount = useSelector(
    (state) =>
      state?.cart?.items?.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      ) ?? 0
  );

  const wishlistCount = propWishlistCount !== undefined ? propWishlistCount : reduxWishlistCount;
  const cartCount = propCartCount !== undefined ? propCartCount : reduxCartCount;

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeLink, setActiveLink] = useState(defaultActive);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const timeoutRef = useRef(null);

  // Scroll detection for sticky header & transparent transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Transparent state & color transition is ONLY active on desktop devices (lg: 1024px+).
  // Mobile and tablet always remain solid white so content is never obscured.
  const isDesktopTransparent =
    (variant === "transparent" || (variant === "auto" && !isScrolled)) && !activeMenu;

  // Menu mouse events with smooth debounce to avoid jitter
  const handleMouseEnter = useCallback((menuKey) => {
    if (menuKey === "home" || menuKey === "blog") {
      setActiveMenu(null);
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuKey);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  const handleDefaultWishlistClick = useCallback(() => {
    if (onWishlistClick) {
      onWishlistClick();
    } else {
      navigate("/wishlist");
    }
  }, [navigate, onWishlistClick]);

  const handleDefaultCartClick = useCallback(() => {
    if (onCartClick) {
      onCartClick();
    } else {
      setIsCartOpen(true);
    }
  }, [onCartClick]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white text-brand-dark border-b border-[#f0f0f0] shadow-sm ${
          isDesktopTransparent
            ? "lg:bg-transparent lg:text-white lg:border-white/20 lg:shadow-none"
            : "lg:bg-white lg:text-brand-dark lg:border-[#f0f0f0] lg:shadow-sm"
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 h-20 md:h-22 flex items-center justify-between">
          {/* ================= DESKTOP NAVIGATION (LEFT) ================= */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-7 xl:gap-9 text-[13px] font-medium tracking-[0.08em]">
            {NAV_ITEMS.map((item) => {
              const isCurrentRoute =
                (item.key === "blog" && location.pathname.startsWith("/blog")) ||
                (item.key === "home" && location.pathname === "/") ||
                (item.key === "product" && location.pathname.startsWith("/product"));
              const isActive = isCurrentRoute || activeLink === item.label;
              const isHovered = activeMenu === item.key;

              return (
                <div
                  key={item.key}
                  className="relative py-7 cursor-pointer"
                  onMouseEnter={() => {
                    if (item.path) preloadPage(item.path);
                    if (item.hasDropdown) {
                      handleMouseEnter(item.key);
                    } else {
                      setActiveMenu(null);
                    }
                  }}
                  onClick={() => {
                    setActiveLink(item.label);
                    if (item.path) {
                      navigate(item.path);
                      setActiveMenu(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 uppercase transition-colors duration-200 cursor-pointer ${
                      isDesktopTransparent
                        ? isHovered || isActive
                          ? "text-white"
                          : "text-white/90 hover:text-white"
                        : isHovered || isActive
                        ? "text-[#000000]"
                        : "text-brand-dark hover:text-brand-green"
                    }`}
                  >
                    <span className="relative">
                      {item.label}
                      {/* Active / Hovered underline indicator */}
                      {(isActive || isHovered) && (
                        <span
                          className={`absolute -bottom-1.5 left-0 right-0 h-0.5 transition-all duration-200 ${
                            isDesktopTransparent ? "bg-white" : "bg-[#000000]"
                          }`}
                        />
                      )}
                    </span>
                    {item.hasDropdown && (
                      <ChevronDownIcon
                        className={`w-2.5 h-2.5 transition-transform duration-200 ${
                          isHovered ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </nav>

          {/* ================= MOBILE CONTROLS (LEFT) ================= */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile menu"
              className="p-1 transition-colors text-brand-dark hover:text-brand-green"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="p-1 transition-colors text-brand-dark hover:text-brand-green"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>

          {/* ================= BRAND LOGO (CENTER) ================= */}
          <div className="flex-1 lg:flex-initial flex justify-center text-center">
            {/* Mobile & Tablet (< lg): Always dark logo on white background */}
            <div className="lg:hidden">
              <Logo isWhite={false} className="h-7 md:h-8 w-auto" />
            </div>
            {/* Desktop (lg+): White logo when transparent, dark logo when scrolled */}
            <div className="hidden lg:block">
              <Logo isWhite={isDesktopTransparent} className="h-7 md:h-8 w-auto" />
            </div>
          </div>

          {/* ================= ACTION ICONS (RIGHT) ================= */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Search (Desktop only here, mobile has it on the left) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className={`hidden lg:flex p-1 transition-colors ${
                isDesktopTransparent ? "text-white hover:text-white/80" : "text-brand-dark hover:text-brand-green"
              }`}
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            {/* Account (Desktop only here, mobile has it in bottom nav) */}
            <button
              onClick={() => setIsAccountOpen(true)}
              aria-label="Account"
              className={`hidden lg:flex p-1 transition-colors ${
                isDesktopTransparent ? "text-white hover:text-white/80" : "text-brand-dark hover:text-brand-green"
              }`}
            >
              <UserIcon className="w-5 h-5" />
            </button>

            {/* Wishlist Icon with Forest Green Badge */}
            <button
              onClick={handleDefaultWishlistClick}
              onMouseEnter={() => preloadPage("/wishlist")}
              aria-label="Wishlist"
              className={`relative p-1 transition-colors text-brand-dark hover:text-brand-green ${
                isDesktopTransparent ? "lg:text-white lg:hover:text-white/80" : ""
              }`}
            >
              <HeartIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-2 bg-brand-green text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {wishlistCount}
              </span>
            </button>

            {/* Cart Icon with Forest Green Badge */}
            <button
              onClick={handleDefaultCartClick}
              aria-label="Shopping Cart"
              className={`relative p-1 transition-colors text-brand-dark hover:text-brand-green ${
                isDesktopTransparent ? "lg:text-white lg:hover:text-white/80" : ""
              }`}
            >
              <BagIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-2 bg-brand-green text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* ================= MEGA MENUS & DROPDOWNS ================= */}
        {activeMenu && (
          <div
            className="hidden lg:block relative"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {activeMenu === "featured" && (
              <div className="absolute left-0 right-0 top-0 z-50">
                <MegaMenuFeatured />
              </div>
            )}
          </div>
        )}
      </header>

      {/* ================= MODALS & DRAWERS ================= */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <AccountDrawer
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <MobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav
        wishlistCount={wishlistCount}
        onOpenAccount={() => setIsAccountOpen(true)}
      />
    </>
  );
});

export default Header;
