import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex flex-col items-center',
    ul: 'flex',
    emptyItem:
      'typography-body-10 border-border-muted-soft text-text-body relative block min-w-7 cursor-default border-y px-2 py-1.5 text-center',
  },
});
