# @westpac/theme

Core theme layer for styling using Tailwind.

Refer to the [TailwindCSS](https://tailwindcss.com/) website for full documentation and examples.

### Basic Usage (with NextJS)

For this configuration we need two main setup

- Setup the css variables and basic tailwind css imports
- Add the tailwind plugin into the `tailwind.config.ts`

```ts
// _document.tsx
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    // e.g: in this case theme-wbc is applied
    <Html lang="en" data-theme="wbc">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

```tsx
// tailwind.config.ts
import { WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin } from '@westpac/theme';

const config: any = {
  relative: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@westpac/ui/src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [WestpacUIKitBasePlugin, WestpacUIKitThemesPlugin],
};

export default config;
```
