const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptEslintParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules/**', 'dist/**'],

    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        browser: false,
        node: true,
        es2020: true,
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      // Reglas generales de TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      
      // Orden de importaciones
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // Prettier
      'prettier/prettier': ['error'],

      // Reglas generales
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-param-reassign': 'error',
      'import/no-cycle': 'warn',
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.ts'],
        },
      },
    },
  },
];
