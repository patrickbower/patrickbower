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
                    'assets/styles/main.css': 'src/styles/main.scss'
                }
            }
        },

        // css prefix
        autoprefixer: {

            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },

            dist: {
                src: 'assets/styles/main.css',
                dest: 'assets/styles/main.css'
            }

        },

        // js concat and minify
        uglify: {
            options: {
              mangle: false
            },
            all: {
                files: {
                    'assets/scripts/main.min.js': ['src/scripts/*.js']
                }
            }
        },

        // image cruching
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: 'images/*.{png,jpg,gif}',
                    dest: 'assets/'
                }]
            }
        },

        // sprite
        svg_sprite : {
            dist : {
                expand  : true,
                cwd     : 'src/',
                src     : ['icons/*.svg'],
                dest    : 'assets',
                options     : {
                    mode    : {
                        symbol  : {
                            inline      : false,
                            dest        : "icons",
                            prefix      : "icon-%s",
                            dimensions  : "-size",
                            sprite      : "sprite",
                            example     : true
                        }
                    }
                }
            }
        },

        // watch
        watch: {
            stylesheets: {
                files: [
                    'src/styles/**/*.scss',
                    'src/icons/*.svg'
                ],
                tasks: [
                    'sass',
                    'autoprefixer',
                    'svg_sprite'
                ],
                options: {
                  livereload: true,
                },
            },
            scripts: {
                files: [
                    'src/scripts/*.js'
                ],
                tasks: [
                    'uglify'
                ]
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

    // ===========================================================================
    // CREATE TASKS ==============================================================
    // ===========================================================================
    grunt.registerTask('default', ['sass', 'uglify', 'imagemin', 'svg_sprite', 'autoprefixer' ]);

};
