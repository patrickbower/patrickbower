"use strict";

const fs = require("fs");

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // sass
    sass: {
      develop: {
        expand: true,
        options: {
          sourceMap: true,
          sourceMapContents: true
        },
        cwd: "resources/scss/",
        src: "main.scss",
        dest: "_site/styles/",
        ext: ".css"
      },
      production: {
        expand: true,
        options: {
          outputStyle: "compressed"
        },
        cwd: "resources/scss/",
        src: "main.scss",
        dest: "_site/styles/",
        ext: ".css"
      }
    },

    // css prefix
    autoprefixer: {
      options: {
        browsers: ["last 2 versions", "ie 8", "ie 9"]
      },
      dist: {
        src: "_site/styles/main.css",
        dest: "_site/styles/main.css"
      }
    },

    // svg sprite
    svg_sprite: {
      dist: {
        expand: true,
        cwd: "resources/",
        src: ["icon/*.svg"],
        dest: ".",
        options: {
          mode: {
            symbol: {
              dest: "templates/_includes/",
              inline: true,
              prefix: ".",
              dimensions: "",
              sprite: "sprite.svg",
              example: false
            }
          }
        }
      }
    },

    // js
    browserify: {
      dist: {
        files: {
          "_site/scripts/main.js": "./resources/js/main.js"
        },
        options: {
          transform: [["babelify", { presets: ["es2015"] }]]
        }
      }
    },

    // watch
    watch: {
      stylesheets: {
        files: ["resources/scss/**/*.scss"],
        tasks: ["sass", "autoprefixer"]
      },
      scripts: {
        files: ["resources/js/**/*.js"],
        tasks: ["browserify"]
      },
      sprite: {
        files: "resources/icon/*.svg",
        tasks: ["svg_sprite"]
      }
    },

    // copy
    copy: {
      main: {
        expand: true,
        cwd: "resources",
        src: ["fonts/*", "CNAME", "documents/*"],
        dest: "./_site"
      }
    },

    // minify js
    uglify: {
      my_target: {
        files: [
          {
            expand: true,
            mangle: true,
            sourceMap: false,
            cwd: "_site/scripts",
            src: "*.js",
            dest: "_site/scripts"
          }
        ]
      }
    },

    // delete _site dir
    clean: "_site"
  });

  grunt.loadNpmTasks("grunt-svg-sprite");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("develop", [
    "sass:develop",
    "autoprefixer",
    "browserify",
    "svg_sprite",
    "copy"
  ]);

  grunt.registerTask("production", [
    "clean",
    "sass:production",
    "autoprefixer",
    "browserify",
    "uglify",
    "copy"
  ]);
};
