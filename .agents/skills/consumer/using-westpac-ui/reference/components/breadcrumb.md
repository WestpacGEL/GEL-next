## Breadcrumb

**Import:** `import { Breadcrumb, BreadcrumbItem } from '@westpac/ui/breadcrumb';`

Navigation breadcrumbs.

**Incorrect (raw anchors instead of `BreadcrumbItem`)**

```tsx
<Breadcrumb>
  <a href="/">Home</a>
  <a href="/products">Products</a>
  <span>Current Page</span>
</Breadcrumb>
```

**Correct**

```tsx
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumb>
```

**Capabilities:** Compound component with BreadcrumbItem · Links via `href` · Last item renders as text
