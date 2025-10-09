import { DateTime } from 'luxon';
import slugify from 'slugify';

const BASE_PATH = 'frontend';
const BASE_OUTPUT = '_site';

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

	/**
	 * URL-encoding filter for building query strings in templates.
	 *
	 * @param {string} val - Input string to encode.
	 * @returns {string} URL-encoded string.
	 */
	eleventyConfig.addFilter('url_encode', (val) => {
		if (val === undefined || val === null) return '';
		return encodeURIComponent(String(val));
	});

	eleventyConfig.addPassthroughCopy(`${BASE_PATH}/assets`);

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
