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
    terminal: '.js'
  },
  '.coffee': {
    extensions: [],
    loaders: ['coffee'],
    terminal: '.js'
  },
  '.less': {
    extensions: ['.sass', '.scss', '.css'],
    loaders: ['style', 'css', 'less'],
    terminal: '.css'
  },
  '.sass': {
    extensions: ['.less', '.scss', '.css'],
    loaders: ['style', 'css', 'sass'],
    terminal: '.css'
  },
  '.scss': {
    extensions: ['.less', '.sass', '.css'],
    loaders: ['style', 'css', 'sass'],
    terminal: '.css'
  },
  '.css': {
    extensions: ['.less', '.sass', '.scss'],
    loaders: ['style'],
    terminal: '.css'
  }
};

module.exports = {
  comments,
  directives,
  compats,
  logicalPaths
};
