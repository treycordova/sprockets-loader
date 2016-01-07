'use strict';

let fs = require('fs');
let path = require('path');
let resolve = require('./resolve');

let resolveTree = module.exports = (logicalPath, location, directiveFile) => {
  let absolutePath = path.resolve(logicalPath, location);

  try {
    let files = fs.readdirSync(absolutePath);

    return files.map((file) => {
      let stats = fs.statSync(path.resolve(absolutePath, file));

      if (stats.isDirectory()) {
        return resolveTree(absolutePath, file, directiveFile);
      } else {
        return resolve(absolutePath, file, directiveFile);
      }
    }).join('\n');
  } catch (error) {
    return false;
  }
};
