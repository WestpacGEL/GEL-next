## Getting Started

This section describes how to get started with Westpac GEL.

### What is GEL?

The Global Experience Language is our single source of truth, providing everything you need to deliver our brand promises and create consistent, coherent customer experiences across our entire digital landscape faster, and with less effort.

You can read more about GEL in [https://gel.westpacgroup.com.au/articles/what-is-GEL](https://gel.westpacgroup.com.au/articles/what-is-GEL)

### Pre-requisites

All GEL components have a couple of dependencies so please ensure the following are installed using your preferred package manager (`npm`, `yarn` or `pnpm`):

```
npm i react@^18.2.0
npm i -D tailwindcss @tailwindcss/postcss postcss
```

GEL is using [Tailwind](https://tailwindcss.com/) for styling. Visit the [Tailwind docs](https://tailwindcss.com/docs/installation/framework-guides) and follow the relevant instructions for installation.

### Installation

The GEL is separated out into 2 packages.

- `@westpac/ui` - React components
- `@westpac/style-config` - Tailwind/CSS/tokens

Install the GEL packages using preferred package manager (`npm`, `yarn` or `pnpm`):

```
npm i @westpac/ui @westpac/style-config
```

Create a `postcss.config.mjs` on the root of your application as follows.

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

In your main CSS file, import the Tailwind directives and GEL styles:

```css
@import 'tailwindcss';
@import '@westpac/style-config';
```

For brand theming, import the required brand stylesheets:

```css
@import '@westpac/style-config/theme-wbc';
@import '@westpac/style-config/theme-stg';
```

If you have initialized your project with Nx build system follow the official [Nx tailwind documentation](https://nx.dev/recipes/react/using-tailwind-css-in-react#manual-setup-instructions) to configure tailwind.

### Theming

To switch between brands, set the `data-brand` attribute on a parent element:

```html
<div data-brand="wbc">
  <!-- Your app content -->
</div>
```

To toggle between light and dark mode, set the `data-theme` attribute:

```html
<div data-brand="wbc" data-theme="dark">
  <!-- Your app content -->
</div>
```

### Usage

#### Using brands

Add a custom attribute tag `data-brand="brand_name"` to `html` tag. Note that instead of adding the custom attribute to html tag, you can add it to the parent tag of your application as well.

Following example shows adding `wbc` brand. You can add other valid brand names such as `stg`, `bom`, `bsa`, `rams`, `wbg` etc. as the value.

```html
<!doctype html>
<html lang="en" data-brand="wbc">
  ...
</html>
```

For theme modes (light/dark), use the `data-theme` attribute:

```html
<!doctype html>
<html lang="en" data-brand="wbc" data-theme="light">
  ...
</html>
```

**NOTE:** There are some components that use portals `Modal`, `BottomSheet`, `AutoComplete`. These components will default their portal to where you add your `data-brand` attribute tag so these components can make use of branding. This can be overridden using their `portalContainer` props if you require the portal to be located elsewhere.

Now you can start using the GEL components in your `React.js` application. The following examples show how to use the `Button` component.

For detailed documentation refer to [https://gel.westpacgroup.com.au/design-system](https://gel.westpacgroup.com.au/design-system).

### Tokens

All brand tokens are also exported in the [W3C design tokens format](https://www.designtokens.org/tr/drafts/format/)

```js
import { ALL_BRANDS } from '@westpac/style-config/tokens';
```

#### Tokens usage with Tailwind

All brand tokens have been mapped to a color theme variable in the tailwind config and can be used in the relevant tailwind classname e.g. `bg-surface-mono text-text-body`

All available color tokens can be viewed in the [GEL storybook](https://gel-next-storybook-git-release-100-westpacgel.vercel.app/?path=/docs/foundation-colours--docs).

### Brand fonts

In order to use brand-fonts add the relevant font face declarations from the below example and update the src to the font file locations in your application.

```css
/* BOM fonts */
@font-face {
  src:
    url('/fonts/lineto-brown-pro-light.woff2') format('woff2'),
    url('/fonts/lineto-brown-pro-light.woff') format('woff');
  font-family: 'Brown Pro';
  font-weight: 100 300;
  font-style: normal;
}
@font-face {
  src:
    url('/fonts/lineto-brown-pro-regular.woff2') format('woff2'),
    url('/fonts/lineto-brown-pro-regular.woff') format('woff');
  font-family: 'Brown Pro';
  font-weight: 400 600;
  font-style: normal;
}
@font-face {
  src:
    url('/fonts/lineto-brown-pro-bold.woff2') format('woff2'),
    url('/fonts/lineto-brown-pro-bold.woff') format('woff');
  font-family: 'Brown Pro';
  font-weight: 700 900;
  font-style: normal;
}

/* BSA fonts */
@font-face {
  src:
    url('/fonts/Aller_Lt.woff2') format('woff2'),
    url('/fonts/Aller_Lt.woff') format('woff');
  font-family: 'Aller';
  font-weight: 100 600;
  font-style: normal;
}
@font-face {
  src:
    url('/fonts/Aller_Bd.woff2') format('woff2'),
    url('/fonts/Aller_Bd.woff') format('woff');
  font-family: 'Aller';
  font-weight: 700 900;
  font-style: normal;
}

/* RAMS fonts */
@font-face {
  src:
    url('/fonts/source-sans-pro-v14-latin-regular.woff2') format('woff2'),
    url('/fonts/source-sans-pro-v14-latin-regular.woff') format('woff');
  font-family: 'Source Sans Pro';
  font-weight: 100 500;
  font-style: normal;
}
@font-face {
  src:
    url('/fonts/source-sans-pro-v14-latin-600.woff2') format('woff2'),
    url('/fonts/source-sans-pro-v14-latin-600.woff') format('woff');
  font-family: 'Source Sans Pro';
  font-weight: 600;
  font-style: normal;
}
@font-face {
  src:
    url('/fonts/source-sans-pro-v14-latin-700.woff2') format('woff2'),
    url('/fonts/source-sans-pro-v14-latin-700.woff') format('woff');
  font-family: 'Source Sans Pro';
  font-weight: 700 900;
  font-style: normal;
}

/* STG fonts */
@font-face {
  src:
    url('/fonts/dragonbold-bold-webfont.woff2') format('woff2'),
    url('/fonts/dragonbold-bold-webfont.woff') format('woff');
  font-family: 'Dragon Bold';
  font-weight: 100 900;
  font-style: normal;
}

/* WBC fonts */
@font-face {
  src:
    url('/fonts/Westpac-Bold-v2.007.woff2') format('woff2'),
    url('/fonts/Westpac-Bold-v2.007.woff') format('woff');
  font-family: 'Westpac';
  font-weight: 100 900;
  font-style: normal;
}

/* WBG fonts */
@font-face {
  src:
    url('/fonts/montserrat-v14-latin-300.woff2') format('woff2'),
    url('/fonts/montserrat-v14-latin-300.woff') format('woff');
  font-family: 'Montserrat';
  font-weight: 100 300;
  font-style: normal;
}
@font-face {
  src:
    url('/fonts/montserrat-v14-latin-regular.woff2') format('woff2'),
    url('/fonts/montserrat-v14-latin-regular.woff') format('woff');
  font-family: 'Montserrat';
  font-weight: 400 600;
  font-style: normal;
}
@font-face {
  src:
    url('/fonts/montserrat-v14-latin-700.woff2') format('woff2'),
    url('/fonts/montserrat-v14-latin-700.woff') format('woff');
  font-family: 'Montserrat';
  font-weight: 700 900;
  font-style: normal;
}
```

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
   transformIgnorePatterns: ['node_modules/(?!(@westpac/ui|@westpac/style-config))']
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

1. Install Node.js 22.x or above. We recommend [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm) to install Node.js.

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
