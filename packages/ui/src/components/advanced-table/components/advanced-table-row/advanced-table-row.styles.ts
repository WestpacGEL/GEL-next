import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    bodyRow: '',
  },
  variants: {
    scrollableRows: {
      true: {
        bodyRow: 'absolute flex w-full',
      },
    },
    scrollableColumns: {
      true: {
        bodyRow: 'flex',
      },
    },
  },
});
