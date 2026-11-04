# Multi-Step Wizards

The structure below illustrates a hypothetical `apply` journey. Adapt the routes, steps, and names to your project.

The examples below use explicit form-store names. Keep that naming consistent across the store,
provider, hooks, and tests; see [form store naming and ownership](forms.md#form-store-naming-and-ownership).

This is a suggested feature layout, not a directory to find or a required scaffold. Create only the parts the journey needs. The `Apply*` names below stand for your journey's own modules.

```text
src/app/apply/
├── layout.tsx                 # <ApplyFormStoreProvider><ApplyShell>{children}</ApplyShell></ApplyFormStoreProvider>
├── page.tsx                   # redirect(STEPS[0].path)
├── personal/page.tsx          # <PersonalStep />
├── address/page.tsx
├── payment/page.tsx
├── review/page.tsx
├── stores/
│   ├── apply-form.store.ts    # createApplyFormStore(): saved step values, furthestReached, submission, submit(), reset()
│   ├── apply-form-store-provider.tsx  # ApplyFormStoreProvider, useApplyFormStore(selector), useApplyFormStoreApi()
│   ├── steps.ts               # STEPS, StepId, stepIndex(), stepIndexForPath()
│   └── apply-form.store.test.ts  # headless store tests
├── _hooks/
│   ├── use-wizard.ts          # navigation only
│   └── use-step-form.ts       # useForm wiring + save-on-submit
├── _components/
│   ├── apply-shell.tsx        # progress indicator, heading, step guard
│   ├── step-form.tsx          # <form> chrome: Back/Next, live region
│   ├── fields.tsx             # TextField/SelectField (register or Controller field), RadioField/DateField (Controller)
│   ├── personal-step.tsx …    # one component per step
│   └── review-step.tsx
└── _validation/
    ├── personal.schema.ts …   # Zod schemas, inferred types, typed defaults, option lists
    ├── card.ts, dates.ts      # pure rules reused by the schemas
    └── *.test.ts              # schema.safeParse tests
```

## Responsibilities

| Concern                           | Owner                       |
| --------------------------------- | --------------------------- |
| Values while the user types       | React Hook Form (per step)  |
| Validation                        | Zod schema per step         |
| Saved values from completed steps | Journey store               |
| Furthest step reached, submission | Journey store               |
| Current step                      | The route (`usePathname()`) |
| Step order and paths              | Static `STEPS` array        |

## Contracts to implement in the consuming project

- **Store and provider:** use [zustand-patterns.md](zustand-patterns.md). For the generic `useStepForm` below, choose its `save(stepId, values)` variant. Define `ApplyFormValues` from each data step's schema output; derive `ApplyFormDataStepId` from its keys and give every data step a nullable saved-value slot. Review/confirmation pages have no slot. The shorter store example covers two data steps; add a slot and submission mapping for every additional step you actually use.
- **Schemas:** define each step's schema, inferred values, and input defaults as in [forms.md](forms.md#setup). Field names in the UI must exist in that schema. Option lists and validation messages belong to your domain.
- **Shell:** render children, a progress indicator, the current step title from `STEPS`, and the guard shown below. Use the project's components; no particular progress component is required.
- **`StepForm`:** accept `children`, RHF `control`, and `onSubmit`; render `<form noValidate>`, invoke the async handler with `event => void onSubmit(event)`, use `type="button"` for Back and `type="submit"` for Next, and read submission/error state with `useFormState`. Disable duplicate submissions and announce errors in a live region.
- **Field wrappers:** `TextField` and `SelectField` are optional local wrappers, not library exports. Follow [forms.md](forms.md#one-field-wrapper-for-both), forwarding the binding to the native control and rendering labels/errors. `SelectField` additionally renders options and an empty placeholder. Inline the library components if wrappers add no value.
- **Imports:** navigation hooks come from `next/navigation`; `useForm`, `FieldValues`, and `DefaultValues` from `react-hook-form`; `zodResolver` from `@hookform/resolvers/zod`; `z` from `zod`. Import the store hook, step definitions, schemas, and UI from the modules you implement above.

## Steps definition

```ts
export const STEPS = [
  { id: 'personal', path: '/apply/personal', title: 'Personal information' },
  { id: 'address', path: '/apply/address', title: 'Address' },
  { id: 'payment', path: '/apply/payment', title: 'Payment details' },
  { id: 'review', path: '/apply/review', title: 'Review and submit' },
] as const;

export type StepId = (typeof STEPS)[number]['id'];
export const stepIndex = (id: StepId) => STEPS.findIndex(s => s.id === id);
export const stepIndexForPath = (pathname: string) =>
  STEPS.findIndex(s => pathname === s.path || pathname.startsWith(`${s.path}/`));
```

## `useWizard()` — navigation only

```ts
export function useWizard() {
  const pathname = usePathname();
  const router = useRouter();
  const furthestReached = useApplyFormStore(s => s.furthestReached);
  const currentIndex = stepIndexForPath(pathname);

  return {
    steps: STEPS,
    stepIndex: currentIndex,
    currentStep: currentIndex >= 0 ? STEPS[currentIndex] : undefined, // undefined off the step routes (e.g. /apply index)
    totalSteps: STEPS.length,
    isFirst: currentIndex === 0,
    isLast: currentIndex === STEPS.length - 1,
    canVisit: (index: number) => index <= furthestReached,
    goNext: () => router.push(STEPS[Math.min(currentIndex + 1, STEPS.length - 1)].path),
    goBack: () => router.push(STEPS[Math.max(currentIndex - 1, 0)].path),
    goTo: (id: StepId) => router.push(STEPS[stepIndex(id)].path),
  };
}
```

It deliberately does not return form data. Steps select their own slice from the store so the review page and each step subscribe only to what they render.

## `useStepForm(stepId)` — form wiring + save on submit

```ts
export function useStepForm<K extends ApplyFormDataStepId, TInput extends FieldValues>(
  stepId: K,
  schema: z.ZodType<ApplyFormValues[K], TInput>, // output type is what the store saves
  defaults: NoInfer<DefaultValues<TInput>>, // NoInfer (TS ≥ 5.4): infer TInput from the schema, not the partial defaults
) {
  const saved = useApplyFormStore(s => s[stepId]);
  const save = useApplyFormStore(s => s.save); // save(stepId, values)
  const completeStep = useApplyFormStore(s => s.completeStep);
  const { goNext, stepIndex } = useWizard();

  const form = useForm<TInput, unknown, ApplyFormValues[K]>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: (saved ?? defaults) as DefaultValues<TInput>,
  });

  const onSubmit = form.handleSubmit(values => {
    save(stepId, values);
    completeStep(stepIndex);
    goNext();
  });

  return { form, onSubmit };
}
```

Each step becomes:

```tsx
export function AddressStep() {
  const { form, onSubmit } = useStepForm('address', addressSchema, addressDefaults);
  const {
    register,
    control,
    formState: { errors },
  } = form;
  return (
    <StepForm control={control} onSubmit={onSubmit}>
      <TextField label="Street name" field={register('streetName')} error={errors.streetName?.message} />
      <SelectField
        label="State / Territory"
        field={register('state')}
        options={AU_STATES}
        error={errors.state?.message}
      />
      …
    </StepForm>
  );
}
```

`StepForm` takes `control` so it can read `errors`/`submitCount` through `useFormState` for the live region without re-rendering the step on every keystroke, and uses `useWizard()` for Back/Next.

Back never validates and never saves: unsaved edits on the current step are discarded, saved values from the previous submit remain.

## Step guard (in the shell)

```tsx
const furthestReached = useApplyFormStore(s => s.furthestReached);
const current = stepIndexForPath(pathname);
const isReachable = current <= furthestReached;

useEffect(() => {
  if (current >= 0 && !isReachable) router.replace(STEPS[furthestReached].path);
}, [current, isReachable, furthestReached, router]);

if (current >= 0 && !isReachable) return null;
```

With persistence, `furthestReached` must not point past a step whose data was not persisted. Either persist `furthestReached` together with every step's data that precedes it, or derive reachability as "first step with `null` saved values".

## Review and submit

```tsx
const personal = useApplyFormStore(s => s.personal);
const address = useApplyFormStore(s => s.address);
const submission = useApplyFormStore(s => s.submission);
const submit = useApplyFormStore(s => s.submit);
const reset = useApplyFormStore(s => s.reset);
```

On `submission.status === 'success'`: move focus to the confirmation, show the reference, and offer "Start again" which calls `reset()` then navigates to the first step.

## Reset semantics

| Event               | Behaviour                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Back                | Navigate only. Nothing cleared.                                                                                                                     |
| Restart / Cancel    | `reset()` then navigate to step 1.                                                                                                                  |
| Submit success      | Show confirmation from the result, then `reset()` (+ `persist.clearStorage()`).                                                                     |
| Sign-out            | `reset()` every journey store.                                                                                                                      |
| Hard refresh        | Without persist: start over (provider re-creates the store). With persist: restore allow-listed fields, guard redirects to the furthest valid step. |
| Leaving the journey | Provider unmounts, store is garbage-collected. Persisted data stays for the tab.                                                                    |

## Single-page wizards

If every step renders inside one page (no route change), one `useForm` for the whole wizard with `FormProvider` is acceptable: steps call `trigger(stepFieldNames)` on Next and the store is not needed until submit. Prefer the route-per-step pattern for anything with more than two steps, deep links, or a review page.
