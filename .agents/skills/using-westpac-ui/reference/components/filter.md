## Filter

**Import:** `import { Filter, FilterButtons, FilterInput } from '@westpac/ui/filter';`

Filter bar with inputs and action buttons.

**Incorrect (missing `FilterInput`/`FilterButtons` wrappers)**

```tsx
<Filter>
  <Input placeholder="Search..." />
  <Button>Apply</Button>
  <Button look="faint">Clear</Button>
</Filter>
```

**Correct**

```tsx
<Filter>
  <FilterInput>
    <Input placeholder="Search..." />
  </FilterInput>
  <FilterButtons>
    <Button>Apply</Button>
    <Button look="faint">Clear</Button>
  </FilterButtons>
</Filter>
```

**Capabilities:** Compound component with FilterInput and FilterButtons
