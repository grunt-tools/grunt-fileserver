/*
 * grunt-fileserver
 * https://github.com/jgermade/grunt-fileserver
 *
 * Copyright (c) 2014 Jesús Germade
 * Licensed under the MIT license.
 */

'use strict';

  // keep an eye on
  // https://github.com/gruntjs/grunt-contrib-connect/blob/master/tasks/connect.js


//   Create a new repository on the command line

// touch README.md
// git init
// git add README.md
// git commit -m "first commit"
// git remote add origin git@github.com:jgermade/grunt-fileserver.git
// git push -u origin master
// Push an existing repository from the command line

// git remote add origin git@github.com:jgermade/grunt-fileserver.git
// git push -u origin master



function runServer(options){
  options = options || {};

  var http = require("http"),
      url = require("url"),
      path = require("path"),
      fs = require("fs"),
      colors = require('colors'),
      mime = require('mime'),
      cwd = process.cwd();

  if( options.cwd ) cwd = path.resolve(cwd,options.cwd);
  console.log('cwd: '+cwd);

  options.port = options.port || 8080;

  if( options.log == undefined ) options.log = true;

  if( options.debug ) console.log('options : '+JSON.stringify(options));

  function clearSlash(path_str){ return path_str.replace(/^\/|\/$/,''); }

  var matchAlias = {};
  Object.keys(options.dirAlias).forEach(function(dir){
    matchAlias[dir] = new RegExp('^'+clearSlash(dir));
  });

  var server = http.createServer(function(request, response) {


      var uri = url.parse(request.url).pathname, uriClear = clearSlash(uri), uriLog = uri,
          basePath = cwd.replace(/\/$/,'')+( options.directory ? ('/' + options.directory) : '' ),
          filename = path.join(basePath, uri),
          contentType = "text/plain";

      Object.keys(options.dirAlias).forEach(function(dir){
        if( matchAlias[dir].test(uriClear) ) {
          var uriRelative = uriClear.replace(matchAlias[dir],'').replace(/^\//,'');

          filename = path.join( path.resolve(cwd,options.dirAlias[dir]), uriRelative );

          uriLog = ( '/' + dir ).blue + '/' + uriRelative;
        }
      });

      fs.exists(filename, function(exists) {
          if(!exists) {
              response.writeHead(404, {"Content-Type": "text/html"});
              response.write("<div style=\"text-align: center;\"><div style=\"display: inline-block; min-width: 80%; border: 1px solid #999; padding: 0.5em; text-align: left;\"><div><span style=\"color: red;\">404</span> <span style=\"font-weight: bold;\">"+uri+"</span></div><div>Not Found</div></div></div>");
              response.end();
              if(options.log) console.log("[404] ".red + uriLog );
              return;
          }

          if(fs.statSync(filename).isDirectory()) {
            filename += ( ( /\/$/.test(filename) ? '' : '/' ) + 'index.html' );
          }
          
          if( /\w+\.\w+/.test(filename) ) {
            contentType = mime.lookup( filename ) || contentType;
          }

          fs.readFile(filename, "binary", function(err, file) {
              if(err) {        
                  response.writeHead(500, {"Content-Type": contentType });
                  response.write(err + "\n");
                  response.end();
                  if(options.log) console.log("[500] ".lightred + uriLog );
                  return;
              }

              response.writeHead(200, {"Content-Type": contentType });
              response.write(file, "binary");
              response.end();
              if(options.log) console.log("[200] ".green + (' ' + uriLog ).white + ( '  (' + contentType + ')' ).yellow );
          });
      });
  }).listen(parseInt(options.port, 10),options.hostname,function(){
      console.log("Static file server running at\n  => ".yellow + ( "http://"+( ( options.hostname === "0.0.0.0" ) ? "localhost": options.hostname )+":" + options.port ).green + "/\nCTRL + C to shutdown\n".yellow );
      if( options.onCreateServer instanceof Function ) options.onCreateServer.call(server);
  });

  return server;

}

module.exports = function(grunt) {

  grunt.registerMultiTask('fileserver', 'Fast customizable development server', function() {

    // var done = this.async();
    // Merge task-specific options with these defaults.
    var options = this.options({
      protocol: 'http',
      port: 8080,
      hostname: '0.0.0.0',
      directory: null,
      keepalive: false,
      debug: false,
      livereload: false,
      open: false,
      // useAvailablePort: false,
      onCreateServer: null,
      dirAlias: {}

      // // if nothing passed, then is set below 'middleware = createDefaultMiddleware.call(this, connect, options);'
      // middleware: null
    });

    // Connect will listen to all interfaces if hostname is null.
    if (options.hostname === '*') {
      options.hostname = '';
    }

    // console.log('debug'+runServer);
    try {
      runServer(options).close(options.keepalive ? this.async() : function(){});
    } catch(err){
      console.log(err.message);
    }

    // // Merge task-specific and/or target-specific options with these defaults.
    // var options = this.options({
    //   punctuation: '.',
    //   separator: ', '
    // });

    // // Iterate over all specified file groups.
    // this.files.forEach(function(f) {
    //   // Concat specified files.
    //   var src = f.src.filter(function(filepath) {
    //     // Warn on and remove invalid source files (if nonull was set).
    //     if (!grunt.file.exists(filepath)) {
    //       grunt.log.warn('Source file "' + filepath + '" not found.');
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }).map(function(filepath) {
    //     // Read file source.
    //     return grunt.file.read(filepath);
    //   }).join(grunt.util.normalizelf(options.separator));

    //   // Handle options.
    //   src += options.punctuation;

    //   // Write the destination file.
    //   grunt.file.write(f.dest, src);

    //   // Print a success message.
    //   grunt.log.writeln('File "' + f.dest + '" created.');
    // });
  });

};
