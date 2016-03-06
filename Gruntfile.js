// Gruntfile.js
'use strict';

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
                sourceMap: true
            },
            dist: {
                files: {
                    'source/styles/main.css': 'source/_scss/main.scss'
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
                mangle: false
            },
            all: {
                files: {
                    'source/scripts/main.min.js': ['source/_js/*.js']
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
                    cwd    : 'source/_imgs/',
                    src    : ['**/*.{png,jpg,gif}'],
                    dest   : 'source/images/'
                }]
            }
        },

        // svg sprite
        svg_sprite        : {
            dist          : {
                expand    : true,
                cwd       : 'source/',
                src       : ['_icon/*.svg'],
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
                files: [ 'source/_scss/**/*.scss'],
                tasks: [ 'sass', 'autoprefixer', 'jekyll' ],
            },
            scripts: {
                files: [ 'source/_js/*.js' ],
                tasks: [ 'uglify', 'jekyll' ],
            },
            sprite: {
                files: 'source/_icon/*.svg',
                tasks: [ 'svg_sprite', 'jekyll' ],
            },
            images: {
                files: 'source/_imgs/*.{png,jpg,gif}',
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
