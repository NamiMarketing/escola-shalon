const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/admin");

  eleventyConfig.addFilter("postDate", (dateObj, locale= 'pt-BR') => {
    return DateTime.fromJSDate(dateObj).setLocale(locale).toFormat('MMMM yyyy');
  });
  
  eleventyConfig.addNunjucksFilter("excludeFromCollection", function (collection=[], pageUrl=this.ctx.page.url) {
    return collection.filter(post => post.url !== pageUrl);
  });

  eleventyConfig.addFilter(
    "filterByTags",
    function (collection = [], requiredTags) {
      const filterTags = requiredTags.filter((tag) => tag !== "post");
      return collection.filter((post) => {
        return filterTags.some((tag) => post.data.tags?.includes(tag));
      });
    },
  );

  eleventyConfig.addNunjucksFilter("limit", (arr, limit) => {
    return arr?.slice(0, limit);
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
