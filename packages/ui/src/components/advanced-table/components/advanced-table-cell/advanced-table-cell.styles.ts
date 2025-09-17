import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    td: 'border-b border-border bg-white p-2',
  },
  variants: {
    scrollableRows: {
      true: {
        td: 'flex',
      },
    },
    scrollableColumns: {
      true: {
        td: '',
      },
    },
  },
});
