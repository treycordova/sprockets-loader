## Sprockets Loader
#### A JavaScript, Webpack-enabled Rails Sprockets port.

#### Installation
`$ npm install sprockets-loader --save-dev`

#### Usage
```javascript
let path = require('path');
let sprockets = require('./src/sprockets-loader');

module.exports = {
  entry: {
    'application.js': './examples/application.js',
    'application.css.js': './examples/application.css'
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
```
