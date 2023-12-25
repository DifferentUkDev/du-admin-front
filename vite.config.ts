import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "@pages": path.resolve(__dirname, 'src/pages'),
      "@layouts": path.resolve(__dirname, 'src/layouts'),
      "@features": path.resolve(__dirname, 'src/features'),
      "@components": path.resolve(__dirname, 'src/components'),
      "@services": path.resolve(__dirname, 'src/services'),
      "@store": path.resolve(__dirname, 'src/store'),
      "@utils": path.resolve(__dirname, 'src/utils'),
      "@styles": path.resolve(__dirname, 'src/styles'),
      "@assets": path.resolve(__dirname, 'src/assets'),
    },
  },
})
