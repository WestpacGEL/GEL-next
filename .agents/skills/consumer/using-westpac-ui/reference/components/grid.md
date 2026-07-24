## Grid

**Import:** `import { Grid, GridContainer, GridItem } from '@westpac/ui/grid';`

Layout grid system.

**Incorrect (`GridItem` without `Grid`/`GridContainer` wrappers)**

```tsx
<GridItem span={6}>Half width</GridItem>
<GridItem span={6}>Half width</GridItem>
```

**Correct**

```tsx
<GridContainer>
  <Grid>
    <GridItem span={6}>Half width</GridItem>
    <GridItem span={6}>Half width</GridItem>
  </Grid>
</GridContainer>
```

**Capabilities:** Compound with GridContainer/GridItem · Responsive span values
