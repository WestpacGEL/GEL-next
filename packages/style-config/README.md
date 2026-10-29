## GEL Style Config

### Introduction

The GEL Style Config package is the central design system foundation for Westpac Group brands, providing a comprehensive collection of design tokens, themes, and styling utilities.

**Key Features:**

- **Design Tokens**: Complete set of W3C-compliant design tokens for colors, typography, spacing, and borders
- **Multi-Brand Support**: Pre-configured themes for all Westpac Group brands
- **Light/Dark Mode**: Light by default, with explicitly selected dark tokens for WBC, STG, BSA and BOM
- **Tailwind CSS v4 Integration**: Optimized for the latest Tailwind CSS with native CSS variable support

This package serves as the single source of truth for design consistency across the Westpac Group ecosystem, ensuring brand compliance and accelerating development workflows.

### Installation

Install the GEL style config using your preferred package manager i.e. `npm`, `yarn` or `pnpm`.

```sh
npm i @westpac/style-config
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

For brand theming, import the required brand stylesheets:

```css
@import '@westpac/style-config/themes/wbc';
@import '@westpac/style-config/themes/stg';
@import '@westpac/style-config/themes/bom';
@import '@westpac/style-config/themes/bsa';
```

#### Using brands

Add a custom attribute tag `data-brand="brand_name"` to `html` tag. Note that instead of adding the custom attribute to html tag, you can add it to the parent tag of your application as well.

Following example shows adding `wbc` brand. Use `stg`, `bom` and `bsa` for the other token themes.

```html
<!doctype html>
<html lang="en" data-brand="wbc">
  ...
</html>
```

#### Light and dark mode

Web dark mode is opt-in. Set `data-theme="dark"` on the **same element** as `data-brand` to select dark tokens. Omitting `data-theme`, or setting it to `light`, uses light tokens even when the browser or operating system prefers dark mode. The styles do not automatically follow `prefers-color-scheme`.

```html
<!doctype html>
<html lang="en" data-brand="wbc" data-theme="dark">
  ...
</html>
```

Keep using semantic utilities such as `bg-background-white` and `text-text-body`; their values change with the selected mode. Applications own the user's selection and any persistence of it.

### Tokens

All brand tokens are also exported in the [W3C design tokens format](https://www.designtokens.org/tr/drafts/format/)

```js
import { ALL_BRANDS } from '@westpac/style-config/tokens';
```

#### Generating web and native tokens

From the repository root, regenerate both output paths from the checked-in `src/tokens/GEL-tokens-figma.json`:

```sh
pnpm --filter @westpac/style-config build:style-dictionary
pnpm --filter @westpac/style-config build:css
pnpm --filter @westpac/style-config test
```

Style Dictionary writes both modes to `src/tokens/w3c`, standalone CSS to `src/tokens/css`, Swift to `src/tokens/ios`, and XML to `src/tokens/android`. The CSS transformer writes the Tailwind-facing brand themes and shared styles. Edit the transformers/templates, not generated output files.

Per-brand Swift output includes `LightColors`/`DarkColors` and `LightDimensions`/`DarkDimensions` enums, plus adaptive properties. Android uses matching resource names in `values` and `values-night`. Native theme adaptation follows platform conventions; the explicit opt-in requirement applies to the web. Validate native integration with the consuming application's toolchain.

Android colours use `#AARRGGBB` (alpha first), not CSS `#RRGGBBAA`. This also corrects previously generated light-mode opacity resources; opaque colours include the equivalent `ff` alpha byte.

#### Tokens usage with Tailwind

All brand tokens have been mapped to a color theme variable in the tailwind config and can be used in the relevant tailwind classname e.g. `bg-surface-mono text-text-body`

All available color tokens can be viewed in the [GEL storybook](https://gel-next-storybook-westpacgel.vercel.app/?path=/docs/foundation-colours--docs).

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
