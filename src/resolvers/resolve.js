'use strict';

let fs = require('fs');
let path = require('path');
let constants = require('../helpers/constants');

function access(absolutePath) {
  try {
    fs.accessSync(absolutePath, fs.R_OK);
    return true;
  } catch (error) {
    if (
      (error.code !== 'ENOENT' || error.syscall !== 'access') &&
      error.code !== 'ENOTDIR'
    ) {
      return console.error(error.stack);
    }

    return false;
  }
}

function hasCompatibleExtension(baseCompat, extension) {
  return baseCompat.terminal === extension ||
    (baseCompat && Array.isArray(baseCompat.extensions) &&
    baseCompat.extensions.indexOf(extension) !== -1);
}

function prependLoaders(relativePath, loaders) {
  loaders = Array.isArray(loaders) ? loaders : [];

  if (loaders.length) {
    return '!' + loaders.join('!') + '!' + relativePath;
  } else {
    return relativePath;
  }
}

function moduler(absolutePath, extension, resourcePath) {
  let compat = constants.compats[extension] || {};
  let relativePath = path.relative(path.dirname(resourcePath), absolutePath);

  relativePath = prependLoaders(
    relativePath.startsWith('.') ? relativePath : `./${relativePath}`,
    compat.loaders
  );

  return `require('${relativePath}');`;
}

module.exports = (location, metadata) => {
  let extension = path.extname(location);

  if (hasCompatibleExtension(metadata.compat, extension)) {
    if (access(location)) {
      return moduler(
        location,
        extension,
        metadata.path
      );
    }
  } else {
    let absolutePaths = [
      metadata.compat.terminal,
      ...(metadata.compat.extensions || [])
    ].map((extension) => {
      return location + extension;
    });

    for (let absolutePath of absolutePaths) {
      if (access(absolutePath)) {
        return moduler(
          absolutePath,
          path.extname(absolutePath),
          metadata.path
        );
      }
    }
  }

  return false;
};
