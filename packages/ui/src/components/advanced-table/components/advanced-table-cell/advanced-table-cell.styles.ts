import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    td: 'border-b border-border p-2 outline-offset-[-1px] focus:outline-focus',
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
    isPinned: {
      true: {
        td: 'bg-white',
      },
    },
  },
});
