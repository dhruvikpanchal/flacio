import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const matchesProduct = (item, target) => {
  if (!item || !target) return false;
  const targetId = typeof target === "object" ? (target.id ?? target.handle) : target;
  const targetHandle = typeof target === "object" ? target.handle : null;

  if (targetId !== undefined && targetId !== null) {
    if (item.id !== undefined && item.id !== null && String(item.id) === String(targetId)) return true;
    if (item.handle && String(item.handle) === String(targetId)) return true;
  }
  if (targetHandle) {
    if (item.handle && String(item.handle) === String(targetHandle)) return true;
    if (item.id !== undefined && item.id !== null && String(item.id) === String(targetHandle)) return true;
  }
  return false;
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!product) return;
      const exists = state.items.some((item) => matchesProduct(item, product));
      if (!exists) {
        state.items.push(product);
      }
    },

    removeFromWishlist: (state, action) => {
      const target = action.payload;
      if (!target) return;
      state.items = state.items.filter((item) => !matchesProduct(item, target));
    },

    toggleWishlist: (state, action) => {
      const product = action.payload;
      if (!product) return;
      const existingIndex = state.items.findIndex((item) => matchesProduct(item, product));

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(product);
      }
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;

