/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./_site/**/*.{html}'],
	plugins: [],
	safelist: [
		'team-role-admin',
		'team-role-developer',
		'team-role-moderator',
		'team-role-board',
		'team-role-leader',
		'team-role-coordinator',
		'team-role-co-organizers',
		'team-role-lead-developer',
		'team-role-core-developer',
		'team-role-event-organizers',
		'team-role-assistant-organizers',
	],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
			},
		},
	},
};
