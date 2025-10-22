import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: [
        "path",
        "os",
        "util"
      ],
      globals: {
        global: true,
        Buffer: true,
        process: true
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    coverage: {
      exclude: [
        ...configDefaults.coverage.exclude,
        "./src/index.jsx"
      ]
    }
  }
});
