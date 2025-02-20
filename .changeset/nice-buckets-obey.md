---
'@westpac/ui': patch
---

accordina default open items not working because items keys are being transformed with .$ by React map method. Thus, keys does not match with defaultExpandedKeys
