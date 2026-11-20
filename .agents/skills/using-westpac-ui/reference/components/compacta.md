## Compacta

**Import:** `import { Compacta, CompactaItem } from '@westpac/ui/compacta';`

Compact list with add functionality.

| Prop      | Type            | Default | Description     |
| --------- | --------------- | ------- | --------------- |
| `onAdd`   | `() => unknown` | —       | Add callback    |
| `addText` | `string`        | —       | Add button text |

**Incorrect (uses `Compacta.Item` dot-notation instead of the `CompactaItem` component)**

```tsx
<Compacta onAdd={handleAdd}>
  <Compacta.Item title={{ primary: 'Home loan' }}>
    <Field label="Amount">
      <Input />
    </Field>
  </Compacta.Item>
</Compacta>
```

**Correct**

```tsx
<Compacta onAdd={handleAdd} addText="Add item">
  <CompactaItem title={{ primary: 'Home loan' }}>
    <Field label="Amount">
      <Input />
    </Field>
  </CompactaItem>
</Compacta>
```

**Capabilities:** Compound component with CompactaItem · Add button
