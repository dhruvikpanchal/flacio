import { useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, X, ShoppingBag } from "lucide-react";
import { preloadPage } from "../../util/preload";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../redux/features/cartSlice";

const formatPrice = (n) => `$${Number(n || 0).toFixed(2)}`;

export const CartDrawer = memo(function CartDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state?.cart?.items || []);

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-[1px] animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden transform transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= HEADER BAR ================= */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0] bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-neutral-800" />
            <h3
              id="cart-drawer-title"
              className="text-xs font-semibold tracking-widest uppercase text-[#1f2024]"
            >
              Shopping Cart ({totalQuantity})
            </h3>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close cart menu"
            className="text-neutral-500 hover:text-neutral-900 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= ITEMS LIST ================= */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <p className="font-heading text-base text-neutral-800 mb-1">
                Your cart is currently empty
              </p>
              <p className="text-xs text-neutral-500 mb-6 max-w-xs">
                Before proceed to checkout you must add some products to your shopping cart.
              </p>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  navigate("/product");
                }}
                className="bg-[#1f2024] hover:bg-[#4f6b5a] text-white text-xs uppercase tracking-widest font-medium py-3 px-8 transition-colors duration-200"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemImg = item.image || item.images?.[0]?.src || item.images?.[0] || "";
              const itemUrl = `/products/${item.handle || item.id}`;

              return (
                <div key={item.id || item.handle} className="py-4 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <Link
                    to={itemUrl}
                    onClick={handleClose}
                    className="w-20 h-24 bg-neutral-100 shrink-0 overflow-hidden rounded-xs border border-neutral-200/80"
                  >
                    {itemImg ? (
                      <img
                        src={itemImg}
                        alt={item.title}
                        width={80}
                        height={96}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-neutral-400">
                        No image
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        to={itemUrl}
                        onClick={handleClose}
                        className="font-serif text-sm text-[#1f2024] hover:text-[#4f6b5a] font-normal leading-snug line-clamp-2 transition-colors"
                      >
                        {item.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.id || item.handle))}
                        className="text-neutral-400 hover:text-red-500 p-0.5 transition-colors"
                        title="Remove product"
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {(item.color || item.selectedColor) && (
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Color: <span className="font-medium text-neutral-700">{item.color || item.selectedColor}</span>
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="inline-flex items-center border border-neutral-200 rounded-xs">
                        <button
                          type="button"
                          onClick={() => dispatch(decreaseQuantity(item.id || item.handle))}
                          className="px-2 py-1 text-neutral-500 hover:text-neutral-800 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium text-neutral-800 min-w-6 text-center select-none">
                          {item.quantity || 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => dispatch(increaseQuantity(item.id || item.handle))}
                          className="px-2 py-1 text-neutral-500 hover:text-neutral-800 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total for this line */}
                      <span className="text-xs font-semibold text-neutral-800">
                        {formatPrice((Number(item.price) || 0) * (Number(item.quantity) || 1))}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ================= FOOTER / CHECKOUT ================= */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#f0f0f0] p-6 bg-neutral-50/50 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-wider text-xs font-semibold text-neutral-600">
                Subtotal
              </span>
              <span className="font-heading text-lg font-semibold text-[#1f2024]">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Taxes and shipping calculated at checkout.
            </p>

            <div className="space-y-3 pt-1">
              <button
                type="button"
                onMouseEnter={() => preloadPage("/checkout")}
                onClick={() => {
                  handleClose();
                  navigate("/checkout");
                }}
                className="w-full bg-[#1f2024] hover:bg-[#4f6b5a] text-white text-xs uppercase tracking-widest font-medium py-3.5 px-4 transition-colors duration-200 shadow-xs cursor-pointer"
              >
                Proceed to Checkout
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => dispatch(clearCart())}
                  className="text-[11px] uppercase tracking-wider text-neutral-500 hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>
                <button
                  type="button"
                  onMouseEnter={() => preloadPage("/product")}
                  onClick={() => {
                    handleClose();
                    navigate("/product");
                  }}
                  className="text-[11px] uppercase tracking-wider text-neutral-700 hover:text-[#4f6b5a] font-medium transition-colors"
                >
                  Continue Shopping →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default CartDrawer;

