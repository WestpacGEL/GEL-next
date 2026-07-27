## ProgressIndicator

**Import:** `import { ProgressIndicator } from '@westpac/ui/progress-indicator';`

Step-based progress indicator.

**Incorrect (wrong prop name `text` instead of `label`)**

```tsx
<ProgressIndicator size="large" text="Signing in..." />
```

**Correct**

```tsx
import { PadlockTickIcon } from '@westpac/ui/icon';

<ProgressIndicator size="large" icon={PadlockTickIcon} label="Signing in..." />;
```
