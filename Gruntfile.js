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

        clean: {
             dev: {
                 src: ['bower_components', 'assets/js/vendor']
             }
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
                        'assets/js/**/*.js',
                        '!assets/js/vendor/',
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
    grunt.registerTask('init:dev', ['clean:dev', 'bower']);
    // build:dev

    // default
    grunt.registerTask('default', ['jshint', 'browserSync:dev']);
};
