'use strict';

let fs = require('fs');
let path = require('path');
let resolve = require('./resolve');

let resolveTree = module.exports = (logicalPath, location, metadata) => {
  let absolutePath = path.resolve(logicalPath, location);

  try {
    let files = fs.readdirSync(absolutePath);

    return files.map((file) => {
      let stats = fs.statSync(path.resolve(absolutePath, file));

      if (stats.isDirectory()) {
        return resolveTree(absolutePath, file, metadata);
      } else {
        return resolve(absolutePath, file, metadata);
      }
    }).join('\n');
  } catch (error) {
    return false;
  }
};
