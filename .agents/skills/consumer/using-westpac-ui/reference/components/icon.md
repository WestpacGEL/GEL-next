## Icon

**Import:** `import { ArrowRightIcon, BurgerIcon, ... } from '@westpac/ui/icon';`

> **Note:** Icons are only available via the sub-path import `@westpac/ui/icon`, not from the main `@westpac/ui` barrel export.

Over 260 SVG icons.

| Prop            | Type                                                                         | Default  | Description                                             |
| --------------- | ---------------------------------------------------------------------------- | -------- | ------------------------------------------------------- |
| `look`          | `'filled' \| 'outlined'`                                                     | `filled` | Icon variant                                            |
| `size`          | `ResponsiveVariants<'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge'>` | —        | Icon size                                               |
| `color`         | `ResponsiveVariants<...>`                                                    | —        | Semantic role or compatibility colour; omitted inherits |
| `copyrightYear` | `string`                                                                     | —        | SVG copyright                                           |

**Incorrect (importing from the main barrel instead of `/icon`)**

```tsx
import { ArrowRightIcon } from '@westpac/ui';

<ArrowRightIcon size="medium" look="outlined" color="primary" />;
```

**Correct**

```tsx
import { ArrowRightIcon } from '@westpac/ui/icon';

<ArrowRightIcon size="medium" look="outlined" color="primary" />;
```

**Capabilities:** Responsive size/color · Filled and outlined variants · Used as component references in Button/Link props

### Semantic colours

Prefer `body`, `heading`, `muted`, `primary`, `hero`, `holler`, `link`, `success`, `info`, `warning`, `danger`, `system-error`, `mono` and `reversed`. Each maps to its corresponding `icon-*` token, for example `color="hero"` uses `text-icon-hero`, not `text-surface-hero`. Values resolve for the active brand and mode.

`body`, `heading` and `link` are newly available colour props. Existing colours without a corresponding icon token remain supported with their previous surface/background mappings: `muted-vivid`, `muted-strong`, `muted-mild`, `muted-soft`, `muted-pale`, `muted-faint`, `white-pale`, `white-faint`, `primary-faint`, `hero-faint`, `pop`, `pop-faint`, `holler-faint`, `success-faint`, `info-faint`, `warning-faint`, `danger-faint` and `system-error-dark`. Do not invent replacements such as `icon-pop`.

Omitting `color` still inherits the parent's colour; it does not default to `body`. This preserves button/link state styling. Responsive values and `className` overrides remain supported. Preview **Foundation / Icons / Semantic Colors** for filled and outlined icons, using Storybook's toolbar to switch brand and light/dark mode. Only the selected mode is shown.
