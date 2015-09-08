/*
 * grunt-fileserver
 * https://github.com/jgermade/grunt-fileserver
 *
 * Copyright (c) 2014 Jesús Germade
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('fileserver', 'Fast customizable development server', function() {

    // Merge task-specific options with these defaults.
    var noop = function () {},
        options = this.options({
          protocol: 'http',
          port: 8080,
          hostname: '0.0.0.0',
          root: null,
          keepalive: false,
          debug: false,
          livereload: false,
          open: false,
          // useAvailablePort: false,
          dirAlias: {},
          onStart: noop,
          onStop: noop
        });

    // Connect will listen to all interfaces if hostname is null.
    if (options.hostname === '*') {
      options.hostname = '';
    }

    // console.log('debug'+runServer);
    var done = options.keepalive ? this.async() : function(){};
    try {
      var server = require('nitro-server').start(options);
      process.on('SIGINT', function() {
        options.onStop.call(server);
        console.log('\nbye!'.yellow);
        done();
        server.close();
        process.exit();
      });
    } catch(err){
      console.log(err.message);
    }
  });

};
