const { DateTime } = require('luxon');
const slugify = require('slugify');

const getUniqueTaxonomy = (collectionApi, taxonomy) => {
	const allItems = collectionApi.getFilteredByGlob('posts/*.md').flatMap((item) => item.data[taxonomy] || []);
	return [...new Set(allItems)];
};

module.exports = function (eleventyConfig) {
	eleventyConfig.addFilter('date', (dateObj, format = 'yyyy-MM-dd') => {
		return DateTime.fromJSDate(dateObj).toFormat(format);
	});

	eleventyConfig.addFilter('slug', (str) => {
		return slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g });
	});

	eleventyConfig.addPassthroughCopy('assets');

	eleventyConfig.addCollection('posts', function (collectionApi) {
		return collectionApi.getFilteredByGlob('posts/*.md').sort((a, b) => b.date - a.date);
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
			input: '.',
			output: '_site',
		},
		markdownTemplateEngine: 'njk',
	};
};
