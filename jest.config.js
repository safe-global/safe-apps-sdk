module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  roots: ['./src/'],
};
