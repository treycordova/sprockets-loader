'use strict';

let path = require('path');
let assert = require('assert');
let constants = require('./constants');

module.exports = (resourcePath, options) => {
  assert(
    !options.logicalPaths || Array.isArray(options.logicalPaths),
    'sprockets-loaders: logicalPaths must be an Array of Strings.'
  );

  let directiveExtension = path.extname(resourcePath);
  let directiveCompat = constants.compats[directiveExtension];
  let logicalPaths = new Set(
    (options.logicalPaths || []).
      concat(constants.logicalPaths)
  );

  return {
    compat: directiveCompat || {},
    path: resourcePath,
    logicalPaths: Array.from(logicalPaths)
  };
};
