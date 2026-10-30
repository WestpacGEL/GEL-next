## Field

**Import:** `import { Field } from '@westpac/ui/field';`

Form field wrapper with label, hint, and error message.

| Prop            | Type                          | Default | Description                             |
| --------------- | ----------------------------- | ------- | --------------------------------------- |
| `label`         | `string`                      | —       | Field label                             |
| `errorMessage`  | `string \| string[]`          | —       | Error messages                          |
| `announceError` | `boolean`                     | `false` | Politely announce visible error updates |
| `hintMessage`   | `HintProps['children']`       | —       | Hint text                               |
| `labelSize`     | `LabelProps['size']`          | —       | Label size                              |
| `tag`           | `keyof JSX.IntrinsicElements` | —       | HTML element                            |

**Incorrect (wrong prop name `error` instead of `errorMessage`)**

```tsx
<Field label="Email" error="Email is required">
  <Input invalid />
</Field>
```

**Correct**

```tsx
<Field label="Email" errorMessage="Email is required">
  <Input invalid />
</Field>
```

### Announcing validation errors

Enable `announceError` before validation errors appear and keep it enabled while validating:

```tsx
<Field label="Email" errorMessage={error} announceError>
  <Input invalid={Boolean(error)} />
</Field>
```

The visible error is inside a persistent `aria-live="polite"` region with `aria-atomic="true"`.
There is no hidden duplicate. Labels, hints, and controls are outside the live region, and the
input retains its error association through `aria-describedby`. Arrays and their error title
are announced together. With `announceError` omitted or false, existing markup is unchanged.

This requests announcements when errors appear or change; it does not move focus. Errors
present on initial mount and repeated identical messages are not guaranteed to be announced.
Clearing an error empties the region; it does not announce a success message. Focus announcements
can overlap with live announcements, so forms that focus an invalid field or error summary may
prefer leaving this disabled. Test with your supported browser and screen-reader combinations.
Do not add another error announcer or put `aria-live` on the whole Field when using this option.
RadioGroup has its own `announceError` option; enable it directly on that component. CheckboxGroup
does not inherit Field's announcement setting.

**Capabilities:** Label + hint + error composition · Accessible field grouping via react-aria · Opt-in live error announcements
