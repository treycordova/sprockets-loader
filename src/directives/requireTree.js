'use strict';

let resolveTree = require('../resolvers/resolveTree');
let getResolutions = require('../helpers/get-resolutions');

module.exports = (location, metadata) => {
  let resolutions = getResolutions(location, metadata);

  for (let resolution of resolutions) {
    let resolvedTree = resolveTree(resolution, metadata);

    if (resolvedTree) {
      return function flatten(array) {
        return array.reduce((prev, next) => {
          return prev.concat(
            Array.isArray(next) ?
              flatten(next) :
              next
          );
        }, []);
      }(resolvedTree);
    }
  }
};
