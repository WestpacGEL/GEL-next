## Autocomplete

**Import:** `import { Autocomplete, AutocompleteItem } from '@westpac/ui/autocomplete';`

Searchable dropdown with filtering.

| Prop               | Type                                                             | Default | Description          |
| ------------------ | ---------------------------------------------------------------- | ------- | -------------------- |
| `size`             | `ResponsiveVariants<'small' \| 'medium' \| 'large' \| 'xlarge'>` | —       | Input size           |
| `width`            | `ResponsiveVariants<...>`                                        | —       | Input width          |
| `invalid`          | `boolean`                                                        | —       | Invalid state        |
| `isDisabled`       | `boolean`                                                        | —       | Disabled state       |
| `errorMessage`     | `string \| string[]`                                             | —       | Error messages       |
| `hintMessage`      | `HintProps['children']`                                          | —       | Hint text            |
| `noOptionsMessage` | `ReactNode`                                                      | —       | No results message   |
| `loadingState`     | `boolean`                                                        | —       | Show loading spinner |
| `footer`           | `ReactNode`                                                      | —       | Footer element       |
| `name`             | `string`                                                         | —       | Form field name      |
| `portalContainer`  | `Element`                                                        | —       | Portal container     |

**Incorrect (native `<option>` children instead of `AutocompleteItem`)**

```tsx
<Autocomplete label="Search" onSelectionChange={key => console.log(key)}>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Autocomplete>
```

**Correct**

```tsx
<Autocomplete label="Search" onSelectionChange={key => console.log(key)}>
  <AutocompleteItem key="1">Option 1</AutocompleteItem>
  <AutocompleteItem key="2">Option 2</AutocompleteItem>
</Autocomplete>
```

**Capabilities:** Responsive size/width · Server-side loading state · Error/hint messages · Custom no-results message · Portal support · Built on react-aria ComboBox
