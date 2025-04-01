import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  { ignores: ['dist', 'node_modules', 'build'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y
    },
    rules: {
      // Base JS rules
      ...js.configs.recommended.rules,

      // React rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // Accessibility rules
      ...jsxA11y.configs.recommended.rules,

      // Custom rules
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off', // Disable PropTypes if not using them
      'react/jsx-uses-react': 'off', // For React 17+ with JSX transform
      'react/react-in-jsx-scope': 'off', // For React 17+ with JSX transform

      // General JavaScript rules
      'no-console': 'error', // Allow useful console methods
      'no-unused-vars': ['error', { "argsIgnorePattern": "^_" }] , // Ignore unused variables starting with "_"
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }], // Consistent quote usage
      'prefer-const': 'error', // Prefer const where possible
      'no-var': 'error', // Disallow var, prefer let/const

      // React-specific rules
      'react/jsx-key': 'error', // Enforce keys in list rendering
      'react/jsx-no-duplicate-props': 'error', // No duplicate props in JSX
      'react/jsx-no-useless-fragment': 'warn', // Avoid unnecessary fragments
      'react/jsx-pascal-case': 'error', // Enforce PascalCase for component names

      // Hooks rules
      'react-hooks/rules-of-hooks': 'error', // Enforce Hooks rules
      'react-hooks/exhaustive-deps': 'warn', // Check effect dependencies

      // Accessibility rules
      'jsx-a11y/alt-text': 'error', // Require alt text for images
    },
  },
  eslintConfigPrettier
];
