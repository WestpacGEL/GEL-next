import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    tableHeader: '',
  },
  variants: {
    scrollableRows: {
      true: {
        tableHeader: 'sticky top-0 z-[1] grid',
      },
    },
    scrollableColumns: {
      true: {
        tableHeader: 'table table-fixed',
      },
    },
  },
});
