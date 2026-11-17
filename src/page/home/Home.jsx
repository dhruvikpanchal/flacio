import { memo } from "react";
import HeroSlider from "./HeroSlider";
import PromoBanners from "./PromoBanners";
import DecoratePlantsSection from "./DecoratePlantsSection";
import TopProductsSection from "./TopProductsSection";
import Testimonials from "./Testimonials";
import OfficePlantsBanner from "./OfficePlantsBanner";
import SetsStylesBanner from "./SetsStylesBanner";
import NewsletterForm from "../../components/form/NewsletterForm";
import CommunitySlider from "./CommunitySlider";
import PolicyFeatures from "./PolicyFeatures";

/**
 * Home Page
 * Renders HeroSlider, PromoBanners, DecoratePlantsSection (Section 2), Testimonials, OfficePlantsBanner, SetsStylesBanner, NewsletterForm, CommunitySlider, and PolicyFeatures
 */
export const Home = memo(function Home({ onNavigate }) {
  return (
    <div className="w-full bg-white text-brand-dark">
      <HeroSlider onNavigate={onNavigate} />
      <PromoBanners onNavigate={onNavigate} />
      <DecoratePlantsSection />
      <TopProductsSection />
      <Testimonials onNavigate={onNavigate} />
      <OfficePlantsBanner onNavigate={onNavigate} />
      <SetsStylesBanner onNavigate={onNavigate} />
      <NewsletterForm />
      <CommunitySlider onNavigate={onNavigate} />
      <PolicyFeatures onNavigate={onNavigate} />
    </div>
  );
});

export default Home;
