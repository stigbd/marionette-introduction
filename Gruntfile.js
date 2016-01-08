module.exports = function (grunt) {
  require("time-grunt")(grunt);
  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    // jsHint
    // Run jsHint syntax checking on all necessary .js files
    eslint: {
      options: {
        config: ".eslintrc.json",
        reset: true,
        quiet: true
      },
      target: ["Gruntfile.js",
        "contact_manager/assets/js/**/*.js",
        "test/assets/js/**/*.js"
      ]
    },
    clean: {
      dev: {
        src: ["bower_components", "assets/js/vendor"]
      }
    },
    // bower
    bower: {
      install: {
        options: {
          targetDir: "assets/js/vendor",
          layout: "byComponent"
        }
      }
    },
    // browsersync
    browserSync: {
      dev: {
        files: {
          src: [
            "./contact_manager/assets/css/*.css",
            "./contact_manager/assets/img/*",
            "./contact_manager/assets/js/**/*.js",
            "./contact_manager/!assets/js/vendor/",
            "./contact_manager/index.html"
          ]
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
            "./contact_manager/index.html",
            "./contact_manager/assets/css/*.css",
            "./contact_manager/assets/img/*",
            "./contact_manager/assets/js/**/*.js",
            "./test/test.html",
            "./test/assets/js/spec/**/*.spec.js",
            "./contact_manager/!assets/js/vendor/"
          ]
        },
        options: {
          watchTask: false,
          server: {
            baseDir: "./",
            index: "./test/test.html"
          }
        }
      }
    }
  });
  // register tasks
  // init:dev
  grunt.registerTask("init:dev", ["clean:dev", "bower"]);
  // build:dev
  // eslint
  grunt.registerTask("lint", ["eslint"]);
  // test
  grunt.registerTask("test", ["eslint", "browserSync:test"]);
  // default
  grunt.registerTask("default", ["eslint", "browserSync:dev"]);
};
