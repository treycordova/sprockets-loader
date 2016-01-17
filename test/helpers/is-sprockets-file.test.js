'use strict';

let assert = require('chai').assert;
let isSprocketsFile = require('../../src/helpers/is-sprockets-file');

describe('isSprocketsFile', function() {
  it('is a function', function() {
    assert.isFunction(isSprocketsFile);
  });

  describe('invocation', function() {
    describe('invalid argument', function() {
      it('returns false with no arguments', function() {
        assert.isFalse(isSprocketsFile());
      });

      it('returns false with an argument that isn\'t a String', function() {
        assert.isFalse(isSprocketsFile({}));
      });
    });

    describe('valid argument', function() {
      it('returns true with a valid Sprockets file', function() {
        assert.isTrue(isSprocketsFile('//= require ./hello'));
      });

      it('returns true with a valid Sprockets file with multiple lines', function() {
        assert.isTrue(
          isSprocketsFile([
            '//= require something',
            '//= require something-else'
          ].join('\n'))
        );
      });
    });
  });
});
