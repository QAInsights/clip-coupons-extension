module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./tests/setup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!jest-chrome).+\\.js$'
  ],
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true,
  collectCoverage: false,
  moduleFileExtensions: ['js', 'json'],
  testTimeout: 30000
};
