module.exports = {
    // Development settings
    dev: {
        options: {
            // outputStyle: 'nested',
            outputStyle: 'compressed',
            sourceMap: true
        },
        files: [{
            expand: true,
            cwd: 'src/sass',
            src: ['*.scss'],
            dest: 'assets/css',
            ext: '.css'
        }]
    },
    // Production settings
    prod: {
        options: {
            outputStyle: 'compressed',
            sourceMap: false
        },
        files: [{
            expand: true,
            cwd: 'src/sass/',
            src: ['*.scss'],
            dest: 'assets/css',
            ext: '.css'
        }]
    }
};