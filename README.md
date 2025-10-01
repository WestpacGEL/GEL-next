## Getting Started

This section describes how to get started with Westpac GEL.

### What is GEL?

The Global Experience Language is our single source of truth, providing everything you need to deliver our brand promises and create consistent, coherent customer experiences across our entire digital landscape faster, and with less effort.

You can read more about GEL in [https://gel.westpacgroup.com.au/articles/what-is-GEL](https://gel.westpacgroup.com.au/articles/what-is-GEL)

### Pre-requisites

All GEL components have a couple of dependencies so please ensure the following are installed:

```
npm i react@^18.2.0
npm i -D tailwindcss@~3.4.15 postcss autoprefixer
```

GEL is using [Tailwind](https://tailwindcss.com/) for styling. Visit the [Tailwind docs](https://tailwindcss.com/docs/installation/framework-guides) to learn more about installation and usage.

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
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@westpac/ui/src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [],
});

export default config;
```

Also, you have to create a `postcss.config.js` on the root of your application as follows.

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

For applications using `brand fonts` add the following options config to the `withGEL` helper.

```ts
const config = withGEL({
  relative: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@westpac/ui/src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [],
  options: {
    brandFonts: {
      src: '/fonts', // path to font files
      brands: ['wbc', 'stg'], // takes a single brand string e.g. 'wbc' or an array of brands. If no brands are specified will import all brands by default
    },
  },
});
```

Ensure tailwind directives are added to your main CSS file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

If you have initialized your project with Nx build system follow the official [Nx tailwind documentation](https://nx.dev/recipes/react/using-tailwind-css-in-react#manual-setup-instructions) to configure tailwind.
Nx based projects requires `__dirname` prefix to the `paths` in the `tailwind.config.js` file and `postcss` file.

### Feature: Brand Filtering Support

You can now pass a `brands: BrandKey[]` parameter to filter which brand-specific CSS variables are included.

```ts
import { withGEL } from '@westpac/ui/tailwind';

/** @type {import('tailwindcss').Config} */
const config = withGEL({
  relative: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@westpac/ui/src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [],
  brands: ['wbc', 'bom'], // In this scenario, it will import only the css variables of "wbc" and "bom"
});

export default config;
```

### Usage

#### Using brands

Add a custom attribute tag `data-theme="brand_name"` to `html` tag. Note that instead of adding the custom attribute to html tag, you can add it to the parent tag of your application as well.

Following example shows adding `wbc` theme. You can add other valid brand names such as `stg`, `bom`, `bsa`, `rams`, `wbg` etc. as the value.

```html
<!doctype html>
<html lang="en" data-theme="wbc">
  ...
</html>
```

**NOTE:** There are some components that use portals `Modal`, `BottomSheet`, `AutoComplete`. These components will default their portal to where you add your `data-theme` attribute tag so these components can make use of branding. This can be overridden using their `portalContainer` props if you require the portal to be located elsewhere.

Now you can start using the GEL components in your `React.js` application. The following examples show how to use the `Button` component.

For detailed documentation refer to [https://gel.westpacgroup.com.au/design-system](https://gel.westpacgroup.com.au/design-system).

#### Individual package import

We recommended the individual package import approach if you have issues with [Tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking).

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

#### Mono package import

Modern bundlers like [Vite](https://vitejs.dev/) and latest [webpack](https://webpack.js.org/) will automatically detect the individual components and only bundle the components you use.

However, use this approach with caution as it may cause issues with [Tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) since not all bundlers have this advanced capability.

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

### Unit testing

We recommend [Vitest](https://vitest.dev/) for unit testing since [Vitest](https://vitest.dev/guide/why.html) natively supports [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

If you are using [Jest](https://jestjs.io/) for unit testing, you might encounter some issues since [Jest](https://jestjs.io/docs/ecmascript-modules) does not support [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) by default. Therefore, you will need to make following configuration changes.

Update the `package.json` file if you have initialized your project with [Create React App](https://create-react-app.dev/).

```json
{
  "scripts": {
    "test": "node scripts/test.js --transformIgnorePatterns \"node_modules/(?!(@westpac/ui)/)\""
  }
}
```

Update the `jest.config.js` file if you have initialized your project with [Nx build system](https://nx.dev/) and [Babel](https://babeljs.io/).

```js
{
   transform: {
     '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }]
   },
   transformIgnorePatterns: ['node_modules/(?!@westpac/ui)']
}
```

### Codemods

Codemods are provided to help migrate your codebase when GEL introduces breaking changes or API updates.

#### Running a codemod

We use [jscodeshift](https://github.com/facebook/jscodeshift) to run codemods.  
To apply a codemod, install `jscodeshift` if you don’t already have it:

```bash
npm install -g jscodeshift
```

Then run the codemod against your source files. For example:

```bash
npx jscodeshift -t ./codemods/update-date-picker.js src/
```

-t points to the codemod file.

src/ is the folder you want to transform (adjust as needed).

Example

```bash
npx jscodeshift -t https://raw.githubusercontent.com/WestpacGEL/GEL-next/refs/heads/main/packages/ui/scripts/codemods/gel-tokens-tailwind-v1.cjs "to/your/files/**/*.tsx"
```

This will apply the update-pagination codemod to all .tsx files in your project.

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
