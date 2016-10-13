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
                    'build/styles/main.css': 'resources/scss/main.scss'
                }
            }
        },

        // css prefix
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            dist: {
                src: 'build/styles/main.css',
                dest: 'build/styles/main.css'
            }
        },

        // css minify
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'build/styles',
                    src: ['*.css'],
                    dest: '../patrickbower.com/styles',
                    ext: '.css'
                }]
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
                        name: '1200',
                        width: 1200
                    }]
                },
                files: [{
                    expand: true,
                    src: ['**/*.{jpg,gif,png}'],
                    cwd: 'resources/imgs/',
                    dest: 'build/images'
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
                            dest        : "templates/_includes/",
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
                    'build/scripts/main.js': './resources/js/main.js'
                },
                options: {
                    transform: [
                        ['babelify', { presets: ['es2015'] }]
                    ]
                }
            }
        },

        // minify js
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    '../patrickbower.com/scripts/main.js': 'build/scripts/main.js'
                }
            }
        },

        // jekyll
        jekyll: {
            dist: {
                options: {
                    config: '_config.yml'
                }
            }
        },

        // watch
        watch: {
            stylesheets: {
                files: [ 'resources/scss/**/*.scss'],
                tasks: [ 'sass', 'autoprefixer' ],
            },
            scripts: {
                files: [ 'resources/js/**/*.js' ],
                tasks: [ 'browserify' ],
            },
            images: {
                files: 'resources/imgs/**/*.{png,jpg,gif}',
                tasks: [ 'responsive_images'],
            },
            sprite: {
                files: 'resources/icon/*.svg',
                tasks: [ 'svg_sprite', 'jekyll' ],
            },
            jekyll: {
                files: [
                    'templates/_includes/*.html',
                    'templates/_layouts/*.html',
                    'templates/pages/*.html'
                ],
                tasks: ['jekyll']
            }
        },

        // copy
        copy: {
            main: {
                expand: true,
                cwd: 'build',
                src: ['**', '!scripts/*', '!styles/*'],
                dest: '../patrickbower.com'
            }
        }

});

    grunt.loadNpmTasks('grunt-svg-sprite');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', [ 'sass', 'autoprefixer', 'browserify', 'responsive_images', 'svg_sprite', 'jekyll' ]);
    grunt.registerTask('production', [ 'copy', 'uglify', 'cssmin' ]);

};
