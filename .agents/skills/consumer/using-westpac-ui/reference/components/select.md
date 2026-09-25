## Select

**Import:** `import { Select } from '@westpac/ui/select';`

Native `<select>` dropdown.

| Prop            | Type                      | Default  | Description                  |
| --------------- | ------------------------- | -------- | ---------------------------- |
| `size`          | `ResponsiveVariants<...>` | `medium` | Select size                  |
| `width`         | `ResponsiveVariants<...>` | `auto`   | Select width                 |
| `invalid`       | `boolean`                 | `false`  | Invalid state                |
| `enableTooltip` | `boolean`                 | `false`  | Title tooltip for truncation |

**Incorrect (invalid `size` value)**

```tsx
<Select size="big">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

**Correct**

```tsx
<Select size="large">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

**Capabilities:** Responsive size/width · Invalid state · Native `<option>` children · Tooltip for truncated options
