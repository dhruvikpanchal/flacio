import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import wishlistReducer from "./features/wishlistSlice";
import cartReducer from "./features/cartSlice";
import compareReducer from "./features/compareSlice";

// Safe Vite/ESM compatible localStorage adapter (prevents CJS storage.getItem is not a function error)
const storage = {
  getItem: (key) => {
    try {
      return Promise.resolve(
        typeof window !== "undefined" ? localStorage.getItem(key) : null
      );
    } catch {
      return Promise.resolve(null);
    }
  },
  setItem: (key, value) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
      }
      return Promise.resolve(value);
    } catch {
      return Promise.resolve();
    }
  },
  removeItem: (key) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
      return Promise.resolve();
    } catch {
      return Promise.resolve();
    }
  },
};

// Combine all slice reducers
const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  cart: cartReducer,
  compare: compareReducer,
});

// Configure redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["wishlist", "cart", "compare"], // slices to persist in localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types to prevent serializability warning
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
