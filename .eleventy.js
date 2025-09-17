import { DateTime } from 'luxon';
import slugify from 'slugify';

import fs from 'fs';
import path from 'path';

const BASE_PATH = 'frontend';
const BASE_OUTPUT = '_site';

/*
 * Bundle css files to single bundle.css
 */
const bundleCSS = () => {
	const cssDir = './frontend/assets/styles';
	const files = ['custom.css', 'gh-fork-ribbon.css', 'tailwind.css'];

	let bundle = '';
	for (const file of files) {
		const filePath = path.join(cssDir, file);
		if (fs.existsSync(filePath)) {
			bundle += `/* ${file} */\n${fs.readFileSync(filePath, 'utf8')}\n`;
		}
	}

	const outDir = '.cache/build';
	if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

	fs.writeFileSync(path.join(outDir, 'bundle.css'), bundle);
};

/*
 * Bundle js files to single bundle.js
 */
const bundleJS = () => {
	const jsDir = './frontend/assets/scripts';
	const files = ['script.js'];

	let bundle = '';
	for (const file of files) {
		const filePath = path.join(jsDir, file);
		if (fs.existsSync(filePath)) {
			bundle += `// ${file}\n${fs.readFileSync(filePath, 'utf8')}\n`;
		}
	}

	const outDir = '.cache/build';
	if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

	fs.writeFileSync(path.join(outDir, 'bundle.js'), bundle);
};

/**
 * Extracts all unique values of a given taxonomy from the posts collection.
 *
 * @param {object} collectionApi - Eleventy collection API instance.
 * @param {string} taxonomy - The taxonomy key to extract (e.g., "tags", "categories").
 * @returns {string[]} Array of unique taxonomy values.
 */
const getUniqueTaxonomy = (collectionApi, taxonomy) => {
	const allItems = collectionApi.getFilteredByGlob(`${BASE_PATH}/posts/*.md`).flatMap((item) => item.data[taxonomy] || []);
	return [...new Set(allItems)];
};

/**
 * Eleventy configuration function.
 *
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig - Eleventy configuration object.
 * @returns {object} Eleventy config settings including directories and template engine.
 */
export default function (eleventyConfig) {
	/**
	 * Date formatting filter for templates.
	 *
	 * @param {Date} dateObj - JavaScript Date object.
	 * @param {string} [format='yyyy-MM-dd'] - Luxon-compatible format string.
	 * @returns {string} Formatted date string.
	 */
	eleventyConfig.addFilter('date', (dateObj, format = 'yyyy-MM-dd') => {
		return DateTime.fromJSDate(dateObj).toFormat(format);
	});

	/**
	 * Slugify filter for converting strings into URL-friendly slugs.
	 *
	 * @param {string} str - Input string.
	 * @returns {string} Slugified string.
	 */
	eleventyConfig.addFilter('slug', (str) => {
		return slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g });
	});

	eleventyConfig.addPassthroughCopy(`${BASE_PATH}/assets`);
	eleventyConfig.addPassthroughCopy({
		'.cache/build/bundle.css': 'assets/bundle.css',
		'.cache/build/bundle.js': 'assets/bundle.js',
	});
	/**
	 * Collection: Posts sorted by date (newest first).
	 *
	 * @param {object} collectionApi - Eleventy collection API instance.
	 * @returns {Array<object>} Sorted list of post collections.
	 */
	eleventyConfig.addCollection('posts', (collectionApi) => {
		return collectionApi.getFilteredByGlob(`${BASE_PATH}/posts/*.md`).sort((a, b) => b.date - a.date);
	});

	/**
	 * Collection: Categories extracted from posts.
	 *
	 * @param {object} collectionApi - Eleventy collection API instance.
	 * @returns {string[]} Unique category names.
	 */
	eleventyConfig.addCollection('categories', (collectionApi) => {
		return getUniqueTaxonomy(collectionApi, 'categories');
	});

	/**
	 * Collection: Meetups extracted from posts.
	 *
	 * @param {object} collectionApi - Eleventy collection API instance.
	 * @returns {string[]} Unique meetup names.
	 */
	eleventyConfig.addCollection('meetups', (collectionApi) => {
		return getUniqueTaxonomy(collectionApi, 'meetup');
	});

	/**
	 * Collection: Tags extracted from posts.
	 *
	 * @param {object} collectionApi - Eleventy collection API instance.
	 * @returns {string[]} Unique tag names.
	 */
	eleventyConfig.addCollection('tags', (collectionApi) => {
		return getUniqueTaxonomy(collectionApi, 'tags');
	});

	eleventyConfig.on('afterBuild', () => {
		bundleCSS();
		bundleJS();
	});

	eleventyConfig.on('beforeWatch', (changedFiles) => {
		if (changedFiles.some((f) => f.endsWith('.css') && f.includes('frontend/assets/styles'))) {
			bundleCSS();
		}
		if (changedFiles.some((f) => f.endsWith('.js') && f.includes('frontend/assets/scripts'))) {
			bundleJS();
		}
	});

	return {
		dir: {
			data: '_data',
			includes: '_includes',
			input: BASE_PATH,
			output: BASE_OUTPUT,
		},
		markdownTemplateEngine: 'njk',
	};
}
