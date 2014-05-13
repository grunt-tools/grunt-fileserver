# grunt-fileserver

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
        directory: null,
        keepalive: false,
        debug: false
      }
    }
  }
});
```

### Options

#### options.port
Type: `Number`
Default value: `',  '`

TCP connection port

#### options.hostname
Type: `String`
Default value: `0.0.0.0`

Hostname which will listen the requests

#### options.directory
Type: `String`
Default value: ``

Folder to use as root directory

#### options.directory
Type: `Boolean`
Default value: false

Enable or Disable keep server running. You may choose keep server running by other way. For example running watch after fileserver.


## Release History

* 2014-05-13    v0.1.16    Now supports dir alias.