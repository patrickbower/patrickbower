'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

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

        // image optimisation
        responsive_images: {
            myTask: {
                options: {
                    sizes: [{
                        name: '480',
                        width: 480,
                        height: 240
                    },{
                        name: '768',
                        width: 768
                    },{
                        name: "1200",
                        width: 1200
                    }]
                },
                files: [{
                    expand: true,
                    src: ['**/*.{jpg,gif,png}'],
                    cwd: 'resources/imgs/',
                    dest: 'source/images'
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
                            dest        : "source/_includes/",
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

        // js
        browserify: {
            dist: {
                files: {
                    './source/scripts/main.min.js': ['./resources/js/main.js']
                },
                options: {
                    transform: [
                        ['babelify', { presets: ['es2015'] }]
                    ]
                }
            }
        },

        // jekyll
        jekyll: {
            dist: {
                options: {
                    config: '_config.yml',
                    src: 'source',
                    dest: '../patrickbower.com'
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
                tasks: [ 'browserify', 'jekyll' ],
            },
            sprite: {
                files: 'resources/icon/*.svg',
                tasks: [ 'svg_sprite', 'jekyll' ],
            },
            images: {
                files: 'resources/imgs/**/*.{png,jpg,gif}',
                tasks: [ 'responsive_images', 'jekyll' ],
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

    grunt.loadNpmTasks('grunt-svg-sprite');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify', 'responsive_images', 'sass', 'svg_sprite', 'autoprefixer', 'jekyll']);
    grunt.registerTask('test', ['responsive_images']);

};
