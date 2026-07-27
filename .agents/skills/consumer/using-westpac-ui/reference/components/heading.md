## Heading

**Import:** `import { Heading } from '@westpac/ui/heading';`

Semantic heading with GEL typography.

| Prop           | Type                          | Default | Description                       |
| -------------- | ----------------------------- | ------- | --------------------------------- |
| `size`         | `ResponsiveVariants<1-10>`    | —       | Heading size (required)           |
| `tag`          | `'h1'-'h6'`                   | auto    | Semantic element (auto from size) |
| `brandHeading` | `ResponsiveVariants<boolean>` | —       | Brand heading style               |
| `uppercase`    | `boolean`                     | —       | Uppercase                         |

**Incorrect (missing required `size` prop, wrong `level` prop)**

```tsx
<Heading level={1}>Page Title</Heading>
<Heading tag="h1">Responsive Heading</Heading>
```

**Correct**

```tsx
<Heading size={3} tag="h1">Page Title</Heading>
<Heading size={{ initial: 5, md: 3 }}>Responsive Heading</Heading>
```

**Capabilities:** Responsive size · Auto semantic tag from size · Brand heading variant · Uppercase option
