'use strict';

let getResolutions = require('../helpers/get-resolutions');
let resolveDirectory = require('../resolvers/resolveDirectory');

module.exports = (location, metadata) => {
  let resolutions = getResolutions(location, metadata);

  for (let resolution of resolutions) {
    let resolvedDirectory = resolveDirectory(resolution, metadata);
    if (resolvedDirectory) return resolvedDirectory;
  }
}
