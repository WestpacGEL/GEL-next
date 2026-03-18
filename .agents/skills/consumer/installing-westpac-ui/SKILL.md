---
name: installing-westpac-ui
description: "Guides setup and installation of @westpac/ui and @westpac/style-config in a new project. Use when setting up GEL, installing the design system, configuring Tailwind CSS, theming, or brand fonts."
---

# Installing @westpac/ui

Step-by-step setup for new projects using the GEL design system.

## 1. Install Packages

GEL is split into two packages:

- **`@westpac/ui`** — All design system components
- **`@westpac/style-config`** — Tailwind CSS themes and design tokens

```bash
npm i @westpac/ui @westpac/style-config
```

## 2. Install Tailwind CSS

GEL components are styled with Tailwind CSS v4. Follow the [Tailwind CSS installation instructions](https://tailwindcss.com/docs/installation/using-postcss).

```bash
npm i tailwindcss @tailwindcss/postcss postcss
```

Create `postcss.config.mjs`:

```js
import { postcssConfig } from '@westpac/style-config/postcss';

export default postcssConfig;
```

## 3. Set Up Styles

In your main CSS file, add these imports:

```css
@import 'tailwindcss';
@import '@westpac/style-config/tailwind';   /* GEL theme config (typography, spacing, etc.) */
@import '@westpac/style-config/themes/wbc';  /* Brand color tokens — import each brand you need */

@source "./node_modules/@westpac/ui/src";   /* Enable Tailwind to scan component class names */
```

## 4. Enable Brand Theming

Add the `data-brand` attribute to a parent element in your HTML:

```html
<html lang="en" data-brand="wbc">
  <!-- Your app content -->
</html>
```

Or on any container element:

```html
<div data-brand="wbc">
  <!-- Your app content -->
</div>
```

Available brands:
- `wbc` — Westpac Banking Corporation
- `stg` — St.George Bank
- `bom` — Bank of Melbourne
- `bsa` — BankSA

Import each brand's theme CSS that you need:

```css
@import '@westpac/style-config/themes/wbc';
@import '@westpac/style-config/themes/stg';
@import '@westpac/style-config/themes/bom';
@import '@westpac/style-config/themes/bsa';
```

For multi-brand applications, dynamically switch with the `data-brand` attribute:

```tsx
<div data-brand={currentBrand}>
  {/* Your app content */}
</div>
```

> **Note:** Dark mode (`data-theme="dark"`) is disabled in the current release.

## 5. Brand Fonts

Add the relevant `@font-face` declarations and update `src` paths to your font file locations:

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

## 6. ESLint Configuration (Optional)

For Next.js projects:

```js
// eslint.config.mjs
import eslintConfig from '@westpac/eslint-config/nextjs';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...eslintConfig,
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/globals.css',
      },
    },
  },
]);
```

For non-Next.js projects, you may need to disable certain Next.js-specific rules:

```js
// .eslintrc.js
module.exports = {
  root: true,
  extends: ['@westpac/eslint-config/nextjs'],
  rules: {
    '@next/next/no-html-link-for-pages': 0,
  },
};
```

## Resources

- [npm: @westpac/ui](https://www.npmjs.com/package/@westpac/ui)
- [npm: @westpac/style-config](https://www.npmjs.com/package/@westpac/style-config)
- [GitHub: GEL-next](https://github.com/WestpacGEL/GEL-next)
- [Tailwind CSS](https://tailwindcss.com/)
