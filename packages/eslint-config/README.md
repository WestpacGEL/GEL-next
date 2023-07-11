# Lint Configuration

This project provides default linting configuration via the `eslint` package.

## How to use

- Install this package by running the following command:

```
pnpm install -D @westpac/eslint-config
```

- Create a `.eslintrc.js` file on the root folder of your project.
- Extend the configuration from `@westpac/eslint-config`.

Example:

```
module.exports = {
  root: true,
  extends: ['@westpac/eslint-config'],
};
```

It is also possible to import specific settings for NextJS, which includes the `next/core-web-vitals` extension.

Example:

```
module.exports = {
  root: true,
  extends: ['@westpac/eslint-config/nextjs'],
};


From here, you can customize the rules as per your project's needs.

Example:

```

module.exports = {
root: true,
extends: ['@westpac/eslint-config'],
rules: {
'simple-import-sort/imports': 0,
'simple-import-sort/exports': 0,
},
};

```

```
