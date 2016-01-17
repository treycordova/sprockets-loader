'use strict';

let assert = require('chai').assert;
let parseSprocketsLocation = require('../../src/helpers/parse-sprockets-location');

describe('parseSprocketsLocation', function() {
  it('is a function', function() {
    assert.isFunction(parseSprocketsLocation);
  });

  describe('with invalid arguments', function() {
    it('returns null', function() {
      assert.isNull(parseSprocketsLocation(''));
    });
  });

  describe('with valid arguments', function() {
    it('returns an Object', function() {
      assert.isObject(parseSprocketsLocation('//= require something'));
    });

    it('returns an Object with two properties: directive and path', function() {
      let sprocket = parseSprocketsLocation('//= require something');

      assert.isObject(sprocket);
      assert.property(sprocket, 'directive');
      assert.property(sprocket, 'path');
      assert.equal(sprocket.directive, 'require');
      assert.equal(sprocket.path, 'something');
    });

    it('returns an Object for require, require_self, require_tree, and require_directive', function() {
      assert.isObject(parseSprocketsLocation('//= require_self'));
      assert.isObject(parseSprocketsLocation('//= require something'));
      assert.isObject(parseSprocketsLocation('//= require_tree something'));
      assert.isObject(parseSprocketsLocation('//= require_directory something'));
      assert.isNotObject(parseSprocketsLocation('//= include'));
    });
  });
});
