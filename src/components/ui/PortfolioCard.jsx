import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";
import { preloadPage } from "../../util/preload";

/**
 * Reusable link helper declared outside render to satisfy React 19 static components rule
 */
function CardLink({ href, isExternal, className, children }) {
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      to={href}
      onMouseEnter={() => preloadPage(href)}
      className={className}
    >
      {children}
    </Link>
  );
}

/**
 * PortfolioCard Component
 *
 * Renders a responsive portfolio card with:
 * - Smooth image zoom effect on card hover (group-hover:scale-108)
 * - Centered serif title with color transition on hover
 * - Category / tag subline formatted in uppercase with wide letter-spacing
 * - Fully responsive across mobile, tablet, and desktop
 *
 * @param {Object} props
 * @param {Object} [props.item] - Full portfolio item object (from portfolio.js)
 * @param {string} [props.image] - Fallback image source
 * @param {string} [props.title] - Fallback card title
 * @param {Array|string} [props.tags] - Array of tag objects/strings or formatted string
 * @param {string} [props.link] - Navigation destination
 * @param {string} [props.alt] - Alt text for image
 * @param {string} [props.className] - Extra wrapper classes
 * @param {string} [props.aspectRatio] - Custom aspect ratio class (default aspect-4/3.5)
 */
export const PortfolioCard = memo(function PortfolioCard({
  item,
  image,
  title,
  tags,
  link,
  alt,
  className = "",
  aspectRatio = "aspect-4/3.5",
  align = "center",
}) {
  // Resolve props from item object if provided, falling back to individual props
  const cardImage = item?.image || image;
  const cardTitle = item?.title || title || "Untitled Project";
  const cardAlt = item?.alt || alt || cardTitle;
  const rawTags = item?.tags || tags || [];
  const cardLink =
    link ||
    item?.internalUrl ||
    (item?.slug ? `/portfolio-id/${item.slug}` : item?.link || "/portfolio");
  const [imageLoaded, setImageLoaded] = useState(false);

  // Format tags into "BABY NEEDS, COSMETIC, NEW" comma-separated uppercase string
  const formattedTags =
    item?.formattedTags ||
    (Array.isArray(rawTags)
      ? rawTags
          .map((tag) => (typeof tag === "object" ? tag.label || tag.name : tag))
          .filter(Boolean)
          .join(", ")
      : typeof rawTags === "string"
      ? rawTags
      : "");

  // Check if link is an internal React Router link or external URL
  const isExternal =
    typeof cardLink === "string" &&
    (cardLink.startsWith("http://") ||
      cardLink.startsWith("https://") ||
      cardLink.startsWith("//"));

  const isLeft = align === "left";

  return (
    <article
      className={`group flex flex-col w-full select-none ${
        isLeft ? "text-left" : "text-center"
      } ${className}`}
    >
      {/* ================= 1. IMAGE CONTAINER WITH ZOOM HOVER ================= */}
      <div
        className={`relative w-full ${aspectRatio} overflow-hidden bg-[#f4f4f4] cursor-pointer`}
      >
        <CardLink href={cardLink} isExternal={isExternal} className="block w-full h-full relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f4f4f4] z-10">
              <Loader size="sm" animation="ring" color="muted" />
            </div>
          )}
          {cardImage && (
            <img
              src={cardImage}
              alt={cardAlt}
              width={400}
              height={350}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 will-change-transform ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          {/* Subtle soft gradient scrim on hover */}
          <div
            className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            aria-hidden="true"
          />
        </CardLink>
      </div>

      {/* ================= 2. TITLE & TAGS ================= */}
      <div
        className={`pt-3.5 sm:pt-4 pb-1 flex flex-col ${
          isLeft ? "items-start text-left" : "items-center text-center justify-center"
        }`}
      >
        {/* Title in stylish serif */}
        <h3 className="font-heading text-base sm:text-lg md:text-xl font-normal text-brand-dark transition-colors duration-300 group-hover:text-brand-green leading-snug tracking-tight">
          <CardLink
            href={cardLink}
            isExternal={isExternal}
            className="hover:underline-offset-4"
          >
            {cardTitle}
          </CardLink>
        </h3>

        {/* Categories / Tags subline */}
        {formattedTags && (
          <p className="mt-1 text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.14em] text-neutral-400 uppercase">
            {formattedTags}
          </p>
        )}
      </div>
    </article>
  );
});

export default PortfolioCard;
