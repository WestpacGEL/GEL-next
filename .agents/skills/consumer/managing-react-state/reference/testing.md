# Testing State

## Set up tests in the consuming project

Examples use Vitest, Testing Library, and `user-event`; adapt to the project's installed test runner. Import the store/provider from the implementation built with [zustand-patterns.md](zustand-patterns.md), schemas from the feature's validation modules, and UI from its step components. `ApplyForm`, `ReviewStep`, and `AddressStep` are example names, not modules distributed with this skill.

Define `validPersonal` and `validAddress` as local fixtures satisfying the actual step schemas. For the address schema in [forms.md](forms.md#setup), a valid fixture is `{ streetName: 'Example Street', state: 'NSW', postcode: '2000' }`. Match saved-value assertions to fields the component actually displays; never import fixtures from a separate application.

## Zustand stores: headless

Because stores are factories, tests never touch React or shared module state.

```ts
import { describe, expect, it } from 'vitest';

import { createApplyFormStore } from './apply-form.store';

describe('apply form store', () => {
  it('advances furthestReached only forwards', () => {
    const store = createApplyFormStore();
    store.getState().completeStep(2);
    store.getState().completeStep(0);
    expect(store.getState().furthestReached).toBe(3);
  });

  it('reset returns to the initial state', () => {
    const store = createApplyFormStore();
    store.getState().savePersonal(validPersonal);
    store.getState().reset();
    expect(store.getState().personal).toBeNull();
  });
});
```

Use `vi.useFakeTimers()` for stores with timers; `vi.mock` the API module the store calls. Name the colocated test `apply-form.store.test.ts` to match `apply-form.store.ts`.

If the store uses the generic save variant, replace `savePersonal(values)` with `save('personal', values)`.

For duplicate-submit coverage, seed **all required step values**, mock the actual submission API with a promise you control, and call `submit()` twice before resolving it. Assert that only one request starts, then resolve it and assert the final submission result. An empty store only exercises the missing-data guard. Also cover rejection and retry for the failure behavior implemented by the project.

## Zod schemas: direct

```ts
it('rejects a 3-digit postcode with the human message', () => {
  const result = addressSchema.safeParse({ ...validAddress, postcode: '200' });
  expect(result.success).toBe(false);
  expect(result.error?.issues[0]).toMatchObject({ path: ['postcode'], message: 'Enter a postcode with 4 digits' });
});
```

## Components that read a store: render with a fresh store

```tsx
function renderWithStore(ui: ReactNode, initial?: Partial<ApplyFormState>) {
  const store = createApplyFormStore({ ...initialApplyFormState, ...initial });
  return { store, ...render(<ApplyFormStoreProvider store={store}>{ui}</ApplyFormStoreProvider>) };
}

it('shows saved address on the review step', () => {
  renderWithStore(<ReviewStep />, { address: validAddress, furthestReached: 3 });
  expect(screen.getByText('Example Street')).toBeInTheDocument();
});
```

The provider's `store` prop (see [zustand-patterns.md](zustand-patterns.md)) exists for this; keep the context itself unexported. Returning `store` lets a test assert `store.getState()` after an interaction. Seed every step required by the real review page and set progress to its actual index; `3` is only the four-step example's review index.

## Forms: Testing Library + user-event

```tsx
it('shows the error after blur and clears it after a fix', async () => {
  const user = userEvent.setup();
  renderWithStore(<AddressStep />);
  const postcode = screen.getByRole('textbox', { name: 'Postcode' });

  await user.type(postcode, '200');
  await user.tab();
  expect(await screen.findByText('Enter a postcode with 4 digits')).toBeInTheDocument();

  await user.type(postcode, '0');
  await waitFor(() => expect(screen.queryByText('Enter a postcode with 4 digits')).not.toBeInTheDocument());
});
```

- RHF validates asynchronously: use `findBy*`/`waitFor` after interactions; do not wrap `render` in `act`.
- Query by role and label, not test ids.
- Mock `next/navigation` (`useRouter`, `usePathname`) in step tests; assert `push` was called with the next path after a valid submit.

## Journey behavior to verify

- Valid Next saves parsed values and advances; invalid Next shows errors without advancing.
- Back preserves previously saved values and discards unsaved edits under the documented save-on-submit policy.
- A direct link beyond the reachable step redirects; an already completed step remains reachable.
- Restart/Cancel, submit success, and sign-out follow the reset policy, including clearing persisted data when enabled.
- Without persistence, a refresh starts over. With persistence, only allow-listed fields return and reachability is recomputed from valid restored data.

## What not to test

- Zustand or RHF internals (that a selector re-renders, that `register` sets a ref).
- The same rule twice: if the schema test covers a message, the component test only needs to assert the message appears.
