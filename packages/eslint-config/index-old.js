require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true, // no longer used in v9
  env: {
    es6: true,
    node: true, // replaced with globals
    jest: true, // replaced with globals
  },
  parserOptions: { ecmaVersion: 9, sourceType: 'module' }, // done
  extends: [
    'eslint:recommended', // replaced with eslint.configs.recommended
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['import', 'prettier'],
  ignorePatterns: ['node_modules/*', 'dist/*'],
  rules: {
    'prettier/prettier': 'error', // enabled
    'sort-imports': [
      // this is default behaviour?
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '@/',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        distinctGroup: true,
      },
    ],
    'tailwindcss/no-custom-classname': [
      'warn',
      {
        ignoredKeys: ['compoundVariants', 'defaultVariants', 'responsiveVariants', 'compoundSlots'],
      },
    ],
    'no-console': 'error',
  },
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
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
      },
      extends: [
        'plugin:@typescript-eslint/recommended', // replaced with tseslint.configs.recommended
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:promise/recommended',
        'plugin:typescript-sort-keys/recommended',
        'plugin:sonarjs/recommended',
      ],
    },
  ],
};
