## CheckboxGroup

**Import:** `import { CheckboxGroup, CheckboxGroupCheckbox } from '@westpac/ui/checkbox-group';`

Group of checkboxes.

| Prop           | Type                                             | Default | Description                     |
| -------------- | ------------------------------------------------ | ------- | ------------------------------- |
| `size`         | `ResponsiveVariants<'medium' \| 'large'>`        | —       | Checkbox size                   |
| `orientation`  | `ResponsiveVariants<'horizontal' \| 'vertical'>` | —       | Layout direction                |
| `errorMessage` | `string \| string[]`                             | —       | Error messages                  |
| `hintMessage`  | `HintProps['children']`                          | —       | Hint text                       |
| `showAmount`   | `number`                                         | —       | Show N items then reveal button |
| `checkboxes`   | `CheckboxGroupCheckboxProps[]`                   | —       | Data-driven alternative         |

**Incorrect (native checkbox inputs instead of `CheckboxGroupCheckbox`)**

```tsx
<CheckboxGroup label="Options" orientation="vertical">
  <label>
    <input type="checkbox" value="a" /> Option A
  </label>
  <label>
    <input type="checkbox" value="b" /> Option B
  </label>
</CheckboxGroup>
```

**Correct**

```tsx
<CheckboxGroup label="Options" orientation="vertical">
  <CheckboxGroupCheckbox value="a">Option A</CheckboxGroupCheckbox>
  <CheckboxGroupCheckbox value="b">Option B</CheckboxGroupCheckbox>
</CheckboxGroup>
```

**Capabilities:** Responsive size/orientation · Error/hint messages · Show/reveal pattern · Data-driven or compositional · Built on react-aria
