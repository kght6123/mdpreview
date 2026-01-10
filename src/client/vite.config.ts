import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/mdpreview/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    'import.meta.env.VITE_STATIC_MODE':
      mode === 'production' ? '"true"' : '"false"',
  },
}));
