import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { minify } from 'html-minifier-terser';

const SRC_FOLDER = path.resolve('./_site');
const DEST_FOLDER = path.resolve('./_deploy');

// -------------------------
// Utility functions
// -------------------------
function ensureDir(filePath) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function getAllFiles(globPattern) {
	return globSync(globPattern);
}

// -------------------------
// HTML processing
// -------------------------
async function minifyHtml(content) {
	return minify(content, {
		collapseWhitespace: true,
		minifyCSS: true,
		minifyJS: true,
		removeComments: true,
		removeEmptyAttributes: true,
		removeRedundantAttributes: true,
		useShortDoctype: true,
	});
}

async function copyAndMinifyHtmlFiles() {
	const htmlFiles = getAllFiles(`${SRC_FOLDER}/**/*.html`);
	console.log('HTML files found:', htmlFiles.length);

	for (const file of htmlFiles) {
		const relativePath = path.relative(SRC_FOLDER, file);
		const destPath = path.join(DEST_FOLDER, relativePath);

		ensureDir(destPath);

		const content = fs.readFileSync(file, 'utf-8');
		const minified = await minifyHtml(content);

		fs.writeFileSync(destPath, minified, 'utf-8');
	}

	console.log(`✅ ${htmlFiles.length} HTML files copied and minified to _deploy.`);
}

// -------------------------
// Static assets processing
// -------------------------
// function copyStaticAssets(directories) {
// 	directories.forEach((dir) => {
// 		const srcPath = path.join(SRC_FOLDER, dir);
// 		const destPath = path.join(DEST_FOLDER, 'assets', path.basename(dir));

// 		if (!fs.existsSync(srcPath)) return;

// 		const files = getAllFiles(`${srcPath}/**/*.*`);

// 		files.forEach((file) => {
// 			const relative = path.relative(srcPath, file);
// 			const target = path.join(destPath, relative);
// 			ensureDir(target);
// 			fs.copyFileSync(file, target);
// 		});

// 		console.log(`✅ Copied ${files.length} files from ${dir} to _deploy/assets/${path.basename(dir)}`);
// 	});
// }

// -------------------------
// Main execution
// -------------------------
(async function main() {
	await copyAndMinifyHtmlFiles();
	// copyStaticAssets(['assets/images', 'assets/pictures']);
})();
