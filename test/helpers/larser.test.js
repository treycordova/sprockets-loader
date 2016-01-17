'use strict';

let assert = require('chai').assert;
let larser = require('../../src/helpers/larser');

describe('larser', function() {
  it('is a module with three keys that are functions', function() {
    assert.isObject(larser);
    assert.lengthOf(Object.keys(larser), 3);
  });

  describe('empty', function() {
    describe('with invalid argument', function() {
      it('returns false for no argument', function() {
        assert.isFalse(larser.empty());
      });

      it('returns false for any argument that is not a String', function() {
        assert.isFalse(larser.empty({}));
      });
    });

    describe('with valid argument', function() {
      it('returns false when the String is not empty', function() {
        assert.isFalse(larser.empty('not empty'));
      });

      it('returns true when the String is empty', function() {
        assert.isTrue(larser.empty(''));
      });
    });
  });

  describe('insideCommentBlock', function() {
    describe('with invalid argument', function() {
      it('returns false for no argument', function() {
        assert.isFalse(larser.insideCommentBlock());
      });
    });

    describe('with valid argument', function() {
      it('returns false when the String does not start with a comment', function() {
        assert.isFalse(larser.insideCommentBlock('var something;'));
      });

      it('returns true when the String is empty', function() {
        assert.isTrue(larser.insideCommentBlock(''));
      });

      it('returns true when the String starts with a comment', function() {
        assert.isTrue(larser.insideCommentBlock('//'));
        assert.isTrue(larser.insideCommentBlock('/*'));
        assert.isTrue(larser.insideCommentBlock('*'));
        assert.isTrue(larser.insideCommentBlock('*/'));
        assert.isTrue(larser.insideCommentBlock('#'));
      });
    });
  });

  describe('preserveComments', function() {
    describe('with invalid argument', function() {
      it('returns an empty String', function() {
        assert.equal(larser.preserveComments('var something;'), '');
      });
    });

    describe('with valid argument', function() {
      it('returns a wrapped comment based on the comment type', function() {
        assert.equal(larser.preserveComments('/* Something'), '/* Something */');
        assert.equal(larser.preserveComments('# Something'), '# Something');
        assert.equal(larser.preserveComments('// Something'), '// Something');
        assert.equal(larser.preserveComments('Something */'), '/* Something */');
        assert.equal(larser.preserveComments('* Something'), '/* Something */');
      });
    });
  });
});
