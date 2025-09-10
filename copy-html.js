/* eslint-env node */
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { minify } from 'html-minifier-terser';

const SRC_FOLDER = path.resolve('./_site');
const DEST_FOLDER = path.resolve('./_deploy');

// -------------------------
// Utility functions
// -------------------------

/**
 * Ensures the directory for a given file path exists.
 * Creates parent directories recursively if missing.
 * @param {string} filePath - Path to a file (not directory).
 */
function ensureDir(filePath) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

/**
 * Gets all files matching the provided glob pattern.
 * @param {string} globPattern - The glob pattern
 * @returns {string[]} Array of matched file paths.
 */
function getAllFiles(globPattern) {
	return globSync(globPattern);
}

// -------------------------
// HTML processing
// -------------------------

/**
 * Minifies HTML content by removing whitespace, comments,
 * and minifying embedded CSS/JS.
 * @param {string} content - Raw HTML string.
 * @returns {Promise<string>} Minified HTML content.
 */
function minifyHtml(content) {
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

/**
 * Copies all `.html` files from the source folder, minifies them,
 * and writes them to the destination folder while preserving structure.
 * @returns {Promise<void>}
 */
async function copyAndMinifyHtmlFiles() {
	const htmlFiles = getAllFiles(`${SRC_FOLDER}/**/*.html`);

	for (const file of htmlFiles) {
		const relativePath = path.relative(SRC_FOLDER, file);
		const destPath = path.join(DEST_FOLDER, relativePath);

		ensureDir(destPath);

		const content = fs.readFileSync(file, 'utf-8');
		const minified = await minifyHtml(content);

		fs.writeFileSync(destPath, minified, 'utf-8');
	}
}

// -------------------------
// Main execution
// -------------------------

/**
 * Main entry point of the script.
 * Runs HTML minification and (optionally) static asset copy.
 * @returns {Promise<void>}
 */
(async function main() {
	await copyAndMinifyHtmlFiles();
})();
