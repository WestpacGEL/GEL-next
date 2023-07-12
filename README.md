# GEL Next repository

This repository provides tools (packages) to help developers build web apps.

The strategy used is a monorepo provided by [TurboRepo](https://turbo.build/repo), which allows us to condense multiple projects within a single repository. Each project within this monorepo is referenced as a `workspace`.

This turborepo requires [NodeJS](https://nodejs.org/) version 18 or higher and uses [pnpm](https://pnpm.io) as a package manager.

## Folders structure

There are 2 main folders on this monorepo:

- apps
- packages

The `apps` folder should contain workspaces for launchable apps, like Next.js, React, Angular, etc. However, this monorepo will have dummy non deployable apps for testing purposes only.

The `packages` folder should contain workspaces for packages that are used by either an app or another package.

This monorepo focuses solemnly on holding projects in the `packages` folder, allowing dummy projects in the `apps` folder to be used for testing purposes or demos only.

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Changesets](https://github.com/changesets/changesets/tree/main#readme) for managing versioning and changelogs
- [Husky](https://typicode.github.io/husky/) for git hooks

### Packages

- [themes](packages/theme/README.md): Tailwind plugin to apply multiple brand theming
- [ui](packages/ui/README.md): UI components build on top of the themes and Tailwind

### Git Hooks

This monorepo uses a `pre-push` git hook to ensure a set of commands are executed prior to pushing code to the remote repository. You can see the list of commands in the `.husky` folder.

## Getting started

After cloning this repository, you can install all the dependencies by running the following command:

```
pnpm i --frozen-lockfile
```

The `--frozen-lockfile` will not modify the `pnpm-lock.yaml` file.

## Commands

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Test

To test all apps and packages, run the following command:

```
pnpm test
```

### Lint

To lint all apps and packages, run the following command:

```
pnpm lint
```

You can allow `eslint` to try to fix issues automatically by running the following command:

```
pnpm lint:fix
```

### Format

To format all apps and packages files, run the following command:

```
pnpm format
```

You can allow `prettier` to try to fix issues automatically by running the following command:

```
pnpm format:fix
```

### Filtering workspaces

In order to run a command in a single workspace, use the `--filter` parameter

The command below lints the my-package and my-app workspaces only:

```
pnpm --filter my-package --filter my-app lint
```

### Scaffolding a new package

This monorepo uses default templates to generate new packages.

You can create a new package by running the following command:

```
pnpm new:package
```

The above command will prompt you with the details about the new package.

### Creating new versions of the packages

We are using https://github.com/changesets/changesets to manage the package versioning and changelogs.

#### Steps to follow

- To generate a new changeset, run `pnpm changeset` in the root of the repository.
- Run `pnpm changeset version`. This will increment the versions of packages.
- Run `pnpm install`. This will update the lockfile and rebuild packages.
- Commit the changes.
- Create a pull request.
