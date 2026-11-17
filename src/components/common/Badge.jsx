export function MenuBadge({ type = "hot", label }) {
  const text = label || (type === "hot" ? "Hot" : "New");
  const isHot = type?.toLowerCase() === "hot";

  return (
    <span
      className={`inline-block text-[9px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-xs leading-none transition-transform duration-200 group-hover:scale-105 ${
        isHot ? "bg-badge-hot text-white" : "bg-badge-new text-white"
      }`}
    >
      {text}
    </span>
  );
}
