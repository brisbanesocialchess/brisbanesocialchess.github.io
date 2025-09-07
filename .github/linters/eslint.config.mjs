import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
export default [
  js.configs.recommended,
  {
    ignores: ['**/.wrangler/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'sort-keys': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: false }],
    },
  },
  prettierConfig,
];
