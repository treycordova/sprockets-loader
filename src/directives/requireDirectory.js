'use strict';

let resolveDirectory = require('../resolvers/resolveDirectory');

module.exports = (location, directiveFile) => {
  let resolutions = directiveFile.logicalPaths.map((logicalPath) => {
    return resolveDirectory(logicalPath, location, directiveFile);
  });

  return resolutions.find((resolution) => {
    return resolution;
  });
}
