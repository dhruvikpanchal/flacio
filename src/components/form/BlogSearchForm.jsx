import { memo, useState } from "react";
import { Search } from "lucide-react";

/**
 * BlogSearchForm
 * Reusable search form component for blog sidebars and blog headers.
 * Resolves Chrome accessibility warnings by providing explicit labels, autocomplete, and proper form semantics.
 */
export const BlogSearchForm = memo(function BlogSearchForm({
  onSearch,
  initialQuery = "",
  placeholder = "Search blog...",
  id = "blog-search-input",
  className = "",
}) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <div className="flex items-center justify-between border border-brand-border bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 transition-colors duration-200 focus-within:border-brand-dark">
        <input
          id={id}
          name="search"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full text-sm font-sans text-brand-dark placeholder:text-[#999999] bg-transparent outline-none pr-3"
        />
        <button
          type="submit"
          aria-label="Submit search"
          className="text-brand-dark hover:text-brand-green transition-colors p-0.5 cursor-pointer shrink-0"
        >
          <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>
      </div>
    </form>
  );
});

export default BlogSearchForm;

