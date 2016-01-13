'use strict';

let getResolutions = require('../helpers/get-resolutions');
let resolveDirectory = require('../resolvers/resolveDirectory');

module.exports = (location, metadata) => {
  return getResolutions(location, metadata).find((resolution) => {
    return resolution;
  });
}
