---
'@westpac/ui': patch
---

`DatePicker`: the date field no longer wraps its year segment onto a second line when the page font is wider than the design system's default. The per-size width is now a minimum (`min-w-*`) and segments are kept on one line (`whitespace-nowrap`), so the field grows to fit its content instead of overflowing.
