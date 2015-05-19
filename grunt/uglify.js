module.exports = {
    all: {
        files: [{
            expand: true,
            cwd: 'src/js',
            src: '**/*.js',
            dest: 'assets/js',
            ext: '.min.js'
        }]
    }
};