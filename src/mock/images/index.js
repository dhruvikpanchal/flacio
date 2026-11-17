import img10_2 from "./10-2.webp";
import img10_3 from "./10-3_540x.webp";
import img10_5 from "./10-5_540x.webp";
import img10_6 from "./10-6_540x.webp";
import img10_9 from "./10-9_540x.webp";
import img11_8 from "./11-8_540x.webp";
import img12_4 from "./12-4_540x.webp";
import img14_3 from "./14-3_540x.webp";
import img15_5 from "./15-5_540x.webp";
import img16_1 from "./16-1_5f1bbfe2-f7bc-4b45-a536-57fd4bd03363_540x.webp";
import img1 from "./1_540x.webp";
import img7 from "./7_540x.webp";
import img8 from "./8_540x.webp";

/**
 * Local product mock images registry
 * Provides fast local access for mock product assets
 */
export const MOCK_IMAGES = {
  "10-2": img10_2,
  "10-3": img10_3,
  "10-5": img10_5,
  "10-6": img10_6,
  "10-9": img10_9,
  "11-8": img11_8,
  "12-4": img12_4,
  "14-3": img14_3,
  "15-5": img15_5,
  "16-1": img16_1,
  "1": img1,
  "7": img7,
  "8": img8,
};

/**
 * Resolves a local mock image if available, else returns the CDN fallback URL
 */
export function getMockImageUrl(fileKey, fallbackCdnUrl = "") {
  if (fileKey && MOCK_IMAGES[fileKey]) {
    return MOCK_IMAGES[fileKey];
  }
  return fallbackCdnUrl;
}

export default MOCK_IMAGES;

