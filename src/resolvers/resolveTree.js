'use strict';

let fs = require('fs');
let path = require('path');
let resolve = require('./resolve');

let resolveTree = module.exports = (location, metadata) => {
  try {
    let files = fs.readdirSync(location);

    return files.map((file) => {
      let resolvedPath = path.resolve(location, file);
      let stats = fs.statSync(resolvedPath);

      if (stats.isDirectory()) {
        return resolveTree(resolvedPath, metadata);
      } else {
        return resolve(resolvedPath, metadata);
      }
    }).join('\n');
  } catch (error) {
    return false;
  }
};
