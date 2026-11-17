import { memo } from "react";
import { Link } from "react-router-dom";
import { preloadPage } from "../../util/preload";

/**
 * NotFound Component (404 Page)
 *
 * Requirements:
 * 1. Matches reference image:
 *    - Giant serif "404" display
 *    - Heading: "Oops! That page can't be found."
 *    - Subtle centered horizontal divider line
 *    - Explanatory message: "We're really sorry but we can't seem to find the page you were looking for."
 *    - Dark call-to-action button: "BACK THE HOMEPAGE →" linking back to home
 * 2. Fully responsive for mobile, tablet, and desktop screens.
 */
export const NotFound = memo(function NotFound() {
  return (
    <div
      aria-label="404 Page Not Found"
      className="section-reveal-scale w-full bg-white flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 min-h-[60vh] md:min-h-[70vh] text-center"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Giant Serif 404 */}
        <h1 className="font-heading font-normal text-brand-dark text-[90px] sm:text-[140px] md:text-[180px] lg:text-[220px] xl:text-[240px] leading-none tracking-tight select-none">
          404
        </h1>

        {/* Heading */}
        <h2 className="font-heading font-normal text-brand-dark text-xl sm:text-2xl md:text-3xl lg:text-[38px] xl:text-[40px] leading-tight tracking-tight mt-3 sm:mt-5 md:mt-6">
          Oops! That page can&apos;t be found.
        </h2>

        {/* Subtle Divider Line */}
        <div
          className="w-16 sm:w-20 md:w-24 h-px bg-[#d5d5d5] my-5 sm:my-6 md:my-7"
          aria-hidden="true"
        />

        {/* Subtitle / Descriptive Text */}
        <p className="font-sans font-normal text-brand-muted text-xs sm:text-[13.5px] md:text-sm lg:text-[15px] leading-relaxed max-w-sm sm:max-w-md mx-auto">
          We&apos;re really sorry but we can&apos;t seem to find the page you were looking for.
        </p>

        {/* Action Button: BACK THE HOMEPAGE */}
        <Link
          to="/"
          onMouseEnter={() => preloadPage("/")}
          className="btn-back-homepage group mt-6 sm:mt-7 md:mt-8 lg:mt-9 inline-flex items-center justify-center gap-2.5 font-sans text-xs sm:text-[12.5px] font-semibold tracking-[0.18em] uppercase px-7 sm:px-9 py-3.5 sm:py-4 cursor-pointer select-none"
        >
          <span>BACK THE HOMEPAGE</span>
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>

        {/* Scoped Button Styles to Guarantee Exact Hover Effect */}
        <style>{`
          .btn-back-homepage {
            background-color: #282828;
            color: #ffffff;
            border: 1px solid #282828;
            transition: all 0.25s ease;
          }
          .btn-back-homepage:hover {
            background-color: #ffffff !important;
            color: #282828 !important;
            border-color: #282828 !important;
          }
          .btn-back-homepage:hover svg {
            color: #282828 !important;
            stroke: #282828 !important;
          }
        `}</style>
      </div>
    </div>
  );
});

export const Page404 = NotFound;
export default NotFound;
