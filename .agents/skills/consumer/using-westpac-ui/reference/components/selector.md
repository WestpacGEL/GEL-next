## Selector

**Import:** `import { Selector } from '@westpac/ui/selector';`

Visual selection component (card-style radio/checkbox).

**Incorrect (native inputs instead of Selector options)**

```tsx
<Selector type="checkbox">
  <label>
    <input type="checkbox" value="email" /> Email alerts
  </label>
</Selector>
```

**Correct**

```tsx
<Selector type="checkbox">
  <SelectorCheckbox value="email">
    <SelectorLabel>Email alerts</SelectorLabel>
  </SelectorCheckbox>
</Selector>
```
