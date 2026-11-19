## Flyout

**Import:** `import { Flyout } from '@westpac/ui/flyout';`

Modal panel that slides in from the left or right side of the viewport.

| Prop                        | Type                          | Default          | Description                                      |
| --------------------------- | ----------------------------- | ---------------- | ------------------------------------------------ |
| `state`                     | `OverlayTriggerState`         | —                | State created with `useOverlayTriggerState`      |
| `position`                  | `'left' \| 'right'`           | `'right'`        | Side from which the panel opens                  |
| `heading`                   | `ReactNode`                   | —                | Optional panel heading                           |
| `headingTag`                | `'h1' \| 'h2' \| ... \| 'h6'` | `'h2'`           | Semantic heading element                         |
| `closeAssistiveText`        | `string`                      | `'Close flyout'` | Accessible label for the close button            |
| `isDismissable`             | `boolean`                     | `true`           | Enables close button and outside-click dismissal |
| `isKeyboardDismissDisabled` | `boolean`                     | `false`          | Disables Escape-key dismissal                    |
| `portalContainer`           | `Element`                     | Brand container  | Element into which the Flyout is portalled       |
| `backdropClassName`         | `string`                      | —                | Additional backdrop classes                      |
| `className`                 | `string`                      | —                | Additional panel classes                         |
| `zIndex`                    | `number`                      | `100`            | Backdrop stacking level                          |

**Incorrect (using boolean state props instead of `OverlayTriggerState`)**

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open flyout</Button>
<Flyout heading="Application steps" open={open} onClose={() => setOpen(false)}>
  Flyout content
</Flyout>
```

**Correct**

```tsx
const state = useOverlayTriggerState({});

<Button onClick={() => state.open()}>Open flyout</Button>
<Flyout heading="Application steps" position="right" state={state}>
  Flyout content
</Flyout>
```

**Capabilities:** Left or right positioning · Modal focus management · Escape dismissal · Outside-click dismissal · Animated panel entry and exit · Immediate backdrop removal on close
