'use strict';

let path = require('path');
let assert = require('assert');

module.exports = function(location, metadata) {
  assert(
    typeof location === 'string',
    'sprockets-loader: location must be a string'
  );

  assert(
    metadata && Array.isArray(metadata.logicalPaths),
    'sprockets-loader: metadata must contain logicalPaths'
  );

  assert(
    metadata && Array.isArray(metadata.gemPaths),
    'sprockets-loader: metadata must comtain gemPaths'
  );

  // Build direct logical paths.
  let resolutions = metadata.logicalPaths.map((logicalPath) => {
    return path.resolve(logicalPath, location);
  });

  // Build Gemfile.lock paths with the list of logical
  // paths.
  metadata.gemPaths.forEach((gemPath) => {
    resolutions = resolutions.concat(
      metadata.logicalPaths.map((logicalPath) => {
        return path.join(gemPath, logicalPath, location);
      })
    );
  });

  return resolutions;
};
