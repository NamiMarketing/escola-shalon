const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/admin");

  eleventyConfig.addFilter("postDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_SHORT);
  });

  eleventyConfig.addNunjucksFilter("limit", (arr, limit) => {
    // console.log(arr)
    return arr?.slice(0, limit)
  }
  );

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};