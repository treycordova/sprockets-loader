'use strict';

let resolveTree = require('../resolvers/resolveTree');

module.exports = (location, directiveFile) => {
  let resolutions = directiveFile.logicalPaths.map((logicalPath) => {
    return resolveTree(logicalPath, location, directiveFile);
  });

  return resolutions.find((resolution) => {
    return resolution;
  });
};
