import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    listItem: 'border-b border-b-border-muted-soft hover:bg-surface-muted-pale',
    button:
      'flex w-full cursor-pointer items-center gap-1 p-2 focus-visible:bg-surface-muted-pale focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-border-focus',
    checkbox: 'flex size-4 items-center justify-center rounded border border-border-muted-strong',
  },
  variants: {
    selected: {
      true: { listItem: 'bg-surface-muted-pale' },
      false: { listItem: '' },
    },
  },
});
