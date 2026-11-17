import { createSlice } from "@reduxjs/toolkit";

const MAX_COMPARE = 4;

const initialState = {
  items: [],
  isOpen: false,
};

const matchesItem = (item, target) => {
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

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const product = action.payload;
      if (!product) return;

      const exists = state.items.some((item) => matchesItem(item, product));

      if (!exists) {
        if (state.items.length < MAX_COMPARE) {
          state.items.push(product);
        } else {
          // Replace the oldest item if max limit reached
          state.items.shift();
          state.items.push(product);
        }
      }
      state.isOpen = true;
    },

    removeFromCompare: (state, action) => {
      const target = action.payload;
      if (!target) return;
      state.items = state.items.filter((item) => !matchesItem(item, target));
    },

    toggleCompare: (state, action) => {
      const product = action.payload;
      if (!product) return;

      const existingIndex = state.items.findIndex((item) => matchesItem(item, product));

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        if (state.items.length < MAX_COMPARE) {
          state.items.push(product);
        } else {
          state.items.shift();
          state.items.push(product);
        }
        state.isOpen = true;
      }
    },

    setCompareOpen: (state, action) => {
      state.isOpen = Boolean(action.payload);
    },

    clearCompare: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCompare,
  removeFromCompare,
  toggleCompare,
  setCompareOpen,
  clearCompare,
} = compareSlice.actions;

export default compareSlice.reducer;


