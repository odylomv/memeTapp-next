/** @type {import('prettier').Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  arrowParens: 'avoid',
  singleQuote: true,
  printWidth: 120,
  endOfLine: 'auto',
};
