'use strict';

let rewire = require('rewire');
let sinon = require('sinon');
let assert = require('chai').assert;
let gemLogicalPaths = rewire('../../src/helpers/gem-logical-paths');

describe('gemLogicalPaths', function() {
  before(function() {
  });

  it('is a function', function() {
    assert.isFunction(gemLogicalPaths);
  });

  describe('invocation', function() {
    describe('when a `gem env` is available', function() {
      it('returns an Array', function() {
        assert.isArray(gemLogicalPaths());
      });

      it('returns an Array of Strings', function() {
        for (let path of gemLogicalPaths()) {
          assert.isString(path);
        }
      });
    });

    describe('when any error happens while parsing', function() {
      let warn;
      let error;

      before(function() {
        warn = sinon.spy();
        error = sinon.spy();

        gemLogicalPaths.__set__({
          spawnSync: function() { return { stderr: 'Error' }; },
          console: {
            warn: warn,
            error: error
          }
        });
      });

      it('outputs the stderr denoting it\'s from sprockets-loader', function() {
        gemLogicalPaths();
        assert.isTrue(warn.called);
        assert.isTrue(
          warn.calledWithMatch(
            /sprockets-loader.*Error/
          )
        );
      });

      it('outputs missing Gemfile warning', function() {
        gemLogicalPaths();
        assert.isTrue(warn.called);
        assert.isTrue(
          warn.calledWithMatch(
            /RubyGems/
          )
        );
      });

      it('outputs thrown error', function() {
        gemLogicalPaths.__set__({
          spawnSync: function() { throw 'Thrown Error'; },
          console: {
            warn: function() {},
            error: error
          }
        });

        gemLogicalPaths();
        assert.isTrue(error.called);
        assert.isTrue(
          error.calledWithMatch(
            /Thrown Error/
          )
        );
      });
    });
  });
});
