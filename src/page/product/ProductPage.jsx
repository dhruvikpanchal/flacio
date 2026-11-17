import { memo, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import { PageHeaderTitle } from "../../components/common/PageHeaderTitle";
import {
  ProductSideBar,
  ProductMobileDrawer,
  ProductFilterTriggerButton,
} from "./ProductSideBar";
import { ProductPromoBanners } from "./ProductPromoBanners";
import { ProductGrid } from "../../components/ui/ProductCard";
import {
  PRODUCTS,
  COLLECTIONS,
  SORT_OPTIONS,
  getCollectionProducts,
  imageUrl,
} from "../../data/products";
import { useProductsQuery } from "../../hooks/useProductsQuery";
import { addToCart } from "../../redux/features/cartSlice";
import { toggleWishlist } from "../../redux/features/wishlistSlice";
import {
  ListViewIcon,
  TwoColsIcon,
  ThreeColsIcon,
  FourColsIcon,
} from "./ProductCardLayoutHelper";

const BREADCRUMBS = [{ label: "Home", path: "/" }, { label: "Products" }];

export const ProductPage = memo(function ProductPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active collection from URL or local state
  const initialCollection = searchParams.get("collection") || "all";
  const [selectedCollection, setSelectedCollection] =
    useState(initialCollection);

  // Filters state
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 153]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState("title-ascending");
  const [layoutMode, setLayoutMode] = useState("grid-2");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Changing collection recalculates dynamic options fast
  const handleSelectCollection = useCallback(
    (colHandle) => {
      setSelectedCollection(colHandle);
      if (colHandle && colHandle !== "all") {
        setSearchParams({ collection: colHandle }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    },
    [setSearchParams],
  );

  // Toggle availability filter
  const handleToggleAvailability = useCallback((val) => {
    setSelectedAvailability((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  }, []);

  // Toggle size filter
  const handleToggleSize = useCallback((size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  }, []);

  // Toggle color filter
  const handleToggleColor = useCallback((color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  }, []);

  // Reset all filters
  const handleResetFilters = useCallback(() => {
    setSelectedCollection("all");
    setSelectedAvailability([]);
    setPriceRange([0, 153]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // Count active filters (for badge)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCollection !== "all") count += 1;
    if (selectedAvailability.length > 0) count += selectedAvailability.length;
    if (priceRange[0] > 0 || priceRange[1] < 153) count += 1;
    if (selectedSizes.length > 0) count += selectedSizes.length;
    if (selectedColors.length > 0) count += selectedColors.length;
    return count;
  }, [
    selectedCollection,
    selectedAvailability,
    priceRange,
    selectedSizes,
    selectedColors,
  ]);

  // Compute in-stock option from active filter checkboxes
  const inStockOpt = useMemo(() => {
    if (
      selectedAvailability.includes("in-stock") &&
      !selectedAvailability.includes("out-of-stock")
    ) {
      return true;
    }
    if (
      selectedAvailability.includes("out-of-stock") &&
      !selectedAvailability.includes("in-stock")
    ) {
      return false;
    }
    return undefined;
  }, [selectedAvailability]);

  /**
   * Flow: mock/images -> mock/data -> mock/api -> services -> useProductsQuery -> ProductPage
   * TanStack Query hook handles caching, loading states, and backend latency.
   *
   * Note: You can also use useProductsEffect(...) or fetchProducts(...) directly:
   * const { products, loading, error } = useProductsEffect({ collection: selectedCollection, ... });
   */
  const {
    data: fetchedProducts = [],
    isLoading,
    isError,
    error,
  } = useProductsQuery({
    collection: selectedCollection,
    sortBy,
    inStock: inStockOpt,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    sizes: selectedSizes,
    colors: selectedColors,
  });

  // Adapt for ProductCard component (ensure images have .src)
  const filteredProducts = useMemo(() => {
    return (fetchedProducts || []).map((p) => ({
      ...p,
      images: (p.imageUrls || []).map((url) => ({
        src: url,
        file: p.images?.[0]?.file,
        v: p.images?.[0]?.v,
      })),
    }));
  }, [fetchedProducts]);

  // Active collection object
  const activeCollectionObj = useMemo(() => {
    if (selectedCollection === "all") return null;
    return COLLECTIONS.find((c) => c.handle === selectedCollection);
  }, [selectedCollection]);

  // Current Sort label for the dropdown button
  const currentSortLabel = useMemo(() => {
    return (
      SORT_OPTIONS.find((o) => o.value === sortBy)?.label ||
      "Alphabetically, A-Z"
    );
  }, [sortBy]);

  // Total base count of collection for viewed text
  const totalBaseCount = useMemo(() => {
    if (selectedCollection === "all") return PRODUCTS.length;
    return getCollectionProducts(selectedCollection).length;
  }, [selectedCollection]);

  // Convert layoutMode to cols for ProductGrid
  const gridColsProp = useMemo(() => {
    if (layoutMode === "list") return "list";
    if (layoutMode === "grid-2") return 2;
    if (layoutMode === "grid-3") return 3;
    if (layoutMode === "grid-4") return 4;
    return 3;
  }, [layoutMode]);

  // Handle Redux Add to Cart
  const handleAddToCart = useCallback(
    (product, qty, selectedColor) => {
      dispatch(
        addToCart({
          id: product.id || product.handle,
          title: product.title,
          price: product.price,
          image:
            product.image ||
            (product.images?.[0] ? imageUrl(product.images[0]) : ""),
          color: selectedColor,
          quantity: qty || 1,
        }),
      );
    },
    [dispatch],
  );

  // Handle Redux Wishlist
  const handleWishlist = useCallback(
    (product) => {
      dispatch(
        toggleWishlist({
          id: product.id || product.handle,
          handle: product.handle,
          title: product.title,
          price: product.price,
          comparePrice: product.comparePrice,
          image:
            product.image ||
            product.images?.[0]?.src ||
            (product.images?.[0] ? imageUrl(product.images[0]) : "") ||
            "",
          inStock: product.inStock !== false,
        }),
      );
    },
    [dispatch],
  );

  return (
    <div className="w-full bg-white min-h-screen">
      {/* ================= PAGE HEADER & BREADCRUMBS ================= */}
      <PageHeaderTitle
        title={activeCollectionObj ? activeCollectionObj.title : "Products"}
        breadcrumbs={BREADCRUMBS}
      />

      {/* ================= SECTION 2: PROMO BANNERS ================= */}
      <ProductPromoBanners />

      {/* ================= MAIN CONTAINER ================= */}
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ================= TOOLBAR ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[#eeeeee]">
          {/* Left: Mobile Filter Button & Viewed text */}
          <div className="flex items-center gap-3.5">
            <div className="lg:hidden">
              <ProductFilterTriggerButton
                onClick={() => setIsMobileDrawerOpen(true)}
                activeCount={activeFiltersCount}
              />
            </div>

            <p className="text-[13.5px] sm:text-[14px] text-[#767676] font-sans font-normal select-none">
              You've viewed {filteredProducts.length} of {totalBaseCount}{" "}
              products
            </p>
          </div>

          {/* Right: Layout Switcher & Sort By Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-3.5">
            {/* Desktop Layout Switcher */}
            <div
              className="hidden lg:flex items-center gap-3.5 h-9.5 px-3 bg-white border border-[#e5e5e5] rounded-none"
              role="group"
              aria-label="Desktop card layout options"
            >
              <button
                type="button"
                onClick={() => setLayoutMode("list")}
                aria-label="List view"
                title="List view"
                className="p-1 cursor-pointer transition-transform hover:scale-105"
              >
                <ListViewIcon active={layoutMode === "list"} />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("grid-2")}
                aria-label="2 columns grid"
                title="2 columns"
                className="p-1 cursor-pointer transition-transform hover:scale-105"
              >
                <TwoColsIcon active={layoutMode === "grid-2"} />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("grid-3")}
                aria-label="3 columns grid"
                title="3 columns"
                className="p-1 cursor-pointer transition-transform hover:scale-105"
              >
                <ThreeColsIcon active={layoutMode === "grid-3"} />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("grid-4")}
                aria-label="4 columns grid"
                title="4 columns"
                className="p-1 cursor-pointer transition-transform hover:scale-105"
              >
                <FourColsIcon active={layoutMode === "grid-4"} />
              </button>
            </div>

            {/* Sort Dropdown Box */}
            <div className="relative inline-flex items-center justify-between h-9.5 px-3.5 min-w-47.5 sm:min-w-52.5 bg-white border border-[#e5e5e5] rounded-none cursor-pointer group hover:border-[#1c1c1c] transition-colors">
              <span className="text-[13px] text-[#222222] font-normal truncate mr-2">
                {currentSortLabel}
              </span>
              <span className="text-[8.5px] text-[#222222] shrink-0 pointer-events-none transition-transform group-hover:translate-y-0.5">
                ▼
              </span>
              <label htmlFor="product-sort-select" className="sr-only">
                Sort products
              </label>
              <select
                id="product-sort-select"
                name="sortBy"
                autoComplete="off"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ================= ACTIVE FILTER CHIPS ================= */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 pb-2">
            <span className="text-xs text-brand-muted mr-1">Active:</span>

            {/* Collection Chip */}
            {selectedCollection !== "all" && activeCollectionObj && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-brand-dark px-2.5 py-1 rounded-xs">
                {activeCollectionObj.title}
                <button
                  type="button"
                  onClick={() => handleSelectCollection("all")}
                  className="hover:text-red-500 cursor-pointer"
                  aria-label="Remove collection filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Availability Chips */}
            {selectedAvailability.map((val) => (
              <span
                key={val}
                className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-brand-dark px-2.5 py-1 rounded-xs"
              >
                {val === "in-stock" ? "In stock" : "Out of stock"}
                <button
                  type="button"
                  onClick={() => handleToggleAvailability(val)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Price Chip */}
            {(priceRange[0] > 0 || priceRange[1] < 153) && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-brand-dark px-2.5 py-1 rounded-xs">
                ${priceRange[0]} — ${priceRange[1]}
                <button
                  type="button"
                  onClick={() => setPriceRange([0, 153])}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Sizes Chips */}
            {selectedSizes.map((size) => (
              <span
                key={size}
                className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-brand-dark px-2.5 py-1 rounded-xs"
              >
                {size}
                <button
                  type="button"
                  onClick={() => handleToggleSize(size)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Colors Chips */}
            {selectedColors.map((color) => (
              <span
                key={color}
                className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-brand-dark px-2.5 py-1 rounded-xs"
              >
                {color}
                <button
                  type="button"
                  onClick={() => handleToggleColor(color)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Clear All Button */}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-brand-green hover:underline cursor-pointer ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* ================= BODY: SIDEBAR + PRODUCT GRID ================= */}
        <div className="flex items-start gap-8 lg:gap-12">
          {/* Desktop Sidebar (>= 1024px) */}
          <div className="w-67.5 shrink-0 hidden lg:block sticky top-28 self-start">
            <div className="section-reveal-slide-left w-full">
              <ProductSideBar
                selectedCollection={selectedCollection}
                onSelectCollection={handleSelectCollection}
                selectedAvailability={selectedAvailability}
                onToggleAvailability={handleToggleAvailability}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedSizes={selectedSizes}
                onToggleSize={handleToggleSize}
                selectedColors={selectedColors}
                onToggleColor={handleToggleColor}
                onResetFilters={handleResetFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
          </div>

          {/* Product Grid Area */}
          <main className="section-reveal-scale reveal-delay-100 flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#f8f8f8] border border-[#eeeeee] rounded-xs h-90 flex flex-col justify-end p-4 space-y-2"
                  >
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-20 px-4 bg-red-50/60 border border-red-200 rounded-xs">
                <p className="font-heading text-lg text-red-700 mb-2">
                  Failed to load products
                </p>
                <p className="text-sm text-red-600 mb-6">{error?.message}</p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-block bg-brand-dark hover:bg-brand-green text-white text-xs uppercase tracking-wider py-2.5 px-6 transition-colors shadow-xs"
                >
                  Reset Filters
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 px-4 bg-gray-50 border border-[#eeeeee] rounded-xs">
                <p className="font-heading text-lg text-brand-dark mb-2">
                  No products matched your selection.
                </p>
                <p className="text-sm text-brand-muted mb-6">
                  Try adjusting or clearing your filters to discover more items.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-block bg-brand-dark hover:bg-brand-green text-white text-xs uppercase tracking-wider py-2.5 px-6 transition-colors shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <ProductGrid
                products={filteredProducts}
                cols={gridColsProp}
                collection={selectedCollection}
                onAddToCart={handleAddToCart}
                onWishlist={handleWishlist}
              />
            )}
          </main>
        </div>
      </div>

      {/* ================= MOBILE / TABLET OFF-CANVAS DRAWER ================= */}
      <ProductMobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        selectedCollection={selectedCollection}
        onSelectCollection={handleSelectCollection}
        selectedAvailability={selectedAvailability}
        onToggleAvailability={handleToggleAvailability}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        selectedSizes={selectedSizes}
        onToggleSize={handleToggleSize}
        selectedColors={selectedColors}
        onToggleColor={handleToggleColor}
        onResetFilters={handleResetFilters}
        activeFiltersCount={activeFiltersCount}
      />
    </div>
  );
});

export default ProductPage;

