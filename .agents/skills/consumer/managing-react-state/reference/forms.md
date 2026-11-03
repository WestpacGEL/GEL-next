# Forms: React Hook Form + Zod with @westpac/ui

## Form store naming and ownership

When a form journey needs shared Zustand state across steps, make `form` part of the subject name:

| Purpose                          | Apply form example                                                     |
| -------------------------------- | ---------------------------------------------------------------------- |
| Store and colocated tests        | `stores/apply-form.store.ts`, `stores/apply-form.store.test.ts`        |
| Provider module                  | `stores/apply-form-store-provider.tsx`                                 |
| Aggregate values                 | `ApplyFormValues`                                                      |
| State, actions, combined store   | `ApplyFormState`, `ApplyFormActions`, `ApplyFormStore`                 |
| Store API and factory            | `ApplyFormStoreApi`, `createApplyFormStore`                            |
| Initial state                    | `initialApplyFormState`                                                |
| Context, provider, selector hook | `ApplyFormStoreContext`, `ApplyFormStoreProvider`, `useApplyFormStore` |
| Supporting exported types        | `ApplyFormDataStepId`, `ApplyFormSubmission`                           |

Use `<journey>-form.store.ts`, not `<journey>.form.store.ts`: hyphens join the subject, and the
`.store.ts` suffix identifies its role. Carry the same `<Journey>Form` prefix through imports,
tests, factories, providers, hooks, and types. If an imperative API hook is needed, name it
`useApplyFormStoreApi`; do not add one just to complete the naming set.

`ApplyFormValues` groups schema-derived step types such as `PersonalValues`, `AddressValues`,
and `PaymentValues`; those step types keep their existing names. `ApplyFormDataStepId` names
only steps with data, excluding review/confirmation pages.

The form store holds saved step values or drafts, progress, review-edit state, and submission
status. React Hook Form owns active input values, touched/dirty state, and validation; the
route owns the current step. `ApplyFormState` is not React Hook Form's `formState`. This naming
does not justify moving per-keystroke state into Zustand or adding a store to a single-step form.
Non-form stores retain their domain names, such as `SidebarStore`.

For a naming-only refactor, preserve behavior, data shape, DevTools action names, and existing
persistence keys. Changing a storage key is a separate migration, not part of renaming a file.

## Setup

```ts
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const addressSchema = z.object({
  streetName: z
    .string()
    .trim()
    .min(1, 'Enter your street name')
    .min(2, 'Enter a street name with 2 to 100 characters')
    .max(100),
  state: z.enum(['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'], { error: 'Select your state or territory' }),
  postcode: z
    .string()
    .trim()
    .min(1, 'Enter your postcode')
    .regex(/^\d{4}$/, 'Enter a postcode with 4 digits'),
});
export type AddressValues = z.infer<typeof addressSchema>;

/** Unselected enums are simply absent; the schema's `error` message covers them. */
export const addressDefaults: DefaultValues<AddressValues> = { streetName: '', postcode: '' };

const form = useForm<AddressValues>({
  resolver: zodResolver(addressSchema),
  mode: 'onTouched', // validate on first blur, then on every change
  defaultValues: savedAddress ?? addressDefaults,
});
```

- Zod v4: pass `{ error: '…' }` for enum/type messages (`message` is the deprecated v3 spelling). Custom rules use `ctx.addIssue({ code: 'custom', message, path })` inside `superRefine`.
- Types come from the schema; never hand-write the values type. `z.infer` when input and output are the same; when the schema `transform`s, use `useForm<z.input<S>, unknown, z.output<S>>` so `handleSubmit` receives the parsed output type.
- `mode: 'onTouched'` is the standard. Do not change validation timing on an existing form incidentally.
- Type defaults as `DefaultValues<Values>` and export them next to the schema. Give every text field `''`; leave unselected enums and dates absent so the schema's "Select …" message fires.
- Zod reports every failing check on a field; `zodResolver` shows the first, so order checks from "empty" to "format".
- Keep the schema next to the form (`<step>.schema.ts`) and unit-test it directly with `schema.safeParse`.

## Which @westpac/ui component takes `register` vs `Controller`

Verified against `packages/ui/src/components`.

| Component       | Use          | Why                                                                                                 |
| --------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| `Input`         | `register`   | `forwardRef` to the native `<input>`, native `onChange`/`onBlur`                                    |
| `Textarea`      | `register`   | `forwardRef` to the native `<textarea>`                                                             |
| `Select`        | `register`   | `forwardRef` to the native `<select>`                                                               |
| `RadioGroup`    | `Controller` | react-aria: `value`/`onChange(value: string)`, no ref to a native input                             |
| `CheckboxGroup` | `Controller` | react-aria: `value: string[]`/`onChange(values)`                                                    |
| `Switch`        | `Controller` | react-aria: `isSelected`/`onChange(boolean)`                                                        |
| `DatePicker`    | `Controller` | react-aria: `value: DateValue \| null`/`onChange(date)`                                             |
| `MultiSelect`   | `Controller` | custom value API                                                                                    |
| `PassCode`      | `Controller` | `value: string[]`/`onChange(string[])`                                                              |
| `Selector`      | `Controller` | react-aria radio/checkbox groups                                                                    |
| `Autocomplete`  | `Controller` | forwards the input ref, but the selected item arrives via `onSelectionChange`, not the native event |

Rule: a component that forwards a ref to a native form element and emits native events takes `register`; a component with a value-object API takes `Controller`.

Exception: use `Controller` on an `Input` when the displayed text differs from the stored value (card number shown in groups of four but stored as digits, expiry auto-inserting `/`). `Controller` gives you both directions of the transform; `register`'s `setValueAs` only transforms on the way in.

### One field wrapper for both

`register()`'s return and `Controller`'s `field` both provide `{ name, ref, onChange, onBlur }`, so a thin wrapper can accept either:

```tsx
type NativeBinding<E extends HTMLElement> = {
  name: string;
  ref: Ref<E>;
  onChange: (event: ChangeEvent<E>) => unknown;
  onBlur: (event: FocusEvent<E>) => unknown;
  value?: string;
};

export function TextField({ label, hint, error, field, ...inputProps }: FieldChrome & { field: NativeBinding<HTMLInputElement> } & InputProps) {
  return (
    <Field label={label} errorMessage={error} hintMessage={hint}>
      <Input {...inputProps} {...field} invalid={!!error} aria-invalid={error ? true : undefined} />
    </Field>
  );
}

<TextField label="Suburb" field={register('suburb')} error={errors.suburb?.message} />

<Controller control={control} name="cardNumber" render={({ field, fieldState }) => (
  <TextField
    label="Card number"
    error={fieldState.error?.message}
    field={{ ...field, value: formatCardNumber(field.value), onChange: e => field.onChange(normaliseCardNumber(e.target.value)) }}
  />
)} />
```

See `apps/test-app/src/app/apply/_components/fields.tsx`.

## Templates

### `register` with `Field` + `Input`

```tsx
const {
  register,
  formState: { errors },
} = form;

<Field label="Street name" errorMessage={errors.streetName?.message}>
  <Input
    {...register('streetName')}
    invalid={!!errors.streetName}
    aria-invalid={errors.streetName ? true : undefined}
    autoComplete="address-line1"
    maxLength={100}
  />
</Field>;
```

### `register` with `Select`

```tsx
<Field label="State / Territory" errorMessage={errors.state?.message}>
  <Select {...register('state')} invalid={!!errors.state} width={{ initial: 'full', sm: 10 }}>
    <option value="">Select</option>
    {AU_STATES.map(state => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </Select>
</Field>
```

Zod: `z.enum(AU_STATES)` rejects `''`, so the placeholder option produces "Select your state or territory" via the enum `message`.

### `Controller` with `RadioGroup`

```tsx
<Controller
  control={control}
  name="gender"
  render={({ field, fieldState }) => (
    <RadioGroup
      label="Gender"
      radios={GENDER_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
      value={field.value ?? ''}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      isRequired
    />
  )}
/>
```

### `Controller` with `DatePicker` (store ISO strings, not `DateValue`)

```tsx
<Controller
  control={control}
  name="dateOfBirth"
  render={({ field, fieldState }) => (
    <Field label="Date of birth" errorMessage={fieldState.error?.message}>
      <DatePicker
        value={parseIsoDate(field.value)}
        onChange={date => field.onChange(date ? date.toString() : null)}
        onBlur={field.onBlur}
        isInvalid={fieldState.invalid}
        isRequired
        block
      />
    </Field>
  )}
/>
```

Keep serialisable primitives (`'YYYY-MM-DD'`) in form and store state; convert to `DateValue` at the component boundary.

### Field arrays (repeating groups)

```tsx
const { fields, append, remove } = useFieldArray({ control, name: 'children' });

fields.map((child, index) => (
  <Panel key={child.id} heading={`Child ${index + 1}`}>
    <Input {...register(`children.${index}.name`)} />
    <Button type="button" onClick={() => remove(index)}>
      Remove
    </Button>
  </Panel>
));
```

- RHF generates a stable `id` per row for React keys; do not add your own `id` to the row schema. If the row data already has an `id`, pass `keyName: 'key'` to avoid the clash.
- Validate array-level rules in the Zod schema with `superRefine`. `zodResolver` puts the message on `errors.children?.message` while the array is empty and on `errors.children?.root?.message` once any row is registered, so read `errors.children?.root?.message ?? errors.children?.message`.
- Rules that only apply when a sibling field has a value (children only when `hasChildren === 'yes'`) belong in the object-level `superRefine`; strip the irrelevant rows in a `.transform` so the saved output is clean.

### Conditional fields

Read only the field that drives the condition:

```tsx
const hasChildren = useWatch({ control, name: 'hasChildren' });
{
  hasChildren === 'yes' && <ChildrenFields />;
}
```

Model the conditional rule in Zod with a discriminated union or `superRefine`, never with `if` in the component.

## Performance

- `useWatch({ control, name })` for one value; `watch()` with no args re-renders the whole form component on every keystroke.
- `useFormState({ control, name })` for `isDirty`/`isSubmitting` in a child; destructuring `formState` at the top subscribes the top component.
- `FormProvider` + `useFormContext` is for deeply nested field components in **one** form. Consumers re-render on every form-state change; keep them small or pass `control` as a prop instead.
- `Controller` re-renders only the field it renders.
- Do not write form values into a Zustand store on change. Save on `handleSubmit`.

## Submission

```tsx
const onSubmit = form.handleSubmit(values => {
  saveAddress(values); // Zustand action
  completeStep(stepIndex);
  router.push(nextPath);
});

<form noValidate onSubmit={event => void onSubmit(event)}>
  …
</form>;
```

- `noValidate` so the browser does not pre-empt RHF messages.
- `handleSubmit` returns a promise; wrap it (`event => void onSubmit(event)`) so `@typescript-eslint/no-misused-promises` passes.
- After a failed submit RHF focuses the first invalid registered input (`shouldFocusError`, default `true`). For `Controller` fields pass `ref={field.ref}` where the component supports it, or call `setFocus`.
- Announce the error count in a polite live region on failed submit when the form is long.
- Disable the submit button while `isSubmitting`; never fire the same submission twice.

## Server Actions

Out of scope for this skill. Submit through `handleSubmit` to an API client or platform request helper.
