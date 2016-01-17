'use strict';

let path = require('path');
let constants = require('./constants');

function location(comment, directive) {
  if (/require_self/.test(directive.source)) {
    return new RegExp(comment.source + '(require_self)$');
  } else {
    return new RegExp(comment.source + '(' + directive.source + ')' + '(.*)');
  }
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
    } else if (matches && matches[1] === 'require_self') {
      return {
        directive: matches[1].trim(),
        path: null
      };
    }
  }

  return null;
};
