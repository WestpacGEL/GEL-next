## Input

**Import:** `import { Input } from '@westpac/ui/input';`

Text input field.

| Prop      | Type                                                             | Default  | Description   |
| --------- | ---------------------------------------------------------------- | -------- | ------------- |
| `size`    | `ResponsiveVariants<'small' \| 'medium' \| 'large' \| 'xlarge'>` | `medium` | Input size    |
| `width`   | `ResponsiveVariants<'full' \| ...>`                              | `full`   | Input width   |
| `invalid` | `boolean`                                                        | `false`  | Invalid state |

**Incorrect (invalid `size` value, wrong `error` prop)**

```tsx
<Input size="big" placeholder="Enter text" />
<Input error aria-invalid />
```

**Correct**

```tsx
<Input size="large" placeholder="Enter text" />
<Input invalid aria-invalid />
```

**Capabilities:** Responsive size/width · Invalid state · Forwards ref · All standard `<input>` HTML attributes
