'use strict';

let path = require('path');
let resolve = require('../resolvers/resolve');
let getResolutions = require('../helpers/get-resolutions');

module.exports = (location, metadata) => {
  let resolutions = getResolutions(location, metadata);

  for (let resolution of resolutions) {
    let resolved = resolve(resolution, metadata);
    if (resolved) return [resolved];
  }
};
