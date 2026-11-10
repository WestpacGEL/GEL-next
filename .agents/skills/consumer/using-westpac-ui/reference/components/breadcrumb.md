## Breadcrumb

**Import:** `import { Breadcrumb, BreadcrumbItem } from '@westpac/ui/breadcrumb';`

Navigation breadcrumbs.

**BreadcrumbItem props**

| Prop          | Type                | Default  | Description                                                          |
| ------------- | ------------------- | -------- | -------------------------------------------------------------------- |
| `tag`         | `React.ElementType` | `'span'` | Element or component to render                                       |
| `href`        | Depends on `tag`    | —        | Link destination, passed to `'a'` or a custom component              |
| `isCurrent`   | `boolean`           | `false`  | Set automatically on the last item by `Breadcrumb`                   |
| `isDisabled`  | `boolean`           | `false`  | Renders the item as non-interactive text                             |
| `elementType` | `string`            | `'a'`    | DOM element rendered by a custom `tag` that does not render an `<a>` |

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
  <BreadcrumbItem tag="a" href="/">
    Home
  </BreadcrumbItem>
  <BreadcrumbItem tag="a" href="/products">
    Products
  </BreadcrumbItem>
  <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumb>
```

Render items using a routing component when client-side routing is required by passing it directly as `tag`.

**Incorrect (wrapping items in `<NextLink legacyBehavior>`, which is deprecated and stops `Breadcrumb` marking the last item as current)**

```tsx
<Breadcrumb>
  <NextLink href="/" passHref legacyBehavior>
    <BreadcrumbItem tag="a">Home</BreadcrumbItem>
  </NextLink>
  <NextLink href="/products" passHref legacyBehavior>
    <BreadcrumbItem tag="a">Products</BreadcrumbItem>
  </NextLink>
  <NextLink href="/products/credit-cards" passHref legacyBehavior>
    <BreadcrumbItem tag="a" isCurrent>
      Credit cards
    </BreadcrumbItem>
  </NextLink>
</Breadcrumb>
```

**Correct**

```tsx
import { Breadcrumb, BreadcrumbItem } from '@westpac/ui/breadcrumb';
import NextLink from 'next/link';

<Breadcrumb>
  <BreadcrumbItem tag={NextLink} href="/">
    Home
  </BreadcrumbItem>
  <BreadcrumbItem tag={NextLink} href="/products">
    Products
  </BreadcrumbItem>
  <BreadcrumbItem tag={NextLink} href="/products/credit-cards">
    Credit cards
  </BreadcrumbItem>
</Breadcrumb>;
```

**Capabilities:** Compound component with BreadcrumbItem · Polymorphic rendering via `tag` · Last item automatically marked current and rendered as text · Built on react-aria breadcrumbs
