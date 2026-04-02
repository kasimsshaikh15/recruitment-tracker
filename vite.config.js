import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Ensures React Router works on page refresh (404 fix)
  server: {
    historyApiFallback: true,
  },
  preview: {
    // For vite preview command
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Chunk splitting for better caching
        manualChunks: {
          firebase: ['firebase/app', 'firebase/firestore'],
          react:    ['react', 'react-dom'],
          router:   ['react-router-dom'],
          charts:   ['recharts'],
        }
      }
    }
  }
})
