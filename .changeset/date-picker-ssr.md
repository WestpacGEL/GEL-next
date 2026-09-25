---
'@westpac/ui': patch
---

`DatePicker`: no longer throws `ReferenceError: document is not defined` when rendered on the server (for example during Next.js prerendering). The default portal container lookup is now skipped outside the browser, matching the other portalled components.
