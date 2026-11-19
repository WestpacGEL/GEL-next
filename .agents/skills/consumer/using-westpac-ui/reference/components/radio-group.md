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

**Capabilities:** Responsive size/orientation · Error/hint messages · Built on react-aria · Similar API to CheckboxGroup · `ref` is a `FocusHandle` (`{ focus() }`): `focus()` moves focus to the group's tab stop (the selected radio, or the first enabled radio) — pass `field.ref` from react-hook-form so validation errors focus the field

**With react-hook-form** (pass `field.ref` so validation errors focus the group)

```tsx
<Controller
  control={control}
  name="colour"
  rules={{ required: 'Choose a colour' }}
  render={({ field, fieldState }) => (
    <RadioGroup
      ref={field.ref}
      label="Colour"
      value={field.value}
      onChange={field.onChange}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      radios={[
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
      ]}
    />
  )}
/>
```
