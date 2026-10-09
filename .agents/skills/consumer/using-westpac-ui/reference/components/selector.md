## Selector

**Import:** `import { Selector } from '@westpac/ui/selector';`

Visual selection component (card-style radio/checkbox).

**Capabilities:** `radio`, `checkbox`, `button` and `link` types · For `radio`/`checkbox`/`button` types, `ref` is a `FocusHandle` (`{ focus() }`): `focus()` moves focus to the group's tab stop (the selected radio, or the first enabled option) — pass `field.ref` from react-hook-form so validation errors focus the field · `link` does not receive the ref

**With react-hook-form**

```tsx
import { Controller } from 'react-hook-form';
import { Selector, SelectorRadio } from '@westpac/ui/selector';

<Controller
  control={control}
  name="account"
  rules={{ required: 'Choose an account' }}
  render={({ field, fieldState }) => (
    <Selector
      type="radio"
      label="Account"
      ref={field.ref}
      value={field.value ?? null}
      onChange={field.onChange}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
    >
      <SelectorRadio value="everyday">Everyday</SelectorRadio>
      <SelectorRadio value="savings">Savings</SelectorRadio>
    </Selector>
  )}
/>;
```

To focus programmatically, type the ref as `FocusHandle` (exported from `@westpac/ui`): `const ref = useRef<FocusHandle>(null); ref.current?.focus();`

**Incorrect (native inputs instead of Selector options)**

```tsx
<Selector type="checkbox">
  <label>
    <input type="checkbox" value="email" /> Email alerts
  </label>
</Selector>
```

**Correct**

```tsx
<Selector type="checkbox">
  <SelectorCheckbox value="email">
    <SelectorLabel>Email alerts</SelectorLabel>
  </SelectorCheckbox>
</Selector>
```
