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
        'role-developer': '#00ffff',
        'role-moderator': 'yellow',
        'role-board': '#ed7014',
        'role-coordinator': '#a020f0',
        'role-co-organizers': '#2196f3',
        'role-lead-developer': '#ff0001',
        'role-event-organizers': '#00d166',
        'role-assistant-organizers': '#c35339'
      },
    },
  },
  plugins: [
    function({ addComponents, theme }) {
      const roles = [
        'admin','developer','moderator','board','coordinator','co-organizers',
        'lead-developer','event-organizers','assistant-organizers'
      ]
      const components = {}

      roles.forEach(role => {
        const color = theme(`colors.role-${role}`)
        components[`.role-${role} img`] = {
          border: `1px solid ${color}`,
        }
      })

      addComponents(components)
    }
  ],
};
