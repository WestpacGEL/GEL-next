---
'@westpac/ui': patch
---

Fix Alert text wrapping below the `xsl` breakpoint

The Alert `base` slot only applied `flex` at the `xsl` breakpoint and above, so
on smaller viewports the icon and body were not laid out as flex items and the
text wrapped incorrectly. The `flex` layout is now applied at all breakpoints.

No consumer action is required. The fix is applied automatically on upgrade.
