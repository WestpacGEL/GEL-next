---
'@westpac/style-config': patch
---

Correct translucent Android colour exports to use alpha-first #AARRGGBB encoding in both per-brand and combined XML resources. Keep fully opaque colours in six-digit #RRGGBB format. This preserves the intended RGB colour and opacity instead of interpreting CSS-style #RRGGBBAA as Android ARGB.
