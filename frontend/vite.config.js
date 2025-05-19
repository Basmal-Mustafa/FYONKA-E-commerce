import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
    "@": path.resolve(__dirname, "src"),
    },
  },
});

// add a proxy to forward requests to backend
//  axios.get('/api/auth/login')  go to localhost:5000/api/auth/login