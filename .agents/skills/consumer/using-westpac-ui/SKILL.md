---
name: using-westpac-ui
description: 'Guides consumers of the @westpac/ui component library on correct usage, capabilities, and patterns. Use when asking how to use a GEL component, whether a component supports a feature, or how to implement a UI pattern with @westpac/ui.'
---

# Using @westpac/ui

Provides guidance on using the GEL (Global Experience Language) design system component library for Westpac Group applications. This package may also be referred to as "GEL-Next", "GEL Next" or "GEL v1.0.0". Always check the version in `package.json` to confirm you're referencing the correct documentation as some consumers may have @westpac/ui v0.x installed which has different capabilities and patterns. Or have a completely different package also referred to as "GEL" installed.

## When to Use

Reference this skill when a user has @westpac/ui installed and is asking a question relating to the @westpac/ui or GEL. It should also be used when components from @westpac/ui are mentioned by name, or when the question is about a UI pattern that may be achievable with @westpac/ui components.

## Related Skills (optional)

- **`installing-westpac-ui`** — Full setup guide for new projects (installation, CSS, theming, brand fonts, ESLint)
- **`migrating-to-westpac-ui-v1`** — Migration guide from pre-1.0 to v1.0 (breaking changes, token codemod, component API changes)

## Imports

Components can be imported from the main package or individually:

```tsx
// Main import (tree-shakable)
import { Button, Input, Modal } from '@westpac/ui';

// Individual imports (smaller bundles)
import { Button } from '@westpac/ui/button';
import { Input } from '@westpac/ui/input';
import { Modal, ModalBody, ModalFooter } from '@westpac/ui/modal';

// Hooks
import { useBreakpoint, useDarkMode } from '@westpac/ui/hook';

// Types (Component props are exported from the component where applicable)
import type { ResponsiveVariants } from '@westpac/ui/types';
import type { BrandKey } from '@westpac/ui/types';
```

## Core Concepts

### Responsive Variants

Most component props support **responsive values** — you can pass a single value OR an object keyed by breakpoint:

```tsx
// Single value
<Button size="large" />

// Responsive — different value per breakpoint
<Button
  size={{ initial: 'small', md: 'large', lg: 'xlarge' }}
  soft={{ initial: false, sm: true }}
/>
```

**Breakpoints** (mobile-first):
| Key | Min-width | Description |
|-----|-----------|-------------|
| `initial` | 0px | Base / mobile |
| `xsl` | 576px | Extra small landscape |
| `sm` | 768px | Small (tablet) |
| `md` | 992px | Medium (desktop) |
| `lg` | 1200px | Large |
| `xl` | 1584px | Extra large |

Props that support responsive values are typed as `ResponsiveVariants<T>`.

### Polymorphic `tag` Prop

Many components accept a `tag` prop to change the rendered HTML element:

```tsx
<Button tag="a" href="/page">Link styled as button</Button>
<Button tag="span">Span styled as button</Button>
<Badge tag="span">Tag</Badge>
```

### Icon System

Icons are passed as **component references** (not rendered elements):

```tsx
import { ArrowRightIcon, BurgerIcon } from '@westpac/ui/icon';

// ✅ Correct — pass the component
<Button iconBefore={ArrowRightIcon}>Next</Button>

// ❌ Wrong — don't pass a rendered element
<Button iconBefore={<ArrowRightIcon />}>Next</Button>
```

Icons support `look` (`'filled'` | `'outlined'`), `size`, and `color` props. Over 260 icons are available.

### Focus Management

Components use `react-aria` for accessible focus management. Focus rings are shown only during keyboard navigation (not on click). This is handled automatically — no configuration needed.

### Styling and Customization

Some components support `className` for custom styles, but prefer using built-in props for consistent design. Colours shouldn't use arbitrary values and should always use the design system tokens. Styling should not be overwritten using element selectors or global CSS.

## How to Answer Component Questions

When a user asks "can component X do Y?", follow this process:

1. **Check the correct package is installed** — Confirm the user has @westpac/ui >= v1.0.0 installed, not an older version or a different package also referred to as "GEL". Also check if the version is outdated and recommend updating to the latest version if so, as newer versions may have fixed bugs or added features that could solve their problem.
2. **If package is incorrect/not installed** — Clearly state that older versions are not supported and suggest installing the correct package or updating to the latest version. Provide installation/migration instructions if needed.
3. **Check the component reference** — Read `reference/components.md` to find the component and its props
4. **Check if a prop exists** - Look for a prop that directly supports the requested feature or pattern (e.g., `color`, `look`, `iconBefore`, `block`, `tag`, etc.)
5. **If the prop exists** — show the correct usage with a code example
6. **If no prop exists but it's achievable** — explain the pattern (e.g., using `className`, composition, `tag` prop)
7. **If not supported functionally** — clearly state it's not supported and suggest posting in the internal Teams channel for feature requests.
8. **If style not supported using className** — clearly state it's not supported and should not be overwritten. Suggest this could be a design issue and recommend posting in the internal Teams channel for discussion with GEL designers.
9. **If accessibility is a concern** — Read `reference/design-guidelines.md` for accessibility notes and ensure the recommended pattern follows best practices.

### Common Capability Questions

**"Can I change the color/look?"** → Check for `look`, `color`, or `soft` props
**"Can I use a custom color?"** → Notify that custom colors should not be used and to use design tokens instead. Suggest posting in the internal Teams channel if the needed token doesn't exist.
**"Can I make it responsive?"** → Check if the prop type includes `ResponsiveVariants`
**"Can I render it as a different element?"** → Check for `tag` prop
**"Can I add an icon?"** → Check for `iconBefore`, `iconAfter`, or `icon` props
**"Can I make it full width?"** → Check for `block` prop
**"Can I control open/close?"** → Check for `open`, `state`, or `defaultExpandedKeys` props
**"Can I validate / show errors?"** → Check for `invalid`, `errorMessage` props
**"Can I use it in a form?"** → Check if it extends HTML form element attributes and has `name` prop or it is compatible with the Field component from `@westpac/ui/field`
**"Can I customize the styles?"** → Check for `className` prop, but prefer built-in props for styling. Style should not be overwritten using element selectors or global CSS. Suggest posting in the internal Teams channel if the needed style option doesn't exist as this could be a design issue.

## Available Hooks

### `useBreakpoint()`

Returns the current active breakpoint (`'initial' | 'xsl' | 'sm' | 'md' | 'lg' | 'xl'`). Uses `zustand` internally with `matchMedia` listeners.

```tsx
import { useBreakpoint } from '@westpac/ui/hook';

function MyComponent() {
  const breakpoint = useBreakpoint();
  // breakpoint === 'initial' | 'xsl' | 'sm' | 'md' | 'lg' | 'xl'
}
```

### `useDarkMode()`

Returns helpers for dark mode: `getMode()`, `setMode()`, `toggleDarkMode()`, `getBrand()`, `getSystemPreference()`.

> **Note:** Dark mode is disabled in the current release.

## Reference Documentation

When answering questions about **how** or **when** to use a component, or when using a component in an integration, consult these bundled references:

- **`reference/components.md`** — Full component catalog with props, types, defaults, and capabilities
- **`reference/design-guidelines.md`** — Design guidelines, dos/don'ts, UX notes, accessibility, and code examples for every component
- **`reference/integration-requirements.md`** — Integration requirements and best practices for consuming platforms to ensure consistent UI, maintainability, and alignment with future system updates.

## Component Catalog

For the full list of components, their props, defaults, and capabilities, read `reference/components.md`.

The catalog is organized alphabetically and includes:

- All exported components and types
- Every prop with its type, default value, and description
- Whether the component supports responsive variants
- Sub-components for compound components
- Usage examples for common patterns
