module.exports = {
  clearMocks: true,
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
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
