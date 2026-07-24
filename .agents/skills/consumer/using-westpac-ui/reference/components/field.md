## Field

**Import:** `import { Field } from '@westpac/ui/field';`

Form field wrapper with label, hint, and error message.

| Prop           | Type                          | Default | Description    |
| -------------- | ----------------------------- | ------- | -------------- |
| `label`        | `string`                      | —       | Field label    |
| `errorMessage` | `string \| string[]`          | —       | Error messages |
| `hintMessage`  | `HintProps['children']`       | —       | Hint text      |
| `labelSize`    | `LabelProps['size']`          | —       | Label size     |
| `tag`          | `keyof JSX.IntrinsicElements` | —       | HTML element   |

**Incorrect (wrong prop name `error` instead of `errorMessage`)**

```tsx
<Field label="Email" error="Email is required">
  <Input invalid />
</Field>
```

**Correct**

```tsx
<Field label="Email" errorMessage="Email is required">
  <Input invalid />
</Field>
```

**Capabilities:** Label + hint + error composition · Accessible field grouping via react-aria
