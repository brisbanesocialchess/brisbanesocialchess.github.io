/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./_site/**/*.{html}'],
	plugins: [],
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
};
