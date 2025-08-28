/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './frontend/**/*.{html,js,ts,md}',
    './frontend/pages/**/*.{html,js,ts}',
    './_site/**/*.{html}',
  ],
  safelist: [
    'role-admin',
    'role-developer',
    'role-moderator',
    'role-board',
    'role-coordinator',
    'role-co-organizers',
    'role-lead-developer',
    'role-event-organizers',
    'role-assistant-organizers',
  ],
  theme: {},
  plugins: [],
};
