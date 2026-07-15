## Panel

**Import:** `import { Panel } from '@westpac/ui/panel';`

Content panel with optional header.

**Incorrect (invalid `look` value)**

```tsx
<Panel heading="Payment details" look="primary">
  <PanelBody>Review your payment details.</PanelBody>
</Panel>
```

**Correct**

```tsx
<Panel heading="Payment details" headingTag="h2" look="faint">
  <PanelBody>Review your payment details.</PanelBody>
  <PanelFooter>Last updated today</PanelFooter>
</Panel>
```

**Capabilities:** Panel wrapper for content sections
