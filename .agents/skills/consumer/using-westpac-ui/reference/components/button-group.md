## ButtonGroup

**Import:** `import { ButtonGroup, ButtonGroupButton } from '@westpac/ui/button-group';`

Toggle button group with single or multiple selection.

| Prop                  | Type                                      | Default | Description          |
| --------------------- | ----------------------------------------- | ------- | -------------------- |
| `look`                | `ResponsiveVariants<'hero' \| 'primary'>` | —       | Button look          |
| `size`                | `ButtonProps['size']`                     | —       | Button size          |
| `block`               | `ResponsiveVariants<boolean>`             | —       | Full width           |
| `selectionMode`       | `'single' \| 'multiple'`                  | —       | Selection mode       |
| `selectedKeys`        | `Key \| Iterable<Key>`                    | —       | Controlled selection |
| `defaultSelectedKeys` | `Key \| Iterable<Key>`                    | —       | Default selection    |
| `onSelectionChange`   | `(key) => void`                           | —       | Selection handler    |

**Incorrect (native buttons and `value`/`onChange` props)**

```tsx
<ButtonGroup value="opt1" onChange={key => {}}>
  <button id="opt1">Option 1</button>
  <button id="opt2">Option 2</button>
</ButtonGroup>
```

**Correct**

```tsx
<ButtonGroup selectionMode="single" defaultSelectedKeys="opt1" onSelectionChange={key => {}}>
  <ButtonGroupButton id="opt1">Option 1</ButtonGroupButton>
  <ButtonGroupButton id="opt2">Option 2</ButtonGroupButton>
</ButtonGroup>
```

**Capabilities:** Single or multiple selection · Controlled or uncontrolled · Responsive look/block · Built on react-aria toggle group
