/* eslint-env node */
import fs from 'fs';
import path from 'path';

const deployDir = path.resolve('./_deploy/assets');
const cssDir = path.join(deployDir, 'styles');
const jsDir = path.join(deployDir, 'scripts');

const mergedCssFile = path.relative(process.cwd(), path.join(cssDir, 'bundle.css'));
const mergedJsFile = path.relative(process.cwd(), path.join(jsDir, 'bundle.js'));

// --- Include arrays ---
const includeCss = ['base.css', 'gh-fork-ribbon.css', 'custom.css'];
const includeJs = ['script.js'];

// --- Merge CSS ---
const cssFiles = includeCss
	.map((f) => path.relative(process.cwd(), path.join(cssDir, f)))
	.filter((f) => fs.existsSync(f) && f !== mergedCssFile);
const mergedCss = cssFiles.map((file) => fs.readFileSync(file, 'utf-8')).join('');

fs.writeFileSync(mergedCssFile, mergedCss.trim(), 'utf-8');

// --- Merge JS ---
const jsFiles = includeJs
	.map((f) => path.relative(process.cwd(), path.join(jsDir, f)))
	.filter((f) => fs.existsSync(f) && f !== mergedJsFile);
const mergedJs = jsFiles.map((file) => fs.readFileSync(file, 'utf-8')).join('');

fs.writeFileSync(mergedJsFile, mergedJs.trim(), 'utf-8');

// --- Cleanup individual files ---
fs.readdirSync(cssDir).forEach((file) => {
	const filePath = path.join(cssDir, file);
	if (file !== path.basename(mergedCssFile) && fs.lstatSync(filePath).isFile()) {
		fs.unlinkSync(filePath);
	}
});

fs.readdirSync(jsDir).forEach((file) => {
	const filePath = path.join(jsDir, file);
	if (file !== path.basename(mergedJsFile) && fs.lstatSync(filePath).isFile()) {
		fs.unlinkSync(filePath);
	}
});
