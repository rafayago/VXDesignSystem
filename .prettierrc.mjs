export default {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  bracketSpacing: false,
  semi: false,
  trailingComma: 'none',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './packages/design-tokens/src/index.css',
  tailwindFunctions: ['clsx', 'classnames', 'cva', 'cn'],
  printWidth: 80
}
