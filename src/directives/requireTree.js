'use strict';

let resolveTree = require('../resolvers/resolveTree');

module.exports = (location, metadata) => {
  let resolutions = metadata.logicalPaths.map((logicalPath) => {
    return resolveTree(logicalPath, location, metadata);
  });

  return resolutions.find((resolution) => {
    return resolution;
  });
};
