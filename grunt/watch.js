module.exports = {

    options: {
        spawn: false,
        livereload: false
    },

    scripts: {
        files: [
            'src/js/*.js'
        ],
        tasks: [
            'jshint',
            'uglify'
        ]
    },

    styles: {
        files: [
            'src/sass/*/*.scss'
        ],
        tasks: [
            'sass:dev'
        ]
    },
};