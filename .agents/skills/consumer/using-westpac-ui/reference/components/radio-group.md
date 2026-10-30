## RadioGroup

**Import:** `import { RadioGroup } from '@westpac/ui/radio-group';`

Group of radio buttons.

| Prop            | Type      | Default | Description                                                              |
| --------------- | --------- | ------- | ------------------------------------------------------------------------ |
| `announceError` | `boolean` | `false` | Politely announce updates to the visible error when the group is invalid |

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

**Capabilities:** Responsive size/orientation · Error/hint messages · Opt-in live error announcements · Built on react-aria · Similar API to CheckboxGroup · `ref` is a `FocusHandle` (`{ focus() }`): `focus()` moves focus to the group's tab stop (the selected radio, or the first enabled radio) — pass `field.ref` from react-hook-form so validation errors focus the field

### Announcing validation errors

RadioGroup renders its own error; it does not inherit Field's announcement setting. Enable
`announceError` directly on RadioGroup before errors appear and keep it enabled while validating:

```tsx
<RadioGroup
  label="Contact preference"
  radios={[
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
  ]}
  isInvalid={Boolean(error)}
  errorMessage={error}
  announceError
/>
```

Only the visible error goes inside a persistent `aria-live="polite"`, `aria-atomic="true"` region.
The region stays empty unless an error message is supplied and the group is invalid. This also
supports arrays of errors, without hidden duplicate text. Labels, hints, and radio controls stay
outside the live region; focus, keyboard navigation, and the error description association are
unchanged. Omit `announceError` or pass false to retain the existing markup.

Initial errors and repeated identical messages are not guaranteed to be announced. Clearing the
error does not announce success. Focus announcements can overlap with live announcements, so test
with supported screen readers, especially when submitting moves focus to the group. Do not add a
separate error announcer when using this option.

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
