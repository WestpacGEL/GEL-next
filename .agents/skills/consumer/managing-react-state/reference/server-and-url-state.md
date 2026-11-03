# Server and URL State

Server-owned data lives in Server Components or SWR. Navigable state lives in the route or the search params. Neither is copied into a Zustand store or Context.

## SWR (v2)

### Global config once, at the app or section root

```tsx
// src/app/providers.tsx
'use client';

import { SWRConfig } from 'swr';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => apiClient.get(url), // the project's API client, not raw fetch
        revalidateOnFocus: false, // banking UIs: refetch explicitly, not on tab focus
        dedupingInterval: 2000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
```

### Keys

- One key per resource, derived from the request: a string path, or an array when there are parameters: `['/accounts', accountId]`.
- Pass `null` as the key to pause the request until its inputs exist: `useSWR(accountId ? ['/accounts', accountId] : null, …)`.
- Colocate key builders with the API client (`accountKeys.detail(id)`) so reads and `mutate` calls agree on the key.

### Read

```tsx
const { data, error, isLoading } = useSWR(accountKeys.detail(accountId), () => accountsApi.get(accountId));
```

Keep only UI state in Zustand (selected id, filters, expanded rows). Components read SWR and select from the store separately; never `set` an SWR response into a store.

### Seed from a Server Component (`fallbackData`)

```tsx
// page.tsx (Server Component)
const accounts = await accountsApi.list();
return <AccountList fallbackData={accounts} />;

// account-list.tsx ('use client')
const { data } = useSWR(accountKeys.list(), accountsApi.list, { fallbackData });
```

`fallbackData` renders immediately and SWR revalidates per its config. For many keys, pass `fallback: { [key]: data }` to a nested `SWRConfig` instead.

### Mutate

```tsx
import useSWRMutation from 'swr/mutation';

const { trigger, isMutating } = useSWRMutation(accountKeys.detail(id), (_key, { arg }: { arg: Nickname }) =>
  accountsApi.rename(id, arg),
);

await trigger({ nickname }); // revalidates the key on success by default
```

- Use `optimisticData` + `rollbackOnError: true` only for low-risk UI (rename, favourite). Never for payments, applications, or anything with a server-side reference number: show `isMutating`, then render the server's response.
- After a request made outside SWR, call `mutate(key)` from `useSWRConfig()` to revalidate related keys.
- Disable the triggering control while `isMutating`.

### Testing

Wrap in `<SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>` so the cache is fresh per test, and mock the API client module, not `fetch`.

## URL state (Next.js App Router)

### Read

```tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const searchParams = useSearchParams();
const tab = searchParams.get('tab') ?? 'summary';
```

Any component that calls `useSearchParams` must sit inside a `<Suspense>` boundary, or a statically rendered route fails the build with "Missing Suspense boundary with useSearchParams". Put the boundary around the smallest component that reads the params, with a fallback that matches the layout.

Server Components read the same values from the `searchParams` page prop (a Promise in Next 15: `const { tab } = await searchParams`).

### Write

```tsx
const router = useRouter();
const pathname = usePathname();

const setParam = (name: string, value: string | null) => {
  const params = new URLSearchParams(searchParams);
  if (value === null) params.delete(name);
  else params.set(name, value);
  router.replace(`${pathname}?${params.toString()}`, { scroll: false });
};
```

- `replace` for filters, tabs, and pagination so Back leaves the page; `push` only when each state is a destination the user expects to return to.
- Validate what you read: parse with a Zod schema or a `switch` and fall back to the default; the URL is user input.
- Keep values short and serialisable (ids, enum strings, page numbers). Never put form values, progress, or personal data in the URL.
- Wizard current step is the route segment (`/apply/address`), not a `?step=` param.

### `nuqs`

If the project already uses `nuqs`, `useQueryState` replaces the read/write snippets above with typed parsers; it also needs the `NuqsAdapter` in the root layout. Do not add it for a single parameter.
