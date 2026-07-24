## Tabs

**Import:** `import { Tabs, TabsPanel } from '@westpac/ui/tabs';`

Tabbed content panels.

| Prop           | Type                                             | Default | Description     |
| -------------- | ------------------------------------------------ | ------- | --------------- |
| `look`         | `ResponsiveVariants<...>`                        | —       | Tab style       |
| `orientation`  | `ResponsiveVariants<'horizontal' \| 'vertical'>` | —       | Layout          |
| `color`        | `TabsTabProps['color']`                          | —       | Tab color       |
| `justify`      | `boolean`                                        | —       | Full width tabs |
| `sticky`       | `ResponsiveVariants<boolean>`                    | —       | Sticky position |
| `stickyOffset` | `{ top?, bottom?, left?, right? }`               | —       | Sticky offset   |

**Incorrect (wrong prop name `label` and missing `key`)**

```tsx
<Tabs>
  <TabsPanel label="Tab 1">Content 1</TabsPanel>
  <TabsPanel label="Tab 2">Content 2</TabsPanel>
</Tabs>
```

**Correct**

```tsx
<Tabs>
  <TabsPanel key="1" title="Tab 1">
    Content 1
  </TabsPanel>
  <TabsPanel key="2" title="Tab 2">
    Content 2
  </TabsPanel>
</Tabs>
```

**Capabilities:** Responsive look/orientation/sticky · Horizontal or vertical · Justified · Sticky with offset · Built on react-aria/react-stately tabs
