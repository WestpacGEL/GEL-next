---
'@westpac/style-config': major
'@westpac/ui': major
---

**Breaking change:** make the refreshed Westpac appearance (previously WBC26) the default `wbc` brand. Preserve the previous Westpac appearance as `wbcLegacy` (capital L), selectable in Storybook and the documentation site. Both support light and dark tokens.

Applications currently using `wbc` must switch to `wbcLegacy` to retain their existing appearance. Update the theme import to `@westpac/style-config/themes/wbcLegacy`, set `data-brand="wbcLegacy"`, and update explicit component `brand` props, saved selections and custom `wbc:` Tailwind variants to `wbcLegacy` / `wbcLegacy:`.

Remove the public `wbc26` identifier and per-brand outputs without a compatibility alias. Existing WBC26 consumers must migrate to `wbc`. Update per-brand W3C, standalone CSS, Swift and Android paths and generated identifiers too. Aggregate tokens retain their Figma source identities: `Westpac 2026` supplies `wbc`, and `Westpac` supplies `wbcLegacy`.

Refresh the Figma export with 14 icon-colour tokens per brand in both modes and updated Westpac pictogram colours. Existing legacy, STG, BSA and BOM token values are unchanged. Matching icon colour props now use the semantic icon tokens; props without an icon-token counterpart retain their previous mappings. Review both modes and update visual snapshots deliberately after migration.
