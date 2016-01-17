'use strict';

let assert = require('chai').assert;
let commentTypes = require('../../src/helpers/comment-types.js');

describe('commentTypes', function() {

  it('is a function', function() {
    assert.isFunction(commentTypes);
  });

  describe('invocation', function() {
    let types;

    before(function() {
      types = commentTypes();
    });

    it('returns an Array of regular expressions', function() {
      assert.isArray(types);

      for (let type of types) {
        assert.instanceOf(type, RegExp);
      }
    });

    it('appends the passed flags', function() {
      types = commentTypes('g');

      for (let type of types) {
        assert.isTrue(type.global);
      }
    });
  });
});
