import js from '@eslint/js'
import globals from 'globals'
import prettierConfig from 'eslint-config-prettier'

export default [
  { ignores: ['node_modules'] },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest', // Usa la última versión de JavaScript
      sourceType: 'module', // Te permite usar import/export
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      // Ajuste opcional: que las variables sin usar sean un "warning" en vez de error
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // 4. IMPORTANTE: Prettier siempre al final
  prettierConfig,
]
