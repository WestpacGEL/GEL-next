## Popover

**Import:** `import { Popover } from '@westpac/ui/popover';`

Floating content panel triggered by interaction.
Accessibility label should be provided to ensure correct screen reader behaviour - this is given to the trigger button, which propagates the label to the popover dialog panel.

**Incorrect (invalid `placement` value)**

```tsx
<Popover heading="Help" content="This explains the field." placement="right">
  More info
</Popover>
```

**Correct**

```tsx
<Popover heading="Help" content="This explains the field." placement="bottom" label="More info">
  More info
</Popover>
```

**Capabilities:** Positioned relative to trigger · Portal support
