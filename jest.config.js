module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    '!**/dist/**',
    '!packages/**/helpers/ParsedResultExtra.js',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
