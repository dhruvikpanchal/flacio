import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const getItemId = (item) => item?.id ?? item?.handle ?? item?.variantId;

const matchesItem = (item, target) => {
  if (!item || !target) return false;
  const targetId = typeof target === "object" ? getItemId(target) : target;
  const itemId = getItemId(item);

  // If both have color/size specified, match on those as well for true variant support
  if (typeof target === "object" && (target.color || target.selectedColor || target.size || target.selectedSize)) {
    const targetColor = target.color || target.selectedColor;
    const itemColor = item.color || item.selectedColor;
    const targetSize = target.size || target.selectedSize;
    const itemSize = item.size || item.selectedSize;

    return itemId === targetId && targetColor === itemColor && targetSize === itemSize;
  }

  return itemId === targetId;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      if (!product) return;

      const qty = Math.max(1, Number(product.quantity) || 1);
      const existingItem = state.items.find((item) => matchesItem(item, product));

      if (existingItem) {
        existingItem.quantity = (Number(existingItem.quantity) || 1) + qty;
      } else {
        state.items.push({
          ...product,
          id: getItemId(product),
          quantity: qty,
        });
      }
    },

    removeFromCart: (state, action) => {
      const target = action.payload;
      state.items = state.items.filter((item) => !matchesItem(item, target));
    },

    increaseQuantity: (state, action) => {
      const target = action.payload;
      const item = state.items.find((i) => matchesItem(i, target));
      if (item) {
        item.quantity = (Number(item.quantity) || 1) + 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const target = action.payload;
      const item = state.items.find((i) => matchesItem(i, target));
      if (item) {
        if ((Number(item.quantity) || 1) > 1) {
          item.quantity -= 1;
        } else {
          // If reduced below 1, remove item from cart
          state.items = state.items.filter((i) => !matchesItem(i, target));
        }
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload || {};
      const newQty = Number(quantity);
      if (newQty <= 0) {
        state.items = state.items.filter((item) => !matchesItem(item, id));
      } else {
        const item = state.items.find((i) => matchesItem(i, id));
        if (item) {
          item.quantity = newQty;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
