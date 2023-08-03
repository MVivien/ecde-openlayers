import react from '@vitejs/plugin-react';
import { viteStaticCopy as copy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    copy({
      targets: [{ src: 'data/*', dest: 'data' }],
    }),
    react(),
  ],
  base: './',
  build: {
    sourcemap: true,
  },
});
