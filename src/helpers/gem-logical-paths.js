'use strict';

let path = require('path');
let spawnSync = require('child_process').spawnSync;

let readTo = (expression, lines) => {
  let index = 0;
  let line = lines[index];

  while (line && !expression.test(line)) {
    line = lines[++index];
  }

  return line ? index : -1;
};

let depth = (line) => {
  return line.match(/^(\s*)/)[1].length;
};

module.exports = () => {
  let paths = [];

  try {
    let childProcess = spawnSync('gem', ['env']);

    if (childProcess.stderr.length || childProcess.error) {
      console.warn(`sprockets-loader: ${childProcess.stderr.toString()}`);
    }

    if (childProcess.stdout) {
      let environment = childProcess.stdout.toString('utf8');

      let lines = environment.split('\n');
      let gemPathsIndex = readTo(/GEM PATHS/, lines);
      let gemPathsDepth = depth(lines[gemPathsIndex]);
      let index = gemPathsIndex;
      let line = lines[++index];

      while (line && depth(line) > gemPathsDepth) {
        let parsedPath = line.match(/^\s*\-\s(.*)/)[1];
        paths.push(path.join(parsedPath, 'gems'));
        line = lines[++index];
      }
    }
  } catch(error) {
    console.error(error);
  } finally {
    if (paths.length === 0) {
      console.warn('sprockets-loader: Couldn\'t generate RubyGems logical paths. (Is the command "gem env" available?)');
    }

    return paths;
  }
};
