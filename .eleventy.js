const { DateTime } = require("luxon");
const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  // Date filter for formatting dates nicely
  eleventyConfig.addFilter("date", (dateObj, format = "yyyy-MM-dd") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Slug filter for URL-safe strings (used in category/tag URLs)
  eleventyConfig.addFilter("slug", (str) => {
    return slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g });
  });

  // Passthrough copy for assets folder
  eleventyConfig.addPassthroughCopy("assets");

  // Collection: all posts inside /posts folder, sorted by date descending
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md").sort((a, b) => b.date - a.date);
  });

  // Collection: unique categories from posts only
  eleventyConfig.addCollection("categories", function(collectionApi) {
    let categories = new Set();
    collectionApi.getFilteredByGlob("posts/*.md").forEach(item => {
      if ("categories" in item.data) {
        item.data.categories.forEach(cat => categories.add(cat));
      }
    });
    return [...categories];
  });

  // Collection: unique tags from posts only
  eleventyConfig.addCollection("tags", function(collectionApi) {
    let tags = new Set();
    collectionApi.getFilteredByGlob("posts/*.md").forEach(item => {
      if ("tags" in item.data) {
        item.data.tags.forEach(tag => tags.add(tag));
      }
    });
    return [...tags];
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
  };
};
