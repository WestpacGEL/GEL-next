---
'@westpac/ui': minor
---

Added polymorphic rendering to the breadcrumb component. Note that adding href on an item without a link tag will generate a type error - specify the tag to fix.
Link now applied RouterProvider's useHref to the rendered href of native anchors.
