import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['jsonwebtoken'], // Loại bỏ jsonwebtoken khỏi quá trình tối ưu hóa dependencies
  },
})
