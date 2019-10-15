module.exports = function(eleventyConfig) {

  return {
    dir: {
      input: './templates',
      layouts: '_layouts',
      includes: "_includes",
      output: './_site'
    }
  };
};