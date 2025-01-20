module.exports = {
  root: true,
  extends: ['next/core-web-vitals', '../index.js'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['apps/*/tsconfig.json', 'packages/*/tsconfig.json', './ts-config.json'],
      },
    },
  },
};
