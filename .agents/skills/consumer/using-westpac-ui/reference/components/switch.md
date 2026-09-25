## Switch

**Import:** `import { Switch } from '@westpac/ui/switch';`

Toggle switch control.

**Incorrect (children instead of the required `label` prop)**

```tsx
<Switch checked>eStatements</Switch>
```

**Correct**

```tsx
<Switch label="eStatements" checked />
```
