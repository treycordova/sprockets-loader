'use strict';

let resolve = require('../resolvers/resolve');

module.exports = (location, metadata) => {
  let resolutions = metadata.logicalPaths.map((logicalPath) => {
    return resolve(logicalPath, location, metadata);
  });

  return resolutions.find((resolution) => {
    return resolution;
  });
};
