'use strict';

let resolve = require('../resolvers/resolve');

module.exports = (location, directiveFile) => {
  let resolutions = directiveFile.logicalPaths.map((logicalPath) => {
    return resolve(logicalPath, location, directiveFile);
  });

  return resolutions.find((resolution) => {
    return resolution;
  });
};
