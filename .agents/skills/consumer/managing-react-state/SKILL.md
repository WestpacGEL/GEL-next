---
name: managing-react-state
description: 'Chooses and implements state management for React and Next.js App Router applications: local state, React Hook Form + Zod, URL state, SWR for server data, React Context for static values, and Zustand v5 stores for shared client state and multi-step wizards. Use when adding or reviewing state, forms, wizards, providers, or stores, or when asked whether to use Zustand, Context, useReducer, or React Hook Form.'
---

# Managing React State

Pick the narrowest owner for each piece of state. Rank by **who reads it** and **how often it changes**; reach for a heavier tool only when the lighter one causes real re-render or coupling problems.

## Check Versions First

Read the project's `package.json` before writing code. The examples in this skill target `zustand@^5`, `zod@^4`, `@hookform/resolvers@^5`, `react-hook-form@^7.5x`, `swr@^2` and TypeScript ≥ 5.4. Adjust when the project differs:

| Installed                | Difference from the examples                                                                                                                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `zustand@4.4+`           | Same API: `useShallow` from `zustand/react/shallow`, curried `create<T>()()`. Only the deprecated default export is gone in v5. Below 4.4, use `shallow` as the equality fn. |
| `zod@3`                  | Enum/type messages use `{ message: '…' }`, not `{ error: '…' }`. `superRefine`/`addIssue` are the same.                                                                      |
| `@hookform/resolvers@<5` | `zodResolver` does not infer input/output types; type `useForm<z.input<S>, unknown, z.output<S>>` yourself and cast the resolver if needed.                                  |
| TypeScript `<5.4`        | `NoInfer` is unavailable; drop it from `useStepForm` and pass the explicit generic at the call site.                                                                         |

Do not add a library the project does not already have (for example `nuqs`, `immer`, `swr`) without saying so.

## Decision Order

Walk this list top to bottom and stop at the first match.

| #   | The state is…                                                                  | Use                                                                  |
| --- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| 1   | Computable from other state or props                                           | Derive during render. Do not store it.                               |
| 2   | Read by one component or a small subtree                                       | `useState`; `useReducer` when transitions are many or interdependent |
| 3   | Values a user types into a form                                                | React Hook Form + Zod (`mode: 'onTouched'`)                          |
| 4   | Navigable or shareable (tab, filter, page, current wizard step)                | Route segment or `useSearchParams`                                   |
| 5   | Owned by the server (API data)                                                 | Server Components, or SWR on the client. Never copy into a store.    |
| 6   | Shared, **rarely changes** (theme, locale, brand, auth session, feature flags) | React Context                                                        |
| 7   | Shared, **changes often** or has complex structure, read by unrelated subtrees | Zustand store (one per feature/journey)                              |

Rules of thumb:

- Context is for distribution, not for churn. If a Context value changes on user interaction (typing, toggling, adding to a cart) and more than a couple of components consume it, move it to Zustand.
- Zustand is for shared client state only. Form values stay in React Hook Form until the step is submitted; API responses stay in SWR.
- `useReducer` is fine for complex **local** state. It is not the mechanism for shared state; wrapping a reducer in Context to share it is the pattern this skill replaces.
- Context is still how a Zustand store instance is delivered to a subtree when the store has a lifecycle (see below).

## Zustand (v5)

Write every store as a **factory** so it is testable and resettable, one store per feature or journey, never one app-wide store.

```ts
// src/app/apply/stores/apply-form.store.ts
import { createStore } from 'zustand/vanilla';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

export type ApplyFormState = { personal: PersonalValues | null; furthestReached: number };
export type ApplyFormActions = {
  savePersonal: (values: PersonalValues) => void;
  completeStep: (index: number) => void;
  reset: () => void;
};
export type ApplyFormStore = ApplyFormState & ApplyFormActions;

export const initialApplyFormState: ApplyFormState = { personal: null, furthestReached: 0 };

export const createApplyFormStore = (initial: ApplyFormState = initialApplyFormState) =>
  createStore<ApplyFormStore>()(
    devtools(
      set => ({
        ...initial,
        savePersonal: personal => set({ personal }, undefined, 'apply/savePersonal'),
        completeStep: index =>
          set(
            state => ({ furthestReached: Math.max(state.furthestReached, index + 1) }),
            undefined,
            'apply/completeStep',
          ),
        reset: () => set(initial, undefined, 'apply/reset'),
      }),
      { name: 'apply', enabled: process.env.NODE_ENV !== 'production' },
    ),
  );
```

Conventions:

- **Location and naming:** for a form-backed journey, use `src/app/<journey>/stores/<journey>-form.store.ts` and `<journey>-form-store-provider.tsx`, factory `create<Journey>FormStore`, hook `use<Journey>FormStore`, provider `<Journey>FormStoreProvider`. Use kebab-case for the subject and `.store.ts` for the role, not `<journey>.form.store.ts`. Non-form stores keep their domain name, such as `sidebar.store.ts` / `SidebarStore`.
- **Form store types:** use `<Journey>FormValues`, `<Journey>FormState`, `<Journey>FormActions`, `<Journey>FormStore`, and `<Journey>FormStoreApi`; initial state is `initial<Journey>FormState`. Prefix exported supporting types too, such as `ApplyFormDataStepId` and `ApplyFormSubmission`. See [reference/forms.md](reference/forms.md#form-store-naming-and-ownership).
- **Actions** are flat functions colocated in the store, typed as `State & Actions`. Components never call `setState` directly.
- **Every journey store has `reset()`.**
- **Always select.** `useStore(s => s.personal)`, never `useStore()`. Select objects/arrays through `useShallow` from `zustand/react/shallow`. Select actions individually; they are stable.
- **Slices** only when a single store outgrows one file; combine slices in the factory and apply middleware to the combined store only.
- **Middleware:** `devtools` with `enabled: process.env.NODE_ENV !== 'production'`; `immer` allowed for deep updates; `persist` is **off by default** (see Persistence).
- **Deliver the store** as a module-level instance (`create` from `'zustand'`) only for app-wide UI state with no lifecycle (sidebar open, theme). Deliver it through a Context provider when the store belongs to a journey, is initialised from props/server data, or uses `persist`. The provider accepts an optional `initialState` (server data) and `store` (tests). Next.js App Router requires the provider form for anything rendered on the server; RSCs never read or write a store.

See [reference/zustand-patterns.md](reference/zustand-patterns.md) for the provider, hook, slices, `useShallow`, and immer templates.

## React Hook Form + Zod

- One `useForm` per form (per wizard step). `resolver: zodResolver(schema)`, `mode: 'onTouched'`, `defaultValues` from the store or server data.
- Infer types from the schema (`z.infer<typeof schema>`, or `z.input`/`z.output` when the schema transforms); do not redeclare them. Export typed `DefaultValues` next to the schema.
- Use `register` only for `@westpac/ui` components that forward a ref to a native input: `Input`, `Textarea`, `Select`. Use `Controller` for react-aria value components: `RadioGroup`, `CheckboxGroup`, `Switch`, `DatePicker`, `MultiSelect`, `PassCode`, `Selector`, `Autocomplete` — and for an `Input` whose displayed text is a formatted view of the stored value.
- Read individual values with `useWatch({ control, name })` and status with `useFormState({ control })`; never `watch()` the whole form in render.
- Use `FormProvider`/`useFormContext` only inside one mounted form tree (deeply nested field components). It does not carry data across route-based wizard steps, and it re-renders consumers on every form-state change.
- On submit, `handleSubmit` receives parsed, typed values: write them to the store or send them; do not sync form values into a store on every keystroke.

See [reference/forms.md](reference/forms.md) for the field-component matrix and templates.

## Multi-Step Wizards

Follow the React Hook Form funnel recommendation: **one form per step page, one Zustand store per journey.**

- Route per step (`/apply/personal`, `/apply/address`, …). Step order is a static `STEPS` array.
- The form journey store holds each step's saved values, `furthestReached`, and submission status. It is delivered by a `<Journey>FormStoreProvider` in the journey `layout.tsx`; React Hook Form still owns active inputs and validation.
- Each step: `useStepForm(stepId)` wires `useForm` (schema, `onTouched`, `defaultValues` from the store) and an `onSubmit` that saves to the store, marks the step complete, and navigates to the next step.
- `useWizard()` exposes navigation only: `{ steps, currentStep, stepIndex, totalSteps, isFirst, isLast, goNext, goBack, goTo, canVisit }`. It does not expose form data; steps select what they need from the store.
- A step guard in the shell redirects deep links to a step beyond `furthestReached` back to the furthest reachable step.
- The review step reads the store with selectors and calls `submit()`; on success show the result, then `reset()`.

Reset semantics: Back never clears data. Restart/Cancel and Sign-out call `reset()`. Submit success shows the confirmation, then `reset()` (and `persist.clearStorage()` if persisted). Hard refresh restores only persisted, non-sensitive fields; the guard sends the user to the furthest step whose data is still valid.

See [reference/wizard.md](reference/wizard.md) for the full pattern and the reference implementation in `apps/test-app/src/app/apply`.

## Persistence

Off by default. Enable `persist` only when the journey must survive a refresh, and then:

- `storage: createJSONStorage(() => sessionStorage)` (per tab, cleared on close). Not `localStorage`.
- `partialize` as an **allow-list** of fields. Never persist: card numbers, CVV, expiry, passwords, PINs, OTPs, tokens, identity-document numbers, account numbers, or the combination name + date of birth + address. Rule: persist only what the user would be comfortable seeing pre-filled on a shared computer.
- Name the storage key per journey (`apply-store`), version it, and clear it on submit success and sign-out.
- Because the store rehydrates on the client, deliver it through a provider and handle hydration explicitly (`skipHydration` + `persist.rehydrate()` in an effect, or gate rendering on a hydrated flag).

## React Context

Use for static or rarely changing shared values and for delivering store instances.

- `createContext<T | null>(null)` plus a `useX()` hook that throws outside the provider.
- Memoise the value; split state and dispatch into two contexts when both are provided so readers of one do not re-render on the other.
- Mount the provider at the smallest subtree that owns the value, not the root layout by default.

## Server and URL State

- Server-owned data: fetch in Server Components where possible; otherwise SWR with explicit revalidation settings. Zustand never mirrors API responses; components read SWR and select from the store separately.
- Pass server-fetched data to a client component as `fallbackData` for the same SWR key rather than through a store or Context.
- Mutations go through `useSWRMutation` (or `mutate` after a request); use `optimisticData` + `rollbackOnError` only for low-risk UI, never for financial submissions.
- Navigable state (current tab, filter, pagination, current wizard step) lives in the route or `useSearchParams`. Write it with `router.replace` and a new `URLSearchParams`; wrap any component that calls `useSearchParams` in `<Suspense>` so static routes still prerender. Do not put form progress data in the URL.

See [reference/server-and-url-state.md](reference/server-and-url-state.md) for the SWR and search-params templates.

## Testing

- Stores: instantiate `createXStore()` in the test, call actions, assert `getState()`. No React needed.
- Forms: Testing Library + `user-event`, assert on roles and error messages, await `findBy*` after submit (RHF validates asynchronously).
- Components that read a store: render inside the provider with a fresh store via its `store` prop; expose a `renderWithStore` helper.

See [reference/testing.md](reference/testing.md).

## Anti-Patterns

See [reference/anti-patterns.md](reference/anti-patterns.md). The most common: Context for high-churn state, `useReducer` + Context as a shared store, module-level Zustand store in a Next.js journey, selecting the whole store, mirroring server data in a store, writing form values to a store on every keystroke, persisting sensitive fields.

## Related Skills

- `vercel-react-best-practices` — render and re-render rules that apply on top of this skill.
- `using-westpac-ui` — component APIs used in the form examples.
- `using-wnext-ui` — WNeXT application conventions; its state section follows the same order as this skill. Internal to Westpac and not distributed with the GEL consumer skills; use it only if it is installed.
