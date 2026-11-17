import brand1 from "../assets/icons/brand-1.webp";
import brand2 from "../assets/icons/brand-2.webp";
import brand3 from "../assets/icons/brand-3.webp";
import brand4 from "../assets/icons/brand-4.webp";
import aboutBg from "../assets/images/about-1.webp";
import policyImg1 from "../assets/images/policy-image-1.webp";
import about2 from "../assets/images/about-2_540x.webp";
import about3 from "../assets/images/about-3_540x.webp";
import about4 from "../assets/images/about-4_540x.webp";
import policy8 from "../assets/icons/policy-8.svg";
import policy9 from "../assets/icons/policy-9.svg";
import policy10 from "../assets/icons/policy-10.svg";
import policy11 from "../assets/icons/policy-11.svg";

/**
 * About Page Data Store
 */

// Section 2: Botanical Workspace Showcase
export const ABOUT_SECTION2_DATA = {
  bgImage: aboutBg,
  plantImage: policyImg1,
  altBg: "About Flacio workspace and botanical notebook",
  altPlant: "Botanical indoor potted plant",
};

// Section 7: Featured Partner & Press Brand Logos
export const ABOUT_BRAND_LOGOS = [
  {
    id: 1,
    name: "Architectural Digest",
    image: brand1,
    imgClass: "h-9 sm:h-10 md:h-12 lg:h-14 max-w-35 sm:max-w-40",
  },
  {
    id: 2,
    name: "Gardenista",
    image: brand2,
    imgClass: "h-4 sm:h-4.5 md:h-5 lg:h-6 max-w-37.5 sm:max-w-45",
  },
  {
    id: 3,
    name: "Apartment Therapy",
    image: brand3,
    imgClass: "h-8 sm:h-9 md:h-10 lg:h-12 max-w-40 sm:max-w-47.5",
  },
  {
    id: 4,
    name: "Good Housekeeping",
    image: brand4,
    imgClass: "h-7 sm:h-8 md:h-9 lg:h-11 max-w-37.5 sm:max-w-45",
  },
];

// Section 3: Flacio Photosynthesis Stories (Introductory narrative & mission)
export const ABOUT_SECTION3_DATA = {
  subtitle: "FLACIO PHOTOSYNTHESIS STORIES",
  titleLine1: "We connect buyers and sellers with",
  titleLine2Prefix: "suitable, eco-friendly ",
  titleLine2Italic: "products",
  description:
    "Nothing adds more beauty and comfort to our homes and offices than the lush flowers and foliage of indoor plants. Bedrooms, bathrooms, kitchens, cubicles... There really isn't a space a houseplant can't enliven. Just add light and water, and you've got a growing indoor oasis. Bringing plants into your home is aesthetically pleasing and – amazingly – plants can offer strong health benefits as well!",
};

// Section 4: Botanical Showcase Grid (Staggered gallery with vertical hover sway)
export const ABOUT_SECTION4_DATA = [
  {
    id: 1,
    image: about2,
    alt: "Indoor botanical plants in woven basket on wooden floor",
    isShifted: false,
  },
  {
    id: 2,
    image: about3,
    alt: "Gardener potting houseplant in terracotta pot",
    isShifted: true, // Shifted down on tablet and desktop
  },
  {
    id: 3,
    image: about4,
    alt: "Succulents and cacti in decorative metal buckets",
    isShifted: false,
  },
];

// Section 5: Here's How It Works (Policy process steps)
export const ABOUT_SECTION5_DATA = {
  titlePrefix: "Here's How It ",
  titleItalic: "Works",
  steps: [
    {
      id: 1,
      icon: policy8,
      title: "Pick your plant",
      alt: "Pick your plant icon",
    },
    {
      id: 2,
      icon: policy9,
      title: "Choose a pot color",
      alt: "Choose a pot color icon",
    },
    {
      id: 3,
      icon: policy10,
      title: "Have it shipped",
      alt: "Have it shipped icon",
    },
    {
      id: 4,
      icon: policy11,
      title: "Watch it grow",
      alt: "Watch it grow icon",
    },
  ],
};

export const ABOUT_DATA = {
  section2: ABOUT_SECTION2_DATA,
  section3: ABOUT_SECTION3_DATA,
  section4: ABOUT_SECTION4_DATA,
  section5: ABOUT_SECTION5_DATA,
  brands: ABOUT_BRAND_LOGOS,
};

export default ABOUT_DATA;
