/* eslint-env node */
import fs from "fs";
import path from "path";
import { globSync } from "glob";
import { minify } from "html-minifier-terser";
import chokidar from "chokidar";

// -------------------------
// Configuration
// -------------------------
const SRC_FOLDER = path.resolve("./_site");
const DEST_FOLDER = path.resolve("./_deploy");
const CSS_DIR = path.join(DEST_FOLDER, "assets", "styles");
const JS_DIR = path.join(DEST_FOLDER, "assets", "scripts");
const MERGED_CSS_FILE = path.join(CSS_DIR, "bundle.css");
const MERGED_JS_FILE = path.join(JS_DIR, "bundle.js");

// -------------------------
// Utility functions
// -------------------------
/**
 * Ensures the directory for a given file path exists.
 * @param {string} filePath - Path to a file.
 */
function ensureDir(filePath) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

/**
 * Checks if a file is inside excluded asset dirs.
 * @param {string} filePath - File path.
 * @returns {boolean}
 */
function isExcluded(filePath) {
	return filePath.includes("assets/styles") || filePath.includes("assets/scripts");
}

/**
 * Returns all files matching a glob pattern.
 * @param {string} globPattern
 * @returns {string[]}
 */
function getAllFiles(globPattern) {
	return globSync(globPattern, { nodir: true });
}

// -------------------------
// HTML Minification
// -------------------------
/**
 * Minifies HTML content.
 * @param {string} content
 * @returns {Promise<string>}
 */
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

// -------------------------
// File operations
// -------------------------
/**
 * Copies a file from source to destination.
 * Minifies HTML if needed, skips excluded asset dirs.
 * @param {string} srcPath
 */
async function copyFile(srcPath) {
	if (isExcluded(srcPath)) return;

	const relativePath = path.relative(SRC_FOLDER, srcPath);
	const destPath = path.join(DEST_FOLDER, relativePath);

	ensureDir(destPath);

	if (srcPath.endsWith(".html")) {
		const content = fs.readFileSync(srcPath, "utf-8");
		const minified = await minifyHtml(content);
		fs.writeFileSync(destPath, minified, "utf-8");
	} else {
		fs.copyFileSync(srcPath, destPath);
	}
}

/**
 * Removes a file from destination folder.
 * @param {string} srcPath
 */
function removeFile(srcPath) {
	if (isExcluded(srcPath)) return;

	const relativePath = path.relative(SRC_FOLDER, srcPath);
	const destPath = path.join(DEST_FOLDER, relativePath);

	if (fs.existsSync(destPath)) {
		fs.unlinkSync(destPath);
	}
}

/**
 * Removes a directory from destination folder.
 * @param {string} srcPath
 */
function removeDir(srcPath) {
	if (isExcluded(srcPath)) return;

	const relativePath = path.relative(SRC_FOLDER, srcPath);
	const destPath = path.join(DEST_FOLDER, relativePath);

	if (fs.existsSync(destPath)) {
		fs.rmSync(destPath, { recursive: true, force: true });
	}
}

// -------------------------
// Asset merging
// -------------------------
/**
 * Merges multiple text files into one.
 * @param {string[]} files - Files to merge.
 * @param {string} outputFile - Output bundle file.
 */
function mergeFiles(files, outputFile) {
	if (files.length === 0) return;

	let mergedContent = "";
	files.forEach((file) => {
		const content = fs.readFileSync(file, "utf-8");
		mergedContent += `${content}\n`;
	});

	ensureDir(outputFile);
	fs.writeFileSync(outputFile, mergedContent, "utf-8");

	files.forEach((file) => fs.unlinkSync(file));
}

/**
 * Merges CSS and JS assets into bundles.
 */
function mergeAssets() {
	const cssFiles = globSync(`${CSS_DIR}/*.css`).filter((f) => f !== MERGED_CSS_FILE);
	const jsFiles = globSync(`${JS_DIR}/*.js`).filter((f) => f !== MERGED_JS_FILE);

	mergeFiles(cssFiles, MERGED_CSS_FILE);
	mergeFiles(jsFiles, MERGED_JS_FILE);
}

// -------------------------
// Build and Watch
// -------------------------
/**
 * Builds the entire site: copies files and merges assets.
 */
async function buildAll() {
	const allFiles = getAllFiles(`${SRC_FOLDER}/**/*.*`);
	for (const file of allFiles) {
		await copyFile(file);
	}
	mergeAssets();
}

/**
 * Starts a watcher to sync changes in real time.
 */
function watchFiles() {
	const watcher = chokidar.watch(SRC_FOLDER, {
		ignored: /(^|[/\\])\../, // ignore dotfiles
		persistent: true,
		ignoreInitial: true,
	});

	watcher
		.on("add", async (f) => {
			await copyFile(f);
			mergeAssets();
		})
		.on("change", async (f) => {
			await copyFile(f);
			mergeAssets();
		})
		.on("unlink", (f) => {
			removeFile(f);
			mergeAssets();
		})
		.on("unlinkDir", (f) => {
			removeDir(f);
			mergeAssets();
		});

	console.log("👀 Watching for file changes...");
}

// -------------------------
// Main
// -------------------------
(async function main() {
	const args = process.argv.slice(2);
	const watchMode = args.includes("--watch");

	await buildAll();

	if (watchMode) {
		watchFiles();
	}
})();
