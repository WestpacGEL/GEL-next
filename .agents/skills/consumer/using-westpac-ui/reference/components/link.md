## Link

**Import:** `import { Link } from '@westpac/ui/link';`

Styled anchor link.

| Prop         | Type                                | Default      | Description                    |
| ------------ | ----------------------------------- | ------------ | ------------------------------ |
| `type`       | `'inline' \| 'standalone'`          | `standalone` | Link type                      |
| `underline`  | `boolean`                           | `true`       | Show underline (inline)        |
| `iconBefore` | `(props: IconProps) => JSX.Element` | —            | Icon before                    |
| `iconAfter`  | `(props: IconProps) => JSX.Element` | —            | Icon after                     |
| `iconSize`   | `'xsmall'-'xlarge'`                 | `small`      | Icon size                      |
| `tag`        | `React.ElementType`                 | `'a'`        | Element or component to render |

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

Render the link using a routing component when client-side routing is required:

```tsx
import { Link } from '@westpac/ui/link';
import NextLink from 'next/link';

<Link tag={NextLink} href="/page">
  Learn more
</Link>;
```

**Capabilities:** Inline or standalone · Icons before/after · Polymorphic rendering · Built on react-aria link
