'use strict';

let fs = require('fs');
let path = require('path');
let resolve = require('./resolve');

let resolveDirectory = module.exports = (location, metadata) => {
  try {
    let files = fs.readdirSync(location);

    return files.map((file) => {
      let resolvedPath = path.resolve(location, file);
      let stats = fs.statSync(resolvedPath);

      if (stats.isFile()) {
        return resolve(resolvedPath, metadata);
      }
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
