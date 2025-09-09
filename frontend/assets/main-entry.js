// --- Ignore lists ---
const ignoreCss = ['tailwind.css'];
const ignoreJs = [];

// --- Helper: load files one by one ---
function importFile(file) {
	return import(/* @vite-ignore */ file);
}

// --- CSS Loader ---
Object.keys(import.meta.glob('./styles/*.css'))
	.filter((file) => !ignoreCss.includes(file.split('/').pop()))
	.forEach((file) => {
		importFile(file).then(() => {
			console.log(`✅ Loaded CSS: ${file.split('/').pop()}`);
		});
	});

// --- JS Loader ---
Object.keys(import.meta.glob('./scripts/*.js'))
	.filter((file) => !ignoreJs.includes(file.split('/').pop()))
	.forEach((file) => {
		importFile(file).then(() => {
			console.log(`✅ Loaded JS: ${file.split('/').pop()}`);
		});
	});

// --- Explicit Tailwind import (ensures order) ---
import './styles/tailwind.css';
