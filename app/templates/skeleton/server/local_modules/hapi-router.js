'use strict';

let glob = require('glob');
let castArray = require('cast-array');

exports.register = function (server, options, next) {
  let globOptions = {
    nodir: true,
    strict: true,
    cwd: options.cwd || process.cwd(),
    ignore: options.ignore
  };

  castArray(options.routes).forEach(function (pattern) {
    let files = glob.sync(pattern, globOptions);

    files.forEach(function (file) {
      server.route(require(globOptions.cwd + '/' + file));
    });
  });

  next();
};

exports.register.attributes = {
  multiple: false,
  name: 'hapi-router',
  version: '3.3.0'
};
