'use strict';

let fs = require('fs');
let path = require('path');
let sprockets = require('./src/sprockets-loader');

module.exports = {
  entry: {
    'application.js': './application.js'
  },
  output: {
    path: 'public/assets',
    filename: '[name]'
  },
  module: {
    preLoaders: [
      {
        loader: path.resolve('.', 'src/sprockets-loader'),
        query: {
          logicalPaths: [
            'examples'
          ]
        }
      }
    ]
  }
};
