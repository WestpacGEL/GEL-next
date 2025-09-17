import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: '',
    table: 'border-separate border-spacing-0 overflow-hidden rounded-md border border-border',
  },
  variants: {
    scrollableRows: {
      true: {
        container: 'relative h-[500px]',
        table: 'grid h-[500px] overflow-auto',
      },
    },
    scrollableColumns: {
      true: {
        container: 'flex w-[700px]',
        table: 'block w-[700px] overflow-auto',
      },
    },
  },
});
