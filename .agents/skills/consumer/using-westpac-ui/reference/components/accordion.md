## Accordion

**Import:** `import { Accordion, AccordionItem } from '@westpac/ui/accordion';`

Expandable content panels. Multiple panels can be open simultaneously.

| Prop      | Type                                   | Default | Description                 |
| --------- | -------------------------------------- | ------- | --------------------------- |
| `look`    | `ResponsiveVariants<'soft' \| 'lego'>` | `soft`  | Visual style                |
| `rounded` | `ResponsiveVariants<boolean>`          | `true`  | Rounded corners             |
| `justify` | `boolean`                              | `false` | Stretch tab to fill content |

**Compound:** Requires `AccordionItem` children with `id`, `title`, and `key` props.

**Incorrect (missing required `id`/`key` on items)**

```tsx
<Accordion look="soft" rounded>
  <AccordionItem title="Section 1">Content 1</AccordionItem>
  <AccordionItem title="Section 2">Content 2</AccordionItem>
</Accordion>
```

**Correct**

```tsx
<Accordion look="soft" rounded>
  <AccordionItem key="1" id="1" title="Section 1">
    Content 1
  </AccordionItem>
  <AccordionItem key="2" id="2" title="Section 2">
    Content 2
  </AccordionItem>
</Accordion>
```

**Capabilities:** Responsive `look` and `rounded` · Multiple panels open · Keyboard accessible (react-stately) · Cannot control individual open/close programmatically (always allows multiple)
