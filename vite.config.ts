/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'src/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
  },
})
