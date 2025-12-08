import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { configDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    script: {
      defineModel: true,
      propsDestructure: true
    },
    template: {
      compilerOptions: {
        isCustomElement: (tag) => ['component'].includes(tag)
      }
    }
  })],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api']
      }
    }
  },
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*', 'e2e/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    globals: true,
    setupFiles: ['./src/components/__tests__/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', 'src/main.ts', 'src/components/README.md', 'src/styles/*', 'docs/*', 'e2e/*', 'e2e/**']
    }
  }
})