import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
    cssTarget: 'chrome61',
    sourcemap: false,
    chunkSizeWarningLimit: 2000, // default 500
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
});
