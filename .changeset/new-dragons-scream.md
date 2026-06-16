---
'@westpac/ui': minor
---

Add controlled mode support to `SelectorButtonGroup`. Passing an `onChange` callback opts the component into controlled mode, where the `value` prop drives selection. Pass an empty string to `value` to clear the selection. Uncontrolled behaviour (internal `useState`) is preserved when `onChange` is omitted.
