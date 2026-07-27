## VisuallyHidden

**Import:** `import { VisuallyHidden } from '@westpac/ui/visually-hidden';`

Hides content visually but keeps it accessible to screen readers.

**Incorrect (`display: none` hides content from screen readers too)**

```tsx
<span style={{ display: 'none' }}>Screen reader only text</span>
```

**Correct**

```tsx
<VisuallyHidden>Screen reader only text</VisuallyHidden>
```
