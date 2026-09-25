## Repeater

**Import:** `import { Repeater } from '@westpac/ui/repeater';`

Repeatable form sections with add/remove.

**Incorrect (plain `div` instead of `RepeaterItem`)**

```tsx
<Repeater onAdd={handleAdd}>
  <div>
    <Field label="Primary">
      <Input name="item-0" />
    </Field>
  </div>
</Repeater>
```

**Correct**

```tsx
<Repeater onAdd={handleAdd} addText="Add another">
  <RepeaterItem onRemove={handleRemove}>
    <Field label="Primary">
      <Input name="item-0" />
    </Field>
  </RepeaterItem>
</Repeater>
```
