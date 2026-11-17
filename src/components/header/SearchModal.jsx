import { useEffect, useRef, useState, useCallback, memo } from "react";
import { CloseIcon, SearchIcon } from "../common/Icons";

const POPULAR_SEARCHES = [
  "Monstera Deliciosa",
  "Snake Plant Laurentii",
  "Fiddle Leaf Fig",
  "Golden Pothos",
  "Ceramic Cylinder Pot",
  "Organic Plant Food",
];

const SAMPLE_PRODUCTS = [
  { name: "Monstera Deliciosa", category: "Indoor Plants", price: "$45.00" },
  { name: "Fiddle Leaf Fig Tree", category: "Large Plants", price: "$79.00" },
  { name: "Snake Plant Laurentii", category: "Low Light Plants", price: "$32.00" },
  { name: "Golden Pothos in Hanging Pot", category: "Trailing Plants", price: "$28.00" },
  { name: "Glazed Ceramic Planter (White)", category: "Planters & Pots", price: "$24.00" },
  { name: "Cast Iron Plant", category: "Indoor Plants", price: "$38.00" },
];

export const SearchModal = memo(function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? SAMPLE_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/50 backdrop-blur-[2px] animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white p-5 sm:p-8 md:p-12 shadow-2xl transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close search"
          className="absolute top-6 right-6 text-brand-dark hover:text-brand-green transition-colors p-1"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        <h2 id="search-modal-title" className="sr-only">Search Products</h2>

        {/* Search Input Box */}
        <div className="relative mt-2">
          <label htmlFor="header-search-input" className="sr-only">
            Search products
          </label>
          <div className="relative flex items-center border border-brand-border focus-within:border-brand-green transition-colors">
            <span className="pl-4 pr-2 text-brand-muted">
              <SearchIcon className="w-5 h-5" />
            </span>
            <input
              ref={inputRef}
              id="header-search-input"
              name="search"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search products"
              className="w-full py-3.5 pr-4 text-[15px] text-brand-dark placeholder-brand-muted bg-transparent outline-none font-sans"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="pr-4 text-xs uppercase tracking-wider text-brand-muted hover:text-brand-green cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results or Suggestions */}
        <div className="mt-6">
          {query.trim() ? (
            <div>
              <div className="text-[12px] uppercase font-semibold text-brand-muted tracking-wider mb-3">
                {filtered.length} {filtered.length === 1 ? "Result" : "Results"} Found
              </div>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-75 overflow-y-auto flacio-scrollbar pr-2">
                  {filtered.map((item, idx) => (
                    <a
                      key={idx}
                      href={`/search?q=${encodeURIComponent(item.name)}`}
                      className="flex items-center justify-between p-3 border border-[#f0f0f0] hover:border-brand-green hover:bg-[#fafafa] transition-all"
                    >
                      <div>
                        <div className="text-sm font-medium text-brand-dark">{item.name}</div>
                        <div className="text-xs text-brand-muted">{item.category}</div>
                      </div>
                      <div className="text-sm font-semibold text-brand-green">{item.price}</div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-brand-muted py-4">No matching products found. Try a different query.</p>
              )}
            </div>
          ) : (
            <div>
              <div className="text-[11px] uppercase tracking-widest text-brand-muted mb-3 font-medium">
                Popular Searches:
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(term)}
                    className="text-xs bg-[#f6f6f6] hover:bg-brand-green hover:text-white text-brand-dark px-3 py-1.5 transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default SearchModal;
