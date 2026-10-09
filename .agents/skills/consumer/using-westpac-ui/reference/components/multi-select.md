## MultiSelect

**Import:** `import { MultiSelect, MultiSelectItem, MultiSelectSection } from '@westpac/ui/multi-select';`

Multiple or single selection dropdown with filtering.

### MultiSelectItem Props

| Prop           | Type     | Default | Description                                                                                                    |
| -------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| `key`          | `Key`    | —       | Unique item identifier, used in `selectedKeys`                                                                 |
| `textValue`    | `string` | —       | Item text, used for filtering, the dropdown and screen readers. Required when `children` is not a plain string |
| `description`  | `string` | —       | Supporting text shown under the item in the dropdown                                                           |
| `displayValue` | `string` | —       | Text shown in the field when the item is selected (e.g. `'AU +61'`). Falls back to `textValue` if not set      |

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

### Alternative selected text with `displayValue`

Use `displayValue` to display different text than what is shown in the dropdown options. Screen readers still hear `textValue`. `displayValue` on a data object is not used automatically. Pass it to `MultiSelectItem`.

**Incorrect (only using the display value)**

```tsx
const countries = [
  { key: 'AU', displayValue: 'AU +61' },
  { key: 'NZ', displayValue: 'NZ +64' },
];
```

**Correct**

```tsx
const countries = [
  { key: 'AU', textValue: 'Australia +61', displayValue: 'AU +61' },
  { key: 'NZ', textValue: 'New Zealand +64', displayValue: 'NZ +64' },
];

<Field label="Country code">
  <MultiSelect
    items={countries}
    selectionMode="single"
    selectedKeys={selectedKeys}
    onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
  >
    {option => (
      <MultiSelectItem key={option.key} textValue={option.textValue} displayValue={option.displayValue}>
        {option.textValue}
      </MultiSelectItem>
    )}
  </MultiSelect>
</Field>;
```

Filtering only matches `textValue`, so typing `NZ` does not find "New Zealand +64".

**Capabilities:** Multiple or single (`selectionMode="single"`) selection · Filtering · Sections · Item descriptions · Alternative selected text via `displayValue` · Built on internal selection state · Forwards ref to the trigger button (so `field.ref` from react-hook-form can focus it)
