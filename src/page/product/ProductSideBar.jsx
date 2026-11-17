import { memo, useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, SlidersHorizontal, X, Star, Check } from "lucide-react";
import {
  COLLECTIONS,
  PRODUCTS,
  getFeaturedProducts,
  getCollectionProducts,
  formatPrice,
} from "../../data/products";

/* ------------------------------------------------------------------ *
 * COLOR SWATCH CONFIGURATION (Matches design image 1:1)
 * ------------------------------------------------------------------ */
const COLOR_SWATCH_STYLES = {
  Black: { backgroundColor: "#000000" },
  Blue: { backgroundColor: "#1e60d5" },
  Floral: {
    backgroundImage:
      "url('https://wpbingo-flacio.myshopify.com/cdn/shop/files/10-2_180x.jpg?v=1727684825')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  Geometric: {
    backgroundImage:
      "url('https://wpbingo-flacio.myshopify.com/cdn/shop/files/14-9_180x.jpg?v=1727684856')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  Grey: { backgroundColor: "#7d7d7d" },
  Orange: { backgroundColor: "#ea580c" },
  Pink: { backgroundColor: "#f472b6" },
  Plaid: {
    backgroundImage:
      "repeating-linear-gradient(0deg,#c33 0 2px,transparent 2px 5px),repeating-linear-gradient(90deg,#369 0 2px,#eee 2px 5px)",
  },
  Red: { backgroundColor: "#ef4444" },
  Striped: {
    backgroundImage:
      "repeating-linear-gradient(45deg,#333 0 3px,#eee 3px 6px)",
  },
  White: { backgroundColor: "#ffffff", border: "1px solid #d1d5db" },
};

/* ------------------------------------------------------------------ *
 * ACCORDION SECTION WRAPPER COMPONENT
 * Independent toggle, multi-open/close capable, smooth animation
 * ------------------------------------------------------------------ */
function AccordionSection({ title, isOpen, onToggle, children }) {
  return (
    <div className="border-b border-[#eeeeee] py-5 sm:py-6 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between text-left group cursor-pointer select-none"
      >
        <span className="font-heading text-[18px] sm:text-[19px] font-normal text-[#1c1c1c] tracking-tight group-hover:text-brand-green transition-colors duration-200">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#555555] transition-transform duration-300 ease-out group-hover:text-brand-green ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Smooth CSS Grid Accordion Collapse */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden min-h-0">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * DUAL PRICE RANGE SLIDER (Centered square thumbs [□]━━━━[□])
 * ------------------------------------------------------------------ */
function PriceRangeSlider({
  min = 0,
  max = 153,
  value = [0, 153],
  onChange,
  idPrefix = "desktop-filter",
}) {
  const [minVal, maxVal] = value;
  const [activeThumb, setActiveThumb] = useState(null);

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - 5);
    onChange?.([val, maxVal]);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), minVal + 5);
    onChange?.([minVal, val]);
  };

  const minPercent = Math.max(0, Math.min(100, ((minVal - min) / (max - min)) * 100));
  const maxPercent = Math.max(0, Math.min(100, ((maxVal - min) / (max - min)) * 100));

  return (
    <div className="pt-3 pb-1 select-none">
      {/* Slider track container (24px height for exact vertical centering) */}
      <div className="relative w-full h-6 flex items-center">
        {/* Inactive background track */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#e6e6e6] pointer-events-none" />

        {/* Active highlighted range bar */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-[#1c1c1c] pointer-events-none transition-all duration-75"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min Thumb Input */}
        <label htmlFor={`${idPrefix}-price-range-min`} className="sr-only">
          Minimum price
        </label>
        <input
          id={`${idPrefix}-price-range-min`}
          name="minPrice"
          type="range"
          autoComplete="off"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          onMouseDown={() => setActiveThumb("min")}
          onTouchStart={() => setActiveThumb("min")}
          onMouseUp={() => setActiveThumb(null)}
          onTouchEnd={() => setActiveThumb(null)}
          aria-label="Minimum price"
          className={`flacio-range-slider absolute inset-0 w-full h-6 appearance-none bg-transparent pointer-events-none cursor-pointer ${
            activeThumb === "min" || minVal > max - 25 ? "z-30" : "z-20"
          }`}
        />

        {/* Max Thumb Input */}
        <label htmlFor={`${idPrefix}-price-range-max`} className="sr-only">
          Maximum price
        </label>
        <input
          id={`${idPrefix}-price-range-max`}
          name="maxPrice"
          type="range"
          autoComplete="off"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          onMouseDown={() => setActiveThumb("max")}
          onTouchStart={() => setActiveThumb("max")}
          onMouseUp={() => setActiveThumb(null)}
          onTouchEnd={() => setActiveThumb(null)}
          aria-label="Maximum price"
          className={`flacio-range-slider absolute inset-0 w-full h-6 appearance-none bg-transparent pointer-events-none cursor-pointer ${
            activeThumb === "max" ? "z-30" : "z-20"
          }`}
        />
      </div>

      {/* Price output text below slider */}
      <div className="flex items-center justify-between text-[13.5px] text-[#707070] mt-3 font-sans">
        <div className="flex items-center">
          <span>Price :</span>
          <span className="ml-2 font-medium text-[#1c1c1c]">
            ${minVal.toFixed(2)} — ${maxVal.toFixed(2)}
          </span>
        </div>

        {(minVal > min || maxVal < max) && (
          <button
            type="button"
            onClick={() => onChange?.([min, max])}
            className="text-[11px] text-brand-green hover:underline cursor-pointer font-medium uppercase tracking-wider"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * MAIN PRODUCT SIDEBAR COMPONENT
 * ------------------------------------------------------------------ */
export const ProductSideBar = memo(function ProductSideBar({
  selectedCollection = "all",
  onSelectCollection,
  selectedAvailability = [],
  onToggleAvailability,
  priceRange = [0, 153],
  onPriceChange,
  selectedSizes = [],
  onToggleSize,
  selectedColors = [],
  onToggleColor,
  onResetFilters,
  activeFiltersCount = 0,
  idPrefix = "desktop-filter",
}) {
  // Accordion sections can open/close independently or all simultaneously
  const [openSections, setOpenSections] = useState({
    collections: true,
    availability: true,
    price: true,
    size: true,
    color: true,
    featured: true,
  });

  const toggleSection = useCallback((key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // Changing collection recalculates dynamic counts fast
  const activeCollectionProducts = useMemo(() => {
    if (!selectedCollection || selectedCollection === "all") {
      return PRODUCTS;
    }
    return getCollectionProducts(selectedCollection);
  }, [selectedCollection]);

  // Dynamic availability counts based on active collection
  const dynamicAvailability = useMemo(() => {
    const inStock = activeCollectionProducts.filter((p) => p.inStock).length;
    const outOfStock = activeCollectionProducts.filter((p) => !p.inStock).length;
    return { inStock, outOfStock };
  }, [activeCollectionProducts]);

  // Dynamic size counts based on active collection
  const dynamicSizes = useMemo(() => {
    const allSizes = ["30cm", "50cm", "60cm"];
    const counts = { "30cm": 0, "50cm": 0, "60cm": 0 };
    activeCollectionProducts.forEach((p) => {
      (p.sizes || []).forEach((s) => {
        if (counts[s] !== undefined) counts[s] += 1;
      });
    });
    return allSizes.map((val) => ({
      value: val,
      count: counts[val],
    }));
  }, [activeCollectionProducts]);

  // Dynamic color counts based on active collection
  const dynamicColors = useMemo(() => {
    const targetOrder = [
      "Black",
      "Blue",
      "Floral",
      "Geometric",
      "Grey",
      "Orange",
      "Pink",
      "Plaid",
      "Red",
      "Striped",
      "White",
    ];
    const counts = {};
    targetOrder.forEach((c) => (counts[c] = 0));

    activeCollectionProducts.forEach((p) => {
      (p.colors || []).forEach((c) => {
        if (counts[c] !== undefined) {
          counts[c] += 1;
        }
      });
    });

    return targetOrder
      .map((name) => ({
        name,
        count: counts[name],
      }))
      .filter((c) => c.count > 0 || selectedCollection === "all");
  }, [activeCollectionProducts, selectedCollection]);

  // Featured products list
  const featuredProducts = useMemo(() => {
    return getFeaturedProducts();
  }, []);

  return (
    <aside
      className="w-full select-none"
      aria-label="Product filters and collections"
    >
      {/* Optional Reset Bar if any filters are active */}
      {activeFiltersCount > 0 && onResetFilters && (
        <div className="flex items-center justify-between pb-4 mb-2 border-b border-[#eeeeee]">
          <span className="text-xs text-brand-muted">
            {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active
          </span>
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-brand-green hover:underline cursor-pointer font-medium"
          >
            Clear All
          </button>
        </div>
      )}

      {/* ================= 1. COLLECTIONS ACCORDION ================= */}
      <AccordionSection
        title="Collections"
        isOpen={openSections.collections}
        onToggle={() => toggleSection("collections")}
      >
        <ul className="space-y-2.5 pt-1">
          {COLLECTIONS.filter((c) => !c.hidden).map((col) => {
            const isChecked = selectedCollection === col.handle;
            const inputId = `${idPrefix}-col-${col.handle}`;
            return (
              <li key={col.id}>
                <label
                  htmlFor={inputId}
                  className="group flex items-center gap-3 text-[14px] text-[#555555] hover:text-[#1c1c1c] transition-colors cursor-pointer py-0.5"
                >
                  <input
                    id={inputId}
                    name={`filter-col-${col.handle}`}
                    type="checkbox"
                    autoComplete="off"
                    checked={isChecked}
                    onChange={() => {
                      const next = isChecked ? "all" : col.handle;
                      onSelectCollection?.(next);
                    }}
                    className="sr-only"
                  />
                  {/* Square Outline Checkbox */}
                  <span
                    className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-all duration-150 shrink-0 ${
                      isChecked
                        ? "border-[#1c1c1c] bg-[#1c1c1c] text-white"
                        : "border-[#d1d5db] bg-white group-hover:border-[#999999]"
                    }`}
                    aria-hidden="true"
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-3" />}
                  </span>
                  <span className="flex-1 font-sans font-normal tracking-wide">
                    {col.title}{" "}
                    <span className="text-[#888888]">({col.count})</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </AccordionSection>

      {/* ================= 2. AVAILABILITY ACCORDION ================= */}
      <AccordionSection
        title="Availability"
        isOpen={openSections.availability}
        onToggle={() => toggleSection("availability")}
      >
        <ul className="space-y-2.5 pt-1">
          {/* In stock option */}
          <li>
            <label
              htmlFor={`${idPrefix}-avail-in-stock`}
              className="group flex items-center gap-3 text-[14px] text-[#555555] hover:text-[#1c1c1c] transition-colors cursor-pointer py-0.5"
            >
              <input
                id={`${idPrefix}-avail-in-stock`}
                name="availability-in-stock"
                type="checkbox"
                autoComplete="off"
                checked={selectedAvailability.includes("in-stock")}
                onChange={() => onToggleAvailability?.("in-stock")}
                className="sr-only"
              />
              <span
                className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-all duration-150 shrink-0 ${
                  selectedAvailability.includes("in-stock")
                    ? "border-[#1c1c1c] bg-[#1c1c1c] text-white"
                    : "border-[#d1d5db] bg-white group-hover:border-[#999999]"
                }`}
                aria-hidden="true"
              >
                {selectedAvailability.includes("in-stock") && (
                  <Check className="w-3 h-3 stroke-3" />
                )}
              </span>
              <span className="flex-1 font-sans font-normal tracking-wide">
                In stock{" "}
                <span className="text-[#888888]">
                  ({dynamicAvailability.inStock})
                </span>
              </span>
            </label>
          </li>

          {/* Out of stock option */}
          <li>
            <label
              htmlFor={`${idPrefix}-avail-out-of-stock`}
              className="group flex items-center gap-3 text-[14px] text-[#555555] hover:text-[#1c1c1c] transition-colors cursor-pointer py-0.5"
            >
              <input
                id={`${idPrefix}-avail-out-of-stock`}
                name="availability-out-of-stock"
                type="checkbox"
                autoComplete="off"
                checked={selectedAvailability.includes("out-of-stock")}
                onChange={() => onToggleAvailability?.("out-of-stock")}
                className="sr-only"
              />
              <span
                className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-all duration-150 shrink-0 ${
                  selectedAvailability.includes("out-of-stock")
                    ? "border-[#1c1c1c] bg-[#1c1c1c] text-white"
                    : "border-[#d1d5db] bg-white group-hover:border-[#999999]"
                }`}
                aria-hidden="true"
              >
                {selectedAvailability.includes("out-of-stock") && (
                  <Check className="w-3 h-3 stroke-3" />
                )}
              </span>
              <span className="flex-1 font-sans font-normal tracking-wide">
                Out of stock{" "}
                <span className="text-[#888888]">
                  ({dynamicAvailability.outOfStock})
                </span>
              </span>
            </label>
          </li>
        </ul>
      </AccordionSection>

      {/* ================= 3. PRICE ACCORDION ================= */}
      <AccordionSection
        title="Price"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <PriceRangeSlider
          min={0}
          max={153}
          value={priceRange}
          onChange={onPriceChange}
          idPrefix={idPrefix}
        />
      </AccordionSection>

      {/* ================= 4. SIZE ACCORDION ================= */}
      <AccordionSection
        title="Size"
        isOpen={openSections.size}
        onToggle={() => toggleSection("size")}
      >
        <div className="flex flex-wrap gap-2.5 pt-1">
          {dynamicSizes.map((item) => {
            const isSelected = selectedSizes.includes(item.value);
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onToggleSize?.(item.value)}
                className={`px-3.5 py-1.5 text-[13px] border rounded-xs transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-[#1c1c1c] bg-[#1c1c1c] text-white"
                    : "border-[#e0e0e0] bg-white text-[#555555] hover:border-[#1c1c1c] hover:text-[#1c1c1c]"
                }`}
              >
                {item.value} ({item.count})
              </button>
            );
          })}
        </div>
      </AccordionSection>

      {/* ================= 5. COLOR ACCORDION ================= */}
      <AccordionSection
        title="Color"
        isOpen={openSections.color}
        onToggle={() => toggleSection("color")}
      >
        <ul className="space-y-2.5 pt-1">
          {dynamicColors.map((col) => {
            const isSelected = selectedColors.includes(col.name);
            const style = COLOR_SWATCH_STYLES[col.name] || {
              backgroundColor: "#cccccc",
            };
            const inputId = `${idPrefix}-color-${col.name.toLowerCase().replace(/\s+/g, "-")}`;

            return (
              <li key={col.name}>
                <label
                  htmlFor={inputId}
                  className="group flex items-center gap-3.5 text-[14px] text-[#555555] hover:text-[#1c1c1c] transition-colors cursor-pointer py-1"
                >
                  <input
                    id={inputId}
                    name={`filter-color-${col.name.toLowerCase().replace(/\s+/g, "-")}`}
                    type="checkbox"
                    autoComplete="off"
                    checked={isSelected}
                    onChange={() => onToggleColor?.(col.name)}
                    className="sr-only"
                  />
                  {/* Swatch Square */}
                  <span
                    className="w-5 h-5 rounded-xs border border-black/10 shrink-0 relative overflow-hidden flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform"
                    style={style}
                    aria-hidden="true"
                  >
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-white shadow-xs border border-black/40" />
                    )}
                  </span>

                  {/* Label with count */}
                  <span
                    className={`flex-1 font-sans font-normal tracking-wide ${
                      isSelected ? "text-[#1c1c1c] font-medium" : "text-[#555555]"
                    }`}
                  >
                    {col.name}{" "}
                    <span className="text-[#888888]">({col.count})</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </AccordionSection>

      {/* ================= 6. FEATURED PRODUCTS ACCORDION ================= */}
      <AccordionSection
        title="Feature Product"
        isOpen={openSections.featured}
        onToggle={() => toggleSection("featured")}
      >
        <div className="space-y-5 pt-2">
          {featuredProducts.map((p) => {
            const primaryImg = p.image || p.images?.[0]?.url || "";

            return (
              <div key={p.id} className="flex items-start gap-4 group">
                {/* Thumbnail */}
                <Link
                  to={p.url || `/collections/all/products/${p.handle}`}
                  className="w-20 h-22 sm:w-21 sm:h-24 bg-[#f7f7f7] shrink-0 overflow-hidden relative border border-[#eeeeee]"
                >
                  <img
                    src={primaryImg}
                    alt={p.name}
                    width={84}
                    height={96}
                    className="w-full h-full min-h-full object-cover object-center block group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-center pt-0.5">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-[#cccccc] mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= (p.rating || 0)
                            ? "fill-[#f59e0b] text-[#f59e0b]"
                            : "fill-[#e5e5e5] text-[#e5e5e5]"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Title */}
                  <Link
                    to={p.url || `/collections/all/products/${p.handle}`}
                    className="font-heading text-[16px] leading-snug text-[#1c1c1c] hover:text-brand-green transition-colors line-clamp-2"
                  >
                    {p.name}
                  </Link>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-1">
                    {p.comparePrice && p.comparePrice > p.price && (
                      <span className="text-[13px] text-[#999999] line-through font-sans">
                        {formatPrice(p.comparePrice)}
                      </span>
                    )}
                    <span className="text-[14px] font-normal text-[#1c1c1c] font-sans">
                      {formatPrice(p.price)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AccordionSection>

      {/* Cross-browser range input styles */}
      <style>{`
        input[type="range"].flacio-range-slider {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
        }
        input[type="range"].flacio-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: auto;
          width: 13px;
          height: 13px;
          background-color: #ffffff;
          border: 1.5px solid #1c1c1c;
          border-radius: 0px;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
          transition: transform 0.1s ease, border-color 0.15s ease;
          position: relative;
        }
        input[type="range"].flacio-range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          background-color: #f7f7f7;
          border-color: #000000;
        }
        input[type="range"].flacio-range-slider::-webkit-slider-thumb:active {
          transform: scale(1.2);
          background-color: #1c1c1c;
          border-color: #1c1c1c;
        }
        input[type="range"].flacio-range-slider::-moz-range-thumb {
          pointer-events: auto;
          width: 13px;
          height: 13px;
          background-color: #ffffff;
          border: 1.5px solid #1c1c1c;
          border-radius: 0px;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
          transition: transform 0.1s ease, border-color 0.15s ease;
        }
        input[type="range"].flacio-range-slider::-moz-range-thumb:hover {
          transform: scale(1.15);
          background-color: #f7f7f7;
          border-color: #000000;
        }
        input[type="range"].flacio-range-slider::-moz-range-thumb:active {
          transform: scale(1.2);
          background-color: #1c1c1c;
          border-color: #1c1c1c;
        }
      `}</style>
    </aside>
  );
});

/* ------------------------------------------------------------------ *
 * MOBILE & TABLET SLIDE-OVER DRAWER COMPONENT
 * ------------------------------------------------------------------ */
export function ProductMobileDrawer({
  isOpen,
  onClose,
  ...sidebarProps
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/45 backdrop-blur-[1px] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-75 sm:w-87.5 max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out transform lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Filter sidebar"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eeeeee]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-brand-dark" />
            <span className="font-heading text-lg font-normal text-brand-dark">
              Filters
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 -mr-1.5 text-brand-muted hover:text-brand-dark transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Sidebar Content */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <ProductSideBar idPrefix="mobile-filter" {...sidebarProps} />
        </div>

        {/* Sticky Drawer Footer */}
        <div className="p-4 border-t border-[#eeeeee] bg-gray-50 flex gap-3">
          {sidebarProps.onResetFilters && (
            <button
              type="button"
              onClick={sidebarProps.onResetFilters}
              className="flex-1 py-2.5 px-3 border border-brand-border bg-white text-xs font-medium text-brand-dark uppercase tracking-wider hover:bg-gray-100 transition-colors"
            >
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-3 bg-brand-dark hover:bg-brand-green text-white text-xs font-medium uppercase tracking-wider transition-colors shadow-xs"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * MOBILE FILTER TRIGGER BUTTON
 * For Tablet & Mobile viewports (< 1024px)
 * ------------------------------------------------------------------ */
export function ProductFilterTriggerButton({
  onClick,
  activeCount = 0,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 px-4 py-2 border border-[#d5d5d5] bg-white text-[#1c1c1c] text-xs font-medium uppercase tracking-wider hover:border-[#1c1c1c] transition-colors cursor-pointer ${className}`}
      aria-label="Open filter sidebar"
    >
      <SlidersHorizontal className="w-3.5 h-3.5" />
      <span>Filter</span>
      {activeCount > 0 && (
        <span className="w-4 h-4 rounded-full bg-brand-dark text-white text-[10px] font-bold flex items-center justify-center">
          {activeCount}
        </span>
      )}
    </button>
  );
}

export default ProductSideBar;

