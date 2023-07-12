module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts?(x)', '!**/node_modules/**', '!**/dist/**', '!**/coverage/**'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: ['<rootDir>/**/*.(spec|test).[jt]s?(x)', '!**/dist/**'],

  // Ensure we are not excluding any test files by passing an empty array.
  // For more: https://www.npmjs.com/package/@swc/jest
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { exclude: [] }],
  },
};
