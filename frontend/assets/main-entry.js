const ignoreCss = ['tailwind.css'];
const ignoreJs = [];
const ignoreImages = [];

// --- Load CSS files ---
const cssModules = import.meta.glob('./styles/*.css');
Object.entries(cssModules)
	.filter(([file]) => !ignoreCss.includes(file.split('/').pop()))
	.forEach(([, loader]) => loader());

// --- Load JS files ---
const jsModules = import.meta.glob('./scripts/*.js');
Object.entries(jsModules)
	.filter(([file]) => !ignoreJs.includes(file.split('/').pop()))
	.forEach(([, loader]) => loader());

// --- Load avatars ---
const avatarModules = import.meta.glob('./avatars/*.{png,jpg,jpeg,gif,svg}');
Object.entries(avatarModules)
	.filter(([file]) => !ignoreImages.includes(file.split('/').pop()))
	.forEach(([, loader]) => loader());

// --- Load images ---
const imageModules = import.meta.glob('./images/*.{png,jpg,jpeg,gif,svg}');
Object.entries(imageModules)
	.filter(([file]) => !ignoreImages.includes(file.split('/').pop()))
	.forEach(([, loader]) => loader());

const pictureModules = import.meta.glob('./pictures/*.{png,jpg,jpeg,gif,svg}');
Object.entries(pictureModules)
	.filter(([file]) => !ignoreImages.includes(file.split('/').pop()))
	.forEach(([, loader]) => loader());
