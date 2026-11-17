import { memo } from "react";
import { PageHeader } from "../../components/common/PageHeader";
import { AboutSection2 } from "./AboutSection2";
import { AboutSection3 } from "./AboutSection3";
import { AboutSection4 } from "./AboutSection4";
import { AboutSection5 } from "./AboutSection5";
import { Testimonials } from "../../components/common/Testimonials";
import { BrandLogos } from "../../components/common/BrandLogos";

/**
 * About Page
 * Includes:
 * - Section 1: PageHeader (common top header banner)
 * - Section 2: AboutSection2 (Notebook showcase with animated foreground plant)
 * - Section 3: AboutSection3 (Flacio Photosynthesis Stories)
 * - Section 4: AboutSection4 (Botanical 3-image staggered gallery with vertical sway)
 * - Section 5: AboutSection5 (Here's How It Works - policy process steps with horizontal sway)
 * - Section 6: Testimonials (clean white background matching design)
 * - Section 7: BrandLogos (featured press & partner logos with hover sway)
 */
export const About = memo(function About() {
  return (
    <div className="w-full bg-white">
      {/* Section 1: Top common header with page name */}
      <PageHeader title="About Us" />

      {/* Section 2: Botanical showcase (about-1.webp bg with policy-image-1.webp above) */}
      <AboutSection2 />

      {/* Section 3: Flacio Photosynthesis Stories */}
      <AboutSection3 />

      {/* Section 4: Botanical 3-image gallery showcase */}
      <AboutSection4 />

      {/* Section 5: Here's How It Works policy process steps */}
      <AboutSection5 />

      {/* Section 6: Common Testimonials (Clean Variant) */}
      <Testimonials variant="clean" />

      {/* Section 7: Brand Logos Section */}
      <BrandLogos />
    </div>
  );
});

export default About;
