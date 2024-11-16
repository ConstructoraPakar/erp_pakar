import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001, // Establecemos el puerto 3001 como predeterminado
    strictPort: true, // Esto hará que Vite falle si el puerto no está disponible en lugar de buscar otro
  }
})