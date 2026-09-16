import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  build:
    command === "build"
      ? {
          lib: {
            entry: {
              index: resolve(import.meta.dirname, "src/index.ts"),
              registry: resolve(import.meta.dirname, "src/registry/index.ts"),
              theme: resolve(import.meta.dirname, "src/theme/index.ts"),
            },
            formats: ["es"],
          },
          rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
              assetFileNames: (assetInfo) =>
                assetInfo.name?.endsWith(".css") ? "styles.css" : "assets/[name][extname]",
              entryFileNames: "[name].js",
              chunkFileNames: "chunks/[name]-[hash].js",
            },
          },
          sourcemap: true,
        }
      : undefined,
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/catalog/**", "src/**/*.stories.tsx"],
    },
  },
}));
