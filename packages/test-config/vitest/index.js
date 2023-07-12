module.exports = {
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      enabled: true,
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
      provider: 'c8',
    },
  },
};
