module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          loadPath: 'bower_components/bootstrap-sass/assets/stylesheets',
          sourcemap: 'none',
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'dist/scss/',
          src: ['*.scss'],
          dest: 'dist/css/',
          ext: '.css'
        }]
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
        files: ['dist/**/*.js'],
        tasks: ['uglify']
      },
      styles: {
        files: ['dist/**/*.scss'],
        tasks: ['sass', 'cssmin' ,'postcss']
      }
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: ['last 3 versions']
          })
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist/css/',
            src: '**/*.css',
            dest: 'dist/css/'
          }
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'uglify',
    'sass',
    'cssmin',
    'postcss',
    'watch'
  ]);
};