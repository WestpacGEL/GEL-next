## Popover

**Import:** `import { Popover } from '@westpac/ui/popover';`

Floating content panel triggered by interaction.

**Incorrect (invalid `placement` value)**

```tsx
<Popover heading="Help" content="This explains the field." placement="right">
  More info
</Popover>
```

**Correct**

```tsx
<Popover heading="Help" content="This explains the field." placement="bottom">
  More info
</Popover>
```

**Capabilities:** Positioned relative to trigger · Portal support
