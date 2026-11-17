import { memo } from "react";
import { Link } from "react-router-dom";
import { preloadPage } from "../../util/preload";

/**
 * PageHeaderTitle Component
 * A clean, reusable, left-aligned header title banner with breadcrumbs and bottom border.
 * Designed for pages like FAQs, Portfolio, and Policy documents.
 *
 * @param {Object} props
 * @param {string} props.title - The main heading title (e.g. "Faqs")
 * @param {Array<{label: string, path?: string}>} [props.breadcrumbs] - Breadcrumb navigation items
 * @param {"left" | "center"} [props.align="left"] - Text alignment
 * @param {boolean} [props.showBorder=true] - Whether to show the bottom divider line
 * @param {string} [props.className] - Additional class names
 */
export const PageHeaderTitle = memo(function PageHeaderTitle({
  title = "Faqs",
  breadcrumbs = [
    { label: "Home", path: "/" },
    { label: title },
  ],
  align = "left",
  showBorder = true,
  className = "",
}) {
  const isCenter = align === "center";

  return (
    <section
      aria-label={title}
      className={`section-reveal-up w-full bg-white pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-6 sm:pb-8 ${
        showBorder ? "border-b border-brand-border" : ""
      } ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${
          isCenter ? "items-center text-center" : "items-start text-left"
        }`}
      >
        {/* Main Title */}
        <h1 className="font-heading font-normal text-brand-dark text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] leading-tight tracking-tight mb-2 sm:mb-2.5">
          {title}
        </h1>

        {/* Breadcrumb Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-brand-dark"
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <span key={idx} className="inline-flex items-center gap-1.5 sm:gap-2">
                  {crumb.path && !isLast ? (
                    <Link
                      to={crumb.path}
                      onMouseEnter={() => preloadPage(crumb.path)}
                      className="underline underline-offset-4 decoration-current text-brand-dark hover:text-brand-green transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-brand-dark font-normal">
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && (
                    <span className="text-[#888888] select-none text-xs" aria-hidden="true">
                      /
                    </span>
                  )}
                </span>
              );
            })}
          </nav>
        )}
      </div>
    </section>
  );
});

export default PageHeaderTitle;
