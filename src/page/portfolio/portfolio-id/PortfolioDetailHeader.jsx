import { memo } from "react";
import { Link } from "react-router-dom";

export const PortfolioDetailHeader = memo(function PortfolioDetailHeader({ item }) {
  if (!item) return null;

  return (
    <div className="w-full">
      {/* ================= BREADCRUMBS ================= */}
      <nav
        aria-label="Breadcrumbs"
        className="flex items-center text-xs sm:text-[13px] font-sans text-neutral-500 py-3.5 sm:py-5 overflow-hidden"
      >
        <Link to="/" className="hover:text-black transition-colors shrink-0">
          Home
        </Link>
        <span className="mx-1.5 sm:mx-2 text-neutral-400 shrink-0">/</span>

        <Link
          to="/portfolio"
          className="underline underline-offset-4 decoration-neutral-400 hover:decoration-black hover:text-black transition-colors shrink-0"
        >
          Portfolio
        </Link>
        <span className="mx-1.5 sm:mx-2 text-neutral-400 shrink-0">/</span>

        <span className="text-neutral-900 font-medium truncate select-none">
          {item.title}
        </span>
      </nav>

      {/* ================= HERO SHOWCASE IMAGE CONTAINER ================= */}
      <div className="w-full bg-[#f4efe9] p-3 sm:p-6 md:p-10 lg:p-14 mb-6 sm:mb-10 overflow-hidden flex items-center justify-center">
        <div className="w-full max-w-5xl overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-xs bg-white">
          <img
            src={item.image}
            alt={item.alt || item.title}
            width={1440}
            height={900}
            className="w-full h-auto object-cover object-center block"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* ================= PROJECT INFO & METADATA ROW ================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 md:gap-8 pb-5 sm:pb-7 items-start">
        {/* Left: Category Subline & Large Title */}
        <div className="md:col-span-8 lg:col-span-9 space-y-1 sm:space-y-1.5">
          {item.formattedTags && (
            <p className="text-[10px] sm:text-xs font-sans font-medium uppercase tracking-[0.16em] text-neutral-400">
              {item.formattedTags}
            </p>
          )}
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal text-neutral-900 tracking-tight leading-tight">
            {item.title}
          </h1>
        </div>

        {/* Right: Client & Year Meta (Border top on mobile, border left on md/lg) */}
        <div className="md:col-span-4 lg:col-span-3 border-t border-neutral-100 pt-3 md:border-t-0 md:pt-1 md:border-l md:border-neutral-200 md:pl-6 lg:pl-8 space-y-1 text-xs sm:text-sm text-neutral-600 font-sans">
          <p>
            <span className="text-neutral-700 font-medium">Client :</span>{" "}
            {item.client || "Tung Hoang"}
          </p>
          <p>
            <span className="text-neutral-700 font-medium">Year :</span>{" "}
            {item.year || 2024}
          </p>
        </div>
      </div>

      {/* ================= PROJECT BODY TEXT PARAGRAPHS ================= */}
      <div className="space-y-4 text-xs sm:text-[13.5px] leading-relaxed text-neutral-500 font-sans pb-4">
        {Array.isArray(item.body) ? (
          item.body.map((para, i) => <p key={i}>{para}</p>)
        ) : (
          <p>{item.body}</p>
        )}
      </div>
    </div>
  );
});

export default PortfolioDetailHeader;

