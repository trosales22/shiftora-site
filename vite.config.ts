import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss(), react(), tsconfigPaths()],
  resolve: {
    alias: {
      src: path.resolve('src/'),
      assets: path.resolve('src/assets'),
      data: path.resolve('src/data'),
      components: path.resolve('src/components'),
      utils: path.resolve('src/utils'),
    },
  },
});
