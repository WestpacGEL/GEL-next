import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: '',
    table: 'border-separate border-spacing-0 overflow-hidden rounded-md border border-border',
  },
  variants: {
    scrollableRows: {
      true: {
        container: 'relative',
        table: 'grid h-full overflow-auto',
      },
    },
    scrollableColumns: {
      true: {
        container: 'flex',
        table: 'block overflow-auto',
      },
    },
  },
});
