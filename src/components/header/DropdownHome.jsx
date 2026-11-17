import { memo } from "react";
import { Link } from "react-router-dom";
import { NAVIGATION_DATA } from "../../data/navigationData";
import { preloadPage } from "../../util/preload";

export const DropdownHome = memo(function DropdownHome() {
  const homeData = NAVIGATION_DATA.home;

  return (
    <div className="w-65 bg-white border border-[#f0f0f0] shadow-xl py-4 px-5 animate-fadeIn transition-all duration-200">
      <ul className="space-y-2.5 text-[13px] text-brand-muted">
        {homeData.items.map((item, idx) => (
          <li key={idx}>
            <Link
              to={item.path}
              onMouseEnter={() => preloadPage(item.path)}
              className={`inline-block hover:text-brand-green hover:translate-x-1 transition-all duration-200 ${
                item.isDefault ? "text-[#000000] font-medium" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default DropdownHome;
