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
            test: ['test/assets/**/*.js']
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
                        './contact_manager/assets/css/*.css',
                        './contact_manager/assets/img/*',
                        './contact_manager/assets/js/**/*.js',
                        './contact_manager/!assets/js/vendor/',
                        './contact_manager/index.html'
                    ],
                },
                options: {
                    watchTask: false,
                    server: {
                        baseDir: "./contact_manager",
                        index: "index.html"
                    }
                }
            },
            test: {
                files: {
                    src: [
                        './contact_manager/index.html',
                        './contact_manager/assets/css/*.css',
                        './contact_manager/assets/img/*',
                        './contact_manager/assets/js/**/*.js',
                        './contact_manager/!assets/js/vendor/',
                        './test/index.html',
                        './test/assets/js/**/*.js',
                    ],
                },
                options: {
                    watchTask: false,
                    server: {
                    baseDir: "./",
                    index: "./test/index.html"
                    }
                }
            }
        }
    });


    // register tasks
    // init:dev
    grunt.registerTask('init:dev', ['clean:dev', 'bower']);
    // build:dev

    //test
    grunt.registerTask('test', ['jshint:test', 'browserSync:test']);
    // default
    grunt.registerTask('default', ['jshint', 'browserSync:dev']);
};
