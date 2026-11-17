import { memo } from "react";
import { Link } from "react-router-dom";
import { NAVIGATION_DATA } from "../../data/navigationData";
import { preloadPage } from "../../util/preload";

export const MegaMenuBlog = memo(function MegaMenuBlog() {
  const blogData = NAVIGATION_DATA.blog;

  return (
    <div className="w-180 max-w-[95vw] bg-white border border-[#f0f0f0] shadow-2xl p-7 animate-fadeIn transition-all duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Links */}
        <div>
          <h4 className="font-heading text-[17px] font-normal text-[#000000] pb-2 mb-3 border-b border-brand-border">
            {blogData.columns[0].title}
          </h4>
          <ul className="space-y-2 text-[13px] text-brand-muted">
            {blogData.columns[0].items.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.path}
                  onMouseEnter={() => preloadPage(item.path)}
                  className="inline-block hover:text-brand-green hover:translate-x-1 transition-all duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: 2 Visual Blog Cards */}
        <div className="flex flex-col gap-4">
          {blogData.posts.map((post, idx) => (
            <Link
              key={idx}
              to={post.path}
              onMouseEnter={() => preloadPage(post.path)}
              className="group relative block overflow-hidden rounded-none h-35 bg-neutral-900 shadow-sm"
            >
              <img
                src={post.image}
                alt={post.title}
                width={320}
                height={140}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="relative z-10 p-5 h-full flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-semibold tracking-widest text-white/90 mb-1">
                  {post.category}
                </span>
                <h5 className="font-heading text-[15px] font-normal leading-snug text-white group-hover:text-white/90">
                  {post.title}
                </h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});

export default MegaMenuBlog;
