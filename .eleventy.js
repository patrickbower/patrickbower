module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias('contact', 'pages/contact.html');
  eleventyConfig.addLayoutAlias('design', 'pages/design.html');
  eleventyConfig.addLayoutAlias('development', 'pages/development.html');

  return {
    dir: {
      input: "./",      // Equivalent to Jekyll's source property
      output: "./_site"         // Equivalent to Jekyll's destination property
    }
  };
};