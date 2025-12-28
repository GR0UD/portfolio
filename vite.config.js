import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import path from "path";

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
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          toastify: ["react-toastify"],
          icons: ["react-icons"],
        },
        // Optimize chunk size warnings
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    // Enable chunk size warnings
    chunkSizeWarningLimit: 500,
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
