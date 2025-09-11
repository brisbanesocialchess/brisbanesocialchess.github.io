/* eslint-env node */ 
import fs from 'fs';
import path from 'path';

const deployDir = path.resolve('./_deploy/assets');
const cssDir = path.join(deployDir, 'styles');
const jsDir = path.join(deployDir, 'scripts');

const mergedCssFile = path.relative(process.cwd(), path.join(cssDir, 'bundle.css'));
const mergedJsFile = path.relative(process.cwd(), path.join(jsDir, 'bundle.js'));

// --- Include arrays ---
const includeCss = [
	'base.css',
	'gh-fork-ribbon.css',
	'custom.css',
];
const includeJs = [
	'script.js',
];

// --- Merge CSS ---
const cssFiles = includeCss.map(f => path.join(cssDir, f))
	.filter(f => fs.existsSync(f) && f !== mergedCssFile);

let mergedCss = '';
cssFiles.forEach((file) => {
	const content = fs.readFileSync(file, 'utf-8');
	mergedCss += `${content}\n`;
});

if (cssFiles.length > 0) {
	fs.writeFileSync(mergedCssFile, mergedCss.trim(), 'utf-8');
}

// --- Merge JS ---
const jsFiles = includeJs.map(f => path.join(jsDir, f))
	.filter(f => fs.existsSync(f) && f !== mergedJsFile);

let mergedJs = '';
jsFiles.forEach((file) => {
	const content = fs.readFileSync(file, 'utf-8');
	mergedJs += `${content}\n`;
});

fs.writeFileSync(mergedJsFile, mergedJs.trim(), 'utf-8');

// --- Cleanup individual files ---
[...cssFiles, ...jsFiles].forEach((file) => {
	fs.unlinkSync(file);
});
