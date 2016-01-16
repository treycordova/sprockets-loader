## Sprockets Loader
#### A JavaScript, Webpack-enabled Rails Sprockets port.

Bring Sprockets into JavaScript's realm. Features include:
- Parses Sprockets directives, require, require_tree and require_directory.
- Uses the same logical path file location resolution as Rails Sprockets.
- Reads your Gemfile.lock, enabling Gem usage, like jquery-ujs.

#### Installation
`$ npm install sprockets-loader --save-dev`

#### Usage
```javascript
module.exports = {
  entry: {
    'application.js': './examples/application.js'
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
