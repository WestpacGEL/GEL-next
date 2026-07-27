## InputGroup

**Import:** `import { InputGroup } from '@westpac/ui/input-group';`

Input with label, hint, error, and before/after add-ons.

| Prop             | Type                                         | Default | Description     |
| ---------------- | -------------------------------------------- | ------- | --------------- |
| `label`          | `string`                                     | —       | Label text      |
| `size`           | `'small' \| 'medium' \| 'large' \| 'xlarge'` | —       | Size            |
| `width`          | `InputProps['width']`                        | —       | Input width     |
| `before`         | `ReactNode \| { element?, icon?, inset? }`   | —       | Before add-on   |
| `after`          | `ReactNode \| { element?, icon?, inset? }`   | —       | After add-on    |
| `errorMessage`   | `string \| string[]`                         | —       | Error messages  |
| `hint`           | `ReactNode`                                  | —       | Hint text       |
| `supportingText` | `ReactNode`                                  | —       | Supporting text |

**Incorrect (wrong prop names `prefix`/`suffix`)**

```tsx
<InputGroup label="Amount" prefix="$" suffix=".00">
  <Input />
</InputGroup>
```

**Correct**

```tsx
<InputGroup label="Amount" before={{ element: '$' }} after={{ element: '.00' }}>
  <Input />
</InputGroup>
```

**Capabilities:** Before/after add-ons (text, icon, or inset) · Label/hint/error composition · ARIA attributes
