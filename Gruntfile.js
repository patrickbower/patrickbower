// Gruntfile.js
'use strict';

var js = require('./resources/js/main.js');

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // all of our configuration will go here

        // sass
        sass: {
            options: {
                sourceMap: true,
                sourceMapContents: true
            },
            dist: {
                files: {
                    'source/styles/main.css': 'resources/scss/main.scss'
                }
            }
        },

        // css prefix
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            dist: {
                src: 'source/styles/main.css',
                dest: 'source/styles/main.css'
            }
        },

        // js concat and minify
        uglify: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true
            },
            all: {
                files: {
                    'source/scripts/main.min.js': js.files()
                }
            }
        },

        // image optimisation
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand : true,
                    cwd    : 'resources/imgs/',
                    src    : ['**/*.{png,jpg,gif}'],
                    dest   : 'source/images/'
                }]
            }
        },

        // svg sprite
        svg_sprite        : {
            dist          : {
                expand    : true,
                cwd       : 'resources/',
                src       : ['icon/*.svg'],
                dest      : '.',
                options   : {
                    mode: {
                        symbol: {
                            dest        : "source/images/",
                            inline      : true,
                            prefix      : ".",
                            dimensions  : "",
                            sprite      : "sprite.svg",
                            example     : false
                        }
                    }
                }
            }
        },

        // jekyll
        jekyll: {
            dist: {
                options: {
                    config: '_config.yml',
                    src: 'source',
                    dest: 'public'
                }
            }
        },

        // watch
        watch: {
            stylesheets: {
                files: [ 'resources/scss/**/*.scss'],
                tasks: [ 'sass', 'autoprefixer', 'jekyll' ],
            },
            scripts: {
                files: [ 'resources/js/**/*.js' ],
                tasks: [ 'uglify', 'jekyll' ],
            },
            sprite: {
                files: 'resources/icon/*.svg',
                tasks: [ 'svg_sprite', 'jekyll' ],
            },
            images: {
                files: 'resources/imgs/*.{png,jpg,gif}',
                tasks: [ 'imagemin', 'jekyll' ],
            },
            jekyll: {
                files: [
                    'source/_includes/*.html',
                    'source/_layouts/*.html',
                    'source/pages/*.html'
                ],
                tasks: ['jekyll']
            },
        }

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-svg-sprite');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-jekyll');

    // ===========================================================================
    // CREATE TASKS ==============================================================
    // ===========================================================================
    grunt.registerTask('default', ['imagemin', 'sass', 'uglify', 'svg_sprite', 'autoprefixer', 'jekyll']);

};
