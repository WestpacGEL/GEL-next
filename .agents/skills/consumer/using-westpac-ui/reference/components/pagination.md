## Pagination

**Import:** `import { Pagination } from '@westpac/ui/pagination';`

Page navigation controls.

**Incorrect (unsupported `pages` prop)**

```tsx
<Pagination current={1} pages={10} onChange={setPage} />
```

**Correct**

```tsx
<Pagination current={1} totalPages={10} onChange={setPage} />
```

**Capabilities:** Page number display · Previous/next navigation · Custom hook available via `@westpac/ui/hook`
