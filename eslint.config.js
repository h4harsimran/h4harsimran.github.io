import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'dist/**',
      '.vite/**',
      'node_modules/**',
      'coverage/**',
      'playwright-report/**',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Override problematic rules
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      'no-undef': 'off', // TypeScript handles this
    },
  },
  {
    files: [
      '**/*.test.{ts,tsx}',
      '**/__tests__/**/*.{ts,tsx}',
      '**/test/**/*.{ts,tsx}',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
