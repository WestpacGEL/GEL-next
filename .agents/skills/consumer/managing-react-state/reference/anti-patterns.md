# Anti-Patterns

Each entry: what it looks like, why it hurts, what to do instead.

Names such as `ApplyFormStore`, `Cart`, and `fetchAccounts` illustrate roles in the consuming application; they are not dependencies to locate. Use [zustand-patterns.md](zustand-patterns.md), [forms.md](forms.md), and [server-and-url-state.md](server-and-url-state.md) for the replacement patterns.

## Context as a high-churn store

```tsx
const [cart, setCart] = useState<Cart>(...);
<CartContext.Provider value={{ cart, setCart }}>
```

Every consumer re-renders on every change, and every consumer receives the whole object. Move to a Zustand store with selectors. Keep Context for theme, locale, session, and store delivery.

## `useReducer` + Context as the shared store

The React docs pattern is fine for one screen. Once several routes or unrelated subtrees read it, it has all of Context's re-render cost plus hand-written action typing, no devtools, no selectors, and no way to read outside React. Replace with a Zustand store; keep the reducer idea as flat actions.

## Module-level Zustand store in a Next.js journey

```ts
export const useApplyFormStore = create<ApplyFormStore>()(...); // at module scope, used by a wizard
```

Shared across server requests, never resets when the user leaves the journey, and breaks when initialised from server data. Use `createApplyFormStore()` in a provider mounted in the journey layout.

## Selecting the whole store

```tsx
const store = useApplyFormStore(s => s);
const { a, b } = useApplyFormStore(s => ({ a: s.a, b: s.b })); // no useShallow
```

Re-renders on every store change. Select primitives, or wrap object selectors in `useShallow`.

## Mirroring server data in a store

```ts
useEffect(() => {
  fetchAccounts().then(setAccounts);
}, []); // setAccounts is a Zustand action
```

Loses caching, revalidation, dedupe and error handling, and duplicates the source of truth. Read with SWR (or Server Components) and keep only UI state (selected id, filters) in the store.

## Writing form values to a store on every keystroke

```tsx
<Input onChange={e => store.setField('name', e.target.value)} />
```

Re-renders every subscriber per keystroke and bypasses RHF's dirty/touched tracking. Keep values in RHF; write to the store in `handleSubmit`.

## `watch()` with no arguments

Subscribes the form component to every field. Use `useWatch({ control, name })` for the one value you need.

## `FormProvider` across route steps

The provider unmounts on navigation; the data is gone. Route-based wizards use a store for saved step values and one `useForm` per step.

## Persisting sensitive data

`persist` without `partialize`, or `localStorage`, or a payment/identity field in the allow-list. Use `sessionStorage`, allow-list explicitly, clear on submit and sign-out.

## Deriving state in effects

```tsx
useEffect(() => setTotal(items.reduce(...)), [items]);
```

One extra render and two sources of truth. Compute during render or in the selector.

## One app-wide store

A single `useAppStore` with unrelated slices couples every feature, makes reset semantics ambiguous, and grows without bound. One store per feature/journey; slices only within a store that outgrows one file.

## Provider in the root layout by default

Every page pays for it and nothing resets. Mount providers at the smallest subtree that owns the state.

## Hand-rolled validation and error-visibility logic

Custom `useFieldErrors`, touched-set tracking, and rule arrays duplicate what RHF (`mode: 'onTouched'`, `shouldFocusError`) and Zod already provide. Delete them.
