## RadioGroup

**Import:** `import { RadioGroup } from '@westpac/ui/radio-group';`

Group of radio buttons.

**Incorrect (`RadioGroupRadio` children instead of the `radios` prop)**

```tsx
<RadioGroup label="Choose an option">
  <RadioGroupRadio value="one" label="Option 1" />
  <RadioGroupRadio value="two" label="Option 2" />
</RadioGroup>
```

**Correct**

```tsx
<RadioGroup
  label="Choose an option"
  radios={[
    { value: 'one', label: 'Option 1' },
    { value: 'two', label: 'Option 2' },
  ]}
/>
```

**Capabilities:** Responsive size/orientation · Error/hint messages · Built on react-aria · Similar API to CheckboxGroup
