import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { alphaTab } from '@coderline/alphatab/vite';

export default defineConfig({
  plugins: [react(), alphaTab()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
