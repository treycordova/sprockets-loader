'use strict';

let commentTypes = require('./comment-types');

module.exports = (line) => {
  return commentTypes().some((type) => {
    return type.test(line);
  });
};
