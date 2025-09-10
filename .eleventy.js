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
	const allItems = collectionApi
		.getFilteredByGlob(`${BASE_PATH}/posts/*.md`)
		.flatMap((item) => item.data[taxonomy] || []);
	return [...new Set(allItems)];
};

export default function (eleventyConfig) {
	eleventyConfig.addFilter('date', (dateObj, format = 'yyyy-MM-dd') => {
		return DateTime.fromJSDate(dateObj).toFormat(format);
	});

	eleventyConfig.addFilter('slug', (str) => {
		return slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g });
	});

	eleventyConfig.addPassthroughCopy(`${BASE_PATH}/assets`);

	eleventyConfig.addCollection('posts', (collectionApi) => {
		return collectionApi.getFilteredByGlob(`${BASE_PATH}/posts/*.md`).sort((a, b) => b.date - a.date);
	});

	eleventyConfig.addCollection('categories', (collectionApi) => {
		return getUniqueTaxonomy(collectionApi, 'categories');
	});

	eleventyConfig.addCollection('meetups', (collectionApi) => {
		return getUniqueTaxonomy(collectionApi, 'meetup');
	});

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
