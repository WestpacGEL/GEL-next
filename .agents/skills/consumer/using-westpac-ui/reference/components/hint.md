## Hint

**Import:** `import { Hint } from '@westpac/ui/hint';`

Form field hint text.

| Prop      | Type                          | Default | Description  |
| --------- | ----------------------------- | ------- | ------------ |
| `spacing` | `ResponsiveVariants<...>`     | —       | Spacing      |
| `tag`     | `keyof JSX.IntrinsicElements` | —       | HTML element |

**Incorrect (unsupported `spacing` value)**

```tsx
<Hint spacing="small">We'll never share your details.</Hint>
```

**Correct**

```tsx
<Hint spacing="large">We'll never share your details.</Hint>
```
