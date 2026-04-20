import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    bodyRow: 'group/row outline-offset-[-1px] focus:outline-border-focus',
  },
  variants: {
    scrollableRows: {
      true: {
        bodyRow: 'flex w-full',
      },
    },
    scrollableColumns: {
      true: {
        bodyRow: 'flex',
      },
    },
    isPinned: {
      true: {
        bodyRow: 'bg-background-white shadow-md',
      },
      false: {},
    },
    striped: {
      true: {
        bodyRow: 'even:bg-surface-muted-faint',
      },
      false: {
        bodyRow: 'hover:bg-surface-hover-muted-pale',
      },
    },
  },
  compoundVariants: [
    {
      scrollableRows: true,
      isPinned: false,
      className: {
        bodyRow: 'absolute',
      },
    },
  ],
});
