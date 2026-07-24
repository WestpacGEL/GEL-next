## Icon

**Import:** `import { ArrowRightIcon, BurgerIcon, ... } from '@westpac/ui/icon';`

> **Note:** Icons are only available via the sub-path import `@westpac/ui/icon`, not from the main `@westpac/ui` barrel export.

Over 260 SVG icons.

| Prop            | Type                                                                         | Default  | Description   |
| --------------- | ---------------------------------------------------------------------------- | -------- | ------------- |
| `look`          | `'filled' \| 'outlined'`                                                     | `filled` | Icon variant  |
| `size`          | `ResponsiveVariants<'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge'>` | —        | Icon size     |
| `color`         | `ResponsiveVariants<...>`                                                    | —        | Icon color    |
| `copyrightYear` | `string`                                                                     | —        | SVG copyright |

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
