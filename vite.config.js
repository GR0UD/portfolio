import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';

export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: 'src/pages',
      extensions: ['jsx'],
    }),
  ],
});
