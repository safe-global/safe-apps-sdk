module.exports = {
  clearMocks: true,
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // fix isows CJS + ESM compatibility
    isows: '<rootDir>/../../node_modules/isows/_cjs/index.js',
  },
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  roots: ['src'],
  verbose: true,
  testEnvironment: './jest-environment-jsdom.js',
};
