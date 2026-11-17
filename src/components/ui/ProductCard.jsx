/**
 * ProductCard.jsx
 * React port of product-card.js: responsive card, Quick View modal,
 * Compare modal, wishlist (localStorage) and toast.
 * Styles: keep your existing ./product-card.css (unchanged).
 *
 * Usage:
 *   import { ProductGrid } from './ProductCard';
 *   <ProductGrid products={products} cols={3} collection="all"
 *                onAddToCart={(detail) => cart.add(detail)} />
 *
 * Product shape:
 *   { handle, title, price, comparePrice?, images: [url | {src, srcSet, sizes}],
 *     colors: [], sizes: [], rating, reviewCount, inStock, variantId,
 *     isGroup?, badge?, preOrder?, extraVariants?, url? }
 *
 * Events also fired on `document` (same as the vanilla version):
 *   pc:add-to-cart, pc:wishlist-change, pc:compare-change
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartAction } from "../../redux/features/cartSlice";
import { toggleWishlist as toggleWishlistAction } from "../../redux/features/wishlistSlice";
import {
  addToCompare as addToCompareAction,
  removeFromCompare as removeFromCompareAction,
  setCompareOpen as setCompareOpenAction,
} from "../../redux/features/compareSlice";
import "../../styles/product-card.css";

/* ------------------------------------------------------------------ *
 * Config + helpers
 * ------------------------------------------------------------------ */
const VENDOR = "Lulu Store";
const SHORT_DESCRIPTION = "A short description of the product goes here.";
const CARD_SIZES = "(max-width:479px) 100vw, (max-width:991px) 50vw, 360px";
const QV_SIZES = "(max-width:767px) 100vw, 560px";

const formatPrice = (n) => `$${Number(n).toFixed(2)}`;
const discountPercent = (p) => Math.round((1 - p.price / p.comparePrice) * 100);
const productUrl = (p) => p.url || `/products/${p.handle}`;
const emit = (name, detail) =>
  document.dispatchEvent(new CustomEvent(name, { detail }));

const img = (image) => (typeof image === "string" ? { src: image } : image);

const SWATCH = {
  Black: "#111",
  Blue: "#2f6fed",
  Grey: "#808080",
  Orange: "#ff8c00",
  Pink: "#ffc0cb",
  Red: "#ee2222",
  White: "#fff",
  Plaid:
    "repeating-linear-gradient(0deg,#c33 0 3px,transparent 3px 6px),repeating-linear-gradient(90deg,#369 0 3px,#eee 3px 6px)",
  Floral:
    "radial-gradient(circle at 30% 30%,#f7a 0 25%,transparent 26%),radial-gradient(circle at 70% 70%,#fc6 0 25%,transparent 26%),#cfe8c8",
  Geometric: "conic-gradient(#234 0 25%,#eee 0 50%,#234 0 75%,#eee 0)",
  Striped: "repeating-linear-gradient(45deg,#333 0 4px,#eee 4px 8px)",
};

/* ------------------------------------------------------------------ *
 * Icons
 * ------------------------------------------------------------------ */
const ICONS = {
  heart: (
    <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.6 4.5c2 0 3.5 1 5.4 3 1.9-2 3.4-3 5.4-3 3.6 0 5.7 3.8 4.2 7.3C19.5 16.4 12 21 12 21z" />
  ),
  compare: <path d="M8 20V4M8 4 4 8M8 4l4 4M16 4v16M16 20l-4-4M16 20l4-4" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.5-4.5" />
    </>
  ),
  bag: (
    <>
      <path d="M6 7h12l1 13H5L6 7z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </>
  ),
  prev: <path d="M15 6l-6 6 6 6" />,
  next: <path d="M9 6l6 6-6 6" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  cross: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

function Icon({ name, size = 20 }) {
  return (
    <svg
      className="pc-i"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

function Star({ on }) {
  return (
    <svg
      className={`pc-star${on ? " is-on" : ""}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l3.1 6.6 7.2.9-5.3 5 1.4 7.2L12 18l-6.4 3.7 1.4-7.2-5.3-5 7.2-.9L12 2z" />
    </svg>
  );
}

function Swatch({ color, active, onClick }) {
  return (
    <button
      type="button"
      className={`pc-swatch${active ? " is-active" : ""}`}
      style={{ background: SWATCH[color] || "#ccc" }}
      title={color}
      aria-label={color}
      onClick={onClick}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Hooks
 * ------------------------------------------------------------------ */
/** Image index with prev/next and touch swipe. */
function useSlider(count) {
  const [idx, setIdx] = useState(0);
  const startX = useRef(null);
  const swiped = useRef(false);

  const go = useCallback(
    (dir) => setIdx((i) => (i + dir + count) % count),
    [count],
  );

  const touch = {
    onTouchStart: (e) => {
      startX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e) => {
      if (startX.current == null || count < 2) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      startX.current = null;
      if (Math.abs(dx) < 40) return;
      swiped.current = true;
      setTimeout(() => {
        swiped.current = false;
      }, 350);
      go(dx < 0 ? 1 : -1);
    },
    // swallow the click that follows a swipe so the link does not open
    onClickCapture: (e) => {
      if (swiped.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
  };
  return { idx, setIdx, go, touch };
}

/* ------------------------------------------------------------------ *
 * Card
 * ------------------------------------------------------------------ */
export function ProductCard({
  product: p,
  collection = "all",
  wishlisted,
  compared = false,
  onWishlist,
  onCompare,
  onQuickView,
  onAddToCart,
}) {
  const dispatch = useDispatch();
  const reduxWishlist = useSelector((state) => state?.wishlist?.items || []);
  const reduxCompare = useSelector((state) => state?.compare?.items || []);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);
  const { idx, go, touch } = useSlider(p.images.length);

  const sold = !p.inStock;
  const url = productUrl(p);
  const image = img(p.images[idx]);

  const isReduxWishlisted = useMemo(
    () =>
      reduxWishlist.some(
        (w) =>
          (w.handle && p.handle && String(w.handle) === String(p.handle)) ||
          (w.id !== undefined &&
            p.handle &&
            String(w.id) === String(p.handle)) ||
          (w.id !== undefined &&
            p.id !== undefined &&
            String(w.id) === String(p.id)) ||
          (w.handle && p.id !== undefined && String(w.handle) === String(p.id)),
      ),
    [reduxWishlist, p.handle, p.id],
  );
  const isWishlisted =
    wishlisted !== undefined ? wishlisted : isReduxWishlisted;

  const isReduxCompared = useMemo(
    () =>
      reduxCompare.some(
        (c) =>
          (c.handle && p.handle && String(c.handle) === String(p.handle)) ||
          (c.id !== undefined &&
            p.handle &&
            String(c.id) === String(p.handle)) ||
          (c.id !== undefined &&
            p.id !== undefined &&
            String(c.id) === String(p.id)) ||
          (c.handle && p.id !== undefined && String(c.handle) === String(p.id)),
      ),
    [reduxCompare, p.handle, p.id],
  );
  const isCompared = compared !== undefined ? compared : isReduxCompared;

  const handleWishlistClick = () => {
    if (onWishlist) {
      onWishlist(p);
    } else {
      const payload = {
        id: p.id || p.handle,
        handle: p.handle,
        title: p.title,
        price: p.price,
        comparePrice: p.comparePrice,
        image:
          image?.src ||
          p.image ||
          (typeof p.images?.[0] === "string" ? p.images[0] : ""),
        inStock: p.inStock !== false,
      };
      dispatch(toggleWishlistAction(payload));
      emit("pc:wishlist-change", { handle: p.handle, active: !isWishlisted });
    }
  };

  const handleCompareClick = () => {
    if (onCompare) {
      onCompare(p);
    } else {
      const payload = {
        id: p.id || p.handle,
        handle: p.handle,
        title: p.title,
        price: p.price,
        comparePrice: p.comparePrice,
        image:
          image?.src ||
          p.image ||
          (typeof p.images?.[0] === "string" ? p.images[0] : ""),
        images: p.images || [],
        colors: p.colors || [],
        sizes: p.sizes || [],
        rating: p.rating || 0,
        inStock: p.inStock !== false,
        variantId: p.variantId,
        url: url,
      };
      dispatch(addToCompareAction(payload));
      emit("pc:compare-change", { product: payload });
    }
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(p, 1, p.colors?.[color] ?? null);
    } else {
      const payload = {
        id: p.id || p.handle,
        handle: p.handle,
        variantId: p.variantId,
        title: p.title,
        price: p.price,
        comparePrice: p.comparePrice,
        image:
          image?.src ||
          p.image ||
          (typeof p.images?.[0] === "string" ? p.images[0] : ""),
        quantity: 1,
        color: p.colors?.[color] ?? null,
      };
      dispatch(addToCartAction(payload));
      emit("pc:add-to-cart", { handle: p.handle, product: p });
    }
  };

  let badge = null;
  if (sold)
    badge = <span className="pc-badge pc-badge--sold">Out of stock</span>;
  else if (p.badge)
    badge = (
      <span className="pc-badge">{String(p.badge).replace(/^-/, "- ")}</span>
    );
  else if (p.comparePrice)
    badge = <span className="pc-badge">- {discountPercent(p)}%</span>;

  const extra = p.extraVariants ? (
    <span className="pc-more">+{p.extraVariants}</span>
  ) : null;
  const showCartLink = p.isGroup || !p.variantId;

  return (
    <article
      className={`pc-card${sold ? " is-sold" : ""}`}
      data-handle={p.handle}
      data-collection={collection}
    >
      <div className="pc-card__media" {...touch}>
        <Link className="pc-card__link" to={url} aria-label={p.title}>
          <img
            className="pc-card__img"
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.srcSet ? CARD_SIZES : undefined}
            alt={p.title}
            width={600}
            height={700}
            loading="lazy"
            decoding="async"
          />
        </Link>
        {badge}

        {p.images.length > 1 && (
          <>
            <button
              type="button"
              className="pc-nav pc-nav--prev"
              aria-label="Previous image"
              onClick={() => go(-1)}
            >
              <Icon name="prev" size={16} />
            </button>
            <button
              type="button"
              className="pc-nav pc-nav--next"
              aria-label="Next image"
              onClick={() => go(1)}
            >
              <Icon name="next" size={16} />
            </button>
          </>
        )}

        <div className="pc-card__actions">
          {!sold &&
            (showCartLink ? (
              <Link
                className="pc-icon-btn"
                to={url}
                title="View Product"
                aria-label="View Product"
              >
                <Icon name="arrow" />
              </Link>
            ) : (
              <button
                type="button"
                className="pc-icon-btn"
                title="Add to Cart"
                aria-label="Add to Cart"
                onClick={handleAddToCartClick}
              >
                <Icon name="bag" />
              </button>
            ))}
          <button
            type="button"
            className={`pc-icon-btn${isWishlisted ? " is-active" : ""}`}
            aria-pressed={isWishlisted}
            title="Wishlist"
            aria-label="Wishlist"
            onClick={handleWishlistClick}
          >
            <Icon name="heart" />
          </button>
          <button
            type="button"
            className={`pc-icon-btn${isCompared ? " is-active" : ""}`}
            aria-pressed={isCompared}
            title="Compare"
            aria-label="Compare"
            data-action="compare"
            onClick={handleCompareClick}
          >
            <Icon name="compare" />
          </button>
          <button
            type="button"
            className="pc-icon-btn"
            title="Quick View"
            aria-label="Quick View"
            onClick={() => onQuickView?.(p)}
          >
            <Icon name="search" />
          </button>
        </div>
      </div>

      <div className="pc-card__body">
        <div
          className="pc-stars"
          role="img"
          aria-label={`${p.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} on={i < Math.round(p.rating)} />
          ))}
          {p.reviewCount ? (
            <span className="pc-stars__count">({p.reviewCount})</span>
          ) : null}
        </div>

        <h3 className="pc-card__title">
          <Link to={url}>{p.title}</Link>
        </h3>

        <div className="pc-price">
          {p.comparePrice ? (
            <>
              <del className="pc-price__old">{formatPrice(p.comparePrice)}</del>
              <span className="pc-price__now pc-price__now--sale">
                {formatPrice(p.price)}
              </span>
            </>
          ) : (
            <span className="pc-price__now">{formatPrice(p.price)}</span>
          )}
        </div>
        {p.preOrder && <div className="pc-preorder">( Pre-order )</div>}

        {(p.shortDescription || p.description) && (
          <p className="pc-card__desc">
            {typeof p.shortDescription === "string"
              ? p.shortDescription
              : typeof p.description === "string"
                ? p.description.replace(/<[^>]*>/g, "")
                : ""}
          </p>
        )}

        {p.colors?.length > 0 && (
          <div className="pc-options">
            {p.colors.map((c, i) => (
              <Swatch
                key={c}
                color={c}
                active={i === color}
                onClick={() => setColor(i)}
              />
            ))}
            {extra}
          </div>
        )}
        {p.sizes?.length > 0 && (
          <div className="pc-options">
            {p.sizes.map((s, i) => (
              <button
                key={s}
                type="button"
                className={`pc-size${i === size ? " is-active" : ""}`}
                onClick={() => setSize(i)}
              >
                {s}
              </button>
            ))}
            {extra}
          </div>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Modal shell
 * ------------------------------------------------------------------ */
function Modal({ type, onClose, children, showClose = true }) {
  useEffect(() => {
    document.documentElement.classList.add("pc-lock");
    return () => document.documentElement.classList.remove("pc-lock");
  }, []);

  return createPortal(
    <div className="pc-modal" data-type={type} role="dialog" aria-modal="true">
      <div className="pc-modal__backdrop" onClick={onClose} />
      <div className="pc-modal__dialog">
        {showClose && (
          <button
            type="button"
            className="pc-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <Icon name="close" />
          </button>
        )}
        <div className="pc-modal__content">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

/* ------------------------------------------------------------------ *
 * Quick view
 * ------------------------------------------------------------------ */
function QuickView({ product: p, onClose, onAddToCart }) {
  const imagesList = p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : []);
  const { idx, go, touch } = useSlider(imagesList.length || 1);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);
  const [qty, setQty] = useState(1);
  const sold = !p.inStock;
  const image = imagesList[idx] ? img(imagesList[idx]) : { src: "" };
  const canBuy = !sold && p.variantId && !p.isGroup;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <Modal type="quickview" onClose={onClose}>
      <div className="pc-qv" data-handle={p.handle}>
        <div className="pc-qv__media" {...touch}>
          <img
            className="pc-qv__img"
            src={image?.src || ""}
            srcSet={image?.srcSet}
            sizes={image?.srcSet ? QV_SIZES : undefined}
            alt={p.title}
            width={600}
            height={700}
            loading="lazy"
            decoding="async"
          />
          {imagesList.length > 1 && (
            <>
              <button
                type="button"
                className="pc-nav pc-nav--prev is-round"
                aria-label="Previous image"
                onClick={() => go(-1)}
              >
                <Icon name="prev" size={18} />
              </button>
              <button
                type="button"
                className="pc-nav pc-nav--next is-round"
                aria-label="Next image"
                onClick={() => go(1)}
              >
                <Icon name="next" size={18} />
              </button>
            </>
          )}
        </div>

        <div className="pc-qv__body">
          <h2 className="pc-qv__title">{p.title}</h2>
          <div className="pc-qv__vendor">
            By <span>{VENDOR}</span>
          </div>
          <div className="pc-qv__price">
            {p.comparePrice && (
              <>
                <del className="pc-price__old">
                  {formatPrice(p.comparePrice)}
                </del>{" "}
              </>
            )}
            {formatPrice(p.price)}
          </div>
          <hr />
          <p className="pc-qv__desc">{SHORT_DESCRIPTION}</p>

          {p.colors?.length > 0 && (
            <div className="pc-qv__row">
              <span className="pc-qv__label">
                Color: <span className="pc-qv__color">{p.colors[color]}</span>
              </span>
              <div className="pc-options pc-options--lg">
                {p.colors.map((c, i) => (
                  <Swatch
                    key={c}
                    color={c}
                    active={i === color}
                    onClick={() => setColor(i)}
                  />
                ))}
              </div>
            </div>
          )}
          {p.sizes?.length > 0 && (
            <div className="pc-qv__row">
              <span className="pc-qv__label">Size</span>
              <div className="pc-options pc-options--lg">
                {p.sizes.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    className={`pc-size${i === size ? " is-active" : ""}`}
                    onClick={() => setSize(i)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={`pc-stock ${sold ? "pc-stock--no" : "pc-stock--ok"}`}>
            <Icon name={sold ? "cross" : "check"} size={18} />{" "}
            {sold ? "Out of stock" : "In stock"}
          </div>

          {sold ? null : canBuy ? (
            <div className="pc-buy">
              <div className="pc-qty">
                <label
                  htmlFor={`pc-qty-${p?.id || p?.handle || "input"}`}
                  className="sr-only"
                >
                  Quantity
                </label>
                <button
                  type="button"
                  aria-label="Decrease"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Icon name="minus" size={16} />
                </button>
                <input
                  id={`pc-qty-${p?.id || p?.handle || "input"}`}
                  name="quantity"
                  type="number"
                  autoComplete="off"
                  className="pc-qty__input"
                  min="1"
                  value={qty}
                  aria-label="Quantity"
                  onChange={(e) =>
                    setQty(Math.max(1, parseInt(e.target.value, 10) || 1))
                  }
                />
                <button
                  type="button"
                  aria-label="Increase"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <Icon name="plus" size={16} />
                </button>
              </div>
              <button
                type="button"
                className="pc-btn"
                onClick={() => onAddToCart(p, qty, p.colors?.[color] ?? null)}
              >
                Add to cart
              </button>
            </div>
          ) : (
            <div className="pc-buy">
              <Link className="pc-btn" to={productUrl(p)}>
                View Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ *
 * Compare
 * ------------------------------------------------------------------ */
function Compare({ items = [], onRemove, onClear, onClose, onAddToCart }) {
  return (
    <Modal type="compare" onClose={onClose} showClose={false}>
      {/* Sticky Top Header */}
      <div className="pc-cmp-header">
        <div className="pc-cmp-header__left">
          <h2 className="pc-cmp-header__title">Compare Products</h2>
          <span className="pc-cmp-header__badge">
            {items.length} {items.length === 1 ? "Product" : "Products"}
          </span>
        </div>
        <div className="pc-cmp-header__actions">
          {items.length > 1 && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="pc-cmp-header__clear"
              title="Clear all products from comparison"
            >
              Clear all
            </button>
          )}
          <button
            type="button"
            className="pc-cmp-header__close"
            aria-label="Close compare modal"
            onClick={onClose}
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="pc-cmp-empty">
          <div className="pc-cmp-empty__icon">
            <Icon name="compare" size={24} />
          </div>
          <h3 className="pc-cmp-empty__title">No products to compare</h3>
          <p className="pc-cmp-empty__desc">
            Add products to see a side-by-side comparison of features, prices, and availability.
          </p>
          <Link
            to="/product"
            onClick={onClose}
            className="pc-btn pc-cmp-empty__btn"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="pc-cmp-wrap">
          <table className="pc-cmp">
            <tbody>
              {/* Product Info Row */}
              <tr>
                <th scope="row">Product</th>
                {items.map((p) => {
                  const productImg =
                    p.image ||
                    img(p.images?.[0])?.src ||
                    (typeof p.images?.[0] === "string" ? p.images[0] : "") ||
                    "";
                  return (
                    <td key={p.handle || p.id} className="pc-cmp__product">
                      <div className="pc-cmp__top-actions">
                        <button
                          type="button"
                          className="pc-cmp__remove-btn"
                          onClick={() => onRemove(p)}
                          title={`Remove ${p.title}`}
                        >
                          <Icon name="close" size={12} />
                          <span>Remove</span>
                        </button>
                      </div>
                      <Link
                        to={productUrl(p)}
                        onClick={onClose}
                        className="pc-cmp__img-link"
                      >
                        {productImg ? (
                          <img
                            src={productImg}
                            alt={p.title}
                            width={140}
                            height={175}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="pc-cmp__no-img">No Image</div>
                        )}
                      </Link>
                      <Link
                        to={productUrl(p)}
                        onClick={onClose}
                        className="pc-cmp__title-link"
                      >
                        {p.title}
                      </Link>
                    </td>
                  );
                })}
              </tr>

              {/* Price Row */}
              <tr>
                <th scope="row">Price</th>
                {items.map((p) => (
                  <td key={p.handle || p.id} className="pc-cmp__price">
                    {p.comparePrice && (
                      <del className="pc-price__old">
                        {formatPrice(p.comparePrice)}
                      </del>
                    )}
                    <span className="pc-price__current">
                      {formatPrice(p.price)}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Availability Row */}
              <tr>
                <th scope="row">Availability</th>
                {items.map((p) => (
                  <td key={p.handle || p.id} className="pc-cmp__stock">
                    <span
                      className={`pc-stock-badge ${
                        p.inStock !== false ? "pc-stock-badge--ok" : "pc-stock-badge--no"
                      }`}
                    >
                      <Icon
                        name={p.inStock !== false ? "check" : "cross"}
                        size={13}
                      />
                      <span>
                        {p.inStock !== false ? "In stock" : "Out of stock"}
                      </span>
                    </span>
                  </td>
                ))}
              </tr>

              {/* Variants / Colors Row */}
              <tr>
                <th scope="row">Colors</th>
                {items.map((p) => (
                  <td key={p.handle || p.id} className="pc-cmp__variants">
                    {p.colors && p.colors.length > 0 ? (
                      <div className="pc-options pc-options--center">
                        {p.colors.map((c) => (
                          <Swatch key={c} color={c} />
                        ))}
                      </div>
                    ) : (
                      <span className="pc-cmp__dash">—</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Action Row */}
              <tr className="pc-cmp__action-row">
                <th scope="row">Action</th>
                {items.map((p) => (
                  <td key={p.handle || p.id} className="pc-cmp__action-cell">
                    {p.inStock !== false && p.variantId && !p.isGroup ? (
                      <button
                        type="button"
                        className="pc-btn"
                        onClick={() => onAddToCart(p, 1, null)}
                      >
                        Add to cart
                      </button>
                    ) : p.inStock !== false ? (
                      <Link
                        className="pc-btn"
                        to={productUrl(p)}
                        onClick={onClose}
                      >
                        View Product
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="pc-btn pc-btn--disabled"
                      >
                        Out of stock
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}

/* ------------------------------------------------------------------ *
 * Toast
 * ------------------------------------------------------------------ */
function useToast() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const timer = useRef(null);
  const toast = useCallback((m) => {
    setMsg(m);
    setShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2200);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  const node = createPortal(
    <div className={`pc-toast${show ? " is-show" : ""}`} role="status">
      {msg}
    </div>,
    document.body,
  );
  return [toast, node];
}

/* ------------------------------------------------------------------ *
 * Grid (owns wishlist / compare / quick view state)
 * ------------------------------------------------------------------ */
export function ProductGrid({
  products,
  cols = 3,
  collection = "all",
  onAddToCart,
  onWishlist,
  onCompare,
}) {
  const dispatch = useDispatch();
  const reduxWishlist = useSelector((state) => state?.wishlist?.items || []);
  const reduxCompare = useSelector((state) => state?.compare?.items || []);
  const reduxCompareOpen = useSelector(
    (state) => state?.compare?.isOpen || false,
  );
  const [quick, setQuick] = useState(null); // product
  const [toast, toastNode] = useToast();

  const addToCart = useCallback(
    (p, quantity = 1, color = null) => {
      const detail = {
        id: p.id || p.handle,
        handle: p.handle,
        variantId: p.variantId,
        title: p.title,
        price: p.price,
        comparePrice: p.comparePrice,
        image:
          p.images?.[0]?.src ||
          p.image ||
          (typeof p.images?.[0] === "string" ? p.images[0] : ""),
        quantity,
        color,
        product: p,
      };
      if (onAddToCart) {
        onAddToCart(detail);
      } else {
        dispatch(addToCartAction(detail));
      }
      emit("pc:add-to-cart", detail);
      toast("Added to cart");
    },
    [dispatch, onAddToCart, toast],
  );

  const toggleWishlist = useCallback(
    (p) => {
      const isWishlisted = reduxWishlist.some(
        (w) =>
          (w.handle && p.handle && String(w.handle) === String(p.handle)) ||
          (w.id !== undefined &&
            p.handle &&
            String(w.id) === String(p.handle)) ||
          (w.id !== undefined &&
            p.id !== undefined &&
            String(w.id) === String(p.id)) ||
          (w.handle && p.id !== undefined && String(w.handle) === String(p.id)),
      );
      const productPayload = {
        id: p.id || p.handle,
        handle: p.handle,
        title: p.title,
        price: p.price,
        comparePrice: p.comparePrice,
        image:
          p.images?.[0]?.src ||
          p.image ||
          (typeof p.images?.[0] === "string" ? p.images[0] : ""),
        inStock: p.inStock !== false,
      };
      if (onWishlist) {
        onWishlist(productPayload);
      } else {
        dispatch(toggleWishlistAction(productPayload));
      }
      emit("pc:wishlist-change", { handle: p.handle, active: !isWishlisted });
      toast(!isWishlisted ? "Added to wishlist" : "Removed from wishlist");
    },
    [reduxWishlist, dispatch, onWishlist, toast],
  );

  const addToCompare = useCallback(
    (p) => {
      const payload = {
        id: p.id || p.handle,
        handle: p.handle,
        title: p.title,
        price: p.price,
        comparePrice: p.comparePrice,
        image:
          p.images?.[0]?.src ||
          p.image ||
          (typeof p.images?.[0] === "string" ? p.images[0] : ""),
        images: p.images || [],
        colors: p.colors || [],
        sizes: p.sizes || [],
        rating: p.rating || 0,
        inStock: p.inStock !== false,
        variantId: p.variantId,
        url: p.url || `/products/${p.handle}`,
      };
      if (onCompare) {
        onCompare(payload);
      } else {
        dispatch(addToCompareAction(payload));
      }
      emit("pc:compare-change", { product: payload });
    },
    [dispatch, onCompare],
  );

  const removeFromCompare = useCallback(
    (p) => {
      dispatch(removeFromCompareAction(p.id || p.handle));
      emit("pc:compare-change", { removed: p.handle });
    },
    [dispatch],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setQuick(null);
        dispatch(setCompareOpenAction(false));
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dispatch]);

  return (
    <>
      <div className="pc-grid" data-cols={cols}>
        {products.map((p) => (
          <ProductCard
            key={p.handle}
            product={p}
            collection={collection}
            wishlisted={reduxWishlist.some(
              (w) =>
                (w.handle &&
                  p.handle &&
                  String(w.handle) === String(p.handle)) ||
                (w.id !== undefined &&
                  p.handle &&
                  String(w.id) === String(p.handle)) ||
                (w.id !== undefined &&
                  p.id !== undefined &&
                  String(w.id) === String(p.id)) ||
                (w.handle &&
                  p.id !== undefined &&
                  String(w.handle) === String(p.id)),
            )}
            compared={reduxCompare.some(
              (c) =>
                (c.handle &&
                  p.handle &&
                  String(c.handle) === String(p.handle)) ||
                (c.id !== undefined &&
                  p.handle &&
                  String(c.id) === String(p.handle)) ||
                (c.id !== undefined &&
                  p.id !== undefined &&
                  String(c.id) === String(p.id)) ||
                (c.handle &&
                  p.id !== undefined &&
                  String(c.handle) === String(p.id)),
            )}
            onWishlist={toggleWishlist}
            onCompare={addToCompare}
            onQuickView={setQuick}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {quick && (
        <QuickView
          product={quick}
          onClose={() => setQuick(null)}
          onAddToCart={addToCart}
        />
      )}
      {reduxCompareOpen && reduxCompare.length > 0 && (
        <Compare
          items={reduxCompare}
          onRemove={removeFromCompare}
          onClose={() => dispatch(setCompareOpenAction(false))}
          onAddToCart={addToCart}
        />
      )}
      {toastNode}
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Demo (default export) — replace with your own data
 * ------------------------------------------------------------------ */
const ph = (a, b, label) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="855" viewBox="0 0 720 855"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="720" height="855" fill="url(#g)"/><text x="360" y="440" font-family="sans-serif" font-size="44" fill="rgba(255,255,255,.85)" text-anchor="middle">${label}</text></svg>`,
  );

const DEMO_PRODUCTS = [
  {
    handle: "linen-overshirt",
    title: "Linen Overshirt",
    price: 59,
    comparePrice: 79,
    rating: 4,
    reviewCount: 18,
    colors: ["Black", "Blue", "Grey"],
    sizes: [],
    inStock: true,
    variantId: 1,
    images: [
      ph("#6b7a99", "#2f3a55", "Linen Overshirt"),
      ph("#99806b", "#55432f", "Back view"),
    ],
  },
  {
    handle: "canvas-tote",
    title: "Everyday Canvas Tote",
    price: 34,
    rating: 5,
    reviewCount: 42,
    colors: ["White", "Pink", "Red"],
    sizes: ["S", "M", "L"],
    inStock: true,
    variantId: 2,
    images: [ph("#c9a89a", "#8a5a4a", "Canvas Tote")],
  },
  {
    handle: "wool-scarf",
    title: "Wool Winter Scarf",
    price: 28,
    rating: 3,
    reviewCount: 0,
    colors: ["Grey"],
    sizes: [],
    inStock: false,
    variantId: 3,
    images: [ph("#9aa6a0", "#56635d", "Wool Scarf")],
  },
];

export { QuickView, Compare, Modal };

export default function App() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "24px 16px 60px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <ProductGrid
        products={DEMO_PRODUCTS}
        cols={3}
        onAddToCart={(d) => console.log("add to cart", d)}
      />
    </div>
  );
}
