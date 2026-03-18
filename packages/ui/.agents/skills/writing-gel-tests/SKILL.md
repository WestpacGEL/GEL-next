---
name: writing-gel-tests
description: "Writes Vitest + React Testing Library tests for GEL design system components. Use when writing tests, adding tests, or improving test coverage for components in packages/ui."
---

# Writing GEL Component Tests

Guides writing tests for components in `packages/ui/src/components/`. Test conventions are also summarised in `packages/ui/.agents/AGENTS.md`.

## Test Environment

- **Runner**: Vitest with `jsdom` environment
- **Rendering**: `@testing-library/react` (`render`, `screen`, `waitFor`)
- **User Events**: `@testing-library/user-event` (`userEvent.setup()`)
- **Mocks**: `vi` from `vitest`
- **Matchers**: `@testing-library/jest-dom` (loaded via `vitest.setup.ts`)
- **Excluded from tests**: `*.styles.ts` files (excluded in vitest config)

### Pre-mocked Globals

Already mocked in `vitest.setup.ts` — do NOT re-mock:
- `window.scrollTo`
- `window.URL.createObjectURL` / `revokeObjectURL`
- `window.matchMedia`
- `ResizeObserver`

## Test File Structure

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { ComponentName } from './component-name.component.js';

describe('ComponentName', () => {
  const user = userEvent.setup();

  it('renders the component', () => {
    const { container } = render(<ComponentName />);
    expect(container).toBeInTheDocument();
  });
});
```

Import from `./component-name.component.js` (NOT from `index`), sub-components from `./components/index.js`, icons from `../icon/index.js`. Always use `.js` extensions.

## Test Categories

### 1. Render Tests (Required)

```tsx
it('renders the component', () => {
  const { container } = render(<ComponentName />);
  expect(container).toBeInTheDocument();
});
```

### 2. Variant Rendering

```tsx
it('renders as an anchor tag', () => {
  render(<Button tag="a" href="#">Link</Button>);
  expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument();
});
```

### 3. User Interactions

Always use `userEvent.setup()` (NOT `fireEvent`):

```tsx
it('calls onClick when clicked', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  act(() => {
    user.click(screen.getByRole('button', { name: 'Click me' }));
  });

  await waitFor(() => {
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 4. Visibility / State

```tsx
it('shows content when expanded', async () => {
  const { getByText } = render(
    <Accordion>
      <AccordionItem key="item1" id="item1" title="Title">
        Hidden content
      </AccordionItem>
    </Accordion>,
  );

  user.click(getByText('Title'));

  await waitFor(() => {
    expect(getByText('Hidden content')).toBeVisible();
  });
});
```

### 5. Icon Rendering

```tsx
it('renders an icon when passed', () => {
  render(<Button iconBefore={ArrowRightIcon} />);
  expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
});
```

### 6. Utility Functions

```tsx
describe('ComponentName utils', () => {
  it('maps correct values', () => {
    expect(utilFunction('input')).toBe('expected');
  });

  it('handles responsive values', () => {
    expect(utilFunction({ initial: 'small', md: 'large' }))
      .toStrictEqual({ initial: 'xsmall', md: 'small' });
  });
});
```

## Querying Elements

Prefer accessible queries:
1. `screen.getByRole('button', { name: 'Text' })` — interactive elements
2. `screen.getByText('Text')` — content assertions
3. `screen.getByLabelText('Label')` — form elements
4. `container.querySelector()` — last resort only

## Coverage Targets

```js
branches: 80,
functions: 80,
lines: 80,
statements: 80,
```

## Running Tests

```bash
pnpm vitest run src/components/{name}    # Specific component
pnpm vitest run                          # All tests
pnpm vitest src/components/{name}        # Watch mode
pnpm vitest run --coverage               # With coverage
```

## What NOT to Test

- Style files (`*.styles.ts`) — excluded in vitest config
- Tailwind class names — don't assert on specific CSS classes
- Internal implementation details — test behavior, not implementation
- Storybook stories — tested separately via Storybook
