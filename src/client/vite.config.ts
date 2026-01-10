import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  const isStaticBuild = process.env.STATIC_BUILD === 'true';

  return {
    plugins: [react()],
    base: isStaticBuild ? process.env.BASE_PATH || '/mdpreview/' : '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    define: {
      'import.meta.env.VITE_STATIC_MODE': isStaticBuild ? '"true"' : '"false"',
    },
  };
});
