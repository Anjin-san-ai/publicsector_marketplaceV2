import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config tuned for an S3 + CloudFront static deploy.
// Goals: small initial chunk, aggressive caching for vendor chunks, no console noise in prod.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Split rarely-changing vendor code into its own long-cached chunks.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-dom')) return 'react-dom';
          if (id.includes('/react/') || id.includes('scheduler')) return 'react';
          if (id.includes('react-router')) return 'router';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('react-markdown') || id.includes('remark') || id.includes('micromark') || id.includes('mdast')) return 'markdown';
          if (id.includes('dagre')) return 'graph';
          return 'vendor';
        },
        // Stable file names for long cache lifetimes (the workflow already sets
        // immutable cache-control for everything except index.html).
        entryFileNames:  'assets/[name]-[hash].js',
        chunkFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',
      },
    },
  },
  esbuild: {
    // Drop console.* + debugger statements from production bundles.
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
});
