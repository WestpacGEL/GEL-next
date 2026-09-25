## Collapsible

**Import:** `import { Collapsible } from '@westpac/ui/collapsible';`

Toggle-able content section.

| Prop      | Type                  | Default | Description        |
| --------- | --------------------- | ------- | ------------------ |
| `text`    | `string`              | —       | Toggle button text |
| `open`    | `boolean`             | —       | Open state         |
| `onClick` | `() => void`          | —       | Toggle handler     |
| `size`    | `ButtonProps['size']` | —       | Button size        |

**Incorrect (wrong prop name `label` and no toggle handler)**

```tsx
<Collapsible label="Show more">Hidden content</Collapsible>
```

**Correct**

```tsx
const [open, setOpen] = useState(false);
<Collapsible text="Show more" open={open} onClick={() => setOpen(!open)}>
  Hidden content
</Collapsible>;
```

**Capabilities:** Controlled open/close · Button size customization
