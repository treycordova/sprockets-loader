'use strict';

let fs = require('fs');
let path = require('path');
let resolve = require('./resolve');

let resolveDirectory = module.exports = (logicalPath, location, metadata) => {
  let absolutePath = path.resolve(logicalPath, location);

  try {
    let files = fs.readdirSync(absolutePath);

    return files.map((file) => {
      if (stats.isFile()) {
        return resolve(absolutePath, file, metadata);
      }
    }).join('\n');
  } catch (error) {
    return false;
  }
};
