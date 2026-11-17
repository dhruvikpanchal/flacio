import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Compare } from "../ui/ProductCard";
import {
  removeFromCompare,
  setCompareOpen,
  clearCompare,
} from "../../redux/features/compareSlice";
import { addToCart as addToCartAction } from "../../redux/features/cartSlice";

export const GlobalCompare = memo(function GlobalCompare() {
  const dispatch = useDispatch();
  const compareItems = useSelector((state) => state.compare?.items || []);
  const isOpen = useSelector((state) => state.compare?.isOpen || false);

  const handleRemove = useCallback(
    (product) => {
      dispatch(removeFromCompare(product));
    },
    [dispatch]
  );

  const handleClear = useCallback(() => {
    dispatch(clearCompare());
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(setCompareOpen(false));
  }, [dispatch]);

  const handleAddToCart = useCallback(
    (p, quantity = 1, color = null) => {
      dispatch(
        addToCartAction({
          id: p.id || p.handle,
          handle: p.handle,
          variantId: p.variantId,
          title: p.title,
          price: p.price,
          comparePrice: p.comparePrice,
          image: p.image || p.images?.[0]?.src || (typeof p.images?.[0] === "string" ? p.images[0] : "") || "",
          quantity,
          color,
        })
      );
    },
    [dispatch]
  );

  return (
    <>
      {/* Floating Side Compare Tab Button (matching reference) */}
      <button
        type="button"
        onClick={() => dispatch(setCompareOpen(true))}
        aria-label={`Open compare list (${compareItems.length} products)`}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#1f2024] hover:bg-black text-white text-[11px] font-sans font-medium px-2 py-3 rounded-l-md shadow-2xl flex flex-col items-center gap-1.5 cursor-pointer select-none transition-transform hover:-translate-x-0.5"
      >
        <span
          className="tracking-wider uppercase"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Compare
        </span>
        <span className="w-4 h-4 rounded-full bg-white text-[#1f2024] text-[10px] font-bold flex items-center justify-center">
          {compareItems.length}
        </span>
      </button>

      {/* Global Compare Modal */}
      {isOpen && (
        <Compare
          items={compareItems}
          onRemove={handleRemove}
          onClear={handleClear}
          onClose={handleClose}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
});

export default GlobalCompare;

