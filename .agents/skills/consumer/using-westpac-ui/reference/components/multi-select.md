## MultiSelect

**Import:** `import { MultiSelect } from '@westpac/ui/multi-select';`

Multiple selection dropdown.

**Incorrect (native `option` children instead of the `items` prop with a render function)**

```tsx
<MultiSelect placeholder="Select option">
  <option value="1">Aerospace</option>
  <option value="2">Mechanical</option>
</MultiSelect>
```

**Correct**

```tsx
const options = [
  { key: 1, textValue: 'Aerospace' },
  { key: 2, textValue: 'Mechanical' },
];

<MultiSelect items={options} selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
  {option => (
    <MultiSelectItem key={option.key} textValue={option.textValue}>
      {option.textValue}
    </MultiSelectItem>
  )}
</MultiSelect>;
```

**Capabilities:** Multiple item selection · Built on internal selection state
