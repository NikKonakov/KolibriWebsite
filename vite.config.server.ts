import { defineConfig } from "vite";
import path from "path";

/**
 * Build configuration for the optional self-hosted Node.js server
 * (server/node-build.ts → dist/server/node-build.mjs, run with `pnpm start`).
 * Vercel doesn't use it.
 */
export default defineConfig({
  // The server doesn't need its own copy of the site's images and icons.
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, "server/node-build.ts"),
      name: "server",
      fileName: "production",
      formats: ["es"],
    },
    outDir: "dist/server",
    target: "node22",
    ssr: true,
    rollupOptions: {
      // Node.js built-ins and Express are loaded at runtime, not bundled.
      external: [
        "fs",
        "path",
        "url",
        "http",
        "https",
        "os",
        "crypto",
        "stream",
        "util",
        "events",
        "buffer",
        "querystring",
        "child_process",
        "express",
      ],
      output: {
        format: "es",
        entryFileNames: "[name].mjs",
      },
    },
    minify: false, // Readable output makes server errors easier to debug.
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
