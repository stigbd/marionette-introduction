module.exports = function(grunt) {
    "use strict";

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // jsHint
        // Run jsHint syntax checking on all necessary .js files
        jshint: {
            all: ['Gruntfile.js', 'assets/**/*.js', '!assets/js/vendor/**/*.js'],
        },

        // bower
        bower: {
            install: {
                options: {
                    targetDir: 'assets/js/vendor',
                    layout: 'byComponent'
                }
            }
        },

        // browsersync
        browserSync: {
            dev: {
                files: {
                    src: [
                        'assets/css/*.css',
                        'assets/img/*',
                        'assets/js/*.js',
                        '**/*.html'
                    ],
                },
                options: {
                    watchTask: false,
                    server: './'
                }
            }
        }
    });


    // register tasks
    // init:dev
    grunt.registerTask('init:dev', ['bower']);
    // build:dev

    // default
    grunt.registerTask('default', ['jshint', 'browserSync:dev']);
};
