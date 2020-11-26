'use strict';

const packageName = require('./package.json').name.split('@gnosis.pm/').pop();

module.exports = {
  roots: [`<rootDir>/packages/${packageName}`],
  moduleDirectories: ['node_modules'],
  modulePaths: [`<rootDir>/packages/${packageName}/src/`],
  name: packageName,
  displayName: packageName,
  rootDir: '../..',
};
