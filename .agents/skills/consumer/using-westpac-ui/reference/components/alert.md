## Alert

**Import:** `import { Alert } from '@westpac/ui/alert';`

Contextual feedback messages.

| Prop          | Type                                                                           | Default | Description                         |
| ------------- | ------------------------------------------------------------------------------ | ------- | ----------------------------------- |
| `look`        | `ResponsiveVariants<'info' \| 'success' \| 'warning' \| 'danger' \| 'system'>` | `info`  | Alert style                         |
| `mode`        | `ResponsiveVariants<'box' \| 'text'>`                                          | `box`   | Display mode                        |
| `heading`     | `string`                                                                       | —       | Alert heading                       |
| `headingTag`  | `'h1'-'h6'`                                                                    | `h2`    | Heading element                     |
| `icon`        | `React.ElementType`                                                            | auto    | Custom icon (auto-selected by look) |
| `iconSize`    | `IconProps['size']`                                                            | —       | Icon size                           |
| `dismissible` | `boolean`                                                                      | `false` | Allow dismissal                     |
| `onClose`     | `() => void`                                                                   | —       | Close callback                      |
| `open`        | `boolean`                                                                      | —       | Controlled open state               |
| `tag`         | `keyof JSX.IntrinsicElements`                                                  | `div`   | HTML element                        |

**Incorrect (wrong prop names — `variant`/`title`/`closable`)**

```tsx
<Alert variant="success" title="Done!" closable onDismiss={() => {}}>
  Your changes have been saved.
</Alert>
```

**Correct**

```tsx
<Alert look="success" heading="Done!" dismissible onClose={() => {}}>
  Your changes have been saved.
</Alert>
```

**Capabilities:** Responsive `look` and `mode` · Dismissible with controlled or uncontrolled state · Custom icons · All look variants have automatic icons
