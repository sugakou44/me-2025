// @ts-check

/** @type {import("prettier").Config} */
export default {
  semi: false,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-svelte',
    'prettier-plugin-tailwindcss',
  ],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
  ],
  tailwindStylesheet: './src/app.css',
  tailwindFunctions: ['cva', 'tv', 'cn'],
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/src',
    '^@/(?!(assets|types))',
    '',
    '^[..]',
    '^[.]',
    '',
    '^@/assets',
    '',
    '<TYPES>',
    '<TYPES>^[.]',
    '^[..]/types',
    '^[.]/types',
    '@/types',
  ],
}
