import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: "src/pages",
      extensions: ["tsx"],
    }),
  ],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "ES2020",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react-router-dom")) {
              return "vendor";
            }
            if (id.includes("react-toastify")) {
              return "toastify";
            }
            if (id.includes("react") && !id.includes("react-icons")) {
              return "vendor";
            }
            if (id.includes("react-icons")) {
              return "icons";
            }
          }
        },
        // Optimize chunk size warnings
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    // Enable chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Optimize asset inlining threshold
    assetsInlineLimit: 4096,
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
    strictPort: true,
    hmr: {
      overlay: true,
    },
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
  },
});
