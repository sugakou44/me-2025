import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import svelteParser from 'svelte-eslint-parser'
import ts from 'typescript-eslint'

import svelteConfig from './svelte.config.js'

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url))

export default ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    files: [
      'src/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,svelte}',
      './*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,svelte}',
      'scripts/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,svelte}',
      'loaders/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,svelte}',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        allowDefaultProject: ['svelte.config.js'],
        parser: ts.parser,
        svelteConfig,
      },
    },
    rules: {
      'no-undef': 'off',
      'no-dupe-keys': 'error',
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-warning-comments': [
        1,
        {
          terms: ['TODO', 'FIX ME'],
          location: 'start',
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_|^args$',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
)
