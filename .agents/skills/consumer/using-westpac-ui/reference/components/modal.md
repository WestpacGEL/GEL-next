## Modal

**Import:** `import { Modal, ModalBody, ModalFooter } from '@westpac/ui/modal';`

Dialog overlay.

| Prop                    | Type                      | Default | Description     |
| ----------------------- | ------------------------- | ------- | --------------- |
| `size`                  | `ResponsiveVariants<...>` | —       | Modal size      |
| `fullscreen`            | `boolean`                 | —       | Fullscreen mode |
| `backdropClassName`     | `string`                  | —       | Backdrop styles |
| `open` (on backdrop)    | via ModalBackdropProps    | —       | Open state      |
| `onClose` (on backdrop) | via ModalBackdropProps    | —       | Close handler   |

**Incorrect (wrong `isOpen` prop and missing `ModalBody`/`ModalFooter`)**

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Modal isOpen={open} title="Modal Title" size="medium">
  <div>Content</div>
  <Button onClick={() => setOpen(false)}>Close</Button>
</Modal>
```

**Correct**

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Modal open={open} onClose={() => setOpen(false)} title="Modal Title" size="medium">
  <ModalBody>Content</ModalBody>
  <ModalFooter>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </ModalFooter>
</Modal>
```

**Capabilities:** Responsive size · Fullscreen · Compound with ModalBody/ModalFooter · Controlled open/close · Backdrop customization
