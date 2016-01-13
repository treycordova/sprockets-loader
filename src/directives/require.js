'use strict';

let path = require('path');
let resolve = require('../resolvers/resolve');
let getResolutions = require('../helpers/get-resolutions');

module.exports = (location, metadata) => {
  return getResolutions(location, metadata).find((resolution) => {
    return resolve(resolution, metadata);
  });
};
