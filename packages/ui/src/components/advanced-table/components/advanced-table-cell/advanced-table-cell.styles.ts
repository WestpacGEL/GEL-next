import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    td: 'border-b border-border-muted-soft outline-offset-[-1px] focus:outline-border-focus',
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
        td: 'bg-background-white',
      },
    },
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
        td: 'border-r border-border-muted-soft group-last/row:border-b-0 last:border-r-0',
      },
    },
  },
});
