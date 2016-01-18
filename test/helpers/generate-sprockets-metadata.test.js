'use strict';

let path = require('path');
let rewire = require('rewire');
let sinon = require('sinon');
let assert = require('chai').assert;
let generateSprocketsMetadata = rewire('../../src/helpers/generate-sprockets-metadata');

describe('generateSprocketsMetadata', function() {
  let revert;

  before(function() {
    revert = generateSprocketsMetadata.__set__({
      path: {
        resolve: function() { return path.resolve(process.cwd(), 'test/fixtures/Gemfile.lock'); },
        join: path.join,
        extname: path.extname
      }
    });
  });

  after(function() {
    revert();
  });

  describe('invalid arguments', function() {
    it('throws when resourcePath is not passed', function() {
      assert.throws(function() {
        generateSprocketsMetadata(null);
      });
    });

    it('throws when logicalPaths is not an Array', function() {
      assert.throws(function() {
        generateSprocketsMetadata('.', {logicalPaths: 'test'});
      });
    });
  });

  describe('valid arguments', function() {
    it('returns the valid compat', function() {
      let metadata = generateSprocketsMetadata('test.js');

      assert.property(metadata, 'compat');
      assert.deepPropertyVal(metadata, 'compat.terminal', '.js');
      assert.isArray(metadata.compat.extensions);
    });

    it('returns a valid compat with a list of loaders', function() {
      let metadata = generateSprocketsMetadata('test.coffee');

      assert.property(metadata, 'compat');
      assert.deepPropertyVal(metadata, 'compat.terminal', '.js');
      assert.isArray(metadata.compat.extensions);
      assert.isArray(metadata.compat.loaders);
    });

    it('returns a String with the path to the file', function() {
      let metadata = generateSprocketsMetadata('test.coffee');

      assert.property(metadata, 'path');
      assert.isString(metadata.path);
      assert.equal(metadata.path, 'test.coffee');
    });

    it('returns default logical paths', function() {
      let metadata = generateSprocketsMetadata('test.coffee');

      assert.property(metadata, 'logicalPaths');
      assert.isArray(metadata.logicalPaths);
      assert.lengthOf(metadata.logicalPaths, 4);
    });

    it('returns user-defined logical paths', function() {
      let metadata = generateSprocketsMetadata('test.coffee', {
        logicalPaths: ['something']
      });

      assert.property(metadata, 'logicalPaths');
      assert.isArray(metadata.logicalPaths);
      assert.lengthOf(metadata.logicalPaths, 5);
    });

    it('returns user-defined logical paths remove duplicates', function() {
      let metadata = generateSprocketsMetadata('test.coffee', {
        logicalPaths: ['something', 'something']
      });

      assert.property(metadata, 'logicalPaths');
      assert.isArray(metadata.logicalPaths);
      assert.lengthOf(metadata.logicalPaths, 5);
    });

    describe('when a Gemfile.lock is available', function() {
      it('returns gemPaths with an non-zero Array length', function() {
        let metadata = generateSprocketsMetadata('test.cofee');

        assert.property(metadata, 'gemPaths');
        assert.isArray(metadata.gemPaths);
        assert.isAbove(metadata.gemPaths.length, 0);
      });
    });

    describe('when a Gemfile.lock is not available', function() {
      it('outputs a warning that informs the user sprockets-loader can parse Gemfile.locks', function() {
        let info = sinon.spy();

        generateSprocketsMetadata.__set__({
          gemfile: undefined,
          console: {
            info: info
          }
        });

        let metadata = generateSprocketsMetadata('test.coffee');

        assert.isTrue(info.called);
        assert.isTrue(
          info.calledWithMatch(
            /Did you know/
          )
        );
      });
    });
  });
});
