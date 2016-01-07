'use strict';

/*
 * Line Parser (Larser)
 */

module.exports = {
  empty,
  insideCommentBlock,
  preserveComments
};

function empty(line) {
  return typeof line === 'string' && line.length === 0;
}

function insideCommentBlock(line) {
  return empty(line) ||
    /^\s*\/\//.test(line) ||
    /^\s*#/.test(line) ||
    /^\s*\*/.test(line) ||
    /^\s*\/\*/.test(line) ||
    /^\s*\//.test(line);
}

function preserveComments(line) {
  let content;

  if ((content = /^\s*\/\*(.*)/.exec(line)) && content[1] && content[1].length > 0) {
    return `/* ${content[1].trim()} */`;
  } else if ((content = /^\s*(.*)\*\//.exec(line)) && content[1] && content[1].length > 0) {
    return `/* ${content[1].trim()} */`;
  } else if (!/\*\//.test(line) && /^\s*\*/.test(line)) {
    return `/${line.trim()} */`;
  } else if (/\s*\/\/(.*)/.test(line) || /\s*#(.*)/.test(line)) {
    return line
  } else {
    return '';
  }
}
