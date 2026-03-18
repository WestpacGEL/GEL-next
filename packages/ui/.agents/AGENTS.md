# @westpac/ui Component Conventions

These conventions apply to all code in `packages/ui/`. Follow them when creating, modifying, or reviewing components.

## File Structure

Every component lives in `src/components/{kebab-case-name}/` with these files:

- `index.ts` — Public exports (component + props type only, NOT styles)
- `{name}.component.tsx` — Component implementation
- `{name}.styles.ts` — Tailwind Variants styles
- `{name}.types.ts` — TypeScript types
- `{name}.spec.tsx` — Vitest + React Testing Library tests
- `{name}.stories.tsx` — Storybook stories

Optional: `{name}.utils.ts` for helpers, `components/` subdirectory for compound sub-components.

## Import Conventions

- **Always use `.js` extensions** in relative imports (e.g., `'./button.styles.js'`)
- Import `ResponsiveVariants` from `../../types/responsive-variants.types.js`
- Import `useBreakpoint` from `../../hook/breakpoints.hook.js`
- Import `resolveResponsiveVariant` from `../../utils/breakpoint.util.js`
- Import `IconProps` from `../icon/index.js`

## Types (`*.types.ts`)

- Derive variant types: `type Variants = VariantProps<typeof styles>`
- Wrap responsive props: `ResponsiveVariants<Variants['propName']>`
- JSDoc comment with `@default` tag on every prop
- Extend appropriate HTML attributes (`HTMLAttributes<HTMLDivElement>`, `ButtonHTMLAttributes<Element>`, etc.)
- Use `Omit<>` for conflicting HTML attributes (e.g., `Omit<InputHTMLAttributes, 'size'>`)

## Styles (`*.styles.ts`)

- Use `tv()` from `tailwind-variants`, exported as `styles`
- Use `slots` for multi-element components
- Use `compoundSlots` for variant combinations
- Use GEL design tokens — never hardcode colors:
  - Text: `text-text-body`, `text-text-muted`, `text-text-link`, `text-text-mono`
  - Surface: `bg-surface-primary`, `bg-surface-hero`, `bg-surface-muted-pale`
  - Hover: `hover:bg-surface-hover-*`
  - Active: `active:bg-surface-active-*`
  - Border: `border-border-primary`, `border-border-hero`, `border-border-muted-soft`
  - Background: `bg-background-white`
- Typography: `typography-body-*`
- Focus: `focus-outline` (not custom focus rings)

## Components (`*.component.tsx`)

- Add `'use client';` directive when using hooks or interactivity
- Use `forwardRef` pattern when appropriate: `Base{Name}` function + `forwardRef(Base{Name})` export
- Destructure `className` and pass to `styles({ className })` or `styles.base({ className })`
- Resolve responsive props: `resolveResponsiveVariant(prop, breakpoint)` with `useBreakpoint()`
- Use `useFocusRing()` + `mergeProps()` from `react-aria` for interactive components
- Use plain function declarations — do NOT use `React.FC`
- Set sensible default values in prop destructuring

## Index (`index.ts`)

```ts
export { ComponentName } from './component-name.component.js';
export { type ComponentNameProps } from './component-name.types.js';
```

Do NOT re-export styles.

## Tests (`*.spec.tsx`)

- Use `@testing-library/react` for rendering, `userEvent.setup()` for interactions
- Use `vi.fn()` for mocks, `waitFor()` for async assertions
- Import from `.component.js` (not index)
- Minimum: a "renders the component" test
- Pre-mocked globals (do NOT re-mock): `window.scrollTo`, `window.matchMedia`, `ResizeObserver`, `window.URL.createObjectURL`
- Style files (`*.styles.ts`) are excluded from test coverage

## Stories (`*.stories.tsx`)

- Import from `@storybook/react-vite`
- Include `tags: ['autodocs']` and decorator `[(Story: StoryFn) => <Story />]`
- JSDoc comments above stories use `>` blockquote format
- Interactive stories using `useState` are defined as function components
- Use `fn()` from `storybook/test` for callback props

## Registering New Components

After creating a component, add it to `src/components/index.ts`:

```ts
export * from './{kebab-case-name}/index.js';
```

## Key Patterns

- **Responsive variants**: Use `ResponsiveVariants<T>` type, resolve with `resolveResponsiveVariant()` + `useBreakpoint()`
- **Compound components**: Use React Context, place sub-components in `components/` subdirectory
- **Icon props**: Type as `(props: IconProps) => JSX.Element`
- **Polymorphic tag**: `tag?: keyof JSX.IntrinsicElements` or a constrained subset

## TypeScript Best Practices

- **No `any`** — Use proper types. If a type is truly unknown, use `unknown` and narrow it. The only acceptable escape hatch is `as unknown as TargetType` for complex generic interop (e.g., `forwardRef` with generics)
- **Prefer `type` over `interface`** for props — keeps consistency with `VariantProps` intersections (`&`)
- **Export types with `export { type ... }`** — use explicit `type` keyword for type-only exports
- **Derive types from source** — don't duplicate: use `VariantProps<typeof styles>`, `Pick<>`, `Omit<>`, and mapped types
- **Use `ReactNode` for children** — not `JSX.Element` or `React.ReactElement` (unless narrowing is required for compound components)
- **Type event handlers precisely** — use `React.MouseEvent<HTMLButtonElement>`, not generic `React.SyntheticEvent`
- **Avoid type assertions** — prefer type guards and narrowing over `as`. Use `satisfies` for validation without widening

## React Best Practices

### Component Design
- **One component per file** — the main component in `*.component.tsx`, sub-components in their own files under `components/`
- **Plain functions, not `React.FC`** — function declarations with explicit props typing: `function Button({ children }: ButtonProps)`
- **Destructure props at the function signature** — not inside the body. Order: `className`, variant props, behavioural props, `children`, `...rest`
- **Prefer composition over configuration** — use children and compound component patterns rather than deeply nested config objects (see Compacta, Repeater, ButtonGroup)
- **Keep components pure** — no side effects in render. Move side effects to `useEffect`

### Hooks
- **`useMemo`** — for expensive computations or referentially stable objects/arrays passed to children. Don't over-use for primitive values
- **`useCallback`** — for event handlers passed to memoized children or used in dependency arrays
- **Custom hooks** — extract reusable logic into hooks in `src/hook/`. Prefix with `use`
- **Dependency arrays** — list all dependencies. Suppress lint warnings only with a comment explaining why
- **`useEffect` cleanup** — always clean up subscriptions, event listeners, and timers

### Refs and DOM
- **`forwardRef`** — use for components that render a single native element consumers might need to reference
- **Type refs precisely** — `Ref<HTMLButtonElement>`, not `Ref<HTMLElement>` or `Ref<any>`
- **Don't read refs during render** — access `.current` only in effects or event handlers

### State Management
- **Lift state only when needed** — keep state as close to where it's used as possible
- **React Context for compound components** — share state between parent and children (Accordion, List, Compacta)
- **`react-stately` for complex state** — use Adobe's hooks (`useDisclosureGroupState`, `useOverlayTriggerState`, etc.) instead of hand-rolling state machines
- **Controlled vs uncontrolled** — support both patterns where sensible. Use `defaultValue`/`value` naming convention

### Performance
- **Don't prematurely optimise** — only add `memo()`, `useMemo`, `useCallback` when there's a measurable problem or the component is used in lists
- **Avoid inline object/array literals in JSX** — these create new references every render. Extract to `useMemo` or module scope if they're static
- **Key lists properly** — use stable, unique identifiers, never array index (unless the list is static and never reordered)

### Patterns to Avoid
- **No `React.FC`** — doesn't support generics well and adds implicit `children`
- **No `default export` for components** — use named exports for better refactoring support and tree-shaking
- **No `// @ts-ignore` or `// @ts-expect-error`** — fix the type issue instead. If absolutely unavoidable, add a comment explaining why
- **No `useEffect` for derived state** — compute derived values directly or with `useMemo`, not by syncing state in effects
- **No prop drilling beyond 2 levels** — use Context or composition instead

## Available Skills

Load these skills for specific tasks:

- **`creating-gel-component`** — Step-by-step scaffolding workflow with file templates for new components
- **`reviewing-gel-component`** — Checklist for auditing components against these conventions
- **`writing-gel-tests`** — Detailed guide for Vitest + React Testing Library test patterns, categories, and coverage targets
