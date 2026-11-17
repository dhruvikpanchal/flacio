import { Package, ShieldCheck, Headset, RotateCcw } from "lucide-react";
import officeBanner from "../assets/images/banner-4.webp";
import banner5 from "../assets/images/banner-5.webp";
import policyImg1 from "../assets/images/policy-image-1.webp";
import policyImg2 from "../assets/images/policy-image-2.png";
import policyImg3 from "../assets/images/policy-image-3.webp";
import policyIcon1 from "../assets/icons/policy-1.webp";
import policyIcon2 from "../assets/icons/policy-2.webp";
import policyIcon3 from "../assets/icons/policy-3.webp";
import ig1 from "../assets/images/ig-1_540x.webp";
import ig2 from "../assets/images/ig-2_540x.webp";
import ig3 from "../assets/images/ig-3_540x.webp";
import ig4 from "../assets/images/ig-4_540x.webp";
import ig5 from "../assets/images/ig-5_540x.webp";

/**
 * Decorate Your Home with Plants Section Data (Section 2)
 */
export const DECORATE_PLANTS_SECTION_DATA = {
  titleLine1: "Decorate your",
  titleLine2Prefix: "home ",
  titleLine2Italic: "with plants",
  description:
    "Praesent egestas tristique nibh. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Fusce convallis metus id felis luctus adipiscing. Integer tincidunt. Etiam imperdiet imperdiet orci",
  features: [
    {
      id: 1,
      icon: policyIcon1,
      title: "Unbeatable quality",
      subtitle: "Greater productivity and relaxation",
    },
    {
      id: 2,
      icon: policyIcon2,
      title: "Delivery to your door",
      subtitle: "Better mental wellbeing and happiness",
    },
    {
      id: 3,
      icon: policyIcon3,
      title: "Bring nature into your life",
      subtitle: "Greater productivity and relaxation",
    },
  ],
  plantImage: policyImg1,
  ringImage1: policyImg2,
  ringImage2: policyImg3,
};

/**
 * Plants for Offices Banner Data (Section 5)
 */
export const OFFICE_PLANTS_SECTION_DATA = {
  badgeText: "DISCOVER OUR FAVORITES ",
  titlePrefix: "Plants for ",
  titleItalic: "offices",
  description:
    "Praesent egestas tristique nibh. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Fusce convallis metus id felis luctus adipiscing. Integer tincidunt. Etiam imperdiet imperdiet orci",
  buttonText: "Shop Collection",
  buttonLink: "/shop",
  image: officeBanner,
  imageAlt: "Plants for offices modern interior",
};

/**
 * Sets for All Styles Banner Data (Section 6)
 */
export const SETS_STYLES_SECTION_DATA = {
  badgeText: "DISCOVER OUR FAVORITES",
  titlePrefix: "Sets for all ",
  titleItalic: "styles",
  description:
    "Praesent egestas tristique nibh. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Fusce convallis metus id felis luctus adipiscing. Integer tincidunt. Etiam imperdiet imperdiet orci",
  buttonText: "Shop Collection",
  buttonLink: "/shop",
  image: banner5,
  imageAlt: "Sets for all styles plant styling and wooden display bench",
};

/**
 * Community Instagram Slider Data (Section 8)
 */
export const COMMUNITY_SECTION_DATA = {
  tag: "#bringlifein",
  subtitle: "Our community has a thing for plant styling. Get inspired.",
  slides: [
    { id: 1, image: ig1, alt: "Plant styling - Plants on wooden shelf" },
    {
      id: 2,
      image: ig2,
      alt: "Plant styling - Cute dog sitting next to potted plant",
    },
    {
      id: 3,
      image: ig3,
      alt: "Plant styling - Cozy armchair with plants in living room",
    },
    {
      id: 4,
      image: ig4,
      alt: "Plant styling - Modern chair and tall potted plants",
    },
    { id: 5, image: ig5, alt: "Plant styling - Beautiful indoor green plants" },
  ],
};

export const HOME_POLICY_DATA = [
  {
    id: "free-delivery",
    title: "Free delivery",
    description: "For all orders above $45",
    icon: Package,
    iconType: "delivery",
    alt: "Free delivery - For all orders above $45",
    ariaLabel: "Free delivery for all orders above $45",
  },
  {
    id: "secure-payments",
    title: "Secure payments",
    description: "Confidence on all your devices",
    icon: ShieldCheck,
    iconType: "payment",
    alt: "Secure payments - Confidence on all your devices",
    ariaLabel: "Secure payments with confidence on all your devices",
  },
  {
    id: "top-notch-support",
    title: "Top-notch support",
    description: "sayhello@flacio.com",
    icon: Headset,
    iconType: "support",
    alt: "Top-notch support - sayhello@flacio.com",
    ariaLabel: "Top-notch support via email sayhello@flacio.com",
    isEmail: true,
    emailLink: "mailto:sayhello@flacio.com",
  },
  {
    id: "180-days-return",
    title: "180 Days Return",
    description: "180 Days Return",
    icon: RotateCcw,
    iconType: "return",
    alt: "180 Days Return policy",
    ariaLabel: "180 Days Return guarantee",
  },
];

/**
 * Getter function to retrieve policy list
 * @returns {Array} List of home policy items
 */
export function getHomePolicies() {
  return HOME_POLICY_DATA;
}

/**
 * Getter function to find a policy item by id
 * @param {string} id
 * @returns {Object|undefined}
 */
export function getPolicyById(id) {
  return HOME_POLICY_DATA.find((item) => item.id === id);
}

/**
 * Formatter function to format policy description / contact info
 * @param {Object} item
 * @returns {Object} { isLink: boolean, text: string, href?: string }
 */
export function formatPolicyAction(item) {
  if (!item) return { isLink: false, text: "" };
  if (item.isEmail || item.description?.includes("@")) {
    return {
      isLink: true,
      text: item.description,
      href: `mailto:${item.description}`,
    };
  }
  return {
    isLink: false,
    text: item.description,
  };
}

export default HOME_POLICY_DATA;
