## Sprockets Loader
#### A JavaScript, Webpack-enabled Rails Sprockets port.

Bring Sprockets into JavaScript's realm. Features include:
- Parses Sprockets directives, `require`, `require_tree` and `require_directory`.
- Uses the same logical path file location resolution as Rails Sprockets.
- Reads your Gemfile.lock, enabling Gem usage, like jquery-ujs.

#### Installation
`$ npm install sprockets-loader --save-dev`

#### Usage
```javascript
// Your webpack configuration
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

#### Stylesheets?
While `sprockets-loader` _can_ handle stylesheets, it is suggested that you do not use it for them.

Everything in Webpack requires that the second and subsequent steps of the loader process produce JavaScript source.
SASS, LESS, and CSS can be parsed in the first step, but are output with stylesheet Webpack loaders. That means, during development, you'll
have to include your stylesheets as JavaScript – Highly weird, if you ask me.

If you insist on trying it, here's a small idea of how that would work:
```javascript
// Your webpack configuration
module.exports = {
  entry: {
    'application.css.js': './examples/application.css'
  },
  // ...
};
```
```html
<html>
  <head>
    <script type="text/javascript" src="application.css.js"></script>
  </head>
  <!-- ... -->
</html>
```
