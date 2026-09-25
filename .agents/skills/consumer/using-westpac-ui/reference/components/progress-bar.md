## ProgressBar

**Import:** `import { ProgressBar } from '@westpac/ui/progress-bar';`

Visual progress indicator bar.

**Incorrect (wrong value prop name `percent`)**

```tsx
<ProgressBar percent={50} look="default" />
```

**Correct**

```tsx
<ProgressBar value={50} look="default" />
```

**Capabilities:** Value-based progress display
