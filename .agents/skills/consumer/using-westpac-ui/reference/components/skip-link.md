## SkipLink

**Import:** `import { SkipLink } from '@westpac/ui/skip-link';`

Accessibility skip navigation link.

**Incorrect (wrong `target` prop)**

```tsx
<SkipLink target="#main-content">Skip to main content</SkipLink>
```

**Correct**

```tsx
<SkipLink href="#main-content">Skip to main content</SkipLink>
```
