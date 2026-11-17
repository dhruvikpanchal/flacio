/**
 * Contact Page Data
 * Contains contact details, opening hours, social links, and Google Maps embed configuration.
 */

export const CONTACT_DETAILS_DATA = {
  title: "Contact Details",
  items: [
    {
      id: "address",
      title: "Address",
      value: "8331 Indian Spring Street Ames, IA 30010",
      href: null,
    },
    {
      id: "phone",
      title: "Phone",
      value: "(+84) 123 567 712",
      href: "tel:+84123567712",
    },
    {
      id: "email",
      title: "Email",
      value: "support@flacio.com",
      href: "mailto:support@flacio.com",
    },
    {
      id: "opening-time",
      title: "Opening Time",
      value: "8:00Am – 10:00Pm, Sunday Close",
      href: null,
    },
  ],
  socials: {
    title: "Follow Us On",
    links: [
      {
        id: "facebook",
        name: "Facebook",
        href: "https://facebook.com",
        icon: "facebook",
      },
      {
        id: "x",
        name: "X (Twitter)",
        href: "https://twitter.com",
        icon: "twitter-x",
      },
      {
        id: "whatsapp",
        name: "WhatsApp",
        href: "https://whatsapp.com",
        icon: "whatsapp",
      },
      {
        id: "tiktok",
        name: "TikTok",
        href: "https://tiktok.com",
        icon: "tiktok",
      },
    ],
  },
  map: {
    title: "San Francisco Location Map",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.02982618993!2d-122.47879940876057!3d37.75776068857222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20California%2C%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2s!4v1690774797695!5m2!1svi!2s",
    ariaLabel: "Google Maps view of San Francisco store location",
  },
};

export default CONTACT_DETAILS_DATA;
