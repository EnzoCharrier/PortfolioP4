import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/'] },
  js.configs.recommended,
  {
    languageOptions: { globals: globals.browser },
    rules: { eqeqeq: 'error', 'prefer-const': 'error', 'no-var': 'error' },
  },
];
