## Circle

**Import:** `import { Circle } from '@westpac/ui/circle';`

Circular container element.

| Prop  | Type                          | Default | Description  |
| ----- | ----------------------------- | ------- | ------------ |
| `tag` | `keyof JSX.IntrinsicElements` | —       | HTML element |

**Incorrect (invalid `tag` value)**

```tsx
<Circle tag="circle">42</Circle>
```

**Correct**

```tsx
<Circle tag="span">42</Circle>
```
