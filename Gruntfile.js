'use strict';

// Gruntfile.js

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

        // sass - complie sass
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'assets/css/main.css': 'src/sass/main.scss'
                }
            }
        },

        autoprefixer: {

            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },

            dist: {
                src: 'assets/css/main.css',
                dest: 'assets/css/main.css'
            }

        },

        // js - validation
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['Grunfile.js', 'src/js/*.js']
        },

        // js - concat and minify
        uglify: {
            all: {
                files: {
                    'assets/js/main.min.js': ['src/js/*.js']
                }
            }
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: 'img/*.{png,jpg,gif}',
                    dest: 'assets/'
                }]
            }
        },

        // watch - look for changes
        watch: {
            stylesheets: {
                files: [
                    'src/sass/**/*.scss'
                ],
                tasks: [
                    'sass',
                    'autoprefixer'
                ]
            },
            scripts: {
                files: [
                    'src/js/*.js'
                ],
                tasks: [
                    'uglify',
                    'jshint'
                ]
            },
        }

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');

    // ===========================================================================
    // CREATE TASKS ==============================================================
    // ===========================================================================
    grunt.registerTask('default', ['sass', 'jshint', 'uglify', 'imagemin', 'autoprefixer' ]);

};
