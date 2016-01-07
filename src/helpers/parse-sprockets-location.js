'use strict';

let path = require('path');
let constants = require('./constants');

function location(comment, directive) {
  return new RegExp(comment.source + '(' + directive.source + ')' + '(.*)');
};

module.exports = (line) => {
  let expressions = [];

  for (let comment of constants.comments) {
    for (let directive of constants.directives) {
      expressions.push(location(comment, directive));
    }
  }

  for (let expression of expressions) {
    let matches = expression.exec(line);

    if (matches && matches[1] && matches[2]) {
      return {
        directive: matches[1].trim(),
        path: matches[2].trim()
      };
    }
  }

  return null;
};
