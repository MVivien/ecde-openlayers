import { viteStaticCopy as copy } from "vite-plugin-static-copy";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    copy({
      targets: [{ src: "data/*", dest: "data" }],
    }),
    react(),
  ],
  base: "./",
  build: {
    sourcemap: true,
  },
});
