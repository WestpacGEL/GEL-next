import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    bodyRow: 'outline-offset-[-1px] focus:outline-focus',
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
