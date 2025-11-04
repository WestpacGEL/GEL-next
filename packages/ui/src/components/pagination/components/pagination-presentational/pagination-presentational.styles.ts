import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex flex-col items-center',
    ul: 'flex',
    emptyItem:
      'relative block min-w-7 cursor-default border-y border-border-muted-soft px-2 py-1.5 text-center typography-body-10 text-text-body',
  },
});
