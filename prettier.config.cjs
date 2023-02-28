/** @type {import('prettier').Config} */
const config = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  arrowParens: 'avoid',
  singleQuote: true,
  printWidth: 120,
  endOfLine: 'auto',
};

module.exports = config;
