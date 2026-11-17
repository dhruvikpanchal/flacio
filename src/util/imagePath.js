import slider1 from "../assets/images/slider-1-1.webp";
import slider2 from "../assets/images/slider-1-2.webp";
import slider3 from "../assets/images/slider-1-3_87c2a061-1b63-41f1-9ab1-9762598d377a.webp";
import banner1 from "../assets/images/banner-1.webp";
import banner2 from "../assets/images/banner-2.jpg";
import banner3 from "../assets/images/banner-3.jpg";
import testimonialBg from "../assets/images/bg-1.webp";
import testimonialUser1 from "../assets/images/test-1.webp";

export const HERO_SLIDES = [
  {
    id: 1,
    image: slider1,
    subtitle: "SALE UP TO 30% OFF",
    titleMain: "Plants",
    titleItalic: "made easy",
    description:
      "Patch helps you discover the best plants for your space, delivers them to your door and helps you look after them.",
    primaryBtn: { text: "Shop indoor", href: "/shop" },
    secondaryBtn: { text: "Shop outdoor", href: "/shop" },
  },
  {
    id: 2,
    image: slider2,
    subtitle: "SALE UP TO 30% OFF",
    titleMain: "Make People",
    titleItalic: "Merry",
    description:
      "Patch helps you discover the best plants for your space, delivers them to your door and helps you look after them.",
    primaryBtn: { text: "Shop indoor", href: "/shop" },
    secondaryBtn: { text: "Shop outdoor", href: "/shop" },
  },
  {
    id: 3,
    image: slider3,
    subtitle: "SALE UP TO 30% OFF",
    titleMain: "Gifts",
    titleItalic: "We Love",
    description:
      "Patch helps you discover the best plants for your space, delivers them to your door and helps you look after them.",
    primaryBtn: { text: "Shop indoor", href: "/shop" },
    secondaryBtn: { text: "Shop outdoor", href: "/shop" },
  },
];

export const PROMO_BANNERS = [
  {
    id: 1,
    image: banner1,
    title: "New Arrivals",
    titlePrefix: "New",
    titleItalic: "Arrivals",
    linkText: "Shop Now",
    linkUrl: "/shop",
    align: "left",
    bgClass: "bg-[#edf3f0]",
    mobileAspect: "aspect-[631/412]",
  },
  {
    id: 2,
    image: banner2,
    title: "Gift Green",
    titlePrefix: "Gift",
    titleItalic: "Green",
    linkText: "Shop Now",
    linkUrl: "/shop",
    align: "center",
    bgClass: "bg-[#f8f8f8]",
    mobileAspect: "aspect-[450/412]",
  },
  {
    id: 3,
    image: banner3,
    title: "Home Grown",
    titlePrefix: "Home",
    titleItalic: "Grown",
    linkText: "Shop Now",
    linkUrl: "/shop",
    align: "left",
    bgClass: "bg-white",
    mobileAspect: "aspect-[630/412]",
  },
];

export const TESTIMONIAL_BG = testimonialBg;
export const TESTIMONIAL_USER = testimonialUser1;

export const TESTIMONIALS = [
  {
    id: 1,
    rating: 5,
    quote:
      "“ Very happy with flacio; plants arrived in excellent condition, were healthy looking with lots of new growth and are thriving! ”",
    author: "Ann Smith",
    avatar: testimonialUser1,
  },
];
