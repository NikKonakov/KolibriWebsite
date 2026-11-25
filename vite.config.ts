import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { securityHeaders } from "./shared/security-headers";

/**
 * Vite configuration for the website: the browser bundle, the SSR bundle used
 * to prerender pages (scripts/prerender.mjs), the dev server and `vite preview`.
 * https://vitejs.dev/config/
 */
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [".", "./client", "./shared"],
      // Never let the dev server hand out secrets or server code.
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  // `pnpm build && npx vite preview` serves the production build with the
  // same security headers as Vercel, so a too-strict policy shows up locally.
  // Not applied to the dev server: its hot reload relies on inline scripts.
  preview: {
    headers: securityHeaders,
  },
  build: {
    outDir: "dist/spa",
  },
  define: {
    // Same value in the prerendered HTML and in the browser bundle.
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});

/**
 * Mounts the Express API (server/index.ts) inside the Vite dev server, so
 * `pnpm dev` serves the website and /api/* on one port. Development only:
 * production builds are static files.
 */
function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      // Imported lazily so production builds never load server code.
      import("./server/index.js").then(({ createServer }) => {
        server.middlewares.use(createServer());
      });
    },
  };
}
