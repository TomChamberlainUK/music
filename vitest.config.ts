import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    conditions: mode === 'test' ? ['browser'] : [],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/unit/vitest-setup.ts'],
    coverage: {
      reportsDirectory: './tests/unit/coverage',
    },
    include: ['tests/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  },
}));
