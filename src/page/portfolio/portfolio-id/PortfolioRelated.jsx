import { memo } from "react";
import { PortfolioCard } from "../../../components/ui/PortfolioCard";

export const PortfolioRelated = memo(function PortfolioRelated({ relatedItems = [] }) {
  if (!relatedItems || relatedItems.length === 0) return null;

  return (
    <section
      aria-label="Related portfolio projects"
      className="pt-14 sm:pt-18 md:pt-20 pb-16 sm:pb-24"
    >
      {/* ================= SECTION TITLE ================= */}
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-[34px] font-normal text-neutral-900 tracking-tight">
          Related Portfolio
        </h2>
      </div>

      {/* ================= 4-COLUMN RESPONSIVE GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
        {relatedItems.map((item) => (
          <div key={item.id} className="w-full">
            <PortfolioCard
              item={item}
              aspectRatio="aspect-square"
              align="left"
              link={`/portfolio-id/${item.slug}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
});

export default PortfolioRelated;

