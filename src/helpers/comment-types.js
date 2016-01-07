'use strict';

let constants = require('./constants');

function commentType(comment, directive, flags) {
  return new RegExp(comment.source + directive.source, flags);
}

module.exports = (flags) => {
  let commentTypes = [];

  for (let comment of constants.comments) {
    for (let directive of constants.directives) {
      commentTypes.push(commentType(comment, directive, flags));
    }
  }

  return commentTypes;
};
