import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    td: 'border-b border-border-muted-soft',
  },
  variants: {
    extraCellPadding: {
      false: {
        td: 'p-2',
      },
      true: {
        td: 'p-3',
      },
    },
    bordered: {
      true: {
        td: 'border-r last:border-r-0',
      },
    },
  },
});
