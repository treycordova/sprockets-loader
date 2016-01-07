const logicalPaths = [
  'app/assets/javascripts',
  'app/assets/stylesheets',
  'vendor/assets/javascripts',
  'vendor/assets/stylesheets'
];

const comments = [
  /^\s*\*=\s/,
  /^\s*\/\/=\s/,
  /^\s*#=\s/
];

const directives = [
  /require\s/,
  /require_self\s/,
  /require_tree\s/,
  /require_directory\s/
];

const compats = {
  '.js': {
    extensions: ['.coffee'],
    module: (path) => { return `require('${path}');`; },
    terminal: '.js'
  },
  '.coffee': {
    extensions: [],
    loaders: ['coffee'],
    module: (path) => { return `require('${path}');`; },
    terminal: '.js'
  },
  '.less': {
    extensions: ['.sass', '.scss', '.css'],
    loaders: ['style', 'css', 'less'],
    module: (path) => { return `@import "${path}";`; },
    terminal: '.css'
  },
  '.sass': {
    extensions: ['.less', '.scss', '.css'],
    loaders: ['style', 'css', 'sass'],
    module: (path) => { return `@import ${path};`; },
    terminal: '.css'
  },
  '.scss': {
    extensions: ['.less', '.sass', '.css'],
    loaders: ['style', 'css', 'sass'],
    module: (path) => { return `@import '${path}';`; },
    terminal: '.css'
  },
  '.css': {
    extensions: ['.less', '.sass', '.scss'],
    loaders: ['style'],
    module: (path) => { return `@import '${path}';`; },
    terminal: '.css'
  }
};

module.exports = {
  comments,
  directives,
  compats,
  logicalPaths
};
