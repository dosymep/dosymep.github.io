import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'src/assets',
  plugins: [preact(), svgr()],
  build: {
    outDir: 'public'
  }
})
