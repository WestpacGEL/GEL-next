---
'@westpac/style-config': minor
---

Add dark tokens for Westpac (`wbc`), Westpac Legacy (`wbcLegacy`), STG, BSA and BOM across web, W3C, iOS and Android outputs. Web themes remain light by default and require `data-theme="dark"` on the branded element to opt in. Enable the Storybook dark-mode toggle for both Westpac appearances and the other brands.

Generate Android colours with transparency in platform-native ARGB order, correcting opacity values in both day and night resources. Keep fully opaque colours as six-digit RGB.
