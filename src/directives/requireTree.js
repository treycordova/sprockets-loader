'use strict';

let resolveTree = require('../resolvers/resolveTree');
let getResolutions = require('../helpers/get-resolutions');

module.exports = (location, metadata) => {
  return getResolutions(location, metadata).find((resolution) => {
    return resolveTree(resolution, metadata);
  });
};
