/*
 * grunt-fileserver
 * https://github.com/jgermade/grunt-fileserver
 *
 * Copyright (c) 2014 Jesús Germade
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    fileserver: {
      test: {
        options: {
          hostname: '0.0.0.0',
          port: 8080,
          root: 'test',
          dirAlias: { 'dist': 'dist' },
          cwd: '.',
          keepalive: false,
          onStart: function(){ console.log('server started'); },
          onStop: function(){ console.log('server stopped'); },
          openInBrowser: true,
          addExtension: 'html',
          rewrite404: '/index.html'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  grunt.registerTask('keepalive', 'Waits forever', function() { var done = this.async(); });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'fileserver', 'keepalive']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
