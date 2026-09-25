## ErrorMessage

**Import:** `import { ErrorMessage } from '@westpac/ui/error-message';`

Form field error display.

| Prop      | Type                          | Default | Description      |
| --------- | ----------------------------- | ------- | ---------------- |
| `message` | `string \| string[]`          | —       | Error message(s) |
| `icon`    | `(...args) => JSX.Element`    | —       | Custom icon      |
| `tag`     | `keyof JSX.IntrinsicElements` | —       | HTML element     |

**Incorrect (wrong prop name `error` instead of `message`)**

```tsx
<ErrorMessage error="Enter your first name" />
```

**Correct**

```tsx
<ErrorMessage message="Enter your first name" />
```
