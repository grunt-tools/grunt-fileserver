grunt-fileserver [![NPM version](https://badge.fury.io/js/grunt-fileserver.svg)](http://badge.fury.io/js/grunt-fileserver)
================

> Fast customizable development server

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-fileserver --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-fileserver');
```

## The "fileserver" task

### Overview
In your project's Gruntfile, add a section named `fileserver` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  fileserver: {
    server1: {
      options: {
        port: 8080,
        hostname: '0.0.0.0',
        cwd: '.'
        root: 'test',
        dirAlias: {
          'dist': 'dist'
        },
        keepalive: false,
        onStart: function(){ console.log('server started'); },
        onStop: function(){ console.log('server stopped'); }
      }
    }
  }
});
```

### Options

#### options.port
Type: `Number`
Default value: `8080`

TCP connection port

#### options.hostname
Type: `String`
Default value: `0.0.0.0`

Hostname which will listen the requests

#### options.cwd
Type: `String`
Default value: `.`

Current Working directory. All referencies will be relative to this.

#### options.root
Type: `String`
Default value: ``

Folder to use as server root directory

#### options.dirAlias
Type: `Object`
Default value: `{}`

List of directories alias. This allows using directories outside root directory to be served as them was in.

#### options.keepalive
Type: `Boolean`
Default value: false

Enable or Disable keep server running. You may choose keep server running by other way. For example running watch after fileserver.


## Release History

* 2014-05-13    v0.1.16    Now supports dir alias.
* 2014-11-17    v0.1.25    Added openInBrowser and addExtension