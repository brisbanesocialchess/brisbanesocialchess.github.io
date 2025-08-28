/** @type {import('tailwindcss').Config} */
module.exports = {
  // safelist: [
  //   'bg-table-header',
  // ],
  content: [
    "./frontend/**/*.{html,js,ts,php,md,mdx}",
    "./_site/**/*.{html,js,ts,php,md,mdx}",
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
