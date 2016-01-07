'use strict';

let path = require('path');
let loaderUtils = require('loader-utils');

let constants = require('./helpers/constants');
let larser = require('./helpers/larser');
let isSprocketsFile = require('./helpers/is-sprockets-file');
let isSprocketsDirective = require('./helpers/is-sprockets-directive');
let parseSprocketsLocation = require('./helpers/parse-sprockets-location');

let directives = {
  require: require('./directives/require'),
  require_tree: require('./directives/requireTree'),
  require_directory: require('./directives/requireDirectory')
};

module.exports = function(source) {
  let options = loaderUtils.parseQuery(this.query);

  let logicalPaths = [
    'app/assets/javascripts',
    'app/assets/stylesheets',
    'vendor/assets/javascripts',
    'vendor/assets/stylesheets'
  ];

  let directiveExtension = path.extname(this.resourcePath);
  let directiveCompat = constants.compats[directiveExtension];
  let directiveFile = {
    compat: directiveCompat || {},
    path: this.resourcePath,
    logicalPaths: Array.from(
      new Set(
        (options.logicalPaths || []).concat(logicalPaths)
      )
    )
  };

  if (isSprocketsFile(source)) {
    let index = 0;
    let lines = source.split('\n');
    let modules = [];

    while (larser.insideCommentBlock(lines[index])) {
      let line = lines[index++];

      if (isSprocketsDirective(line)) {
        let sprocket = parseSprocketsLocation(line);

        if (sprocket && typeof directives[sprocket.directive] === 'function') {
          let moduleDialectWithPath = directives[sprocket.directive](
            sprocket.path,
            directiveFile
          );

          if (moduleDialectWithPath) {
            modules.push(moduleDialectWithPath);
          } else {
            throw new Error(`sprockets-loader: Missing file for (${this.resourcePath}:${index + 1}): ${line}`);
          }
        } else {
          throw new Error(`sprockets-loader: Missing path for (${this.resourcePath}:${index + 1}): ${line}.`);
        }
      } else {
        modules.push(larser.preserveComments(line));
      }
    }

    if (modules.length) {
      return `${modules.join('\n')}\n${lines.slice(index).join('\n')}`;
    } else {
      return lines.join('\n');
    }
  } else {
    return source;
  }
};
