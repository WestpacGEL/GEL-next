## Button

**Import:** `import { Button } from '@westpac/ui/button';`

Interactive button with multiple variants.

| Prop                | Type                                                                         | Default  | Description                 |
| ------------------- | ---------------------------------------------------------------------------- | -------- | --------------------------- |
| `look`              | `ResponsiveVariants<'primary' \| 'hero' \| 'faint' \| 'link' \| 'unstyled'>` | `hero`   | Visual style                |
| `size`              | `ResponsiveVariants<'small' \| 'medium' \| 'large' \| 'xlarge'>`             | `medium` | Button size                 |
| `soft`              | `ResponsiveVariants<boolean>`                                                | —        | Soft/outlined style         |
| `block`             | `ResponsiveVariants<boolean>`                                                | `false`  | Full width                  |
| `justify`           | `ResponsiveVariants<boolean>`                                                | `false`  | Justify content with flex   |
| `iconBefore`        | `(props: IconProps) => JSX.Element`                                          | —        | Icon before text            |
| `iconAfter`         | `(props: IconProps) => JSX.Element`                                          | —        | Icon after text             |
| `iconColor`         | `IconProps['color']`                                                         | auto     | Icon color                  |
| `iconLook`          | `IconProps['look']`                                                          | `filled` | Icon look                   |
| `iconSize`          | `IconProps['size']`                                                          | auto     | Icon size                   |
| `tag`               | `'a' \| 'span' \| 'button' \| 'div'`                                         | `button` | HTML element                |
| `removeLinkPadding` | `boolean`                                                                    | `false`  | Remove padding on link look |

**Incorrect (wrong prop names and wrapping in an anchor)**

```tsx
import { ArrowRightIcon } from '@westpac/ui/icon';

<Button variant="primary" buttonSize="large">Click me</Button>
<Button look="hero" soft icon="arrow-right">Next</Button>
<a href="/page"><Button look="link">Go to page</Button></a>
<Button block="true">Full width</Button>
```

**Correct**

```tsx
import { ArrowRightIcon } from '@westpac/ui/icon';

<Button look="primary" size="large">Click me</Button>
<Button look="hero" soft iconAfter={ArrowRightIcon}>Next</Button>
<Button tag="a" href="/page" look="link">Go to page</Button>
<Button size={{ initial: 'small', md: 'large' }}>Responsive</Button>
<Button block>Full width</Button>
```

**Capabilities:** Responsive look/size/soft/block/justify · Icons before/after · Polymorphic tag (button/a/span/div) · Soft variants for primary/hero/faint · Icon-only mode (no children) · Accessible focus ring · Disabled state via `disabled` prop · Forwards ref
