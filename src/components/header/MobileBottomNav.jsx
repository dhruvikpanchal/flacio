import { memo } from "react";
import { Link } from "react-router-dom";
import { GridIcon, HeartIcon, HomeIcon, UserIcon } from "../common/Icons";
import { preloadPage } from "../../util/preload";

export const MobileBottomNav = memo(function MobileBottomNav({
  wishlistCount = 0,
  onOpenAccount,
}) {
  return (
    <nav aria-label="Mobile Navigation" className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#f0f0f0] lg:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-4 h-16 items-center px-2">
        {/* Home */}
        <Link
          to="/"
          onMouseEnter={() => preloadPage("/")}
          className="flex flex-col items-center justify-center gap-1 text-brand-dark hover:text-brand-green transition-colors"
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
        </Link>

        {/* Products */}
        <Link
          to="/product"
          onMouseEnter={() => preloadPage("/product")}
          className="flex flex-col items-center justify-center gap-1 text-brand-dark hover:text-brand-green transition-colors"
        >
          <GridIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Products</span>
        </Link>

        {/* Account */}
        <button
          onClick={onOpenAccount}
          className="flex flex-col items-center justify-center gap-1 text-brand-dark hover:text-brand-green transition-colors"
        >
          <UserIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Account</span>
        </button>

        {/* Wishlist */}
        <Link
          to="/wishlist"
          onMouseEnter={() => preloadPage("/wishlist")}
          className="relative flex flex-col items-center justify-center gap-1 text-brand-dark hover:text-brand-green transition-colors"
        >
          <div className="relative">
            <HeartIcon className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-2.5 bg-brand-green text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider">Wishlist</span>
        </Link>
      </div>
    </nav>
  );
});

export default MobileBottomNav;
