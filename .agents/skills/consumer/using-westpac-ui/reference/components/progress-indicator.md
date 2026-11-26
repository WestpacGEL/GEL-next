## ProgressIndicator

**Import:** `import { ProgressIndicator } from '@westpac/ui/progress-indicator';`

Step-based progress indicator.

Its `color` prop defaults to `hero` and remains compatible with `IconProps`, allowing ProgressIndicator to be passed directly as a button icon. The spinner and embedded icon use the shared Icon mapping: matching roles prefer `icon-*` tokens, with existing surface-token fallbacks for older style-config releases. Body, heading and link fall back to corresponding text tokens and use those text tokens for the label. Other label colour mappings are unchanged. Spinner `className` colour overrides remain supported.

**Incorrect (wrong prop name `text` instead of `label`)**

```tsx
<ProgressIndicator size="large" text="Signing in..." />
```

**Correct**

```tsx
import { PadlockTickIcon } from '@westpac/ui/icon';

<ProgressIndicator size="large" icon={PadlockTickIcon} label="Signing in..." />;
```
