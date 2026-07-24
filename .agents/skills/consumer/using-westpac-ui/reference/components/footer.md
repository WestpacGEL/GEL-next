## Footer

**Import:** `import { Footer } from '@westpac/ui/footer';`

Application footer with brand logo.

| Prop                | Type                               | Default | Description               |
| ------------------- | ---------------------------------- | ------- | ------------------------- |
| `brand`             | `'bom' \| 'bsa' \| 'stg' \| 'wbc'` | —       | Brand logo                |
| `hideLogo`          | `boolean`                          | —       | Hide logo                 |
| `logoLink`          | `string`                           | —       | Logo link href            |
| `logoAssistiveText` | `string`                           | —       | Logo aria-label           |
| `offsetSidebar`     | `boolean`                          | —       | Offset for sidebar layout |

**Incorrect (invalid `brand` value)**

```tsx
<Footer brand="westpac">
  <p>© 2026 Westpac Banking Corporation</p>
</Footer>
```

**Correct**

```tsx
<Footer brand="wbc" logoAssistiveText="Westpac">
  <p>© 2026 Westpac Banking Corporation</p>
</Footer>
```
