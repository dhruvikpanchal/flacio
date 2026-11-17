/* ------------------------------------------------------------------ *
 * DESKTOP CARD LAYOUT SWITCHER ICONS (Matches design screenshot 1:1)
 * ------------------------------------------------------------------ */

// 1. List View Icon: 3 horizontal lines with leading block
export function ListViewIcon({ active }) {
  return (
    <svg
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="currentColor"
      className={`transition-colors ${
        active ? "text-[#1c1c1c]" : "text-[#cccccc] hover:text-[#888888]"
      }`}
      aria-hidden="true"
    >
      <rect x="0" y="0.5" width="2.5" height="2" rx="0.5" />
      <rect x="4.5" y="0.5" width="12.5" height="2" rx="0.5" />
      <rect x="0" y="6" width="2.5" height="2" rx="0.5" />
      <rect x="4.5" y="6" width="12.5" height="2" rx="0.5" />
      <rect x="0" y="11.5" width="2.5" height="2" rx="0.5" />
      <rect x="4.5" y="11.5" width="12.5" height="2" rx="0.5" />
    </svg>
  );
}

// 2. Two Columns Icon: 2 columns of 3 square blocks
export function TwoColsIcon({ active }) {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="currentColor"
      className={`transition-colors ${
        active ? "text-[#1c1c1c]" : "text-[#cccccc] hover:text-[#888888]"
      }`}
      aria-hidden="true"
    >
      <rect x="0" y="0.5" width="4.5" height="3" rx="0.5" />
      <rect x="6.5" y="0.5" width="4.5" height="3" rx="0.5" />
      <rect x="0" y="5.5" width="4.5" height="3" rx="0.5" />
      <rect x="6.5" y="5.5" width="4.5" height="3" rx="0.5" />
      <rect x="0" y="10.5" width="4.5" height="3" rx="0.5" />
      <rect x="6.5" y="10.5" width="4.5" height="3" rx="0.5" />
    </svg>
  );
}

// 3. Three Columns Icon: 3 columns of 3 square blocks
export function ThreeColsIcon({ active }) {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="currentColor"
      className={`transition-colors ${
        active ? "text-[#1c1c1c]" : "text-[#cccccc] hover:text-[#888888]"
      }`}
      aria-hidden="true"
    >
      <rect x="0" y="0.5" width="3.5" height="3" rx="0.5" />
      <rect x="5.5" y="0.5" width="3.5" height="3" rx="0.5" />
      <rect x="11" y="0.5" width="3.5" height="3" rx="0.5" />
      <rect x="0" y="5.5" width="3.5" height="3" rx="0.5" />
      <rect x="5.5" y="5.5" width="3.5" height="3" rx="0.5" />
      <rect x="11" y="5.5" width="3.5" height="3" rx="0.5" />
      <rect x="0" y="10.5" width="3.5" height="3" rx="0.5" />
      <rect x="5.5" y="10.5" width="3.5" height="3" rx="0.5" />
      <rect x="11" y="10.5" width="3.5" height="3" rx="0.5" />
    </svg>
  );
}

// 4. Four Columns Icon: 4 columns of 3 square blocks
export function FourColsIcon({ active }) {
  return (
    <svg
      width="21"
      height="14"
      viewBox="0 0 21 14"
      fill="currentColor"
      className={`transition-colors ${
        active ? "text-[#1c1c1c]" : "text-[#cccccc] hover:text-[#888888]"
      }`}
      aria-hidden="true"
    >
      <rect x="0" y="0.5" width="3.5" height="3" rx="0.5" />
      <rect x="5.5" y="0.5" width="3.5" height="3" rx="0.5" />
      <rect x="11" y="0.5" width="3.5" height="3" rx="0.5" />
      <rect x="16.5" y="0.5" width="3.5" height="3" rx="0.5" />
      <rect x="0" y="5.5" width="3.5" height="3" rx="0.5" />
      <rect x="5.5" y="5.5" width="3.5" height="3" rx="0.5" />
      <rect x="11" y="5.5" width="3.5" height="3" rx="0.5" />
      <rect x="16.5" y="5.5" width="3.5" height="3" rx="0.5" />
      <rect x="0" y="10.5" width="3.5" height="3" rx="0.5" />
      <rect x="5.5" y="10.5" width="3.5" height="3" rx="0.5" />
      <rect x="11" y="10.5" width="3.5" height="3" rx="0.5" />
      <rect x="16.5" y="10.5" width="3.5" height="3" rx="0.5" />
    </svg>
  );
}

