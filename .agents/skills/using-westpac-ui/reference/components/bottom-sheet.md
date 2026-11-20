## BottomSheet

**Import:** `import { BottomSheet } from '@westpac/ui/bottom-sheet';`

Mobile-friendly bottom drawer.

| Prop               | Type                  | Default | Description                           |
| ------------------ | --------------------- | ------- | ------------------------------------- |
| `state`            | `OverlayTriggerState` | —       | Controlled open/close (react-stately) |
| `title`            | `string`              | —       | Sheet title                           |
| `primaryLabel`     | `string`              | —       | Primary button text                   |
| `primaryOnClick`   | `() => void`          | —       | Primary button handler                |
| `secondaryLabel`   | `string`              | —       | Secondary button text                 |
| `secondaryOnClick` | `() => void`          | —       | Secondary button handler              |

**Incorrect (boolean `useState` instead of `OverlayTriggerState`)**

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<BottomSheet open={open} title="Title" primaryLabel="Confirm" primaryOnClick={() => setOpen(false)}>
  Content
</BottomSheet>
```

**Correct**

```tsx
import { useOverlayTriggerState } from 'react-stately';

const state = useOverlayTriggerState({});

<Button onClick={() => state.open()}>Open</Button>
<BottomSheet state={state} title="Title" primaryLabel="Confirm" primaryOnClick={() => state.close()}>
  Content
</BottomSheet>
```

**Capabilities:** Controlled via react-stately `useOverlayTriggerState` · Primary/secondary action buttons · Title
