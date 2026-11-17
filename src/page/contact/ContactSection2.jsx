import { CONTACT_DETAILS_DATA } from "../../data/contact";
import {
  FacebookIcon,
  TwitterXIcon,
  WhatsAppIcon,
  TikTokIcon,
} from "../../components/common/Icons";

/**
 * Social icon selector helper
 */
function renderSocialIcon(iconType) {
  switch (iconType) {
    case "facebook":
      return <FacebookIcon className="w-3.5 h-3.5" />;
    case "twitter-x":
      return <TwitterXIcon className="w-3 h-3" />;
    case "whatsapp":
      return <WhatsAppIcon className="w-3.5 h-3.5" />;
    case "tiktok":
      return <TikTokIcon className="w-3.5 h-3.5" />;
    default:
      return null;
  }
}

/**
 * ContactSection2 Component (Section 2 of Contact Page)
 * Displays:
 * - Left column: Contact Details (Address, Phone, Email, Opening Time, Social Links)
 * - Right column: Full interactive Google Maps embed with full controls
 *
 * Fully responsive for mobile, tablet, and desktop viewports.
 * Uses external structured data from src/data/contact.js.
 */
export function ContactSection2({
  data = CONTACT_DETAILS_DATA,
  className = "",
}) {
  const { title, items, socials, map } = data;

  return (
    <section
      aria-label="Contact Details and Location Map"
      className={`w-full bg-white pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-12 md:pb-16 ${className}`}
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-stretch">
          {/* ================= LEFT COLUMN: CONTACT DETAILS ================= */}
          <div className="section-reveal-slide-left lg:col-span-5 flex flex-col justify-start">
            {/* Section Main Title */}
            <h2 className="font-heading font-normal text-brand-dark text-3xl sm:text-4xl lg:text-[40px] leading-tight mb-8 sm:mb-10">
              {title}
            </h2>

            {/* Contact Items List */}
            <div className="flex flex-col">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-[#ECECEC] pb-5 sm:pb-6 mb-5 sm:mb-6"
                >
                  <h3 className="font-heading font-normal text-brand-dark text-lg sm:text-[19px] leading-snug">
                    {item.title}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-sans font-normal text-[#717171] text-[14.5px] sm:text-[15px] leading-relaxed mt-1.5 inline-block hover:text-brand-green transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-sans font-normal text-[#717171] text-[14.5px] sm:text-[15px] leading-relaxed mt-1.5">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}

              {/* Social Follow Us On */}
              <div className="pt-1">
                <h3 className="font-heading font-normal text-brand-dark text-lg sm:text-[19px] leading-snug mb-4">
                  {socials.title}
                </h3>
                <div className="flex items-center gap-3">
                  {socials.links.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Flacio on ${social.name}`}
                      className="w-10 h-10 rounded-full border border-[#D5D5D5] flex items-center justify-center text-[#333333] hover:text-white hover:bg-brand-green hover:border-brand-green transition-all duration-300 shadow-xs hover:scale-105 active:scale-95"
                    >
                      {renderSocialIcon(social.icon)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE GOOGLE MAP ================= */}
          <div className="section-reveal-slide-right reveal-delay-200 lg:col-span-7 w-full h-full min-h-95 sm:min-h-115 md:min-h-125 lg:min-h-140 xl:min-h-155 rounded-xs overflow-hidden relative shadow-xs bg-[#f2efe9]">
            <iframe
              src={map.embedUrl}
              title={map.title}
              aria-label={map.ariaLabel}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-95 sm:min-h-115 md:min-h-125 lg:min-h-140 xl:min-h-155 block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export const Section2 = ContactSection2;
export default ContactSection2;
