# GEL-next Repository

This is the GEL (Global Experience Language) design system monorepo for Westpac Group. This document is only for local development and will not be useful outside of this repository.

## Documentation Sync Requirement

When making changes to any of the following, ensure related documentation and skills are updated:

### After modifying `packages/ui/` components:

1. Check if `.agents/skills/consumer/using-westpac-ui/reference/components.md` needs updating:
   - New/changed props must be reflected in the component's props table
   - New components must have a `## ComponentName` section added
   - Removed components must have their section removed
   - The className Support table must reflect any changes to className handling
   - Import paths must match what's exported from `packages/ui/src/components/index.ts` and `packages/ui/package.json` exports

2. Check if `.agents/skills/consumer/using-westpac-ui/reference/design-guidelines.md` needs updating:
   - Code examples must use current prop names and API

3. Check if `packages/ui/.agents/AGENTS.md` conventions are still accurate

### After modifying `apps/site/src/content/`:

1. Compare changed `.mdoc` files against their corresponding section in `.agents/skills/consumer/using-westpac-ui/reference/design-guidelines.md`
2. Update design-guidelines.md to reflect any changes, stripping Markdoc tags (`{% %}`)

### After modifying `packages/style-config/`:

1. Check if breakpoints, brands, or CSS setup instructions in `.agents/skills/consumer/using-westpac-ui/SKILL.md` need updating

## Available Project Skills

### For projects in `/apps`:

- **`using-westpac-ui`** — Component usage guidance, capabilities, and API reference

### For `packages/ui`:

- **`creating-gel-component`** — Step-by-step scaffolding workflow for new components
- **`reviewing-gel-component`** — Convention compliance checklist
- **`writing-gel-tests`** — Vitest + React Testing Library test patterns and coverage targets

## Monorepo Structure

- `packages/ui/` — `@westpac/ui` component library (React, tailwind, tailwind-variants, react-aria)
- `packages/style-config/` — `@westpac/style-config` design tokens and Tailwind CSS v4 theme
- `packages/eslint-config/` — Shared ESLint configuration
- `packages/ts-config/` — Shared TypeScript configuration
- `packages/test-config/` — Shared Vitest configuration
- `apps/site/` — Documentation website (contains design guidelines in `src/content/`)
- `apps/protoform/` — Reference Next.js application demonstrating component usage
- `apps/playground/` — Development playground

## Package Manager & Build

- Uses `pnpm` (v10.30.2) with workspaces
- Build orchestrated by `turbo`
- Node >= 20 required
