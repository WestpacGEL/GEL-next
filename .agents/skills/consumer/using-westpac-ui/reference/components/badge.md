## Badge

**Import:** `import { Badge } from '@westpac/ui/badge';`

Small status labels.

| Prop    | Type                                                                                                              | Default   | Description      |
| ------- | ----------------------------------------------------------------------------------------------------------------- | --------- | ---------------- |
| `color` | `ResponsiveVariants<'hero' \| 'neutral' \| 'faint' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'>` | `hero`    | Badge color      |
| `type`  | `ResponsiveVariants<'default' \| 'pill'>`                                                                         | `default` | Badge shape      |
| `soft`  | `ResponsiveVariants<boolean>`                                                                                     | `false`   | Soft/muted style |
| `tag`   | `keyof JSX.IntrinsicElements`                                                                                     | `div`     | HTML element     |

**Incorrect (invalid `color`/`type` values)**

```tsx
<Badge color="green" type="rounded">
  Active
</Badge>
```

**Correct**

```tsx
<Badge color="success" type="pill">
  Active
</Badge>
```

**Capabilities:** Responsive color/type/soft · Polymorphic tag · Pill or default shape
