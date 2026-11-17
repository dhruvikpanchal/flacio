import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";

// =========================================================================
// CRISP SVG LINE-ART PRODUCT ILLUSTRATIONS (Backpack, Shoe, Glasses, Cap)
// =========================================================================
function BackpackSvg() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-24 h-24 sm:w-28 sm:h-28 mx-auto text-neutral-800"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Top Handle */}
      <path d="M42 22 C42 16, 58 16, 58 22" />
      {/* Main Backpack Body */}
      <path d="M28 32 C28 24, 72 24, 72 32 L76 78 C76 82, 72 85, 68 85 L32 85 C28 85, 24 82, 24 78 Z" />
      {/* Top Flap */}
      <path d="M28 32 L72 32 L68 50 C68 52, 32 52, 32 50 Z" />
      {/* Straps / Buckle */}
      <line x1="50" y1="32" x2="50" y2="52" />
      <rect x="46" y="48" width="8" height="6" rx="1" />
      {/* Front Zipper Pocket */}
      <rect x="34" y="58" width="32" height="20" rx="2" />
      <line x1="38" y1="64" x2="62" y2="64" />
      <circle cx="50" cy="71" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ShoeSvg() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-24 h-24 sm:w-28 sm:h-28 mx-auto text-neutral-800"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Shoe Outline */}
      <path d="M22 62 L22 48 C22 46, 26 44, 32 44 L38 48 L56 50 C68 52, 76 56, 82 66 L82 72 L20 72 C18 72, 18 68, 22 62 Z" />
      {/* Sole */}
      <path d="M18 72 L84 72 C86 72, 86 76, 84 76 L18 76 C16 76, 16 72, 18 72 Z" />
      {/* Collar & Laces */}
      <path d="M30 45 C32 40, 40 40, 42 46" />
      <line x1="44" y1="48" x2="48" y2="52" />
      <line x1="48" y1="50" x2="52" y2="54" />
      <line x1="52" y1="52" x2="56" y2="56" />
      {/* Detail Accent Line */}
      <path d="M28 58 Q48 60 74 66" />
    </svg>
  );
}

function GlassesSvg() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-24 h-24 sm:w-28 sm:h-28 mx-auto text-neutral-800"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Left Rim */}
      <path d="M18 48 C18 42, 42 42, 44 48 C44 58, 20 62, 18 48 Z" />
      {/* Right Rim */}
      <path d="M56 48 C58 42, 82 42, 82 48 C80 62, 56 58, 56 48 Z" />
      {/* Bridge */}
      <path d="M44 46 Q50 43 56 46" />
      {/* Left Temple */}
      <line x1="18" y1="46" x2="12" y2="40" />
      {/* Right Temple */}
      <line x1="82" y1="46" x2="88" y2="40" />
    </svg>
  );
}

function CapSvg() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-24 h-24 sm:w-28 sm:h-28 mx-auto text-neutral-800"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Cap Crown Dome */}
      <path d="M26 62 C26 38, 74 38, 74 62 Z" />
      {/* Panels / Seams */}
      <path d="M50 38 L50 62" />
      <path d="M38 42 Q46 54 44 62" />
      <path d="M62 42 Q54 54 56 62" />
      {/* Top Button */}
      <circle cx="50" cy="37" r="2" fill="currentColor" />
      {/* Visor / Bill */}
      <path d="M22 62 Q50 60 82 62 C86 64, 82 68, 74 68 L26 68 C18 68, 16 64, 22 62 Z" />
    </svg>
  );
}

const PRODUCT_ITEMS = [
  {
    id: 1,
    title: "Example Product Title",
    discount: "20% Off",
    price: 19.99,
    comparePrice: 29.99,
    SvgComponent: BackpackSvg,
    handle: "example-backpack",
  },
  {
    id: 2,
    title: "Example Product Title",
    discount: "20% Off",
    price: 19.99,
    comparePrice: 29.99,
    SvgComponent: ShoeSvg,
    handle: "example-sneaker",
  },
  {
    id: 3,
    title: "Example Product Title",
    discount: "20% Off",
    price: 19.99,
    comparePrice: 29.99,
    SvgComponent: GlassesSvg,
    handle: "example-glasses",
  },
  {
    id: 4,
    title: "Example Product Title",
    discount: "20% Off",
    price: 19.99,
    comparePrice: 29.99,
    SvgComponent: CapSvg,
    handle: "example-cap",
  },
];

export const PortfolioProductStrip = memo(function PortfolioProductStrip({
  tags = [],
  projectTitle = "",
}) {
  const dispatch = useDispatch();
  const [addedItem, setAddedItem] = useState(null);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: `portfolio-prod-${product.id}`,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: "",
      })
    );
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(projectTitle || "Flacio Portfolio");

  return (
    <div className="pt-8 sm:pt-12 pb-6">
      {/* ================= 4 PRODUCTS IN A ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {PRODUCT_ITEMS.map((product) => {
          const SvgIcon = product.SvgComponent;
          const isAdded = addedItem === product.id;

          return (
            <div key={product.id} className="group relative flex flex-col text-center">
              {/* Card Container with Badge & Illustration */}
              <div className="relative w-full aspect-square bg-[#fafafa] flex items-center justify-center p-3 sm:p-5 md:p-6 border border-neutral-100 transition-all duration-300 group-hover:border-neutral-300 overflow-hidden">
                {/* 20% Off Red Badge */}
                <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-[#e50000] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 tracking-wide select-none z-10">
                  {product.discount}
                </span>

                {/* Svg Illustration with subtle hover lift */}
                <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <SvgIcon />
                </div>

                {/* Quick Action Floating Hover Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/40 backdrop-blur-xs pointer-events-none group-hover:pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.title} to cart`}
                    title="Add to cart"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-neutral-800 shadow-md hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                  >
                    {isAdded ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                    )}
                  </button>
                  <Link
                    to="/product"
                    aria-label={`Quick view ${product.title}`}
                    title="View products"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-neutral-800 shadow-md hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Search className="w-4 h-4 stroke-[1.75]" />
                  </Link>
                </div>
              </div>

              {/* Title & Price */}
              <div className="pt-3 sm:pt-4 pb-1">
                <Link
                  to="/product"
                  className="font-heading text-sm sm:text-base text-neutral-900 hover:text-brand-green font-normal transition-colors block truncate"
                >
                  {product.title}
                </Link>
                <div className="mt-1 flex items-center justify-center gap-2 text-xs sm:text-[13px]">
                  <span className="text-neutral-900 font-medium">${product.price.toFixed(2)}</span>
                  <span className="text-neutral-400 line-through">
                    ${product.comparePrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= TAG CHIPS & SOCIAL SHARE ROW ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 sm:pt-12 mt-2">
        {/* Left: Tag filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.id || tag}
              to={`/portfolio?tag=${tag.id || tag}`}
              className="px-4 sm:px-5 py-1.5 sm:py-2 border border-neutral-200 text-xs sm:text-[13px] text-neutral-700 hover:border-black hover:text-black transition-colors rounded-none bg-white font-normal"
            >
              {tag.label || tag}
            </Link>
          ))}
        </div>

        {/* Right: Social Share Icons */}
        <div className="flex items-center gap-2.5">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            title="Share on Facebook"
            className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-black hover:text-black transition-colors text-xs font-serif font-bold"
          >
            f
          </a>

          {/* X / Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            title="Share on X"
            className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-black hover:text-black transition-colors text-xs font-sans font-bold"
          >
            𝕏
          </a>

          {/* Pinterest */}
          <a
            href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Pinterest"
            title="Share on Pinterest"
            className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-black hover:text-black transition-colors text-xs font-serif font-bold"
          >
            P
          </a>
        </div>
      </div>
    </div>
  );
});

export default PortfolioProductStrip;

