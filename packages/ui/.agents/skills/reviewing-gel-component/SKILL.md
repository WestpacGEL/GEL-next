---
name: reviewing-gel-component
description: 'Reviews GEL design system components for convention compliance, accessibility, and best practices. Use when reviewing a component, checking component quality, or auditing GEL components.'
---

# Reviewing a GEL Component

Reviews components in `packages/ui/src/components/` against the conventions defined in `packages/ui/.agents/AGENTS.md`.

## Review Checklist

### 1. File Structure

- [ ] All required files exist: `index.ts`, `*.component.tsx`, `*.styles.ts`, `*.types.ts`, `*.spec.tsx`, `*.stories.tsx`
- [ ] File names use kebab-case matching the directory name
- [ ] Component is exported from `packages/ui/src/components/index.ts`

### 2. Types

- [ ] `Variants` type alias derived from `VariantProps<typeof styles>`
- [ ] Responsive props wrapped with `ResponsiveVariants<Variants['...']>`
- [ ] Every prop has a JSDoc comment with `@default` tag where applicable
- [ ] Extends correct HTML attributes type
- [ ] Uses `Omit<>` for conflicting HTML attributes
- [ ] `.js` extensions on relative imports

### 3. Styles

- [ ] Uses tailwind styling except when animations/dynamic styles are required
- [ ] Uses `tv()` from `tailwind-variants`, exported as `styles`
- [ ] Uses GEL design tokens — no hardcoded colors
- [ ] Uses `typography-body-*` for text, `focus-outline` for focus
- [ ] Uses `slots` for multi-element components
- [ ] Uses `compoundSlots` for variant combinations

### 4. Component

- [ ] Has `'use client';` if using hooks or client-side rendering
- [ ] Uses `forwardRef` pattern when appropriate
- [ ] Destructures `className` and passes to styles
- [ ] Uses `useBreakpoint()` + `resolveResponsiveVariant()` for responsive props
- [ ] Uses `useFocusRing()` + `mergeProps()` from `react-aria` where appropriate
- [ ] All props are used (no unused props)
- [ ] `.js` extensions on all relative imports
- [ ] Plain function declarations (not `React.FC`)

### 5. Accessibility

- [ ] Interactive elements use appropriate ARIA attributes
- [ ] Decorative icons use `aria-hidden`
- [ ] `react-aria` hooks used for focus and accessibility where appropriate
- [ ] Semantic HTML elements used
- [ ] `react-stately` hooks for state management where applicable

### 6. Index

- [ ] Exports component and props type only
- [ ] Does NOT re-export styles
- [ ] `.js` extensions

### 7. Tests

- [ ] At minimum a "renders the component" test
- [ ] Uses `userEvent.setup()` (not `fireEvent`) for interactions
- [ ] Imports from `.component.js` (not index)

### 8. Stories

- [ ] Imports from `@storybook/react-vite`
- [ ] Has `tags: ['autodocs']` and standard decorator
- [ ] Covers: default state, looks/variants, sizes, responsive, disabled
- [ ] Interactive stories defined as function components

## Severity Levels

### Critical

- Missing `'use client'` on components with hooks
- Hardcoded colors instead of design tokens
- Missing `forwardRef` on components rendering native elements
- Custom focus styles instead of `focus-outline`
- Missing `.js` extensions in imports

### Warnings

- Missing JSDoc `@default` tags
- No responsive variant support where beneficial
- Minimal test coverage
- Missing `aria-*` attributes on interactive elements

### Style

- Using `React.FC` instead of function declarations
- Inconsistent prop destructuring order
- Styles not using `slots` for multi-element components

## How to Run

1. Read all files in the component directory
2. Check each item above
3. Report findings grouped by severity
4. Suggest specific fixes with code examples
