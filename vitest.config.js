import { defineConfig } from 'vitest/config'
import { configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '**/e2e/**', '**/e2e/*'],
    globals: true,
    setupFiles: ['./src/components/__tests__/setup.js'],
    coverage: {
      provider: 'v8',
      thresholds: {
        statements: 50,
        branches: 40,
        functions: 50,
        lines: 50,
      },
      exclude: ['node_modules', 'src/main.ts', 'src/components/README.md', 'src/styles/*', 'docs/*', '**/e2e/**', '**/e2e/*']
    }
  },
})
