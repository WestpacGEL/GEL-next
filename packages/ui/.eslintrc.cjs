const OFF = 0;

module.exports = {
  root: true,
  extends: ['@westpac/eslint-config/nextjs'],
  rules: {
    '@next/next/no-html-link-for-pages': OFF,
  },
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