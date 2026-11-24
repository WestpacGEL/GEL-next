## ProgressIndicator

**Import:** `import { ProgressIndicator } from '@westpac/ui/progress-indicator';`

Step-based progress indicator.

Its `color` prop defaults to `hero` and remains compatible with `IconProps`, allowing ProgressIndicator to be passed directly as a button icon. The new `body`, `heading` and `link` values use matching icon tokens for the spinner and text tokens for its label. Existing spinner/label colour mappings remain unchanged; an embedded icon uses the shared Icon mapping.

**Incorrect (wrong prop name `text` instead of `label`)**

```tsx
<ProgressIndicator size="large" text="Signing in..." />
```

**Correct**

```tsx
import { PadlockTickIcon } from '@westpac/ui/icon';

<ProgressIndicator size="large" icon={PadlockTickIcon} label="Signing in..." />;
```
