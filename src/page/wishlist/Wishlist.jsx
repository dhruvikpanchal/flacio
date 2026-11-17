import { memo, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, X } from "lucide-react";
import { PageHeaderTitle } from "../../components/common/PageHeaderTitle";
import { removeFromWishlist, clearWishlist } from "../../redux/features/wishlistSlice";
import { addToCart } from "../../redux/features/cartSlice";

const EMPTY_ARRAY = [];
const BREADCRUMBS = [
  { label: "Home", path: "/" },
  { label: "wishlist" },
];

const formatPrice = (n) => `$${Number(n || 0).toFixed(2)}`;

/**
 * Wishlist Page Component
 *
 * Requirements:
 * 1. Uses the common PageHeaderTitle component with left alignment and bottom border.
 * 2. Responsive table/card layout across mobile, tablet, and desktop screens.
 * 3. Shows empty state ("There are no products in wishlist") when empty.
 * 4. Allows removing items, clearing wishlist, and adding items directly to cart.
 * 5. Instant synchronization with Redux persistent store.
 */
export const Wishlist = memo(function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state?.wishlist?.items || EMPTY_ARRAY);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2600);
  }, []);

  const handleRemove = useCallback(
    (product) => {
      dispatch(removeFromWishlist(product));
      showToast(`Removed "${product.title}" from wishlist`);
    },
    [dispatch, showToast]
  );

  const handleAddToCart = useCallback(
    (product) => {
      dispatch(
        addToCart({
          id: product.id || product.handle,
          handle: product.handle,
          title: product.title,
          price: product.price,
          comparePrice: product.comparePrice,
          image: product.image || product.images?.[0]?.src || (typeof product.images?.[0] === "string" ? product.images[0] : ""),
          quantity: 1,
        })
      );
      showToast(`Added "${product.title}" to cart`);
    },
    [dispatch, showToast]
  );

  const handleClear = useCallback(() => {
    dispatch(clearWishlist());
    showToast("Cleared all products from wishlist");
  }, [dispatch, showToast]);

  return (
    <div className="w-full bg-white min-h-[calc(100vh-280px)] font-sans">
      {/* ================= COMMON PAGE TITLE & BREADCRUMBS ================= */}
      <PageHeaderTitle title="wishlist" breadcrumbs={BREADCRUMBS} />

      {/* ================= TOAST NOTIFICATION ================= */}
      {toastMsg && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 bg-[#1f2024] text-white text-xs sm:text-sm px-4 py-2.5 rounded shadow-lg transition-all animate-fade-in flex items-center gap-2"
        >
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ================= WISHLIST CONTENT ================= */}
      <section
        aria-label="Wishlist products"
        className="section-reveal-scale w-full bg-white py-12 sm:py-16 md:py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 sm:py-24">
              <p className="font-sans text-[14px] sm:text-[15px] md:text-[16px] text-brand-muted font-normal tracking-normal select-none mb-6">
                There are no products in wishlist
              </p>
              <Link
                to="/product"
                className="inline-block bg-[#1f2024] hover:bg-[#4f6b5a] text-white text-xs uppercase tracking-widest font-medium py-3 px-8 transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div>
              {/* Header Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
                <p className="text-sm text-neutral-600 font-medium">
                  Showing {wishlistItems.length} item{wishlistItems.length === 1 ? "" : "s"} in your wishlist
                </p>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs uppercase tracking-wider text-neutral-500 hover:text-red-600 font-medium transition-colors"
                >
                  Clear Wishlist
                </button>
              </div>

              {/* Desktop / Tablet Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                      <th className="py-4 pl-2 pr-4 w-12 text-center">Remove</th>
                      <th className="py-4 px-4">Product</th>
                      <th className="py-4 px-4 w-32">Unit Price</th>
                      <th className="py-4 px-4 w-36">Stock Status</th>
                      <th className="py-4 px-4 w-40 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {wishlistItems.map((item) => {
                      const itemUrl = `/products/${item.handle || item.id}`;
                      const itemImg = item.image || item.images?.[0]?.src || item.images?.[0] || "";
                      const inStock = item.inStock !== false;

                      return (
                        <tr key={item.handle || item.id} className="hover:bg-neutral-50/50 transition-colors">
                          {/* Remove */}
                          <td className="py-5 pl-2 pr-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemove(item)}
                              className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                              title="Remove item"
                              aria-label={`Remove ${item.title}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </td>

                          {/* Image & Title */}
                          <td className="py-5 px-4">
                            <div className="flex items-center gap-4">
                              <Link
                                to={itemUrl}
                                className="w-20 h-24 bg-neutral-100 shrink-0 overflow-hidden rounded-xs flex items-center justify-center border border-neutral-200/60"
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
                                  <span className="text-xs text-neutral-400">No Image</span>
                                )}
                              </Link>
                              <div>
                                <Link
                                  to={itemUrl}
                                  className="font-serif text-[#1f2024] hover:text-[#4f6b5a] text-base leading-snug font-normal transition-colors"
                                >
                                  {item.title}
                                </Link>
                              </div>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="py-5 px-4 font-sans text-sm font-medium text-neutral-800">
                            {formatPrice(item.price)}
                          </td>

                          {/* Stock Status */}
                          <td className="py-5 px-4 text-xs font-medium">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full ${
                                inStock
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-red-50 text-red-600 border border-red-200"
                              }`}
                            >
                              {inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </td>

                          {/* Action Button */}
                          <td className="py-5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleAddToCart(item)}
                              disabled={!inStock}
                              className={`inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium px-4 py-2.5 transition-colors duration-200 ${
                                inStock
                                  ? "bg-[#1f2024] hover:bg-[#4f6b5a] text-white cursor-pointer"
                                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                              }`}
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to cart</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="sm:hidden space-y-4">
                {wishlistItems.map((item) => {
                  const itemUrl = `/products/${item.handle || item.id}`;
                  const itemImg = item.image || item.images?.[0]?.src || item.images?.[0] || "";
                  const inStock = item.inStock !== false;

                  return (
                    <div
                      key={item.handle || item.id}
                      className="border border-neutral-200 p-4 rounded-xs relative flex flex-col gap-3"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemove(item)}
                        className="absolute top-3 right-3 text-neutral-400 hover:text-red-500 p-1"
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex gap-4">
                        <Link
                          to={itemUrl}
                          className="w-20 h-24 bg-neutral-100 shrink-0 overflow-hidden rounded-xs border border-neutral-200"
                        >
                          {itemImg && (
                            <img
                              src={itemImg}
                              alt={item.title}
                              width={80}
                              height={96}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </Link>
                        <div className="flex-1 pr-6">
                          <Link
                            to={itemUrl}
                            className="font-serif text-[#1f2024] text-base leading-snug line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          <div className="text-sm font-semibold text-neutral-800 mt-1">
                            {formatPrice(item.price)}
                          </div>
                          <div className="mt-1 text-xs">
                            <span className={inStock ? "text-emerald-600" : "text-red-500"}>
                              {inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        disabled={!inStock}
                        className={`w-full py-2.5 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 ${
                          inStock
                            ? "bg-[#1f2024] text-white active:bg-neutral-800"
                            : "bg-neutral-200 text-neutral-400"
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to cart</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Continue Shopping */}
              <div className="mt-10 flex justify-between items-center border-t border-neutral-200 pt-6">
                <Link
                  to="/product"
                  className="text-xs uppercase tracking-wider font-medium text-neutral-800 hover:text-[#4f6b5a] transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
});

export default Wishlist;
