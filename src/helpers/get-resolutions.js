'use strict';

let path = require('path');

module.exports = function(location, metadata) {
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
