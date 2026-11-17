import { memo } from "react";
import { Link } from "react-router-dom";
import bgBreadcrumbDefault from "../../assets/images/bg-breadcrumb.webp";

/**
 * Common Top Header for Pages (Breadcrumb / Banner Section)
 * Displays page title and optional breadcrumbs over the botanical background image.
 * Fully responsive for mobile, tablet, and desktop screens.
 *
 * @param {Object} props
 * @param {string} props.title - The title to display (e.g. "About Us")
 * @param {Array<{label: string, path?: string}>} [props.breadcrumbs] - Optional breadcrumb items
 * @param {Array<string | {id?: string|number, label: string, value?: string, path?: string, active?: boolean}>} [props.options=[]] - Optional category/filter options (hidden by default)
 * @param {string} [props.activeOption] - Current active option value or label
 * @param {(option: any) => void} [props.onOptionClick] - Callback when an option is selected
 * @param {string} [props.bgImage] - Optional custom background image URL
 * @param {string} [props.className] - Optional extra class names
 */
export const PageHeader = memo(function PageHeader({
  title = "About Us",
  breadcrumbs = null,
  options = [],
  activeOption = null,
  onOptionClick = null,
  bgImage = bgBreadcrumbDefault,
  className = "",
}) {
  return (
    <section
      className={`section-reveal-up relative w-full overflow-hidden bg-[#fafafa] bg-cover bg-no-repeat bg-left sm:bg-position-[18%_center] md:bg-center transition-all duration-300 ${className}`}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
      aria-label={title}
    >
      {/* Content wrapper with responsive padding and centering */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14 md:py-18 lg:py-22 min-h-42.5 sm:min-h-50 md:min-h-60 lg:min-h-67.5 flex flex-col items-center justify-center text-center">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-normal text-brand-dark leading-tight tracking-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
          {title}
        </h1>

        {/* Optional Breadcrumb Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mt-3 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-[13px] text-brand-muted tracking-wide"
          >
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                {crumb.path ? (
                  <Link
                    to={crumb.path}
                    className="hover:text-brand-green transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-brand-dark font-medium">{crumb.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && (
                  <span className="text-brand-muted/60 select-none">/</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Optional Category / Filter Options (Hidden by default, supports any count) */}
        {options && options.length > 0 && (
          <nav
            aria-label={`${title} categories`}
            className="mt-3.5 sm:mt-5 md:mt-6 flex items-center justify-center flex-wrap gap-x-4 sm:gap-x-7 md:gap-x-10 gap-y-2 sm:gap-y-2.5 max-w-full px-2"
          >
            {options.map((opt, idx) => {
              const label = typeof opt === "string" ? opt : opt.label;
              const value = typeof opt === "string" ? opt : opt.value || opt.id || opt.label;
              const path = typeof opt === "object" ? opt.path : null;

              const isOptActive =
                activeOption !== null && activeOption !== undefined
                  ? String(activeOption).toLowerCase() === String(value).toLowerCase() ||
                    String(activeOption).toLowerCase() === String(label).toLowerCase()
                  : typeof opt === "object" && opt.active !== undefined
                  ? Boolean(opt.active)
                  : idx === 0;

              const sharedClasses = `text-[13px] sm:text-[14px] md:text-[15px] font-sans pb-0.5 transition-colors duration-200 select-none cursor-pointer ${
                isOptActive
                  ? "text-brand-dark font-medium border-b border-brand-dark"
                  : "text-[#666666] hover:text-brand-dark border-b border-transparent"
              }`;

              if (path) {
                return (
                  <Link
                    key={value || idx}
                    to={path}
                    onClick={() => onOptionClick?.(opt)}
                    className={sharedClasses}
                  >
                    {label}
                  </Link>
                );
              }

              return (
                <button
                  key={value || idx}
                  type="button"
                  onClick={() => onOptionClick?.(opt)}
                  className={sharedClasses}
                >
                  {label}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </section>
  );
});

export default PageHeader;
