import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['gsap', 'framer-motion'],
          'ui-vendor': ['react-icons', 'react-helmet-async'],
          'utils-vendor': ['countup.js', 'react-intersection-observer'],
        },
      },
    },
    // Increase chunk size warning limit for large animation libraries
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging
    sourcemap: false,
    // Optimize for modern browsers
    target: 'es2020',
    // Enable minification
    minify: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'framer-motion'],
  },
  // Configure base for GitHub Pages
  base: '/',
});
