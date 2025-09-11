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
 * Ensure parent directory for `filePath` exists (creates recursively).
 * @param {string} filePath - File path (not directory) for which parent dir will be created.
 */
function ensureDir(filePath) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

/**
 * Return `true` if the path is inside excluded asset directories.
 * We keep asset merging logic separate, so these are skipped during general copying.
 * @param {string} filePath
 * @returns {boolean}
 */
function isExcludedAssetPath(filePath) {
	const norm = filePath.replace(/\\/g, "/");
	return norm.includes("/assets/styles/") || norm.includes("/assets/scripts/");
}

/**
 * Get all files matched by a glob pattern (no directories).
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
 * Minifies HTML string and returns result.
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
 * Copy a file from `_site` to `_deploy`.
 * - Skips asset style/script source files (they are handled by asset merging).
 * - Minifies `.html`.
 * @param {string} srcPath - absolute path in SRC_FOLDER
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
 * Remove the corresponding file from `_deploy`.
 * @param {string} srcPath - absolute path in SRC_FOLDER
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
 * Remove the corresponding directory from `_deploy`.
 * @param {string} srcPath - absolute dir path in SRC_FOLDER
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
 * Merge multiple text files into a single output file (concatenation).
 * Removes original files after writing bundle.
 * @param {string[]} files - absolute paths
 * @param {string} outputFile - absolute path
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
		// cleanup originals
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
 * Merge CSS and JS files inside `_deploy/assets/...` into bundle.css and bundle.js.
 * Skips if no files found.
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
 * Build all files or only HTML files depending on `htmlOnly`.
 * - htmlOnly = true  => only copies `.html` files and does NOT merge assets.
 * - htmlOnly = false => copies all files (excluding source asset folders), then merges assets.
 * @param {boolean} htmlOnly
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
 * Start watching files. If `htmlOnly` is true:
 *  - Watch only `*.html` under `_site`.
 *  - Do not trigger asset merging.
 * If false:
 *  - Watch entire `_site` tree and trigger merging on changes.
 * @param {boolean} htmlOnly
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

	// return watcher so caller could close it if desired
	return watcher;
}

// -------------------------
// CLI entry
// -------------------------
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
