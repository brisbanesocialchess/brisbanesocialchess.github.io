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

        'role-admin': '#ff0000',
        'role-developer': 'cyan',
        'role-moderator': 'yellow',

        'role-board': '#ed7014',
        'role-coordinator': '#a020f0',
        'role-co-organizers': '#2196f3',
        'role-lead-developer': 'cyan',
        'role-event-organizers': '#00d166',
        'role-assistant-organizers': '#c35339'
      },
    },
  },
  plugins: [],
};
