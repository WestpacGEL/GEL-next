# TypeScript configuration

This project provides a variety of TypeScript configuration files, trying to match the requirements of the most popular libraries and frameworks like React and Next.js.

## Configuration files

- base.json
- nextjs.json
- react-library.json

## How to use

- Install this package by running the following command:

```
pnpm install -D @westpac/ts-config
```

- Create a `tsconfig.json` file on the root folder of your project.
- Extend the configuration from `@westpac/ts-config/base.json` or any other configuration file available (see above).

Example:

```
{
  "extends": "@westpac/ts-config/base.json"
}
```
