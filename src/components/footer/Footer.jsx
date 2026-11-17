import { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  AmexBadge,
  ApplePayBadge,
  ChevronDownIcon,
  ClearpayBadge,
  FacebookIcon,
  MastercardBadge,
  PaypalBadge,
  TikTokIcon,
  TwitterXIcon,
  VisaBadge,
  WhatsAppIcon,
} from "../common/Icons";
import { FOOTER_SECTIONS } from "../../data/footer";
import { preloadPage } from "../../util/preload";
import { FooterNewsletterForm } from "../form/FooterNewsletterForm";

function FooterLink({ href, label, className }) {
  if (href.startsWith("/")) {
    return (
      <Link
        to={href}
        onMouseEnter={() => preloadPage(href)}
        className={className}
      >
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

export const Footer = memo(function Footer() {
  const [openSections, setOpenSections] = useState({
    company: false,
    support: false,
    questions: false,
    stayInLoop: false,
  });

  const toggleSection = useCallback((id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  return (
    <footer className="relative bg-brand-green text-white pt-14 md:pt-16 lg:pt-20 pb-8 md:pb-10 overflow-hidden font-sans">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-16">
        {/* ================= DESKTOP & TABLET VIEW ================= */}
        {/* On Desktop: 4 columns in 1 row. On Tablet: 2x2 grid. Hidden on Mobile */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14">
          {/* Columns 1 - 3 */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.id} className="flex flex-col">
              <h4 className="text-[13px] md:text-[14px] font-semibold tracking-[0.14em] uppercase text-white mb-6 select-none font-sans">
                {section.title}
              </h4>
              <ul className="space-y-3.5 text-[13px] md:text-[14px] text-white font-sans">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <FooterLink
                      href={link.href}
                      label={link.label}
                      className="text-white hover:text-white/80 transition-colors duration-200 inline-block hover:translate-x-0.5"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Stay in the loop */}
          <div className="flex flex-col">
            <h4 className="text-[13px] md:text-[14px] font-semibold tracking-[0.14em] uppercase text-white mb-6 select-none font-sans">
              STAY IN THE LOOP
            </h4>
            <p className="text-[13px] md:text-[14px] text-white leading-relaxed mb-6 max-w-sm font-sans">
              Stay in the loop with special offers,plant-parenting tips, and
              more.
            </p>

            {/* Newsletter input with underline and envelope icon (Moved to components/form) */}
            <FooterNewsletterForm
              idPrefix="desktop-footer-newsletter"
              className="mb-8"
            />

            {/* Social Media Outlined Circles */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-brand-green hover:border-white transition-all duration-200"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter X"
                className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-brand-green hover:border-white transition-all duration-200"
              >
                <TwitterXIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-brand-green hover:border-white transition-all duration-200"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-brand-green hover:border-white transition-all duration-200"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ================= MOBILE VIEW (ACCORDION) ================= */}
        {/* Exactly matching preview/mobile/footer/1.png */}
        <div className="md:hidden divide-y divide-white/15 pb-8 font-sans">
          {FOOTER_SECTIONS.map((section) => {
            const isOpen = openSections[section.id];
            return (
              <div key={section.id} className="py-4">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-[13px] md:text-[14px] font-semibold tracking-[0.12em] uppercase text-white font-sans">
                    {section.title}
                  </span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-white transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <ul className="mt-3 space-y-2.5 text-[13px] md:text-[14px] text-white animate-fadeIn pl-1 font-sans">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <FooterLink
                          href={link.href}
                          label={link.label}
                          className="text-white hover:text-white/80 block py-1"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {/* Stay in the Loop Accordion */}
          <div className="py-4">
            <button
              onClick={() => toggleSection("stayInLoop")}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="text-[13px] md:text-[14px] font-semibold tracking-[0.12em] uppercase text-white font-sans">
                STAY IN THE LOOP
              </span>
              <ChevronDownIcon
                className={`w-4 h-4 text-white transition-transform duration-300 ${
                  openSections.stayInLoop ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSections.stayInLoop && (
              <div className="mt-4 animate-fadeIn font-sans">
                <p className="text-[13px] md:text-[14px] text-white leading-relaxed mb-4">
                  Stay in the loop with special offers,plant-parenting tips, and
                  more.
                </p>
                <FooterNewsletterForm
                  idPrefix="mobile-footer-newsletter"
                  className="mb-6"
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Social media row (visible below accordion on mobile) */}
        <div className="md:hidden flex items-center gap-3 pt-4 pb-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-brand-green hover:border-white transition-all"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter X"
            className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-brand-green hover:border-white transition-all"
          >
            <TwitterXIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-brand-green hover:border-white transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-brand-green hover:border-white transition-all"
          >
            <TikTokIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ================= PAYMENT BADGES ================= */}
        {/* Matching preview/desktop/footer/1.png and preview/mobile/footer/1.png */}
        <div className="flex flex-wrap items-center gap-2.5 pb-10">
          <MastercardBadge />
          <ApplePayBadge />
          <VisaBadge />
          <AmexBadge />
          <PaypalBadge />
          <ClearpayBadge />
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="pt-6 border-t border-white/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] md:text-[13px] text-white font-sans">
          <div className="text-white">
            © 2024{" "}
            <Link
              to="/"
              onMouseEnter={() => preloadPage("/")}
              className="font-bold underline text-white hover:text-white/80 transition-colors"
            >
              Flacio.
            </Link>{" "}
            All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] md:text-[13px] text-white">
            <a
              href="/terms"
              className="text-white hover:text-white/80 transition-colors"
            >
              Terms Of Use
            </a>
            <a
              href="/trademark"
              className="text-white hover:text-white/80 transition-colors"
            >
              Copyright & Trademark
            </a>
            <a
              href="/policy"
              className="text-white hover:text-white/80 transition-colors"
            >
              Policy
            </a>
            <a
              href="/sitemap"
              className="text-white hover:text-white/80 transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
