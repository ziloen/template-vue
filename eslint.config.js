import { vue } from '@ziloen/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig(
  vue(),
  {
    ignores: ['src/pages/jsx/sfc.vue'],
  },
  {
    files: ['**/*.vue'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
)
