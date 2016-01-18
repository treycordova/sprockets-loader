'use strict';

let assert = require('chai').assert;
let getResolutions = require('../../src/helpers/get-resolutions');

describe('getResolutions', function() {
  it('is a function', function() {
    assert.isFunction(getResolutions);
  });

  describe('with invalid arguments', function() {
    it('throws when missing a location', function() {
      assert.throws(function() {
        getResolutions();
      }, /location/);
    });

    it('throws when missing logicalPaths', function() {
      assert.throws(function() {
        getResolutions('test/please.js')
      }, /logicalPaths/);
    });

    it('throws when missing gemPaths', function() {
      assert.throws(function() {
        getResolutions('test/please.js', {logicalPaths: []});
      });
    });
  });

  describe('with valid arguments', function() {
    it('returns an empty array when there are no paths', function() {
      assert.lengthOf(
        getResolutions('test.js', {logicalPaths: [], gemPaths: []}),
        0
      );
    });

    it('returns an Array with all logicalPaths and file combinations', function() {
      assert.lengthOf(
        getResolutions('test.js', {logicalPaths: ['something', 'something-else'], gemPaths: []}),
        2
      );
    });

    it('returns an Array with all logicalPath, gemPath file combinations', function() {
      let resolutions = getResolutions('test.js', {logicalPaths: ['something'], gemPaths: ['something-else']});

      assert.lengthOf(resolutions, 2);
      assert.match(resolutions[0], /something\/test\.js$/);
      assert.match(resolutions[1], /something-else\/something\/test\.js$/);
    });
  });
});
