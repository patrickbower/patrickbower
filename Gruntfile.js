"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // sass
    sass: {
      options: {
        sourceMap: true,
        sourceMapContents: true
      },
      dist: {
        files: {
          "_site/styles/main.css": "resources/scss/main.scss"
        }
      }
    },

    // css prefix
    autoprefixer: {
      options: {
        browsers: ["last 2 versions", "ie 8", "ie 9"]
      },
      dist: {
        src: "serve/styles/main.css",
        dest: "serve/styles/main.css"
      }
    },

    // css minify
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "serve/styles",
            src: ["*.css"],
            dest: "build/styles",
            ext: ".css"
          }
        ]
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

    // minify js
    // uglify: {
    //   options: {
    //     mangle: true
    //   },
    //   my_target: {
    //     files: {
    //       "resources/scripts/main.js": "_site/scripts/main.js"
    //     }
    //   }
    // },

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
      run: {
        expand: true,
        cwd: "resources",
        src: ["fonts/*", "CNAME", ".htaccess", "documents/*"],
        dest: "./_site"
      }
    }
  });

  grunt.loadNpmTasks("grunt-svg-sprite");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("run", [
    "sass",
    "autoprefixer",
    "browserify",
    "svg_sprite",
    "copy:run"
  ]);
};
