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
        bodyRow: 'bg-background-white',
      },
      false: {},
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
