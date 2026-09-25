## Symbol

**Import:** `import { Symbol } from '@westpac/ui/symbol';`

> **Note:** Only available via the sub-path import `@westpac/ui/symbol`, not from the main `@westpac/ui` barrel export.

Brand symbols and logos.

**Incorrect (no generic `Symbol` component — use the named export)**

```tsx
import { Symbol } from '@westpac/ui/symbol';

<Symbol name="WBCLogo" />;
```

**Correct**

```tsx
import { WBCLogo } from '@westpac/ui/symbol';

<WBCLogo />;
```
