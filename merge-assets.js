/* eslint-env node */
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

// const siteDir = path.resolve('./_site/assets');
// const siteCssDir = path.join(siteDir, 'styles');
// const siteJsDir = path.join(siteDir, 'scripts');

const deployDir = path.resolve('./_deploy/assets');
const cssDir = path.join(deployDir, 'styles');
const jsDir = path.join(deployDir, 'scripts');

const mergedCssFile = path.relative(process.cwd(), path.join(cssDir, 'bundle.css'));
const mergedJsFile = path.relative(process.cwd(), path.join(jsDir, 'bundle.js'));

// --- Merge CSS ---
const cssFiles = globSync(`${cssDir}/*.css`).filter((f) => f !== mergedCssFile);
let mergedCss = '';
cssFiles.forEach((file) => {
	const content = fs.readFileSync(file, 'utf-8');
	mergedCss += `${content}\n`;
});

if (cssFiles.length > 0) {
	fs.writeFileSync(mergedCssFile, mergedCss, 'utf-8');
}

// --- Merge JS ---
const jsFiles = globSync(`${jsDir}/*.js`).filter((f) => f !== mergedJsFile);

let mergedJs = '';
jsFiles.forEach((file) => {
	const content = fs.readFileSync(file, 'utf-8');
	mergedJs += `${content}\n`;
});

fs.writeFileSync(mergedJsFile, mergedJs, 'utf-8');

// --- Cleanup individual files ---
[...cssFiles, ...jsFiles].forEach((file) => {
	fs.unlinkSync(file);
});
