---
'@westpac/ui': minor
---

Use semantic `icon-*` tokens for matching icon colour props across brands and light/dark modes, rather than surface tokens. Add `body`, `heading` and `link` colour props. Existing `muted`, `primary`, `hero`, `holler`, `success`, `info`, `warning`, `danger`, `system-error`, `mono` and `reversed` props select their corresponding icon tokens.

Keep existing colour values without icon-token counterparts, including `pop` and faint variants, on their previous surface/background mappings for compatibility. Omitting `color` still inherits the parent's colour; responsive colours and `className` overrides are unchanged. Update icon examples, controls and migration guidance, and review visual snapshots in both modes.

Support the new `body`, `heading` and `link` colours in ProgressIndicator too, preserving its compatibility as a button icon. These roles use icon tokens for the spinner and text tokens for its label; existing spinner/label colour mappings are unchanged.
