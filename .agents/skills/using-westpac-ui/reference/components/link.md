## Link

**Import:** `import { Link } from '@westpac/ui/link';`

Styled anchor link.

| Prop         | Type                                | Default      | Description             |
| ------------ | ----------------------------------- | ------------ | ----------------------- |
| `type`       | `'inline' \| 'standalone'`          | `standalone` | Link type               |
| `underline`  | `boolean`                           | `true`       | Show underline (inline) |
| `iconBefore` | `(props: IconProps) => JSX.Element` | —            | Icon before             |
| `iconAfter`  | `(props: IconProps) => JSX.Element` | —            | Icon after              |
| `iconSize`   | `'xsmall'-'xlarge'`                 | `small`      | Icon size               |

**Incorrect (wrong prop name `variant` instead of `type`)**

```tsx
<Link href="/page" variant="standalone" iconAfter={ArrowRightIcon}>
  Learn more
</Link>
```

**Correct**

```tsx
<Link href="/page" type="standalone" iconAfter={ArrowRightIcon}>
  Learn more
</Link>
```

**Capabilities:** Inline or standalone · Icons before/after · Built on react-aria link
