'use strict';

let assert = require('chai').assert;
let isSprocketsDirective = require('../../src/helpers/is-sprockets-directive');

describe('isSprocketsDirective', function() {
  it('is a function', function() {
    assert.isFunction(isSprocketsDirective);
  });

  describe('invocation', function() {
    describe('invalid argument', function() {
      it('returns false with no arguments', function() {
        assert.isFalse(isSprocketsDirective());
      });

      it('returns false with an argument that isn\'t a String', function() {
        assert.isFalse(isSprocketsDirective({}));
      });
    });

    describe('valid argument', function() {
      it('returns false with an empty String', function() {
        assert.isFalse(isSprocketsDirective(''));
      });

      it('returns false with an empty Sprockets directive', function() {
        assert.isFalse(isSprocketsDirective('//= require'));
      });

      it('returns false with a misspelled Sprockets directive', function() {
        assert.isFalse(isSprocketsDirective('//= reqire ./something'));
      });

      it('returns true with a complete, valid Sprockets directive', function() {
        assert.isTrue(isSprocketsDirective('//= require_self'));
        assert.isTrue(isSprocketsDirective('//= require ./something'));
        assert.isTrue(isSprocketsDirective('//= require_tree ./something'));
        assert.isTrue(isSprocketsDirective('//= require_directory ./something'));
      });
    });
  });
});
