/** @type {import('prettier').Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  arrowParens: 'avoid',
  bracketSameLine: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 120,
  semi: true,
  endOfLine: 'auto',
};
