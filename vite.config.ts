import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-core': ['react', 'react-dom', 'zustand'],
          'vendor-ui': [
            'lucide-react',
            '@dnd-kit/core',
            '@dnd-kit/sortable',
            '@dnd-kit/utilities',
            'clsx',
            'tailwind-merge',
            'react-colorful',
          ],
          'vendor-terminal': ['xterm', 'xterm-addon-fit'],
          'vendor-utils': [
            'colord',
            'colorthief',
            '@iarna/toml',
            'html2canvas',
            'node-vibrant',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
