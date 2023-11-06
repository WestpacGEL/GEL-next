## Getting Started

This section describes how to get started with Westpac GEL.

### What is GEL?

The Global Experience Language is our single source of truth, providing everything you need to deliver our brand promises and create consistent, coherent customer experiences across our entire digital landscape faster, and with less effort.

You can read more about GEL in [https://gel.westpacgroup.com.au/articles/what-is-GEL](https://gel.westpacgroup.com.au/articles/what-is-GEL)

### Pre-requisites

All GEL components have a couple of dependencies so please ensure the following are installed:

```
npm i react@^18.2.0
npm i -D tailwindcss postcss autoprefixer
```

GEL is using [Tailwind](https://tailwindcss.com/docs/installation) for styling. Highly likely you will be using `GEL` with `Next.js` or `Vite`. Therefore, follow the [framework specific installation guide](https://tailwindcss.com/docs/installation/framework-guides) for Tailwind.

### Installation

GEL can be installed using a package manager like `npm`, `yarn` or `pnpm`.

```
npm i @westpac/ui
```

Update `tailwind.config.js` to use the `withGEL` helper exported by `@westpac/ui` as follows.

```ts
import { withGEL } from '@westpac/ui/tailwind';

/** @type {import('tailwindcss').Config} */
const config = withGEL({
  relative: true,
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@westpac/ui/src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [],
});

export default config;
```

For applications using `brand fonts`, import the custom fonts as follows in your main `CSS` file.

```css
/* WBC fonts */
@font-face {
  src: url('/path-to-the-font/Westpac-Bold-v2.007.woff2') format('woff2'), url('/path-to-the-font/Westpac-Bold-v2.007.woff')
      format('woff');
  font-family: 'Westpac';
  font-weight: 400;
  font-style: normal;
}
```

### Usage

Add a custom attribute tag `data-theme="brand_name"` to `html` tag. Note that instead of adding the custom attribute to html tag, you can add it to the parent tag of your application as well.

Following example shows adding `wbc` theme. You can add other valid brand names such as `stg`, `bom`, `bsa`, `rams`, `wbg` etc. as the value.

```html
<!DOCTYPE html>
<html lang="en" data-theme="wbc">
  ...
</html>
```

Now you can start using the GEL components in your `React.js` application. Following example shows how to use the `Button` component.

For detailed documentation refer to [https://gel.westpacgroup.com.au/design-system](https://gel.westpacgroup.com.au/design-system).

```tsx
import { Button } from '@westpac/ui';

export default function SampleApp() {
  return (
    <section>
      <div className="space-x-4 mb-2">
        <Button look="primary">Pay here</Button>
      </div>
    </section>
  );
}
```

The following example shows how to import a component individually. (Recommended if running into issues with tree-shaking and bundle size in applications)

```tsx
import { Button } from '@westpac/ui/button';

export default function SampleApp() {
  return (
    <section>
      <div className="space-x-4 mb-2">
        <Button look="primary">Pay here</Button>
      </div>
    </section>
  );
}
```

### Unit testing

We recommend [vitest](https://vitest.dev/) for unit testing since `vitest` natively supports `ESM` modules.

If you are using `jest` for unit testing, you might encounter some issues since `jest` does not support `ESM` modules by default. Therefore, you will need to make following configuration changes to the `jest` test runner.

```ts
// jest.config.ts
const customJestConfig = {
  transform: {},
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};
```

```json
{
  "scripts": {
    "test": "NODE_OPTIONS=--experimental-vm-modules jest"
  }
}
```

## Documentation

Visit [https://gel.westpacgroup.com.au/design-system](https://gel.westpacgroup.com.au/design-system) to view the full documentation.

## Contributing to GEL

### Developing

- The development branch is `develop`.
- All pull requests should be opened against `develop`.
- The changes on the `develop` branch are published to the `preview` environment.

#### To develop locally (common for all the packages and apps)

1. Install Node.js 18.x or above. We recommend [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm) to install Node.js.

2. Clone the Next.js repository:
   ```
   git clone --single-branch --branch develop git@github.com:WestpacGEL/GEL-next.git
   ```
3. Create a new branch:
   ```
   git checkout -b MY_BRANCH_NAME origin/develop
   ```
4. Enable pnpm:
   ```
   corepack enable pnpm
   ```
5. Install the dependencies with:
   ```
   pnpm install
   ```
6. Start developing and watch for code changes:
   ```
   pnpm dev
   ```
7. Run the unit tests with:
   ```
   pnpm test
   ```
8. Fix formatting and linting with:
   ```
   pnpm format:fix && pnpm lint:fix
   ```
9. Check formatting and linting with:
   ```
   pnpm format && pnpm lint
   ```
10. Check TypeScript compatibility with:

```
pnpm check-types
```

11. You can build packages and apps with:

```
pnpm build
```

12. You can add a changeset with:

```
pnpm changeset
```

##### To develop a GEL UI component locally

1. Change the working directory with:
   ```
   cd packages/ui
   ```
2. Create a new `GEL` component with:
   ```
   cd packages/ui
   pnpm generate:component
   ```
3. Start storybook with:
   ```
   pnpm build && pnpm storybook
   ```
4. Run the unit tests in watch mode with:
   ```
   pnpm test:watch
   ```
   When your changes are finished, commit them to the branch and push it to origin.
