module.exports = function(grunt) {
    grunt.initConfig({
        clean: ['build'],
        concurrent: {
            dev: ['nodemon:app', 'webpack:dev'],
            options: {
                logConcurrentOutput: true
            }
        },
        copy: {
            todo: {
                files: [{
                    expand: true,
                    cwd: 'assets/common/',
                    src: ['*.*'],
                    dest: 'build/'
                }, {
                    expand: true,
                    cwd: 'assets/',
                    src: ['styles.css'],
                    dest: 'build/'
                }]
            }
        },
        nodemon: {
            app: {
                script: './start.js',
                options: {
                    ignore: ['build/**'],
                    ext: 'js'
                }
            }
        },
        webpack: {
            dev: require('./webpack.config')
        }
    });

    // libs
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-webpack');

    // tasks
    grunt.registerTask('default', ['clean', 'copy:todo','concurrent:dev']);
};