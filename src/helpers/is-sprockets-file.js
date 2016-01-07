'use strict';

let commentTypes = require('./comment-types');

module.exports = (source) => {
  return commentTypes('m').some((type) => {
    return type.test(source);
  });
};
