const { DateTime } = require('luxon');
const slugify = require('slugify');

const BASE_PATH = 'frontend';
const BASE_OUTPUT = '_site';

const getUniqueTaxonomy = (collectionApi, taxonomy) => {
	const allItems = collectionApi.getFilteredByGlob(`${BASE_PATH}/posts/*.md`)
		.flatMap((item) => item.data[taxonomy] || []);
	return [...new Set(allItems)];
};

module.exports = function (eleventyConfig) {
	eleventyConfig.addFilter('date', (dateObj, format = 'yyyy-MM-dd') => {
		return DateTime.fromJSDate(dateObj).toFormat(format);
	});

	eleventyConfig.addFilter('slug', (str) => {
		return slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g });
	});

	eleventyConfig.addPassthroughCopy(`${BASE_PATH}/assets`);

	eleventyConfig.addCollection('posts', (collectionApi) => {
		return collectionApi.getFilteredByGlob(`${BASE_PATH}/posts/*.md`)
			.sort((a, b) => b.date - a.date);
	});

	eleventyConfig.addCollection('categories', (collectionApi) => {
		return getUniqueTaxonomy(collectionApi, 'categories');
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
};
