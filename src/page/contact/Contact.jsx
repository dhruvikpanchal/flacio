import { memo } from "react";
import { PageHeader } from "../../components/common/PageHeader";
import { ContactSection2 } from "./ContactSection2";
import { ContactForm } from "../../components/form/ContactForm";
import { BrandLogos } from "../../components/common/BrandLogos";

/**
 * Contact Page
 * Includes:
 * - Section 1: PageHeader (common top header banner)
 * - Section 2: ContactSection2 (Contact Details and Google Maps Embed)
 * - Section 3: ContactForm ("Send Us Your Questions!" responsive form)
 * - Section 4: BrandLogos (featured press & partner logos with hover sway)
 */
export const Contact = memo(function Contact() {
  return (
    <div className="w-full bg-white">
      {/* Section 1: Top common header with page name */}
      <PageHeader title="Contact" />

      {/* Section 2: Contact Details & Google Maps Embed */}
      <ContactSection2 />

      {/* Section 3: Send Us Your Questions Form */}
      <ContactForm />

      {/* Section 4: Brand Logos Section */}
      <BrandLogos />
    </div>
  );
});

export default Contact;
