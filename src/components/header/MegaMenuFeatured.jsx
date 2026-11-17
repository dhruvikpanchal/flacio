import { memo } from "react";
import { Link } from "react-router-dom";
import { NAVIGATION_DATA } from "../../data/navigationData";
import { MenuBadge } from "../common/Badge";
import { preloadPage } from "../../util/preload";

export const MegaMenuFeatured = memo(function MegaMenuFeatured() {
  const featuredData = NAVIGATION_DATA.featured;

  return (
    <div className="w-full bg-white border-t border-[#f0f0f0] shadow-xl py-8 px-6 lg:px-12 animate-fadeIn transition-all duration-200">
      <div className="max-w-2xl mx-auto grid grid-cols-2 gap-8 lg:gap-16">
        {featuredData.columns.map((column, colIdx) => (
          <div key={colIdx} className="flex flex-col">
            <h4 className="font-heading text-[17px] font-normal text-[#000000] pb-2 mb-3 border-b border-brand-border inline-block">
              {column.title}
            </h4>
            <ul className="space-y-2 text-[13px] text-brand-muted">
              {column.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link
                    to={item.path}
                    onMouseEnter={() => preloadPage(item.path)}
                    className="group inline-flex items-center gap-2 hover:text-brand-green hover:translate-x-1 transition-all duration-200"
                  >
                    <span>{item.label}</span>
                    {item.badge && <MenuBadge type={item.badgeColor} label={item.badge} />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
});

export default MegaMenuFeatured;
