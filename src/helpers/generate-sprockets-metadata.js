'use strict';

let path = require('path');
let assert = require('assert');
let gemfile = require('gemfile');
let constants = require('./constants');
let gemLogicalPaths = require('./gem-logical-paths');

module.exports = (resourcePath, options) => {
  assert(
    typeof resourcePath === 'string',
    'sprockets-loader: resourcePath must be a String.'
  );

  assert(
    !options || !options.logicalPaths || Array.isArray(options.logicalPaths),
    'sprockets-loader: logicalPaths must be an Array of Strings.'
  );

  let gemPaths = [];
  let directiveExtension = path.extname(resourcePath);
  let directiveCompat = constants.compats[directiveExtension];

  try {
    let file = path.resolve(process.cwd(), 'Gemfile.lock');
    let gemLocations = gemLogicalPaths();
    let specs = gemfile.parseSync(file).GEM.specs;

    for (let key in specs) {
      let spec = specs[key];
      let name = `${key}-${spec.version}`;

      for (let location of gemLocations) {
        gemPaths.push(path.join(location, name));
      }
    }
  } catch(error) {
    console.info([
      'Did you know sprockets-loader can parse a Gemfile.lock?',
      'That means you can include your favorite Gems in your sprockets directives!'
    ].join('\n') + '\n');
  }

  let logicalPaths = new Set(
    (options && options.logicalPaths || []).
      concat(constants.logicalPaths)
  );

  return {
    compat: directiveCompat || {},
    path: resourcePath,
    gemPaths,
    logicalPaths: Array.from(logicalPaths)
  };
};
