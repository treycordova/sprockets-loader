'use strict';

let path = require('path');
let loaderUtils = require('loader-utils');

let larser = require('./helpers/larser');
let constants = require('./helpers/constants');
let isSprocketsFile = require('./helpers/is-sprockets-file');
let isSprocketsDirective = require('./helpers/is-sprockets-directive');
let parseSprocketsLocation = require('./helpers/parse-sprockets-location');
let generateSprocketsMetadata = require('./helpers/generate-sprockets-metadata');

let directives = {
  require: require('./directives/require'),
  require_tree: require('./directives/requireTree'),
  require_directory: require('./directives/requireDirectory')
};

module.exports = function(source) {
  this.cacheable(true);

  if (isSprocketsFile(source)) {
    let options = loaderUtils.parseQuery(this.query);
    let metadata = generateSprocketsMetadata(this.resourcePath, options);

    let index = 0;
    let requireSelf = false;
    let lines = source.split('\n');
    let cache = {};
    let modules = [];

    while (larser.insideCommentBlock(lines[index])) {
      let line = lines[index++];

      if (isSprocketsDirective(line)) {
        let sprocket = parseSprocketsLocation(line);
        let isRequireSelf = sprocket && sprocket.directive === 'require_self';
        let isValidDirective = sprocket && typeof directives[sprocket.directive] === 'function';

        if (isRequireSelf) {
          requireSelf = true;
        } else if (isValidDirective) {
          let directive = directives[sprocket.directive];
          let requires = directive(sprocket.path, metadata);

          if (Array.isArray(requires)) {
            for (let module of requires) {
              if (!cache[module]) {
                cache[module] = true;
                modules.push(module);
              } else {
                modules.push(`// ${module} is duplicative.`);
              }
            }
          } else {
            throw new Error(`sprockets-loader: Missing file for (${this.resourcePath}:${index}): ${line}`);
          }
        } else {
          throw new Error(`sprockets-loader: Missing path for (${this.resourcePath}:${index}): ${line}.`);
        }
      } else {
        modules.push(larser.preserveComments(line));
      }
    }

    let requires = modules.join('\n');
    let self = lines.slice(index).join('\n');

    return requireSelf ?
      `${requires}\n${self}` :
      requires;
  } else {
    return source;
  }
};
