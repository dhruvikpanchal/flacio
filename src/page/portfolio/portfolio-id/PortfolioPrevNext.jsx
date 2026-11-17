import { memo } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";

export const PortfolioPrevNext = memo(function PortfolioPrevNext({ prev, next }) {
  return (
    <nav
      aria-label="Previous and Next portfolio navigation"
      className="py-6 sm:py-8 border-y border-neutral-200 my-6 sm:my-10"
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Previous item */}
        <div className="min-w-0 flex-1">
          {prev ? (
            <Link
              to={`/portfolio-id/${prev.slug}`}
              className="group block text-left transition-colors"
            >
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-sans font-medium mb-0.5 sm:mb-1">
                PREVIOUS
              </span>
              <span className="font-heading text-xs sm:text-base md:text-lg text-neutral-900 group-hover:text-brand-green font-normal transition-colors line-clamp-1">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div className="invisible" aria-hidden="true" />
          )}
        </div>

        {/* Center: Grid icon linking back to /portfolio */}
        <div className="shrink-0 px-1 sm:px-4">
          <Link
            to="/portfolio"
            aria-label="Back to all portfolio projects"
            title="All projects"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-black hover:text-black transition-all hover:scale-105 active:scale-95"
          >
            <MoreHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>

        {/* Right: Next item */}
        <div className="min-w-0 flex-1 text-right">
          {next ? (
            <Link
              to={`/portfolio-id/${next.slug}`}
              className="group block text-right transition-colors"
            >
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-sans font-medium mb-0.5 sm:mb-1">
                NEXT
              </span>
              <span className="font-heading text-xs sm:text-base md:text-lg text-neutral-900 group-hover:text-brand-green font-normal transition-colors line-clamp-1">
                {next.title}
              </span>
            </Link>
          ) : (
            <div className="invisible" aria-hidden="true" />
          )}
        </div>
      </div>
    </nav>
  );
});

export default PortfolioPrevNext;

