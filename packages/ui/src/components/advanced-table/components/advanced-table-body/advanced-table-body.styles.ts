import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    tableBody: '',
  },
  variants: {
    scrollableRows: {
      true: {
        tableBody: 'relative grid',
      },
    },
    scrollableColumns: {
      true: {
        tableBody: 'relative table-fixed',
      },
    },
  },
});
