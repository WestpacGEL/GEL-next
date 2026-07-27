## Label

**Import:** `import { Label } from '@westpac/ui/label';`

Form field label.

| Prop      | Type                      | Default | Description         |
| --------- | ------------------------- | ------- | ------------------- |
| `size`    | `ResponsiveVariants<...>` | —       | Label size          |
| `spacing` | `ResponsiveVariants<...>` | —       | Spacing             |
| `srOnly`  | `boolean`                 | —       | Screen reader only  |
| `tag`     | `'label' \| 'legend'`     | —       | HTML element        |
| `htmlFor` | `string`                  | —       | Associated input id |

**Incorrect (unsupported `as` prop instead of `tag`)**

```tsx
<Label as="legend">Account details</Label>
```

**Correct**

```tsx
<Label tag="legend" size="medium">
  Account details
</Label>
```
