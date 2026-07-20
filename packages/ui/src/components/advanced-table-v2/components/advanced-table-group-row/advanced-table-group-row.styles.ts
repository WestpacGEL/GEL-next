import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    row: 'bg-surface-muted-faint',
    cell: 'border-b border-border-muted-soft p-2 typography-body-9 font-medium',
    cellContent: 'flex flex-row items-center gap-1',
    expandButton: 'flex size-6 shrink-0 items-center justify-center',
    expandButtonInner:
      'flex size-full cursor-pointer items-center justify-center rounded-sm focus-visible:focus-outline',
  },
});
