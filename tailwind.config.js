/** @type {import('tailwindcss').Config} */
module.exports = {
  // safelist: [
  //   'bg-table-header',
  // ],
  content: [
    './frontend/**/*.{html,js,ts,md}',
    './_site/**/*.{html}',
  ],
  theme: {
    extend: {
      colors: {
        'table-header': '#091a52',
        'role-board': '#a020f0',
        'role-admin': '#ff0000',
        'role-coordinator': '#a020f0',
      },
    },
  },
  plugins: [],
};
