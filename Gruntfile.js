module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: 'dist/scss',
          cssDir: 'dist/css',
          relativeAssets: true,
          outputStyle: 'expanded',
          environment: 'production',
          importPath: 'bower_components/bootstrap-sass/assets/stylesheets'
        }
      }
    },
    uglify: {
      build: {
        src: 'dist/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },
    watch: {
      scripts: {
        files: [
          'dist/**/*.js',
          'dist/**/*.scss'
        ],
        tasks: ['uglify', 'compass', 'cssmin'],
        options: {
          debounceDelay: 100
        }
      }
    }
  });

  grunt.registerTask('default', [
    'uglify',
    'compass',
    'cssmin',
    'watch'
  ]);
};