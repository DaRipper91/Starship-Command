/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
export default defineConfig({
    plugins: [react()],
    // @ts-expect-error - Vitest types are not automatically merged into Vite config in this setup
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/setupTests.ts'],
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-core': [
                        'react',
                        'react-dom',
                        'zustand',
                        'clsx',
                        'tailwind-merge',
                    ],
                    'vendor-ui': [
                        'lucide-react',
                        '@dnd-kit/core',
                        '@dnd-kit/sortable',
                        '@dnd-kit/utilities',
                    ],
                    'vendor-utils': [
                        'colord',
                        'html2canvas',
                        '@iarna/toml',
                    ],
                    'vendor-terminal': ['xterm', 'xterm-addon-fit'],
                },
            },
        },
        chunkSizeWarningLimit: 400,
        reportCompressedSize: true,
    },
});
