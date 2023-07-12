module.exports = {
  root: true,
  extends: ['@westpac/eslint-config'],
  overrides: [
    {
      files: ['**/*.stories.tsx', '**/*.stories.ts'],
      extends: ['plugin:storybook/recommended'],
    },
  ],
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
