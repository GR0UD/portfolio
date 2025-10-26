import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";

export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: "src/pages",
      extensions: ["jsx"],
    }),
  ],
  build: {
    target: "ES2020",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          toastify: ["react-toastify"],
        },
      },
    },
  },
  server: {
    port: 3000,
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
  },
});
