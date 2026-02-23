import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    headerRow: '',
  },
  variants: {
    scrollableRows: {
      true: {
        headerRow: '',
      },
    },
    scrollableColumns: {
      true: {
        headerRow: 'flex',
      },
    },
  },
});
