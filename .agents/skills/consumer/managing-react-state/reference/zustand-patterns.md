# Zustand v5 Patterns

All examples target `zustand@^5`. Imports differ from v4: no default export, `useShallow` lives in `zustand/react/shallow`, and TypeScript stores use the curried form `create<T>()(...)` / `createStore<T>()(...)`.

## Store factory (vanilla) + provider + typed hook

Use this shape for any store with a lifecycle: a journey, a feature that mounts and unmounts, a store initialised from props or server data, or any store that uses `persist`.

For form-backed journeys, use the `<Journey>Form` prefix consistently; non-form stores retain
their domain name. See [form store naming and ownership](forms.md#form-store-naming-and-ownership).

```ts
// src/app/apply/stores/apply-form.store.ts
import { devtools } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export type ApplyFormState = {
  personal: PersonalValues | null;
  address: AddressValues | null;
  furthestReached: number;
  submission: { status: 'idle' } | { status: 'submitting' } | { status: 'success'; reference: string };
};

export type ApplyFormActions = {
  savePersonal: (values: PersonalValues) => void;
  saveAddress: (values: AddressValues) => void;
  completeStep: (index: number) => void;
  submit: () => Promise<void>;
  reset: () => void;
};

export type ApplyFormStore = ApplyFormState & ApplyFormActions;

export const initialApplyFormState: ApplyFormState = {
  personal: null,
  address: null,
  furthestReached: 0,
  submission: { status: 'idle' },
};

export function createApplyFormStore(initial: ApplyFormState = initialApplyFormState) {
  return createStore<ApplyFormStore>()(
    devtools(
      (set, get) => ({
        ...initial,
        savePersonal: personal => set({ personal }, undefined, 'apply/savePersonal'),
        saveAddress: address => set({ address }, undefined, 'apply/saveAddress'),
        completeStep: index =>
          set(
            state => ({ furthestReached: Math.max(state.furthestReached, index + 1) }),
            undefined,
            'apply/completeStep',
          ),
        submit: async () => {
          const { submission, personal, address } = get();
          if (submission.status === 'submitting' || !personal || !address) return;
          set({ submission: { status: 'submitting' } }, undefined, 'apply/submit');
          const reference = await submitApplication({ personal, address }); // data only, never the whole store
          set({ submission: { status: 'success', reference } }, undefined, 'apply/submitSuccess');
        },
        reset: () => set(initial, undefined, 'apply/reset'),
      }),
      { name: 'apply', enabled: process.env.NODE_ENV !== 'production' },
    ),
  );
}

export type ApplyFormStoreApi = ReturnType<typeof createApplyFormStore>;
```

When every step saves the same way, one typed action replaces the per-step ones — this is what the reference implementation does:

```ts
export type ApplyFormValues = { personal: PersonalValues; address: AddressValues; payment: PaymentValues };
export type ApplyFormDataStepId = keyof ApplyFormValues;

save: <K extends ApplyFormDataStepId>(step: K, values: ApplyFormValues[K]) => void;
// …
save: (step, values) => set({ [step]: values } as Partial<ApplyFormState>, undefined, `apply/save:${step}`),
```

Use per-step actions when steps need different side effects; use the generic `save` when they do not.

```tsx
// src/app/apply/stores/apply-form-store-provider.tsx
'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';
import { useStore } from 'zustand';

import {
  type ApplyFormState,
  type ApplyFormStore,
  type ApplyFormStoreApi,
  createApplyFormStore,
  initialApplyFormState,
} from './apply-form.store';

const ApplyFormStoreContext = createContext<ApplyFormStoreApi | null>(null);

type ApplyFormStoreProviderProps = {
  children: ReactNode;
  /** Seed from server data (a Server Component layout/page passes it down). Read once on mount. */
  initialState?: Partial<ApplyFormState>;
  /** Inject a pre-built store; for tests and Storybook only. */
  store?: ApplyFormStoreApi;
};

export function ApplyFormStoreProvider({ children, initialState, store: injected }: ApplyFormStoreProviderProps) {
  // useState initialiser: created once per provider mount, never shared across requests.
  const [store] = useState(() => injected ?? createApplyFormStore({ ...initialApplyFormState, ...initialState }));
  return <ApplyFormStoreContext.Provider value={store}>{children}</ApplyFormStoreContext.Provider>;
}

export function useApplyFormStore<T>(selector: (state: ApplyFormStore) => T): T {
  const store = useContext(ApplyFormStoreContext);
  if (!store) throw new Error('useApplyFormStore must be used within ApplyFormStoreProvider');
  return useStore(store, selector);
}

/** For imperative access in event handlers (getState/setState) without subscribing. */
export function useApplyFormStoreApi(): ApplyFormStoreApi {
  const store = useContext(ApplyFormStoreContext);
  if (!store) throw new Error('useApplyFormStoreApi must be used within ApplyFormStoreProvider');
  return store;
}
```

Mount the provider in the journey layout, not the root layout. A Server Component may seed it:

```tsx
// src/app/apply/layout.tsx (Server Component)
import { ApplyFormStoreProvider } from './stores/apply-form-store-provider';

export default async function ApplyLayout({ children }: { children: ReactNode }) {
  const draft = await getSavedDraft(); // optional; omit initialState when there is nothing to seed
  return (
    <ApplyFormStoreProvider initialState={draft ? { personal: draft.personal } : undefined}>
      {children}
    </ApplyFormStoreProvider>
  );
}
```

`initialState` is read once by the `useState` initialiser; changing the prop later does not update the store. If the seed can change while the provider stays mounted, dispatch an action from a `useEffect` instead.

## Module-level store (app-wide UI state only)

Acceptable when the state is client-only, has no lifecycle, is never initialised from server data, and is not persisted. Still write it as a factory so tests can create fresh instances; export the single app instance next to it.

```ts
// src/stores/sidebar.store.ts
import { create } from 'zustand';

type SidebarStore = { open: boolean; setOpen: (open: boolean) => void; toggle: () => void };

export const createSidebarStore = () =>
  create<SidebarStore>()(set => ({
    open: false,
    setOpen: open => set({ open }),
    toggle: () => set(state => ({ open: !state.open })),
  }));

/** App-wide instance. Tests call `createSidebarStore()` for a fresh one. */
export const useSidebarStore = createSidebarStore();
```

## Selecting

```tsx
import { useShallow } from 'zustand/react/shallow';

// Primitive: plain selector.
const furthestReached = useApplyFormStore(s => s.furthestReached);

// Action: stable reference, select individually.
const savePersonal = useApplyFormStore(s => s.savePersonal);

// Object or array built in the selector: wrap in useShallow or it re-renders every store change.
const { personal, address } = useApplyFormStore(useShallow(s => ({ personal: s.personal, address: s.address })));
const childNames = useApplyFormStore(useShallow(s => s.personal?.children.map(c => c.name) ?? []));

// Derived boolean: subscribe to the boolean, not the raw value.
const isSubmitting = useApplyFormStore(s => s.submission.status === 'submitting');
```

Never:

```tsx
const store = useApplyFormStore(s => s); // whole store: re-renders on every change
const { a, b } = useApplyFormStore(s => ({ a: s.a, b: s.b })); // new object each render without useShallow
```

## Slices (only when one store outgrows one file)

```ts
import { type StateCreator } from 'zustand';

type ProgressSlice = { furthestReached: number; completeStep: (i: number) => void };
type DataSlice = { personal: PersonalValues | null; savePersonal: (v: PersonalValues) => void };
type ApplyFormStore = ProgressSlice & DataSlice & { reset: () => void };

const createProgressSlice: StateCreator<ApplyFormStore, [['zustand/devtools', never]], [], ProgressSlice> = set => ({
  furthestReached: 0,
  completeStep: i =>
    set(s => ({ furthestReached: Math.max(s.furthestReached, i + 1) }), undefined, 'apply/completeStep'),
});

const createDataSlice: StateCreator<ApplyFormStore, [['zustand/devtools', never]], [], DataSlice> = set => ({
  personal: null,
  savePersonal: personal => set({ personal }, undefined, 'apply/savePersonal'),
});

export const createApplyFormStore = () =>
  createStore<ApplyFormStore>()(
    devtools(
      (...a) => ({
        ...createProgressSlice(...a),
        ...createDataSlice(...a),
        reset: () => a[0]({ furthestReached: 0, personal: null }, undefined, 'apply/reset'),
      }),
      { name: 'apply', enabled: process.env.NODE_ENV !== 'production' },
    ),
  );
```

Apply middleware to the combined store only, never inside a slice.

## Immer (deep updates)

```ts
import { immer } from 'zustand/middleware/immer';

createStore<ApplyFormStore>()(
  devtools(
    immer(set => ({
      ...initial,
      renameChild: (id, name) =>
        set(state => {
          const child = state.personal?.children.find(c => c.id === id);
          if (child) child.name = name;
        }),
    })),
    { name: 'apply', enabled: process.env.NODE_ENV !== 'production' },
  ),
);
```

Prefer plain spreads for one or two levels; use immer when updates are three levels deep or touch arrays of objects.

## Persist (opt-in; sessionStorage; allow-list)

```ts
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export function createApplyFormStore(initial = initialApplyFormState) {
  return createStore<ApplyFormStore>()(
    devtools(
      persist(set => ({ ...initial /* actions */ }), {
        name: 'apply-store',
        version: 1,
        storage: createJSONStorage(() => sessionStorage),
        // Allow-list. Payment/identity fields are deliberately absent.
        partialize: state => ({ address: state.address, furthestReached: state.furthestReached }),
        skipHydration: true, // rehydrate on the client after mount to avoid SSR mismatch
      }),
      { name: 'apply', enabled: process.env.NODE_ENV !== 'production' },
    ),
  );
}
```

```tsx
// In the provider
const [store] = useState(createApplyFormStore);
useEffect(() => {
  void store.persist.rehydrate();
}, [store]);
```

Clear on submit success and sign-out: `store.persist.clearStorage()` after `reset()`.

If `furthestReached` is persisted but some step data is not, the step guard must recompute reachability from the data that survived (see wizard.md), or persist only `furthestReached` for steps whose data is also persisted.

## Reading outside React

```ts
const store = useApplyFormStoreApi();
const onClick = () => {
  const { personal } = store.getState(); // no subscription, no re-render
};
```

## Type-safe reset for multiple stores (sign-out)

```ts
// src/stores/reset-registry.ts
const resetters = new Set<() => void>();

/** Returns the unregister fn; call it on unmount or the registry keeps a dead store alive. */
export const registerReset = (fn: () => void) => {
  resetters.add(fn);
  return () => {
    resetters.delete(fn);
  };
};
export const resetAllStores = () => resetters.forEach(fn => fn());
```

```tsx
// In each journey provider
useEffect(() => registerReset(() => store.getState().reset()), [store]);
```

Call `resetAllStores()` on sign-out. Module-level stores (sidebar) register once at module scope and never unregister.
