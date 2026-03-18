---
name: creating-gel-component
description: "Scaffolds a new GEL design system UI component following project conventions. Use when creating a new component, adding a component, or scaffolding a component in packages/ui."
---

# Creating a GEL Component

Scaffolds a new React component in `packages/ui/src/components/`. All conventions (file naming, imports, patterns) are defined in the `packages/ui/.agents/AGENTS.md` — follow those automatically.

## Step-by-Step Workflow

### 1. Create the types file (`{name}.types.ts`)

```tsx
import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from '../../types/responsive-variants.types.js';

import { styles } from './{kebab-case-name}.styles.js';

type Variants = VariantProps<typeof styles>;

export type {PascalName}Props = {
  /**
   * Description of variant prop
   * @default defaultValue
   */
  variantProp?: ResponsiveVariants<Variants['variantProp']>;
} & HTMLAttributes<HTMLElement>;
```

### 2. Create the styles file (`{name}.styles.ts`)

```ts
import { tv } from 'tailwind-variants';

export const styles = tv({
  base: '',
  variants: {},
});
```

### 3. Create the component file (`{name}.component.tsx`)

```tsx
'use client';

import React, { forwardRef, Ref } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';

import { styles as componentStyles } from './{kebab-case-name}.styles.js';
import { type {PascalName}Props } from './{kebab-case-name}.types.js';

function Base{PascalName}(
  { className, variant = 'default', ...props }: {PascalName}Props,
  ref: Ref<HTMLDivElement>,
) {
  const breakpoint = useBreakpoint();
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <div
      ref={ref}
      className={componentStyles({
        className,
        variant: resolveResponsiveVariant(variant, breakpoint),
        isFocusVisible,
      })}
      {...mergeProps(props, focusProps)}
    />
  );
}

export const {PascalName} = forwardRef(Base{PascalName});
```

### 4. Create the index file (`index.ts`)

```ts
export { {PascalName} } from './{kebab-case-name}.component.js';
export { type {PascalName}Props } from './{kebab-case-name}.types.js';
```

### 5. Create the test file (`{name}.spec.tsx`)

```tsx
import { render } from '@testing-library/react';

import { {PascalName} } from './{kebab-case-name}.component.js';

describe('{PascalName}', () => {
  it('renders the component', () => {
    const { container } = render(<{PascalName} />);
    expect(container).toBeInTheDocument();
  });
});
```

See the `writing-gel-tests` skill for comprehensive testing guidance.

### 6. Create the stories file (`{name}.stories.tsx`)

```tsx
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { {PascalName} } from './{kebab-case-name}.component.js';

const meta: Meta<typeof {PascalName}> = {
  title: 'Components/{PascalName}',
  component: {PascalName},
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {},
};
```

Interactive stories using `useState` can be defined as function components:

```tsx
export const Example = () => {
  const [state, setState] = useState(initialValue);

  return <Component prop={state} onChange={setState} />;
};
```

### 7. Register the component

Add the export to `packages/ui/src/components/index.ts`:

```ts
export * from './{kebab-case-name}/index.js';
```

### 8. Verify

Run these commands from `packages/ui/`:
- `pnpm vitest run src/components/{kebab-case-name}` — Run tests
- `pnpm build` — Verify build
