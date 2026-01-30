## GEL Style Config

### Introduction

The GEL Style Config package is the central design system foundation for Westpac Group brands, providing a comprehensive collection of design tokens, themes, and styling utilities.

**Key Features:**

- **Design Tokens**: Complete set of W3C-compliant design tokens for colors, typography, spacing, and borders
- **Multi-Brand Support**: Pre-configured themes for all Westpac Group brands
- **Light/Dark Mode**: Built-in theme switching capabilities
- **Tailwind CSS v4 Integration**: Optimized for the latest Tailwind CSS with native CSS variable support

This package serves as the single source of truth for design consistency across the Westpac Group ecosystem, ensuring brand compliance and accelerating development workflows.

### Installation

Install the GEL style config using your preferred package manager i.e. `npm`, `yarn` or `pnpm`.

```sh
npm i @westpac/style-config@canary
```

If using tailwind also install the following:

```sh
npm i tailwindcss @tailwindcss/postcss postcss`
```

Create a `postcss.config.mjs` on the root of your application as follows.

```js
import { postcssConfig } from '@westpac/style-config/postcss';

export default postcssConfig;
```

## Usage

### Tailwind

In your main css file import the default GEL styles

```css
@import 'tailwindcss';
@import '@westpac/style-config/tailwind';
```

#### Theming

In your main CSS file, import the Tailwind directives and GEL styles:

```css
@import 'tailwindcss';
@import '@westpac/style-config';
```

For brand theming, import the required brand stylesheets:

```css
@import '@westpac/style-config/themes/wbc';
@import '@westpac/style-config/themes/stg';
@import '@westpac/style-config/themes/bom';
@import '@westpac/style-config/themes/bsa';
```

#### Using brands

Add a custom attribute tag `data-brand="brand_name"` to `html` tag. Note that instead of adding the custom attribute to html tag, you can add it to the parent tag of your application as well.

Following example shows adding `wbc` brand. You can add other valid brand names such as `stg`, `bom`, `bsa` etc. as the value.

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

### Tokens

All brand tokens are also exported in the [W3C design tokens format](https://www.designtokens.org/tr/drafts/format/)

```js
import { ALL_BRANDS } from '@westpac/style-config/tokens';
```

#### Tokens usage with Tailwind

All brand tokens have been mapped to a color theme variable in the tailwind config and can be used in the relevant tailwind classname e.g. `bg-surface-mono text-text-body`

All available color tokens can be viewed in the [GEL storybook](https://gel-next-storybook-git-release-100-westpacgel.vercel.app/?path=/docs/foundation-colours--docs).

#### Brand fonts

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
```
## Developing

### Updating Tokens

#### CAUTION:
Only generate new tokens at the request of someone from the GEL team as there is no versioning and you may end up with unwanted changes.

1. Request access to the Tokens Figma project by contacting someone in the GEL team. Step 2 + 3 can be done before access is approved.

2. Generate a [Figma personal access token](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens). Ensure the `file_variables:read` scope is selected as it is required by the [API](https://developers.figma.com/docs/rest-api/variables-endpoints/#get-local-variables-endpoint).

3. Create a `.env.local` file in the root of the `style-config` package containing the project ID (found in the url figma.com/design/PROJECT_ID/) and your PAT. The project ID is unique and should be treated securely. The contents should look like:
```
FIGMA_PROJECT_ID=ID
FIGMA_TOKEN=PAT
```

4. If you have your access to the project approved you can now run `pnpm build:tokens-file` to generate a new `GEL-tokens-figma.json` file, which is used to build off.

5. You can now run `pnpm build` and update the tokens. Double check the updates to ensure they are all correct before raising a PR.

