## Table

**Import:** `import { Table } from '@westpac/ui/table';`

Data table component.

**Incorrect (native table elements instead of Table sub-components)**

```tsx
<Table>
  <thead>
    <tr>
      <th>Name</th>
    </tr>
  </thead>
</Table>
```

**Correct**

```tsx
<Table>
  <TableHeader>
    <TableHeaderRow>
      <TableHeaderCell>Name</TableHeaderCell>
    </TableHeaderRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Games</TableCell>
    </TableRow>
  </TableBody>
</Table>
```
