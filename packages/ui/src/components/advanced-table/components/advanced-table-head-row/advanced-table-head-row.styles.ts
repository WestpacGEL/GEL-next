import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    headerRow: '',
  },
  variants: {
    scrollableColumns: {
      true: {
        headerRow: 'flex',
      },
    },
  },
});
