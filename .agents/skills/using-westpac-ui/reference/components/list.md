## List

**Import:** `import { List, ListItem } from '@westpac/ui/list';`

Styled lists with various bullet types.

| Prop      | Type                                                                           | Default | Description   |
| --------- | ------------------------------------------------------------------------------ | ------- | ------------- |
| `type`    | `'bullet' \| 'link' \| 'tick' \| 'cross' \| 'unstyled' \| 'icon' \| 'ordered'` | —       | Bullet type   |
| `look`    | `'primary' \| 'hero' \| 'success' \| 'danger' \| 'link'`                       | —       | Color         |
| `icon`    | `(props: IconProps) => JSX.Element`                                            | —       | Custom icon   |
| `spacing` | `'medium' \| 'large'`                                                          | —       | Spacing       |
| `nested`  | `number`                                                                       | —       | Nesting level |

**Incorrect (raw `<li>` instead of `ListItem`)**

```tsx
<List type="tick" look="success">
  <li>Item 1</li>
  <li>Item 2</li>
</List>
```

**Correct**

```tsx
<List type="tick" look="success">
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
</List>
```

**Capabilities:** Bullet/tick/cross/icon/ordered types · Color looks · Nesting · Custom icons
