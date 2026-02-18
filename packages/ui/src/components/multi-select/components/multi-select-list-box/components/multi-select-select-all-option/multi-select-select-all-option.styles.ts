import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    listItem: 'border-b border-b-border-muted-soft hover:bg-surface-muted-faint',
    button: 'flex w-full cursor-pointer items-center gap-1 p-2',
    checkbox: 'flex size-4 items-center justify-center rounded border border-border-hero bg-background-white',
    indeterminate: 'block w-3/5 border-t-2 border-t-border-hero',
    label: 'typography-body-9',
  },
  variants: {
    selected: {
      true: { listItem: 'bg-surface-muted-faint' },
      false: { listItem: '' },
    },
    isFocusVisible: {
      true: { listItem: 'bg-surface-muted-faint focus-outline -outline-offset-2' },
      false: {},
    },
  },
});
