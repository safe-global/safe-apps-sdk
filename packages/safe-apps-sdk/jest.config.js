module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  moduleDirectories: ['node_modules', 'src'],
  roots: ['src'],
  verbose: true,
  setupFiles: ['./jest/setup.ts'],
  testEnvironment: 'jsdom',
};
