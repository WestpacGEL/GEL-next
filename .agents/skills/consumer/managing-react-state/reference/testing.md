# Testing State

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
    store.getState().save('personal', validPersonal);
    store.getState().reset();
    expect(store.getState().personal).toBeNull();
  });

  it('ignores a second submit while submitting', async () => {
    const store = createApplyFormStore();
    const first = store.getState().submit();
    const second = store.getState().submit();
    await Promise.all([first, second]);
    expect(submitApplication).toHaveBeenCalledTimes(1);
  });
});
```

Use `vi.useFakeTimers()` for stores with timers; `vi.mock` the API module the store calls. Name the colocated test `apply-form.store.test.ts` to match `apply-form.store.ts`.

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
  expect(screen.getByText('Sydney')).toBeInTheDocument();
});
```

The provider's `store` prop (see zustand-patterns.md) exists for this; keep the context itself unexported. Returning `store` lets a test assert `store.getState()` after an interaction.

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

## What not to test

- Zustand or RHF internals (that a selector re-renders, that `register` sets a ref).
- The same rule twice: if the schema test covers a message, the component test only needs to assert the message appears.
