---
'@westpac/ui': patch
---

`MultiSelect`: fixed keyboard users being unable to select options. The dropdown is a non-modal react-aria popover, which react-aria dismisses on any page scroll; because focus moves into the dropdown (filter input, "Select all", options) the browser could scroll the page while arrowing through options and the dropdown closed mid-navigation. The popover no longer closes on scroll (all dismissal is handled by the component: blur, Escape, Tab, dismiss button), and focus moves inside the dropdown with react-aria's `focusWithoutScrolling` so the page does not jump. Also removed the incorrect `aria-modal="true"` from the non-modal popover.
