## Pictogram

**Import:** `import { Pictogram } from '@westpac/ui/pictogram';`

> **Note:** Only available via the sub-path import `@westpac/ui/pictogram`, not from the main `@westpac/ui` barrel export.

Illustrative pictograms (larger than icons).

**Incorrect (no generic `Pictogram` component — use the named export)**

```tsx
import { Pictogram } from '@westpac/ui/pictogram';

<Pictogram name="padlock-locked" mode="colour" />;
```

**Correct**

```tsx
import { PadlockLockedPictogram } from '@westpac/ui/pictogram';

<PadlockLockedPictogram mode="duo" aria-label="Secure" />;
```
