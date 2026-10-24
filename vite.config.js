import { defineConfig } from 'vitest/config'
import preact from '@preact/preset-vite'
import svgr from 'vite-plugin-svgr'
import translations from './src/resources/translations.json' with { type: 'json' }

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'src/assets',
  plugins: [
    preact(),
    svgr(),
    {
      name: 'localize-html',
      transformIndexHtml(html) {
        const title = translations.ru.page.title.replace(/[&<>"']/g, character => ({
          '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[character])
        return html.replace('%PAGE_LANGUAGE%', 'ru').replace('%PAGE_TITLE%', () => title)
      }
    }
  ],
  build: {
    outDir: 'public'
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{js,jsx}'],
    setupFiles: ['./tests/setup.js']
  }
})
