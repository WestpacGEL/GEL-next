module.exports = {
  root: true,
  extends: ['@westpac-x/eslint-config'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['packages/*/tsconfig.json', 'apps/*/tsconfig.json'],
      },
    },
  },
};
