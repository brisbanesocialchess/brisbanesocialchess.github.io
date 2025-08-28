/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/**/*.html",
    "./frontend/**/*.js",
    "./frontend/**/*.php",
    "./frontend/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        'table-header': '#091a52',
      },
    },
  },
  plugins: [],
};
