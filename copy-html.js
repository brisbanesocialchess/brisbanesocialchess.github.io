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
 * Ensures the parent directory for a given file path exists.
 *
 * @param {string} filePath - File path (not directory) for which the parent directory should be created.
 * @returns {void}
 */
function ensureDir(filePath) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

/**
 * Checks if a given file path is inside excluded asset directories.
 * Asset dirs are `/assets/styles/` and `/assets/scripts/`.
 *
 * @param {string} filePath - Absolute file path to check.
 * @returns {boolean} - True if file path is in excluded dirs, otherwise false.
 */
function isExcludedAssetPath(filePath) {
	const norm = filePath.replace(/\\/g, "/");
	return norm.includes("/assets/styles/") || norm.includes("/assets/scripts/");
}

/**
 * Returns all files that match a glob pattern.
 *
 * @param {string} globPattern - Glob pattern for file matching.
 * @returns {string[]} - List of absolute file paths.
 */
function getAllFiles(globPattern) {
	return globSync(globPattern, { nodir: true });
}

// -------------------------
// HTML Minification
// -------------------------
/**
 * Minifies an HTML string.
 *
 * @param {string} content - Raw HTML string.
 * @returns {Promise<string>} - Minified HTML string.
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
 * Copies a file from the `_site` folder to `_deploy`.
 * - Skips excluded asset dirs.
 * - Minifies `.html` files.
 *
 * @param {string} srcPath - Absolute source file path inside `_site`.
 * @returns {Promise<void>}
 */
async function copyFile(srcPath) {
	if (isExcludedAssetPath(srcPath)) return;

	const relativePath = path.relative(SRC_FOLDER, srcPath);
	const destPath = path.join(DEST_FOLDER, relativePath);

	try {
		ensureDir(destPath);

		if (srcPath.endsWith(".html")) {
			const content = fs.readFileSync(srcPath, "utf-8");
			const minified = await minifyHtml(content);
			fs.writeFileSync(destPath, minified, "utf-8");
			console.log(`✨ HTML minified & copied: ${relativePath}`);
		} else {
			fs.copyFileSync(srcPath, destPath);
			console.log(`📂 Copied: ${relativePath}`);
		}
	} catch (err) {
		console.error(`Error copying ${relativePath}: ${err.message}`);
	}
}

/**
 * Removes a file from the `_deploy` folder.
 *
 * @param {string} srcPath - Absolute source file path inside `_site`.
 * @returns {void}
 */
function removeFile(srcPath) {
	if (isExcludedAssetPath(srcPath)) return;

	const relativePath = path.relative(SRC_FOLDER, srcPath);
	const destPath = path.join(DEST_FOLDER, relativePath);

	try {
		if (fs.existsSync(destPath)) {
			fs.unlinkSync(destPath);
			console.log(`🗑️ Deleted file: ${relativePath}`);
		}
	} catch (err) {
		console.error(`Error deleting ${relativePath}: ${err.message}`);
	}
}

/**
 * Removes a directory from the `_deploy` folder.
 *
 * @param {string} srcPath - Absolute directory path inside `_site`.
 * @returns {void}
 */
function removeDir(srcPath) {
	if (isExcludedAssetPath(srcPath)) return;

	const relativePath = path.relative(SRC_FOLDER, srcPath);
	const destPath = path.join(DEST_FOLDER, relativePath);

	try {
		if (fs.existsSync(destPath)) {
			fs.rmSync(destPath, { recursive: true, force: true });
			console.log(`🗑️ Deleted directory: ${relativePath}`);
		}
	} catch (err) {
		console.error(`Error removing directory ${relativePath}: ${err.message}`);
	}
}

// -------------------------
// Asset merging
// -------------------------
/**
 * Concatenates multiple text files into a single output file.
 * Deletes the original input files after merging.
 *
 * @param {string[]} files - Absolute paths of input files.
 * @param {string} outputFile - Absolute output file path.
 * @returns {void}
 */
function mergeFiles(files, outputFile) {
	if (!files || files.length === 0) return;

	let merged = "";
	for (const f of files) {
		try {
			merged += fs.readFileSync(f, "utf-8") + "\n";
		} catch (err) {
			console.warn(`Warning: couldn't read ${f}: ${err.message}`);
		}
	}

	try {
		ensureDir(outputFile);
		fs.writeFileSync(outputFile, merged, "utf-8");
		console.log(`🔗 Merged ${files.length} -> ${path.relative(process.cwd(), outputFile)}`);

		for (const f of files) {
			try {
				fs.unlinkSync(f);
			} catch (err) {
				console.warn(`Warning: couldn't unlink ${f}: ${err.message}`);
			}
		}
	} catch (err) {
		console.error(`Error writing bundle ${outputFile}: ${err.message}`);
	}
}

/**
 * Merges CSS and JS assets into `bundle.css` and `bundle.js`.
 *
 * @returns {void}
 */
function mergeAssets() {
	const cssPattern = path.join(CSS_DIR, "*.css");
	const jsPattern = path.join(JS_DIR, "*.js");

	const cssFiles = globSync(cssPattern).filter((f) => f !== MERGED_CSS_FILE);
	const jsFiles = globSync(jsPattern).filter((f) => f !== MERGED_JS_FILE);

	mergeFiles(cssFiles, MERGED_CSS_FILE);
	mergeFiles(jsFiles, MERGED_JS_FILE);
}

// -------------------------
// Build and Watch
// -------------------------
/**
 * Builds the entire site.
 * - If `htmlOnly` is true, only `.html` files are processed (no asset merging).
 * - If `htmlOnly` is false, all files are copied and assets are merged.
 *
 * @param {boolean} htmlOnly - Whether to restrict build to `.html` files only.
 * @returns {Promise<void>}
 */
async function buildAll(htmlOnly = false) {
	console.log(`🔨 Starting build (${htmlOnly ? "HTML-only" : "full"})...`);

	const pattern = htmlOnly ? `${SRC_FOLDER}/**/*.html` : `${SRC_FOLDER}/**/*.*`;
	const allFiles = getAllFiles(pattern);

	for (const file of allFiles) {
		await copyFile(file);
	}

	if (!htmlOnly) {
		mergeAssets();
		console.log("✅ Full build complete.");
	} else {
		console.log("✅ HTML-only build complete (assets not merged).");
	}
}

/**
 * Watches for file changes and mirrors them into `_deploy`.
 * - If `htmlOnly` is true, only `.html` files are watched and copied (no asset merging).
 * - If `htmlOnly` is false, all files are watched and assets are merged on changes.
 *
 * @param {boolean} htmlOnly - Whether to restrict watching to `.html` files only.
 * @returns {import("chokidar").FSWatcher} - The active chokidar watcher instance.
 */
function watchFiles(htmlOnly = false) {
	const pattern = htmlOnly ? `${SRC_FOLDER}/**/*.html` : SRC_FOLDER;
	const watcher = chokidar.watch(pattern, {
		ignored: /(^|[/\\])\../, // ignore dotfiles
		persistent: true,
		ignoreInitial: true,
	});

	console.log(`👀 Watching (${htmlOnly ? "HTML-only" : "full tree"}): ${pattern}`);

	watcher
		.on("add", async (f) => {
			await copyFile(f);
			if (!htmlOnly) mergeAssets();
		})
		.on("change", async (f) => {
			await copyFile(f);
			if (!htmlOnly) mergeAssets();
		})
		.on("unlink", (f) => {
			removeFile(f);
			if (!htmlOnly) mergeAssets();
		})
		.on("unlinkDir", (f) => {
			removeDir(f);
			if (!htmlOnly) mergeAssets();
		});

	return watcher;
}

// -------------------------
// CLI entry
// -------------------------
/**
 * CLI entry point.
 *
 * Parses command-line arguments and runs the appropriate build process.
 *
 * Supported CLI flags:
 * - `--html`: Build only HTML files (skip asset merging).
 * - `--watch`: Run in watch mode, automatically updating files on change.
 *
 * @returns {Promise<void>} Resolves when the build (and optional watch) process completes.
 */
(async function main() {
	const args = process.argv.slice(2);
	const htmlOnlyMode = args.includes("--html");
	const watchMode = args.includes("--watch");

	console.log("➡️  Mode:", htmlOnlyMode ? "HTML-only" : "Full");
	console.log("➡️  Watch:", watchMode ? "Enabled" : "Disabled");

	await buildAll(htmlOnlyMode);

	if (watchMode) {
		watchFiles(htmlOnlyMode);
	}
})();
