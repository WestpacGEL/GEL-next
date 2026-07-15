import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    row: 'bg-surface-muted-faint',
    cell: 'border-b border-border-muted-soft p-2 typography-body-9 font-medium',
  },
});
