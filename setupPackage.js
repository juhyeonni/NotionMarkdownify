const fs = require('fs');

function main() {
  const source = fs.readFileSync(__dirname + '/package.json').toString('utf-8');
  const sourceObj = JSON.parse(source);

  // No include scripts and devDependencies
  sourceObj.scripts = {};
  sourceObj.devDependencies = {};

  // Initialize package main, types 
  if (sourceObj.main.startsWith('./dist/')) {
    sourceObj.main = sourceObj.main.slice(7);
  }
  if (sourceObj.types.startsWith('./dist/')) {
    sourceObj.types = sourceObj.types.slice(7);
  }

  // Include 'package.json' and ‘version.txt’ in distribution 
  fs.writeFileSync(__dirname + '/dist/package.json', Buffer.from(JSON.stringify(sourceObj, null, 2), 'utf-8'));
  fs.writeFileSync(__dirname + '/dist/version.txt', Buffer.from(sourceObj.version, 'utf-8'));

  fs.copyFileSync(__dirname + '/.npmignore', __dirname + '/dist/.npmignore');
}

main();