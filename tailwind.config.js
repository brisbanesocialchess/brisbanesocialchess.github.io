/** @type {import('tailwindcss').Config} */
module.exports = {
  // safelist: [
  //   'bg-table-header',
  // ],
  content: [
    "./frontend/**/*.{html,js,ts,md}",
    "./_site/**/*.{html}",
  ],
  theme: {
    extend: {
      colors: {
        "table-header": "#091a52",
      },
    },
  },
  plugins: [],
};
