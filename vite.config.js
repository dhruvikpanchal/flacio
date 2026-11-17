import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.jxl"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  build: {
    target: "es2022",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, "/");
          if (normalized.includes("/node_modules/")) {
            // Lucide icons chunk
            if (normalized.includes("/node_modules/lucide-react/")) {
              return "vendor-icons";
            }
            // Carousel engines (Swiper & Embla)
            if (
              normalized.includes("/node_modules/swiper/") ||
              normalized.includes("/node_modules/embla-carousel")
            ) {
              return "vendor-carousel";
            }
            // Motion library
            if (normalized.includes("/node_modules/motion/")) {
              return "vendor-motion";
            }
            // Router chunk
            if (normalized.includes("/node_modules/react-router")) {
              return "vendor-router";
            }
            // Redux & state persistence chunk
            if (
              normalized.includes("/node_modules/@reduxjs/") ||
              normalized.includes("/node_modules/react-redux/") ||
              normalized.includes("/node_modules/redux-persist/")
            ) {
              return "vendor-redux";
            }
            // Core React runtime
            if (
              normalized.includes("/node_modules/react/") ||
              normalized.includes("/node_modules/react-dom/") ||
              normalized.includes("/node_modules/scheduler/")
            ) {
              return "vendor-react";
            }
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
