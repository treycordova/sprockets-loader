'use strict';

let resolveDirectory = require('../resolvers/resolveDirectory');

module.exports = (location, metadata) => {
  let resolutions = metadata.logicalPaths.map((logicalPath) => {
    return resolveDirectory(logicalPath, location, metadata);
  });

  return resolutions.find((resolution) => {
    return resolution;
  });
}
