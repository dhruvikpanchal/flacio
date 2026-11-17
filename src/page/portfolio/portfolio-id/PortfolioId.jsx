import { memo, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPortfolioDetail, portfolioItems } from "../../../data/portfolio";
import { PortfolioDetailHeader } from "./PortfolioDetailHeader";
import { PortfolioProductStrip } from "./PortfolioProductStrip";
import { PortfolioPrevNext } from "./PortfolioPrevNext";
import { PortfolioComments } from "./PortfolioComments";
import { PortfolioRelated } from "./PortfolioRelated";

export const PortfolioId = memo(function PortfolioId() {
  const { slug: routeSlug, handle } = useParams();

  // If no slug is specified in URL, default to 'redesgin-concept' (matching the screenshot) or first item
  const activeSlug = useMemo(() => {
    return routeSlug || handle || "redesgin-concept";
  }, [routeSlug, handle]);

  // Load complete portfolio detail bundle (item + prev + next + related + products)
  const detail = useMemo(() => {
    return getPortfolioDetail(activeSlug) || getPortfolioDetail(portfolioItems[0]?.slug);
  }, [activeSlug]);

  // Scroll to top on project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSlug]);

  if (!detail) {
    return (
      <div className="w-full bg-white min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="font-heading text-2xl sm:text-3xl text-neutral-800 mb-3">
          Portfolio Item Not Found
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mb-6">
          The project you are looking for does not exist or has been relocated.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 bg-neutral-900 text-white text-xs uppercase tracking-widest font-medium py-3 px-6 hover:bg-brand-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="w-full bg-white font-sans">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= 1. HEADER, BREADCRUMB, IMAGE & TEXT ================= */}
        <section className="section-reveal-up">
          <PortfolioDetailHeader item={detail} />
        </section>

        {/* ================= 2. PRODUCT STRIP, TAGS & SHARE ================= */}
        <section className="section-reveal-scale reveal-delay-100">
          <PortfolioProductStrip
            tags={detail.tags}
            projectTitle={detail.title}
          />
        </section>

        {/* ================= 3. PREVIOUS / NEXT NAVIGATION ================= */}
        <section className="section-reveal-up reveal-delay-200">
          <PortfolioPrevNext prev={detail.prev} next={detail.next} />
        </section>

        {/* ================= 4. COMMENTS & COMMENT FORM ================= */}
        <section className="section-reveal-up reveal-delay-200">
          <PortfolioComments
            initialComments={detail.comments}
          />
        </section>

        {/* ================= 5. RELATED PORTFOLIO ================= */}
        <section className="section-reveal-scale reveal-delay-300">
          <PortfolioRelated relatedItems={detail.related} />
        </section>
      </div>
    </article>
  );
});

export default PortfolioId;
