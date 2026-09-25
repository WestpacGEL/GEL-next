## Well

**Import:** `import { Well } from '@westpac/ui/well';`

Inset content container.

**Incorrect (invalid `color` value)**

```tsx
<Well color="grey">Look, I'm in a well</Well>
```

**Correct**

```tsx
<Well color="light" tag="aside">
  Look, I'm in a well
  <Well color="white">I am nested inside</Well>
</Well>
```

**Capabilities:** Content grouping with visual inset
