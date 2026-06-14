import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Runs the Vercel-style /api/tmp-features.ts handler inside the Vite dev
// server, so GitHub-backed persistence works with `npm run dev` too.
function tmpFeaturesApi(env) {
  return {
    name: "tmp-features-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/tmp-features")) {
          next();
          return;
        }

        if (env.GITHUB_TOKEN) {
          process.env.GITHUB_TOKEN = env.GITHUB_TOKEN;
        }

        try {
          if (req.method && req.method !== "GET") {
            const chunks = [];
            for await (const chunk of req) chunks.push(chunk);
            const raw = Buffer.concat(chunks).toString("utf-8");
            req.body = raw ? JSON.parse(raw) : {};
          }

          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
            return res;
          };

          const mod = await server.ssrLoadModule("/api/tmp-features.ts");
          await mod.default(req, res);
        } catch (err) {
          console.error("[tmp-features-api]", err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Internal error" }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      Pages({
        dirs: "src/pages",
        extensions: ["tsx"],
      }),
      tmpFeaturesApi(env),
    ],
    resolve: {
      alias: {
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: ["chrome87", "firefox78", "safari14", "edge88"],
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
      host: true,
      port: 3000,
      strictPort: true,
      hmr: {
        overlay: true,
      },
    },
  };
});
