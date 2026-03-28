import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  build: {
    // This prevents original source code from being visible in DevTools
    sourcemap: false,
    // This minifies the code to make it unreadable
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Removes console.logs for better privacy
        drop_debugger: true, // Removes debugger statements
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Additional console methods to remove
      },
      mangle: {
        properties: {
          regex: /^_[A-Za-z]/, // Mangle private properties (starting with _)
        },
      },
    },
    // Additional security options
    rollupOptions: {
      output: {
        // Sanitize file names to prevent information leakage
        entryFileNames: 'assets/[hash].js',
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
      },
    },
  },
  // Security: Prevent directory traversal
  server: {
    fs: {
      strict: true,
    },
  },
})
