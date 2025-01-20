import config from '@westpac/eslint-config/react'; // maybe make this the react one?
import storybook from 'eslint-plugin-storybook';

export default [
  ...config,
  ...storybook.configs['flat/recommended'], // should I apply this to story files only?
  {
    files: ['**/*.spec.{js,jsx,ts,tsx}'],
    rules: {
      'sonarjs/no-nested-functions': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['**/*.stories.{js,jsx,ts,tsx}'],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];
