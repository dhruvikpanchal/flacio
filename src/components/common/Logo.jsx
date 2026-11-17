import { Link } from "react-router-dom";
import { preloadPage } from "../../util/preload";

export function Logo({ isWhite = false, className = "h-8 w-auto" }) {
  return (
    <Link
      to="/"
      onMouseEnter={() => preloadPage("/")}
      className="inline-flex items-center justify-center transition-opacity hover:opacity-85"
      aria-label="Flacio Home"
    >
      <img
        src={isWhite ? "/images/logo-white.png" : "/images/logo.png"}
        alt="Flacio"
        width={100}
        height={32}
        className={`${className} object-contain transition-all duration-300`}
        onError={(e) => {
          // Fallback to text styling if image fails
          e.currentTarget.style.display = "none";
          if (e.currentTarget.nextElementSibling) {
            e.currentTarget.nextElementSibling.style.display = "block";
          }
        }}
      />
      <span
        style={{ display: "none" }}
        className={`font-heading text-2xl md:text-3xl font-normal tracking-tight select-none ${
          isWhite ? "text-white" : "text-[#000000]"
        }`}
      >
        flacio
      </span>
    </Link>
  );
}

export default Logo;
