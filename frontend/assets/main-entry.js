const ignoreCss = ['tailwind.css'];
const ignoreJs = [];

Object.entries(import.meta.glob('./styles/*.css', { eager: true })).forEach(([file]) => {
	const filename = file.split('/').pop();
	if (!ignoreCss.includes(filename)) {
	}
});

Object.entries(import.meta.glob('./scripts/*.js', { eager: true })).forEach(([file]) => {
	const filename = file.split('/').pop();
	if (!ignoreJs.includes(filename)) {
	}
});
