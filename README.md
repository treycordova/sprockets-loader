## Sprockets Loader
#### A JavaScript, Webpack-enabled Rails Sprockets port.

#### Installation
`$ npm install sprockets-loader --save-dev`

#### Usage
```javascript
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
        loader: 'sprockets-loader',
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
