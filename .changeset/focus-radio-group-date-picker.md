---
'@westpac/ui': minor
---

Forward refs on composite form fields so form libraries such as react-hook-form can focus them on validation errors (`field.ref` → `focus()`):

- Single controls forward a DOM ref to their focusable element, like `Input` and `Button` already do: `Switch` → the switch `<input>`, `DatePicker` → the first editable date segment, `MultiSelect` → the trigger button.
- Groups (`RadioGroup`, `CheckboxGroup`, `Selector` with `radio`/`checkbox`/`button` types, `ButtonGroup`) forward a `FocusHandle` (`{ focus() }`, exported from `@westpac/ui`). `focus()` uses react-aria's focus manager to focus the group's first tabbable option at call time, so it follows the selected radio (roving tabindex), skips disabled options, and works when options render after mount.

`RadioGroupRadio` and `CheckboxGroupCheckbox` refs now point at the `<input>` instead of the wrapping `<label>`, in line with react-hook-form's guidance that a field ref should be the focusable input.

Fixed: the "Show N more items" button in `RadioGroup`/`CheckboxGroup` now moves focus to the first revealed option (it previously called `focus()` on a non-focusable label).

Adds `@react-aria/focus` as a direct dependency.
